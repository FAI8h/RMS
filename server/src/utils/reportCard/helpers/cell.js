export function drawCell(
    doc,
    {
        x,
        y,
        width,
        height,

        value = "",

        font = "Helvetica",
        fontSize = 7,

        align = "center",

        padding = 3,
    }
) {

    /*
    |--------------------------------------------------------------------------
    | Safety
    |--------------------------------------------------------------------------
    */

    if (!Number.isFinite(x)) {
        throw new Error(
            `drawCell: invalid x = ${x}`
        );
    }

    if (!Number.isFinite(y)) {
        throw new Error(
            `drawCell: invalid y = ${y}`
        );
    }

    if (!Number.isFinite(width)) {
        throw new Error(
            `drawCell: invalid width = ${width}`
        );
    }

    if (!Number.isFinite(height)) {
        throw new Error(
            `drawCell: invalid height = ${height}`
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Border
    |--------------------------------------------------------------------------
    */

    doc
        .rect(
            x,
            y,
            width,
            height
        )
        .stroke();


    /*
    |--------------------------------------------------------------------------
    | Text
    |--------------------------------------------------------------------------
    */

    const text =
        value === null ||
        value === undefined
            ? ""
            : String(value);


    doc
        .font(font)
        .fontSize(fontSize)
        .fillColor("black")
        .text(
            text,
            x + padding,
            y + padding,
            {
                width:
                    Math.max(
                        1,
                        width -
                        padding * 2
                    ),

                height:
                    Math.max(
                        1,
                        height -
                        padding * 2
                    ),

                align,

                lineGap: 0,

                lineBreak: true,
            }
        );
}