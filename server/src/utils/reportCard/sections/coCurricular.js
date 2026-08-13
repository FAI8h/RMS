import { drawCell } from "../helpers/cell.js";
import { drawSectionTitle } from "../helpers/table.js";


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
        data = [],
    }
) {

    const TITLE_HEIGHT = 30;
    const HEADER_HEIGHT = 30;
    const ROW_HEIGHT = 30;


    drawSectionTitle(doc, {
        x,
        y,
        width,
        height:
            TITLE_HEIGHT,

        title:
            "CO-CURRICULAR ACTIVITIES",
    });


    const headerY =
        y +
        TITLE_HEIGHT;


    const labelWidth =
        width * 0.55;

    const halfWidth =
        width * 0.225;

    const annualWidth =
        width * 0.225;


    /*
    |--------------------------------------------------------------------------
    | Header
    |--------------------------------------------------------------------------
    */

    drawCell(doc, {
        x,
        y: headerY,

        width:
            labelWidth,

        height:
            HEADER_HEIGHT,

        value: "",
    });


    drawCell(doc, {
        x:
            x +
            labelWidth,

        y: headerY,

        width:
            halfWidth,

        height:
            HEADER_HEIGHT,

        value:
            "Half Yearly",

        font:
            "Helvetica-Bold",

        fontSize: 7,
    });


    drawCell(doc, {
        x:
            x +
            labelWidth +
            halfWidth,

        y: headerY,

        width:
            annualWidth,

        height:
            HEADER_HEIGHT,

        value:
            "Annual",

        font:
            "Helvetica-Bold",

        fontSize: 7,
    });


    /*
    |--------------------------------------------------------------------------
    | Skeleton
    |--------------------------------------------------------------------------
    */

    const rows =
        data.length > 0
            ? data
            : DEFAULT_ITEMS.map(
                  (name) => ({
                      name,
                      halfYearly: "",
                      annual: "",
                  })
              );


    rows.forEach(
        (item, index) => {

            const rowY =
                headerY +
                HEADER_HEIGHT +
                index *
                    ROW_HEIGHT;


            drawCell(doc, {
                x,
                y: rowY,

                width:
                    labelWidth,

                height:
                    ROW_HEIGHT,

                value:
                    item.name ?? "",

                fontSize: 6.5,

                align: "left",
            });


            drawCell(doc, {
                x:
                    x +
                    labelWidth,

                y: rowY,

                width:
                    halfWidth,

                height:
                    ROW_HEIGHT,

                value:
                    item.halfYearly ?? "",

                fontSize: 7,
            });


            drawCell(doc, {
                x:
                    x +
                    labelWidth +
                    halfWidth,

                y: rowY,

                width:
                    annualWidth,

                height:
                    ROW_HEIGHT,

                value:
                    item.annual ?? "",

                fontSize: 7,
            });
        }
    );


    return (
        headerY +
        HEADER_HEIGHT +
        rows.length *
            ROW_HEIGHT
    );
}