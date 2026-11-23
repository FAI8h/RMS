export function drawText(
    doc,
    {
        text = "",

        x,
        y,

        width,

        height,

        font = "Helvetica",

        fontSize = 18,

        align = "left",
    }
) {

    /*
    |--------------------------------------------------------------------------
    | Catch NaN before PDFKit does
    |--------------------------------------------------------------------------
    */

    const numbers = {
        x,
        y,
        width,
        height,
    };


    for (
        const [key, value]
        of Object.entries(numbers)
    ) {

        if (
            value !== undefined &&
            !Number.isFinite(value)
        ) {

            throw new Error(
                `drawText: ${key} is invalid: ${value}`
            );
        }
    }


    doc
        .font(font)
        .fontSize(fontSize)
        .fillColor("black")
        .text(
            String(text ?? ""),
            x,
            y,
            {
                ...(width !== undefined
                    ? { width }
                    : {}),

                ...(height !== undefined
                    ? { height }
                    : {}),

                align,

                lineGap: 0,
            }
        );
}