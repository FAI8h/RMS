import Teacher from '../models/teacher.js';

// @desc    Create a new teacher and generate access code
// @route   POST /api/teachers
// @access  Private/Admin
export const createTeacher = async (req, res) => {
  try {
    const { name, accessCode } = req.body;

    if (!name || !accessCode) {
      return res.status(400).json({ message: 'Please provide a name and an access code' });
    }

    // Check if access code already exists
    const existingTeacher = await Teacher.findOne({ accessCode });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Access code already in use' });
    }

    const teacher = await Teacher.create({ name, accessCode });
    
    res.status(201).json({
      success: true,
      data: {
        name: teacher.name,
        accessCode: teacher.accessCode,
        role: teacher.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Private/Admin
export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({}).select('-__v').sort({ name: 1 });
    res.status(200).json({ success: true, count: teachers.length, data: teachers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a teacher (Revoke access)
// @route   DELETE /api/teachers/:id
// @access  Private/Admin
export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    await teacher.deleteOne();
    res.status(200).json({ success: true, message: 'Teacher access revoked successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Teacher not found'});
  }
};