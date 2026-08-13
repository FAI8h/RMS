import PDFDocument from "pdfkit";

import { drawAcademicTable } from "./sections/academicTable.js";
import { drawCoCurricular } from "./sections/coCurricular.js";
import { drawPersonalAssessment } from "./sections/personalAssessment.js";
import { drawRemarks } from "./sections/remarks.js";
import { drawSignatures } from "./sections/signatures.js";


export function createReportCard(data = {}) {

    const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margin: 0,
        autoFirstPage: true,
    });


    /*
    |--------------------------------------------------------------------------
    | PAGE 1
    |--------------------------------------------------------------------------
    */

    drawPageOne(
        doc,
        data
    );


    /*
    |--------------------------------------------------------------------------
    | PAGE 2
    |--------------------------------------------------------------------------
    */

    doc.addPage({
        size: "A4",
        layout: "landscape",
        margin: 0,
    });


    drawPageTwo(
        doc,
        data
    );


    /*
    |--------------------------------------------------------------------------
    | IMPORTANT
    |
    | DO NOT doc.end() here.
    |
    | Controller owns the stream.
    |--------------------------------------------------------------------------
    */

    return doc;
}


/*
|--------------------------------------------------------------------------
| PAGE 1
|--------------------------------------------------------------------------
*/

function drawPageOne(doc, data) {

    const pageWidth =
        doc.page.width;

    const margin = 30;

    const gap = 20;

    const leftWidth = 550;

    const rightWidth =
        pageWidth -
        margin -
        leftWidth -
        gap -
        margin;


    const leftX =
        margin;

    const rightX =
        leftX +
        leftWidth +
        gap;


    const topY =
        25;


    /*
    |--------------------------------------------------------------------------
    | Academic
    |--------------------------------------------------------------------------
    */

    drawAcademicTable(doc, {
        x: leftX,
        y: topY,
        width: leftWidth,

        academic:
            data.academic ?? [],

        grandTotal:
            data.grandTotal ?? {},
    });


    /*
    |--------------------------------------------------------------------------
    | Co-curricular
    |--------------------------------------------------------------------------
    */

    drawCoCurricular(doc, {
        x: rightX,
        y: topY,
        width: rightWidth,

        data:
            data.coCurricular ?? [],
    });
}


/*
|--------------------------------------------------------------------------
| PAGE 2
|--------------------------------------------------------------------------
*/

function drawPageTwo(doc, data) {

    const pageWidth =
        doc.page.width;

    const margin = 30;

    const width =
        pageWidth -
        margin * 2;


    const x =
        margin;


    let y =
        25;


    /*
    |--------------------------------------------------------------------------
    | Personal Assessment
    |--------------------------------------------------------------------------
    */
    
    

    const personalBottom =
        drawPersonalAssessment(doc, {
            x,
            y,
            width,

            data:
                data.personalAssessment ?? [],
        });


    /*
    |--------------------------------------------------------------------------
    | Remarks
    |--------------------------------------------------------------------------
    */

    const remarksResult =
        drawRemarks(doc, {
            x,
            y:
                personalBottom + 15,

            width,

            remarks:
                data.remarks ?? {},

            finalResult:
                data.finalResult ?? "",
        });


    /*
    |--------------------------------------------------------------------------
    | Signatures
    |--------------------------------------------------------------------------
    */

    drawSignatures(doc, {
        x,
        y:
            remarksResult.annualBottom + 20,

        width,

        signatures:
            data.signatures ?? {},
    });


    /*
    |--------------------------------------------------------------------------
    | Session
    |--------------------------------------------------------------------------
    */

    doc
        .font("Helvetica-Bold")
        .fontSize(7)
        .text(
            `NEW ACADEMIC SESSION BEGINS ON ${
                data.newSessionDate ?? ""
            }`,
            x,
            doc.page.height - 22,
            {
                width,
                align: "center",
                lineBreak: false,
            }
        );
}