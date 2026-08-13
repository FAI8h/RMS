import { drawCell } from "../helpers/cell.js";
import { drawText } from "../helpers/text.js";


export function drawRemarks(
    doc,
    {
        x,
        y,
        width,

        remarks = {},

        finalResult = "",
    }
) {

    const BOX_HEIGHT = 85;

    const TITLE_HEIGHT = 25;

    const GAP = 15;


    /*
    |--------------------------------------------------------------------------
    | Half Yearly
    |--------------------------------------------------------------------------
    */

    drawCell(doc, {
        x,
        y,

        width,
        height:
            BOX_HEIGHT,

        value: "",
    });


    drawCell(doc, {
        x,
        y,

        width,
        height:
            TITLE_HEIGHT,

        value:
            "HALF YEARLY",

        font:
            "Helvetica-Bold",

        fontSize: 8,
    });


    drawText(doc, {
        text:
            remarks.halfYearly ?? "",

        x:
            x + 8,

        y:
            y + TITLE_HEIGHT + 8,

        width:
            width - 16,

        height:
            BOX_HEIGHT -
            TITLE_HEIGHT -
            12,

        font:
            "Helvetica",

        fontSize: 7,

        align: "left",
    });


    /*
    |--------------------------------------------------------------------------
    | Annual
    |--------------------------------------------------------------------------
    */

    const annualY =
        y +
        BOX_HEIGHT +
        GAP;


    drawCell(doc, {
        x,
        y: annualY,

        width,
        height:
            BOX_HEIGHT,

        value: "",
    });


    drawCell(doc, {
        x,
        y: annualY,

        width,
        height:
            TITLE_HEIGHT,

        value:
            "ANNUAL",

        font:
            "Helvetica-Bold",

        fontSize: 8,
    });


    drawText(doc, {
        text:
            remarks.annual ?? "",

        x:
            x + 8,

        y:
            annualY +
            TITLE_HEIGHT +
            8,

        width:
            width - 16,

        height:
            BOX_HEIGHT -
            TITLE_HEIGHT -
            12,

        font:
            "Helvetica",

        fontSize: 7,

        align: "left",
    });


    /*
    |--------------------------------------------------------------------------
    | Final result
    |--------------------------------------------------------------------------
    */

    drawText(doc, {
        text:
            `Final Exam Result: ${
                finalResult ?? ""
            }`,

        x:
            x + 8,

        y:
            annualY +
            BOX_HEIGHT -
            18,

        width:
            width - 16,

        height: 12,

        font:
            "Helvetica-Bold",

        fontSize: 7,

        align: "left",
    });


    /*
    |--------------------------------------------------------------------------
    | IMPORTANT
    |--------------------------------------------------------------------------
    */

    return {
        annualY,

        annualBottom:
            annualY +
            BOX_HEIGHT,
    };
}