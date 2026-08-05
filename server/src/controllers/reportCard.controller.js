import ReportCard from '../models/reportCard.js';
import Result from '../models/result.js';

// @desc    Submit/Update Report Card Meta Data (Co-Curricular, Remarks, etc.)
// @route   POST /api/report-cards
// @access  Private (Admin/Class Teacher)
export const submitReportCardData = async (req, res) => {
  try {
    const { studentId, exam, coCurricular, personalAssessment, remarks, finalResult, newSessionStartDate } = req.body;

    const reportCard = await ReportCard.findOneAndUpdate(
      { student: studentId, exam }, // Filter
      { // Data to update/insert
        student: studentId,
        exam,
        coCurricular,
        personalAssessment,
        remarks,
        finalResult,
        newSessionStartDate
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ success: true, data: reportCard });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get full report card for a student (Academics + Meta Data)
// @route   GET /api/report-cards/:studentId
// @access  Private
export const getFullReportCard = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { exam } = req.query;

    // Fetch academic marks
    const academicResults = await Result.find({ student: studentId, exam })
      .populate('subject', 'name code maxTheoryMarks maxPracticalMarks');

    // Fetch report card meta data
    const reportCardData = await ReportCard.findOne({ student: studentId, exam });

    if (!academicResults.length && !reportCardData) {
      return res.status(404).json({ message: 'No data found for this student/exam' });
    }

    res.status(200).json({
      success: true,
      data: {
        academics: academicResults,
        metaData: reportCardData
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};