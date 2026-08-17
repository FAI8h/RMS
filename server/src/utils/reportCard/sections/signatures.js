
import { drawText } from "../helpers/text.js";


export function drawSignatures(
    doc,
    {
        x,
        y,
        width,
        signatures = {},
    }
) {

    const columnWidth =
        width / 3;


    const labels = [
        {
            label: "Class Teacher",
            value:
                signatures.classTeacher ?? "",
        },

        {
            label: "Principal",
            value:
                signatures.principal ?? "",
        },

        {
            label: "Parent",
            value:
                signatures.parent ?? "",
        },
    ];


    labels.forEach(
        (item, index) => {

            const cellX =
                x +
                index *
                    columnWidth;


            // Signature
            drawText(doc, {
                text:
                    item.value,

                x:
                    cellX + 5,

                y,

                width:
                    columnWidth - 10,

                height: 25,

                font: "Helvetica",

                fontSize: 8,

                align: "center",
            });


            // Label
            drawText(doc, {
                text:
                    item.label,

                x:
                    cellX + 5,

                y:
                    y + 28,

                width:
                    columnWidth - 10,

                height: 15,

                font:
                    "Helvetica-Bold",

                fontSize: 7,

                align: "center",
            });
        }
    );


    return y + 45;
}