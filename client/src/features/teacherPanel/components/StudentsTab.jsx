import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchStudents } from '../services/teacherPanelAPI';
import { fetchClassDocs, fetchSectionsByClass } from '../../classManagement/services/ClassAPI';
import { Field, Select, PrimaryBtn, Message, Card, SimpleTable, tdCls } from './TeacherUI';

// "class 5" -> "5" (student records store the bare level)
const levelOf = (cls) => cls?.name?.replace(/^class\s*/i, '') ?? '';

export default function StudentsTab() {
  const token = useSelector((state) => state.auth.token);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [classId, setClassId] = useState('');
  const [sectionValue, setSectionValue] = useState('');
  const [students, setStudents] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [error, setError] = useState(null);

  const loadClasses = async () => {
    setLoadingClasses(true);
    setError(null);
    try {
      setClasses(await fetchClassDocs());
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not load classes.');
    } finally {
      setLoadingClasses(false);
    }
  };

  useEffect(() => {
    loadClasses();
  }, []);

  const handleClassChange = async (cId) => {
    setClassId(cId);
    setSectionValue('');
    setStudents([]);
    if (!cId) {
      setSections([]);
      return;
    }
    try {
      setSections(await fetchSectionsByClass(cId));
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not load sections.');
    }
  };

  const handleGetStudents = async () => {
    if (!classId || !sectionValue) {
      setError('Please select class and section first.');
      return;
    }
    const selected = classes.find((c) => c._id === classId);
    setLoadingStudents(true);
    setError(null);
    try {
      setStudents(await fetchStudents(token, { class: levelOf(selected), section: sectionValue }));
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not load students.');
    } finally {
      setLoadingStudents(false);
    }
  };

  return (
    <Card title="Students List" subtitle="Pick a class & section to see the students.">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Class">
          <Select value={classId} onChange={(e) => handleClassChange(e.target.value)}>
            <option value="">Select class</option>
            {classes.map((c) => (
              <option key={c._id} value={c._id} className="capitalize">{c.name}</option>
            ))}
          </Select>
        </Field>
        <Field label="Section">
          <Select
            value={sectionValue}
            onChange={(e) => setSectionValue(e.target.value)}
            disabled={!classId}
          >
            <option value="">Select section</option>
            {sections.map((s) => (
              <option key={s} value={s}>Section {s}</option>
            ))}
          </Select>
        </Field>
        <div className="flex items-end">
          <PrimaryBtn onClick={handleGetStudents} loading={loadingStudents} loadingText="Loading...">
            Get Students
          </PrimaryBtn>
        </div>
      </div>
      {loadingClasses && <p className="mt-4 text-sm text-slate-500">Loading classes...</p>}
      <Message type="error" text={error} />
      <p className="mb-3 mt-2 text-sm font-medium text-slate-500">Total: {students.length}</p>
      <SimpleTable
        rows={students}
        emptyText="No students found."
        head={['S.No', 'Admission No', 'Name', 'Roll No', 'Class', 'Section']}
        renderRow={(student, i) => (
          <tr key={student._id} className="hover:bg-emerald-50/50">
            <td className={tdCls}>{i + 1}</td>
            <td className={tdCls}>{student.admissionNumber}</td>
            <td className={tdCls}>
              <span className="font-medium text-slate-800">{student.name}</span>
            </td>
            <td className={tdCls}>{student.rollNumber}</td>
            <td className={tdCls}>{student.class}</td>
            <td className={tdCls}>{student.section}</td>
          </tr>
        )}
        renderMobile={(student, i) => (
          <div key={student._id} className="rounded-2xl border border-emerald-100/80 bg-white/60 p-3 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-xs font-bold text-emerald-700">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">{student.name}</p>
                <p className="truncate text-xs text-slate-500">
                  {student.admissionNumber} · Roll {student.rollNumber}
                </p>
              </div>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              <span className="rounded-lg bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
                Class {student.class}
              </span>
              <span className="rounded-lg bg-teal-50 px-2 py-1 text-[11px] font-semibold text-teal-700">
                Section {student.section}
              </span>
            </div>
          </div>
        )}
      />
    </Card>
  );
}