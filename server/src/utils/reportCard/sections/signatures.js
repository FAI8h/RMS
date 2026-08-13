import { drawCell } from "../helpers/cell.js";
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

    const height = 75;

    const gap = 15;

    const columnWidth =
        (
            width -
            gap * 2
        ) / 3;


    /*
    |--------------------------------------------------------------------------
    | Safety
    |--------------------------------------------------------------------------
    */

    if (
        !Number.isFinite(x) ||
        !Number.isFinite(y) ||
        !Number.isFinite(width)
    ) {
        throw new Error(
            `Invalid signature coordinates: ${
                JSON.stringify({
                    x,
                    y,
                    width,
                })
            }`
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Signature columns
    |--------------------------------------------------------------------------
    */

    const positions = [
        {
            x,
            label:
                "Class Teacher",

            value:
                signatures.classTeacher ??
                "",
        },

        {
            x:
                x +
                columnWidth +
                gap,

            label:
                "Principal",

            value:
                signatures.principal ??
                "",
        },

        {
            x:
                x +
                (
                    columnWidth +
                    gap
                ) * 2,

            label:
                "Parent",

            value:
                signatures.parent ??
                "",
        },
    ];


    /*
    |--------------------------------------------------------------------------
    | Draw
    |--------------------------------------------------------------------------
    */

    for (
        const item
        of positions
    ) {

        drawCell(doc, {
            x:
                item.x,

            y,

            width:
                columnWidth,

            height,

            value: "",
        });


        drawText(doc, {
            text:
                item.value,

            x:
                item.x + 5,

            y:
                y + 8,

            width:
                columnWidth - 10,

            height: 20,

            font:
                "Helvetica",

            fontSize: 7,

            align:
                "center",
        });


        drawText(doc, {
            text:
                item.label,

            x:
                item.x + 5,

            y:
                y + height - 20,

            width:
                columnWidth - 10,

            height: 12,

            font:
                "Helvetica-Bold",

            fontSize: 7,

            align:
                "center",
        });
    }


    return (
        y +
        height
    );
}