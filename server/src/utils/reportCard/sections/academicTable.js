import { drawCell } from "../helpers/cell.js";
import { drawSectionTitle } from "../helpers/table.js";


const DEFAULT_SUBJECTS = [
    "Mathematics",
    "English-I (Language)",
    "English-II (Literature)",
    "Hindi-I (Language)",
    "Hindi-II (Literature)",
    "General Knowledge",
    "Sanskrit",
    "Computer Applications",
    "General Science",
];


export function drawAcademicTable(
    doc,
    {
        x,
        y,
        width,

        academic = [],

        grandTotal = {},
    }
) {

    const TITLE_HEIGHT = 30;

    const HEADER_1 = 22;
    const HEADER_2 = 22;
    const HEADER_3 = 20;

    const ROW_HEIGHT = 30;

    const TOTAL_HEIGHT = 28;

    const NOTE_HEIGHT = 22;


    /*
    |--------------------------------------------------------------------------
    | Title
    |--------------------------------------------------------------------------
    */

    drawSectionTitle(doc, {
        x,
        y,
        width,
        height:
            TITLE_HEIGHT,

        title:
            "ACADEMIC ACHIEVEMENT",
    });


    const tableY =
        y +
        TITLE_HEIGHT;


    /*
    |--------------------------------------------------------------------------
    | Columns
    |--------------------------------------------------------------------------
    */

    const widths = [
        145,
        38,
        38,

        31,
        31,
        35,
        35,

        31,
        31,
        35,
        35,
    ];


    /*
    |--------------------------------------------------------------------------
    | Header
    |--------------------------------------------------------------------------
    */

    let cx = x;


    drawCell(doc, {
        x: cx,
        y: tableY,

        width: widths[0],

        height:
            HEADER_1 +
            HEADER_2 +
            HEADER_3,

        value:
            "SUBJECTS",

        font:
            "Helvetica-Bold",

        fontSize: 7,
    });

    cx += widths[0];


    drawCell(doc, {
        x: cx,
        y: tableY,

        width: widths[1],

        height:
            HEADER_1 +
            HEADER_2 +
            HEADER_3,

        value:
            "Maximum\nMarks",

        font:
            "Helvetica-Bold",

        fontSize: 6,
    });

    cx += widths[1];


    drawCell(doc, {
        x: cx,
        y: tableY,

        width: widths[2],

        height:
            HEADER_1 +
            HEADER_2 +
            HEADER_3,

        value:
            "Pass\nMarks",

        font:
            "Helvetica-Bold",

        fontSize: 6,
    });

    cx += widths[2];


    /*
    |--------------------------------------------------------------------------
    | Half Yearly
    |--------------------------------------------------------------------------
    */

    const halfWidth =
        widths[3] +
        widths[4] +
        widths[5] +
        widths[6];


    const annualX =
        cx +
        halfWidth;


    const annualWidth =
        widths[7] +
        widths[8] +
        widths[9] +
        widths[10];


    drawCell(doc, {
        x: cx,
        y: tableY,

        width:
            halfWidth,

        height:
            HEADER_1,

        value:
            "MARKS OBTAINED",

        font:
            "Helvetica-Bold",

        fontSize: 7,
    });


    drawCell(doc, {
        x: cx,
        y:
            tableY +
            HEADER_1,

        width:
            halfWidth,

        height:
            HEADER_2,

        value:
            "Half Yearly",

        font:
            "Helvetica-Bold",

        fontSize: 7,
    });


    /*
    |--------------------------------------------------------------------------
    | Annual
    |--------------------------------------------------------------------------
    */

    drawCell(doc, {
        x: annualX,
        y: tableY,

        width:
            annualWidth,

        height:
            HEADER_1,

        value:
            "MARKS OBTAINED",

        font:
            "Helvetica-Bold",

        fontSize: 7,
    });


    drawCell(doc, {
        x: annualX,
        y:
            tableY +
            HEADER_1,

        width:
            annualWidth,

        height:
            HEADER_2,

        value:
            "Annual",

        font:
            "Helvetica-Bold",

        fontSize: 7,
    });


    /*
    |--------------------------------------------------------------------------
    | Subheaders
    |--------------------------------------------------------------------------
    */

    const halfHeaders = [
        ["20", widths[3]],
        ["80", widths[4]],
        ["100", widths[5]],
        ["Grade", widths[6]],
    ];


    let headerX = cx;


    for (
        const [label, cellWidth]
        of halfHeaders
    ) {

        drawCell(doc, {
            x: headerX,

            y:
                tableY +
                HEADER_1 +
                HEADER_2,

            width:
                cellWidth,

            height:
                HEADER_3,

            value:
                label,

            font:
                "Helvetica-Bold",

            fontSize: 6,
        });


        headerX += cellWidth;
    }


    const annualHeaders = [
        ["20", widths[7]],
        ["80", widths[8]],
        ["100", widths[9]],
        ["Grade", widths[10]],
    ];


    headerX = annualX;


    for (
        const [label, cellWidth]
        of annualHeaders
    ) {

        drawCell(doc, {
            x: headerX,

            y:
                tableY +
                HEADER_1 +
                HEADER_2,

            width:
                cellWidth,

            height:
                HEADER_3,

            value:
                label,

            font:
                "Helvetica-Bold",

            fontSize: 6,
        });


        headerX += cellWidth;
    }


    /*
    |--------------------------------------------------------------------------
    | Skeleton if no data
    |--------------------------------------------------------------------------
    */

    const subjects =
        academic.length > 0
            ? academic
            : DEFAULT_SUBJECTS.map(
                  (name) => ({
                      name,

                      maximumMarks:
                          [
                              "General Knowledge",
                              "Sanskrit",
                              "Computer Applications",
                          ].includes(name)
                              ? 50
                              : 100,

                      passMarks:
                          [
                              "General Knowledge",
                              "Sanskrit",
                              "Computer Applications",
                          ].includes(name)
                              ? 20
                              : 40,

                      halfYearly: {},
                      annual: {},
                  })
              );


    /*
    |--------------------------------------------------------------------------
    | Rows
    |--------------------------------------------------------------------------
    */

    const bodyY =
        tableY +
        HEADER_1 +
        HEADER_2 +
        HEADER_3;


    subjects.forEach(
        (subject, index) => {

            const rowY =
                bodyY +
                index *
                    ROW_HEIGHT;


            const half =
                subject.halfYearly ??
                {};

            const annual =
                subject.annual ??
                {};


            const values = [
                subject.name ?? "",

                subject.maximumMarks ?? "",
                subject.passMarks ?? "",

                half.twenty ?? "",
                half.eighty ?? "",
                half.total ?? "",
                half.grade ?? "",

                annual.twenty ?? "",
                annual.eighty ?? "",
                annual.total ?? "",
                annual.grade ?? "",
            ];


            let cellX = x;


            widths.forEach(
                (cellWidth, i) => {

                    drawCell(doc, {
                        x: cellX,
                        y: rowY,

                        width:
                            cellWidth,

                        height:
                            ROW_HEIGHT,

                        value:
                            values[i],

                        font:
                            i === 0
                                ? "Helvetica"
                                : "Helvetica",

                        fontSize:
                            i === 0
                                ? 6.3
                                : 7,

                        align:
                            i === 0
                                ? "left"
                                : "center",
                    });


                    cellX +=
                        cellWidth;
                }
            );
        }
    );


    /*
    |--------------------------------------------------------------------------
    | Grand total
    |--------------------------------------------------------------------------
    */

    const totalY =
        bodyY +
        subjects.length *
            ROW_HEIGHT;


    const totalValues = [
        "Grand Total",

        grandTotal.maximumMarks ?? "",
        grandTotal.passMarks ?? "",

        "",
        "",
        grandTotal.halfYearly ?? "",
        grandTotal.halfYearlyGrade ?? "",

        "",
        "",
        grandTotal.annual ?? "",
        grandTotal.annualGrade ?? "",
    ];


    let totalX = x;


    widths.forEach(
        (cellWidth, i) => {

            drawCell(doc, {
                x: totalX,
                y: totalY,

                width:
                    cellWidth,

                height:
                    TOTAL_HEIGHT,

                value:
                    totalValues[i],

                font:
                    "Helvetica-Bold",

                fontSize: 7,

                align:
                    i === 0
                        ? "left"
                        : "center",
            });


            totalX +=
                cellWidth;
        }
    );


    /*
    |--------------------------------------------------------------------------
    | Note
    |--------------------------------------------------------------------------
    */

    const noteY =
        totalY +
        TOTAL_HEIGHT;


    drawCell(doc, {
        x,
        y: noteY,

        width,
        height:
            NOTE_HEIGHT,

        value:
            "*Pass Marks - 40%",

        font:
            "Helvetica-Oblique",

        fontSize: 6,

        align: "left",
    });


    return (
        noteY +
        NOTE_HEIGHT
    );
}