import Student from '../models/student.js';
import Subject from '../models/subject.js';
import Exam from '../models/exam.js';
import { Class } from '../models/class.js';

// @desc    Get all available classes
// @route   GET /api/classes
// @access  Private
export const getClasses = async (req, res) => {
  try {
    // Fetches unique class names from the student collection
    const classes = await Class.find();
    res.status(200).json({ success: true, count: classes.length, data: classes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};



// @desc    Get all subjects
// @route   GET /api/subjects
// @access  Private
export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({}).sort({ name: 1 });
    res.status(200).json({ success: true, count: subjects.length, data: subjects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Get all exams
// @route   GET /api/exams
// @access  Private
export const getExams = async (req, res) => {
  try {
    const { name, status, term, academicYear } = req.query;
    const filter = {deltedAt:null};// enforcing deleted can't be viwed

    if (status) filter.status = status;
    if (term) filter.term = term;
    if (academicYear) filter.academicYear = academicYear;
    if (name) filter.name = { $regex: name, $options: 'i' };

    const exams = await Exam.find(filter).sort({ name: 1 });
    res.status(200).json({ success: true, count: exams.length, data: exams });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
