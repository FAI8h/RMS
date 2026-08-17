import { drawCell } from "../helpers/cell.js";

const DEFAULT_ITEMS = [
    "Tidiness in Uniform",
    "Personal Hygiene",
    "Self Confidence",
    "Motivated to Learn",
    "Care of Property",
    "Regularity in Work",
    "Maintenance of Book",
    "Punctuality",
    "English Conversation Skill",
];

export function drawPersonalAssessment(
    doc,
    {
        x,
        y,
        width,
        height,
        data = [],
        newSessionDate = "",
    }
) {
    const titleH = 30;
    const headerH = 30;

    const sessionH = 24;

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
            headerH -
            sessionH
        ) / rows.length;

    const labelW = width * 0.56;
    const halfW = width * 0.22;
    const annualW = width * 0.22;

    // Title
    drawCell(doc, {
        x,
        y,
        width,
        height: titleH,
        value: "PERSONAL ASSESSMENT",
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
        value: "PARAMETERS",
        font: "Helvetica-Bold",
        fontSize: 7,
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
        x:
            x +
            labelW +
            halfW,
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

    // Bottom session line
    const sessionY =
        y +
        height -
        sessionH;

    drawCell(doc, {
        x,
        y: sessionY,
        width,
        height: sessionH,
        value:
            `NEW ACADEMIC SESSION BEGINS ON ${
                newSessionDate || ""
            }`,
        font: "Helvetica-Bold",
        fontSize: 7,
    });
}