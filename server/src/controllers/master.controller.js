import Student from '../models/student.js';
import Subject from '../models/subject.js';
import Exam from '../models/exam.js';

// @desc    Get all available classes
// @route   GET /api/classes
// @access  Private
export const getClasses = async (req, res) => {
  try {
    // Fetches unique class names from the student collection
    const classes = await Student.distinct('class');
    res.status(200).json({ success: true, count: classes.length, data: classes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Get all available sections (optionally filtered by class)
// @route   GET /api/sections
// @access  Private
export const getSections = async (req, res) => {
  try {
    const { class: studentClass } = req.query;
    const filter = {};
    if (studentClass) filter.class = studentClass;

    // Fetches unique section names based on the filter
    const sections = await Student.distinct('section', filter);
    res.status(200).json({ success: true, count: sections.length, data: sections });
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
    const exams = await Exam.find({}).sort({ name: 1 });
    res.status(200).json({ success: true, count: exams.length, data: exams });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};