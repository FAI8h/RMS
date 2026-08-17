import { drawCell } from "../helpers/cell.js";

export function drawRemarks(
    doc,
    {
        x,
        y,
        width,
        remarks = {},
        finalResult = "",
        mode,
    }
) {
    if (mode === "halfYearly") {
        const titleH = 22;
        const boxH = 82;

        drawCell(doc, {
            x,
            y,
            width,
            height: boxH,
            value: "",
        });

        drawCell(doc, {
            x,
            y,
            width,
            height: titleH,
            value: "HALF YEARLY",
            font: "Helvetica-Bold",
            fontSize: 8,
        });

        doc
            .font("Helvetica-Bold")
            .fontSize(7)
            .text(
                "Remarks:",
                x + 8,
                y + titleH + 10,
                {
                    width: 50,
                    lineBreak: false,
                }
            );

        doc
            .font("Helvetica")
            .fontSize(8)
            .text(
                remarks.halfYearly ?? "",
                x + 55,
                y + titleH + 8,
                {
                    width: width - 65,
                    height: 25,
                    lineBreak: false,
                    ellipsis: true,
                }
            );

        const signatureY =
            y + boxH - 25;

        const third =
            width / 3;

        [
            "Class Teacher",
            "Principal",
            "Parent",
        ].forEach((label, i) => {
            doc
                .font("Helvetica")
                .fontSize(6.5)
                .text(
                    label,
                    x + i * third,
                    signatureY,
                    {
                        width: third,
                        align: "center",
                        lineBreak: false,
                    }
                );
        });

        return {
            bottom: y + boxH,
        };
    }

    // ---------------------------------------------------------
    // ANNUAL
    // ---------------------------------------------------------

    const titleH = 22;
    const boxH = 92;

    drawCell(doc, {
        x,
        y,
        width,
        height: boxH,
        value: "",
    });

    drawCell(doc, {
        x,
        y,
        width,
        height: titleH,
        value: "ANNUAL",
        font: "Helvetica-Bold",
        fontSize: 8,
    });

    doc
        .font("Helvetica-Bold")
        .fontSize(7)
        .text(
            "Final Exam Result:",
            x + 8,
            y + titleH + 12,
            {
                width: 100,
                lineBreak: false,
            }
        );

    doc
        .font("Helvetica")
        .fontSize(8)
        .text(
            finalResult,
            x + 108,
            y + titleH + 10,
            {
                width: width - 116,
                lineBreak: false,
                ellipsis: true,
            }
        );

    const signatureY =
        y + boxH - 25;

    doc
        .font("Helvetica")
        .fontSize(6.5)
        .text(
            "Principal's Signature",
            x,
            signatureY,
            {
                width: width / 2,
                align: "center",
                lineBreak: false,
            }
        );

    doc
        .font("Helvetica")
        .fontSize(6.5)
        .text(
            "Class Teacher's Signature",
            x + width / 2,
            signatureY,
            {
                width: width / 2,
                align: "center",
                lineBreak: false,
            }
        );

    return {
        bottom: y + boxH,
    };
}