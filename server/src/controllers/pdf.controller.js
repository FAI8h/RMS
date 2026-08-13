import fs from "node:fs";
import path from "node:path";
import mongoose from "mongoose";

import Result from "../models/result.js";
import ReportCard from "../models/reportCard.js";
import Student from "../models/student.js";

import { createReportCard } from "../utils/reportCard/reportCard.js";

const QUERY_TIMEOUT_MS = 10_000;

// @desc    Generate and download PDF Report Card
// @route   GET /api/report-cards/pdf/:studentId
// @access  Private
export const generatePDFReportCard = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { exam } = req.query;

        if (!mongoose.isValidObjectId(studentId)) {
            return res.status(400).json({
                message: "Invalid student ID",
            });
        }

        if (!exam) {
            return res.status(400).json({
                message: "Exam is required",
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Student
        |--------------------------------------------------------------------------
        */

        const student = await Student.findById(studentId)
            .lean()
            .maxTimeMS(QUERY_TIMEOUT_MS);

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }


        /*
        |--------------------------------------------------------------------------
        | Results
        |--------------------------------------------------------------------------
        */

        const [academicResults, metaData] = await Promise.all([
            Result.find({
                student: studentId,
                exam,
            })
                .populate(
                    "subject",
                    "name code maxTheoryMarks maxPracticalMarks"
                )
                .lean()
                .maxTimeMS(QUERY_TIMEOUT_MS),
            ReportCard.findOne({
                student: studentId,
                exam,
            })
                .lean()
                .maxTimeMS(QUERY_TIMEOUT_MS),
        ]);


        /*
        |--------------------------------------------------------------------------
        | IMPORTANT
        |
        | Empty data is allowed.
        | The PDF renderer will generate the skeleton.
        |--------------------------------------------------------------------------
        */

        const reportData = {
            student: {
                name: student.name ?? "",
                admissionNumber:
                    student.admissionNumber ?? "",
                rollNumber:
                    student.rollNumber ?? "",
                class:
                    student.class ?? "",
                section:
                    student.section ?? "",
            },


            /*
            |--------------------------------------------------------------------------
            | Academic
            |--------------------------------------------------------------------------
            */

            academic: academicResults.map((result) => {

                const maxTheory =
                    Number(
                        result.subject?.maxTheoryMarks ?? 0
                    );

                const maxPractical =
                    Number(
                        result.subject?.maxPracticalMarks ?? 0
                    );


                /*
                | CHANGE THESE FIELD NAMES IF YOUR RESULT
                | SCHEMA USES DIFFERENT ONES.
                |
                | Example:
                | result.theoryMarks
                | result.practicalMarks
                |--------------------------------------------------------------------------
                */

                const theoryMarks =
                    result.theoryMarks ?? "";

                const practicalMarks =
                    result.practicalMarks ?? "";

                const totalMarks =
                    result.totalMarks ?? "";

                const grade =
                    result.grade ?? "";


                return {
                    name:
                        result.subject?.name ?? "",

                    maximumMarks:
                        maxTheory +
                        maxPractical,

                    passMarks:
                        Math.ceil(
                            (
                                maxTheory +
                                maxPractical
                            ) * 0.4
                        ),

                    halfYearly: {
                        twenty:
                            exam === "Half Yearly"
                                ? practicalMarks
                                : "",

                        eighty:
                            exam === "Half Yearly"
                                ? theoryMarks
                                : "",

                        total:
                            exam === "Half Yearly"
                                ? totalMarks
                                : "",

                        grade:
                            exam === "Half Yearly"
                                ? grade
                                : "",
                    },

                    annual: {
                        twenty:
                            exam === "Annual"
                                ? practicalMarks
                                : "",

                        eighty:
                            exam === "Annual"
                                ? theoryMarks
                                : "",

                        total:
                            exam === "Annual"
                                ? totalMarks
                                : "",

                        grade:
                            exam === "Annual"
                                ? grade
                                : "",
                    },
                };
            }),


            /*
            |--------------------------------------------------------------------------
            | Grand total
            |--------------------------------------------------------------------------
            */

            grandTotal: {
                maximumMarks: "",
                passMarks: "",

                halfYearly: "",
                halfYearlyGrade: "",

                annual: "",
                annualGrade: "",
            },


            /*
            |--------------------------------------------------------------------------
            | Co-curricular
            |--------------------------------------------------------------------------
            */

            coCurricular:
                metaData?.coCurricular?.map((item) => ({
                    name:
                        item.activityName ?? "",

                    halfYearly:
                        exam === "Half Yearly"
                            ? item.rating ?? ""
                            : "",

                    annual:
                        exam === "Annual"
                            ? item.rating ?? ""
                            : "",
                })) ?? [],


            /*
            |--------------------------------------------------------------------------
            | Personal Assessment
            |--------------------------------------------------------------------------
            */

            personalAssessment:
                metaData?.personalAssessment?.map(
                    (item) => ({
                        name:
                            item.traitName ?? "",

                        halfYearly:
                            exam === "Half Yearly"
                                ? item.rating ?? ""
                                : "",

                        annual:
                            exam === "Annual"
                                ? item.rating ?? ""
                                : "",
                    })
                ) ?? [],


            /*
            |--------------------------------------------------------------------------
            | Remarks
            |--------------------------------------------------------------------------
            */

            remarks: {
                halfYearly:
                    exam === "Half Yearly"
                        ? metaData?.remarks ?? ""
                        : "",

                annual:
                    exam === "Annual"
                        ? metaData?.remarks ?? ""
                        : "",
            },


            /*
            |--------------------------------------------------------------------------
            | Final result
            |--------------------------------------------------------------------------
            */

            finalResult:
                metaData?.finalResult ?? "",


            /*
            |--------------------------------------------------------------------------
            | Signatures
            |--------------------------------------------------------------------------
            */

            signatures: {
                classTeacher: "",
                principal: "",
                parent: "",
            },


            newSessionDate: "",
        };


        /*
        |--------------------------------------------------------------------------
        | Generate PDF
        |--------------------------------------------------------------------------
        */

        const doc =
            createReportCard(reportData);


        /*
        |--------------------------------------------------------------------------
        | Filename
        |--------------------------------------------------------------------------
        */

        const safeName =
            String(
                student.name || "Student"
            )
                .replace(
                    /[^a-zA-Z0-9-_ ]/g,
                    ""
                )
                .trim();


        const filename =
            `ReportCard_${safeName}.pdf`;


        /*
        |--------------------------------------------------------------------------
        | Output directory
        |--------------------------------------------------------------------------
        */

        const outputDir =
            path.resolve(
                "generated-reports"
            );

        await fs.promises.mkdir(
            outputDir,
            {
                recursive: true,
            }
        );


        const filePath =
            path.join(
                outputDir,
                `ReportCard_${studentId}.pdf`
            );


        /*
        |--------------------------------------------------------------------------
        | Save stream
        |--------------------------------------------------------------------------
        */

        const fileStream =
            fs.createWriteStream(
                filePath
            );


        /*
        |--------------------------------------------------------------------------
        | PDFKit streams directly to both destinations.
        |--------------------------------------------------------------------------
        */

        /*
        |--------------------------------------------------------------------------
        | HTTP headers
        |--------------------------------------------------------------------------
        */

        res.statusCode = 200;

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${filename}"`
        );


        /*
        |--------------------------------------------------------------------------
        | Pipe
        |--------------------------------------------------------------------------
        */

        doc.pipe(res);


        /*
        |--------------------------------------------------------------------------
        | Error handling
        |--------------------------------------------------------------------------
        */

        let finished = false;

        const fail = (error) => {

            console.error(
                "PDF stream error:",
                error
            );

            if (!res.headersSent) {
                res.status(500).json({
                    message:
                        "Failed to generate PDF",

                    error:
                        error.message,
                });
            } else {
                res.destroy(error);
            }
        };


        doc.on(
            "error",
            fail
        );

        fileStream.on(
            "error",
            fail
        );


        /*
        |--------------------------------------------------------------------------
        | File saved
        |--------------------------------------------------------------------------
        */

        fileStream.on(
            "finish",
            () => {
                console.log(
                    "Report card saved:",
                    filePath
                );
            }
        );


        /*
        |--------------------------------------------------------------------------
        | Response finished
        |--------------------------------------------------------------------------
        */

        res.on(
            "finish",
            () => {
                finished = true;

                console.log(
                    "Report card response finished"
                );
            }
        );


        /*
        |--------------------------------------------------------------------------
        | Start PDF
        |--------------------------------------------------------------------------
        */

        doc.end();


    } catch (error) {

        console.error(
            "Generate Report Card PDF Error:",
            error
        );

        if (!res.headersSent) {
            return res.status(500).json({
                message:
                    "Failed to generate report card",

                error:
                    error.message,
            });
        }

        res.destroy(error);
    }
};
