import { drawCell } from "../helpers/cell.js";

const DEFAULT_SUBJECTS = [
    {
        name: "English-I (Language)",
        maximumMarks: 100,
        passMarks: 40,
    },
    {
        name: "English-II (Literature)",
        maximumMarks: 100,
        passMarks: 40,
    },
    {
        name: "Hindi-I (Language)",
        maximumMarks: 100,
        passMarks: 40,
    },
    {
        name: "Hindi-II (Literature)",
        maximumMarks: 100,
        passMarks: 40,
    },
    {
        name: "Mathematics",
        maximumMarks: 100,
        passMarks: 40,
    },
    {
        name: "General Science",
        maximumMarks: 100,
        passMarks: 40,
    },
    {
        name: "Social Studies",
        maximumMarks: 100,
        passMarks: 40,
    },
    {
        name: "Computer Applications",
        maximumMarks: 50,
        passMarks: 20,
    },
    {
        name: "General Knowledge",
        maximumMarks: 50,
        passMarks: 20,
    },
    {
        name: "Sanskrit",
        maximumMarks: 50,
        passMarks: 20,
    },
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
    const titleH = 24;

    const h1 = 19;
    const h2 = 19;
    const h3 = 18;

    const rowH = 24;
    const totalH = 24;
    const noteH = 18;

    const rows =
        academic.length > 0
            ? academic
            : DEFAULT_SUBJECTS;

    // Column widths
    const cols = [
        180, // subject
        45,  // max
        45,  // pass

        40,  // half 20
        40,  // half 80
        40,  // half 100
        42,  // half grade

        40,  // annual 20
        40,  // annual 80
        40,  // annual 100
        42,  // annual grade
    ];

    const scale =
        width /
        cols.reduce(
            (sum, value) => sum + value,
            0
        );

    const widths =
        cols.map(
            value => value * scale
        );

    // ---------------------------------------------------------
    // Title
    // ---------------------------------------------------------

    drawCell(doc, {
        x,
        y,
        width,
        height: titleH,
        value: "ACADEMIC ACHIEVEMENT",
        font: "Helvetica-Bold",
        fontSize: 9,
    });

    const tableY = y + titleH;

    // ---------------------------------------------------------
    // Main header
    // ---------------------------------------------------------

    let cx = x;

    drawCell(doc, {
        x: cx,
        y: tableY,
        width: widths[0],
        height: h1 + h2 + h3,
        value: "SUBJECTS",
        font: "Helvetica-Bold",
        fontSize: 7,
    });

    cx += widths[0];

    drawCell(doc, {
        x: cx,
        y: tableY,
        width: widths[1],
        height: h1 + h2 + h3,
        value: "Maximum\nMarks",
        font: "Helvetica-Bold",
        fontSize: 6,
    });

    cx += widths[1];

    drawCell(doc, {
        x: cx,
        y: tableY,
        width: widths[2],
        height: h1 + h2 + h3,
        value: "Pass\nMarks",
        font: "Helvetica-Bold",
        fontSize: 6,
    });

    cx += widths[2];

    const halfW =
        widths[3] +
        widths[4] +
        widths[5] +
        widths[6];

    const annualW =
        widths[7] +
        widths[8] +
        widths[9] +
        widths[10];

    // Half yearly
    drawCell(doc, {
        x: cx,
        y: tableY,
        width: halfW,
        height: h1,
        value: "Marks Obtained",
        font: "Helvetica-Bold",
        fontSize: 7,
    });

    drawCell(doc, {
        x: cx,
        y: tableY + h1,
        width: halfW,
        height: h2,
        value: "Half Yearly",
        font: "Helvetica-Bold",
        fontSize: 7,
    });

    const halfHeaders = [
        "20",
        "80",
        "100",
        "Grade",
    ];

    let hx = cx;

    halfHeaders.forEach(
        (label, i) => {
            drawCell(doc, {
                x: hx,
                y: tableY + h1 + h2,
                width: widths[3 + i],
                height: h3,
                value: label,
                font: "Helvetica-Bold",
                fontSize: 6,
            });

            hx += widths[3 + i];
        }
    );

    // Annual
    const annualX = cx + halfW;

    drawCell(doc, {
        x: annualX,
        y: tableY,
        width: annualW,
        height: h1,
        value: "Marks Obtained",
        font: "Helvetica-Bold",
        fontSize: 7,
    });

    drawCell(doc, {
        x: annualX,
        y: tableY + h1,
        width: annualW,
        height: h2,
        value: "Annual",
        font: "Helvetica-Bold",
        fontSize: 7,
    });

    const annualHeaders = [
        "20",
        "80",
        "100",
        "Grade",
    ];

    hx = annualX;

    annualHeaders.forEach(
        (label, i) => {
            drawCell(doc, {
                x: hx,
                y: tableY + h1 + h2,
                width: widths[7 + i],
                height: h3,
                value: label,
                font: "Helvetica-Bold",
                fontSize: 6,
            });

            hx += widths[7 + i];
        }
    );

    // ---------------------------------------------------------
    // Rows
    // ---------------------------------------------------------

    const bodyY =
        tableY +
        h1 +
        h2 +
        h3;

    rows.forEach((row, index) => {
        const rowY =
            bodyY +
            index * rowH;

        const half =
            row.halfYearly ?? {};

        const annual =
            row.annual ?? {};

        const values = [
            row.name ?? "",
            row.maximumMarks ?? "",
            row.passMarks ?? "",

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
                    width: cellWidth,
                    height: rowH,
                    value: values[i],
                    font:
                        i === 0
                            ? "Helvetica"
                            : "Helvetica",
                    fontSize:
                        i === 0
                            ? 6.5
                            : 6.5,
                    align:
                        i === 0
                            ? "left"
                            : "center",
                });

                cellX += cellWidth;
            }
        );
    });

    // ---------------------------------------------------------
    // Grand Total
    // ---------------------------------------------------------

    const totalY =
        bodyY +
        rows.length * rowH;

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

    let tx = x;

    widths.forEach(
        (cellWidth, i) => {
            drawCell(doc, {
                x: tx,
                y: totalY,
                width: cellWidth,
                height: totalH,
                value: totalValues[i],
                font: "Helvetica-Bold",
                fontSize: 6.5,
                align:
                    i === 0
                        ? "left"
                        : "center",
            });

            tx += cellWidth;
        }
    );

    // ---------------------------------------------------------
    // Note
    // ---------------------------------------------------------

    const noteY =
        totalY + totalH;

    drawCell(doc, {
        x,
        y: noteY,
        width,
        height: noteH,
        value: "*Pass Marks - 40%",
        font: "Helvetica-Oblique",
        fontSize: 6,
        align: "left",
    });

    return noteY + noteH;
}