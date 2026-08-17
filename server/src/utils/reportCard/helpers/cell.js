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
        bold = false,
    }
) {
    if (
        !Number.isFinite(x) ||
        !Number.isFinite(y) ||
        !Number.isFinite(width) ||
        !Number.isFinite(height)
    ) {
        throw new Error(
            `Invalid cell geometry: ${JSON.stringify({
                x,
                y,
                width,
                height,
            })}`
        );
    }

    // Border
    doc
        .rect(x, y, width, height)
        .stroke();

    const text =
        value === null || value === undefined
            ? ""
            : String(value);

    if (!text) return;

    let size = fontSize;

    const maxWidth = width - 6;

    // Automatically shrink long one-line text
    while (
        size > 5 &&
        doc
            .font(font)
            .fontSize(size)
            .widthOfString(text) > maxWidth
    ) {
        size -= 0.25;
    }

    doc
        .font(font)
        .fontSize(size)
        .text(text, x + 3, y + 3, {
            width: maxWidth,
            height: height - 6,
            align,
            lineBreak: false,
            ellipsis: true,
        });
}