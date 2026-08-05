import Result from '../models/result.js';
import Subject from '../models/subject.js';
import { calculateGrade } from '../utils/gradeCalculator.js';


// @desc    Submit/Update bulk marks for a subject/exam
// @route   POST /api/results/bulk
// @access  Private (Teacher/Admin)
export const submitBulkMarks = async (req, res) => {
  try {
    const { exam, subjectId, marks } = req.body;

    // 1. Fetch Subject to get max marks for grading calculation
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const maxTotal = subject.maxTheoryMarks + subject.maxPracticalMarks;

    // 2. Prepare bulk operations
    const bulkOps = marks.map(item => {
      const theory = Number(item.theoryMarks) || 0;
      const practical = Number(item.practicalMarks) || 0;
      const total = theory + practical;
      const grade = calculateGrade(total, maxTotal);

      return {
        updateOne: {
          filter: { student: item.studentId, exam, subject: subjectId },
          update: { 
            $set: { 
              theoryMarks: theory, 
              practicalMarks: practical, 
              totalMarks: total, 
              grade: grade 
            } 
          },
          upsert: true // Create if doesn't exist, update if it does
        }
      };
    });

    // 3. Execute bulk write
    await Result.bulkWrite(bulkOps);

    res.status(200).json({ 
      success: true, 
      message: `${marks.length} student records processed successfully` 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get results for a specific class/section/exam/subject
// @route   GET /api/results
// @access  Private
export const getResults = async (req, res) => {
    console.log("getting result : ", req.query);
    
  try {
    const { exam, subjectId, studentId } = req.query;
    
    const query = {};
    if (exam) query.exam = exam;
    
    // Only add to query if they are valid MongoDB Object IDs
    if (subjectId && subjectId.match(/^[0-9a-fA-F]{24}$/)) {
      query.subject = subjectId;
    }
    if (studentId && studentId.match(/^[0-9a-fA-F]{24}$/)) {
      query.student = studentId;
    }

    const results = await Result.find(query)
      .populate('student', 'name rollNumber admissionNumber class section')
      .populate('subject', 'name code maxTheoryMarks maxPracticalMarks');

    res.status(200).json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};