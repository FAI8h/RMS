import Student from '../models/student.js';

// @desc    Get students by class and section with pagination
// @route   GET /api/students
// @access  Private (Requires valid JWT)
export const getStudents = async (req, res) => {
  try {
    // Extract query params
    const { class: studentClass, section, page = 1, limit = 10 } = req.query;
    
    // Build the query filter dynamically
    const query = {};
    if (studentClass) query.class = studentClass;
    if (section) query.section = section;

    // Convert page and limit to numbers
    const pageNum = Number(page);
    const limitNum = Number(limit);
    
    // Calculate how many documents to skip
    const skip = (pageNum - 1) * limitNum;
    
    // Fetch students with pagination and sort by rollNumber
    const students = await Student.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ rollNumber: 1 }); 

    // Get total count of documents matching the query (for frontend pagination UI)
    const total = await Student.countDocuments(query);

    res.status(200).json({
      success: true,
      count: students.length,    // Number of students returned in this batch
      total,                     // Total students matching the filter
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: students
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server Error', 
      error: error.message 
    });
  }
};