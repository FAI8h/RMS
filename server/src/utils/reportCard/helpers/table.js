import { drawText } from "./text.js";

export function drawSectionTitle(
    doc,
    {
        x,
        y,
        width,
        height,
        title,
    }
) {

    doc
        .rect(
            x,
            y,
            width,
            height
        )
        .stroke();


    drawText(doc, {
        text: title,

        x,
        y:
            y +
            height / 2 -
            4,

        width,

        height: 10,

        font:
            "Helvetica-Bold",

        fontSize: 8,

        align: "center",
    });
}