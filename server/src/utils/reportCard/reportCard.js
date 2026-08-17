import PDFDocument from "pdfkit";

import { drawAcademicTable } from "./sections/academicTable.js";
import { drawCoCurricular } from "./sections/coCurricular.js";
import { drawPersonalAssessment } from "./sections/personalAssessment.js";
import { drawRemarks } from "./sections/remarks.js";
import { drawSignatures } from "./sections/signatures.js";

export function createReportCard(data = {}) {
    const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margin: 0,
        autoFirstPage: true,
    });

    drawPage1(doc, data);

    doc.addPage({
        size: "A4",
        layout: "landscape",
        margin: 0,
    });

    drawPage2(doc, data);

    return doc;
}

function drawPage1(doc, data) {
    const PAGE_W = doc.page.width;
    const PAGE_H = doc.page.height;

    const MARGIN = 25;
    const CONTENT_W = PAGE_W - MARGIN * 2;

    let y = MARGIN;

    // ---------------------------------------------------------
    // ACADEMIC
    // ---------------------------------------------------------

    y = drawAcademicTable(doc, {
        x: MARGIN,
        y,
        width: CONTENT_W,
        academic: data.academic ?? [],
        grandTotal: data.grandTotal ?? {},
    });

    y += 10;

    // ---------------------------------------------------------
    // HALF YEARLY
    // ---------------------------------------------------------

    const remarks = drawRemarks(doc, {
        x: MARGIN,
        y,
        width: CONTENT_W,
        remarks: data.remarks ?? {},
        mode: "halfYearly",
    });

    y = remarks.bottom + 8;

    // ---------------------------------------------------------
    // ANNUAL
    // ---------------------------------------------------------

    drawRemarks(doc, {
        x: MARGIN,
        y,
        width: CONTENT_W,
        remarks: data.remarks ?? {},
        finalResult: data.finalResult ?? "",
        mode: "annual",
    });

    // Hard safety check
    if (y > PAGE_H - MARGIN) {
        throw new Error(
            `PAGE 1 overflow: y=${y}, pageHeight=${PAGE_H}`
        );
    }
}

function drawPage2(doc, data) {
    const PAGE_W = doc.page.width;
    const PAGE_H = doc.page.height;

    const MARGIN = 25;
    const GAP = 15;

    const CONTENT_W = PAGE_W - MARGIN * 2;
    const CONTENT_H = PAGE_H - MARGIN * 2;

    const LEFT_W = (CONTENT_W - GAP) * 0.52;
    const RIGHT_W = CONTENT_W - GAP - LEFT_W;

    const leftX = MARGIN;
    const rightX = MARGIN + LEFT_W + GAP;

    const topY = MARGIN;

    // ---------------------------------------------------------
    // LEFT — CO-CURRICULAR
    // ---------------------------------------------------------

    drawCoCurricular(doc, {
        x: leftX,
        y: topY,
        width: LEFT_W,
        height: CONTENT_H,
        data: data.coCurricular ?? [],
    });

    // ---------------------------------------------------------
    // RIGHT — PERSONAL ASSESSMENT
    // ---------------------------------------------------------

    drawPersonalAssessment(doc, {
        x: rightX,
        y: topY,
        width: RIGHT_W,
        height: CONTENT_H,
        data: data.personalAssessment ?? [],
        newSessionDate: data.newSessionDate ?? "",
    });
}