import { drawCell } from "../helpers/cell.js";

const DEFAULT_ITEMS = [
    "Value Education/Catechism",
    "Conduct",
    "Physical Education & Games",
    "Drawing & Craft",
    "Singing (English / Hindi)",
    "Dance",
    "Cultural Activities",
    "Attendance",
];

export function drawCoCurricular(
    doc,
    {
        x,
        y,
        width,
        height,
        data = [],
    }
) {
    const titleH = 30;
    const headerH = 30;

    const rows =
        data.length > 0
            ? data
            : DEFAULT_ITEMS.map(name => ({
                  name,
                  halfYearly: "",
                  annual: "",
              }));

    const rowH =
        (
            height -
            titleH -
            headerH
        ) / rows.length;

    const labelW = width * 0.58;
    const halfW = width * 0.21;
    const annualW = width * 0.21;

    // Title
    drawCell(doc, {
        x,
        y,
        width,
        height: titleH,
        value: "CO-CURRICULAR ACTIVITIES",
        font: "Helvetica-Bold",
        fontSize: 9,
    });

    const headerY =
        y + titleH;

    // Header
    drawCell(doc, {
        x,
        y: headerY,
        width: labelW,
        height: headerH,
        value: "",
    });

    drawCell(doc, {
        x: x + labelW,
        y: headerY,
        width: halfW,
        height: headerH,
        value: "Half Yearly",
        font: "Helvetica-Bold",
        fontSize: 8,
    });

    drawCell(doc, {
        x: x + labelW + halfW,
        y: headerY,
        width: annualW,
        height: headerH,
        value: "Annual",
        font: "Helvetica-Bold",
        fontSize: 8,
    });

    // Rows
    rows.forEach((item, index) => {
        const rowY =
            headerY +
            headerH +
            index * rowH;

        drawCell(doc, {
            x,
            y: rowY,
            width: labelW,
            height: rowH,
            value: item.name ?? "",
            fontSize: 8,
            align: "left",
        });

        drawCell(doc, {
            x: x + labelW,
            y: rowY,
            width: halfW,
            height: rowH,
            value: item.halfYearly ?? "",
            fontSize: 8,
        });

        drawCell(doc, {
            x:
                x +
                labelW +
                halfW,
            y: rowY,
            width: annualW,
            height: rowH,
            value: item.annual ?? "",
            fontSize: 8,
        });
    });
}