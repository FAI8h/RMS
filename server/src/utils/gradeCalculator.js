export const calculateGrade = (totalMarks, maxTotalMarks) => {
  if (maxTotalMarks === 0) return 'NA';
  const percentage = (totalMarks / maxTotalMarks) * 100;
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 60) return 'B';
  if (percentage >= 40) return 'C';
  if (percentage >= 33) return 'D';
  return 'F'; 
};