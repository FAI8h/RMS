import PDFDocument from 'pdfkit';
import Result from '../models/result.js';
import ReportCard from '../models/reportCard.js';
import Student from '../models/student.js';

// @desc    Generate and download PDF Report Card
// @route   GET /api/report-cards/pdf/:studentId
// @access  Private
export const generatePDFReportCard = async (req, res) => {
  try {
    const { studentId } = req.params;
      const { exam } = req.query;
      console.log("req : ", req.query);
      

    // 1. Fetch all necessary data
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const academicResults = await Result.find({ student: studentId, exam })
      .populate('subject', 'name code maxTheoryMarks maxPracticalMarks');
      
    const metaData = await ReportCard.findOne({ student: studentId, exam });

    if (!academicResults.length && !metaData) {
      return res.status(404).json({ message: 'No data found to generate report card' });
    }

    // 2. Setup PDF Document
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=ReportCard_${student.name}.pdf`);
    doc.pipe(res);

    // 3. Draw Report Card Layout (Simplified version of the client's image)
    
    // Header
    doc.fontSize(20).font('Helvetica-Bold').text('SCHOOL NAME', { align: 'center' });
    doc.fontSize(12).font('Helvetica').text('Academic Achievement Report', { align: 'center' });
    doc.moveDown(1);

    // Student Info
    doc.fontSize(10).text(`Name: ${student.name}`);
    doc.text(`Admission No: ${student.admissionNumber}    Roll No: ${student.rollNumber}`);
    doc.text(`Class: ${student.class}    Section: ${student.section}    Exam: ${exam}`);
    doc.moveDown(1);

    // Academic Table Header
    doc.font('Helvetica-Bold').text('Academic Achievement', { underline: true });
    doc.moveDown(0.5);
    
    let y = doc.y;
    doc.font('Helvetica-Bold').text('Subject', 50, y);
    doc.text('Marks Obtained', 200, y);
    doc.text('Max Marks', 300, y);
    doc.text('Grade', 400, y);
    doc.moveDown(0.5);
    doc.font('Helvetica');

    // Academic Table Rows
    academicResults.forEach(result => {
      y = doc.y;
      const maxMarks = result.subject.maxTheoryMarks + result.subject.maxPracticalMarks;
      doc.text(result.subject.name, 50, y);
      doc.text(`${result.totalMarks}`, 200, y);
      doc.text(`${maxMarks}`, 300, y);
      doc.text(result.grade, 400, y);
      doc.moveDown(0.5);
    });

    doc.moveDown(1);

    // Co-Curricular Activities
    if (metaData && metaData.coCurricular.length > 0) {
      doc.font('Helvetica-Bold').text('Co-Curricular Activities', { underline: true });
      doc.moveDown(0.5);
      metaData.coCurricular.forEach(item => {
        doc.font('Helvetica').text(`${item.activityName}: ${item.rating}`);
      });
      doc.moveDown(1);
    }

    // Personal Assessment
    if (metaData && metaData.personalAssessment.length > 0) {
      doc.font('Helvetica-Bold').text('Personal Assessment', { underline: true });
      doc.moveDown(0.5);
      metaData.personalAssessment.forEach(item => {
        doc.font('Helvetica').text(`${item.traitName}: ${item.rating}`);
      });
      doc.moveDown(1);
    }

    // Remarks & Final Result
    if (metaData) {
      doc.font('Helvetica-Bold').text(`Remarks: `, { continued: true });
      doc.font('Helvetica').text(metaData.remarks || 'N/A');
      doc.moveDown(0.5);
      doc.font('Helvetica-Bold').text(`Final Result: `, { continued: true });
      doc.font('Helvetica').text(metaData.finalResult || 'Passed');
    }

    // Footer / Signatures
    doc.moveDown(3);
    doc.fontSize(10).font('Helvetica');
    doc.text('Class Teacher', 50, doc.y, { width: 150, align: 'center' });
    doc.text('Principal', 250, doc.y, { width: 150, align: 'center' });
    doc.text('Parents', 450, doc.y, { width: 100, align: 'center' });

    // Finalize PDF
    doc.end();

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};