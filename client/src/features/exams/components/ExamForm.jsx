import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Field, Select, PrimaryBtn, Message } from '../../teacherPanel/components/TeacherUI';
import { createExam } from '../services/examThunks';

const inputCls =
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30';

export default function ExamForm({ onDone }) {
  const { register, handleSubmit } = useForm({
    defaultValues: { name: '', academicYear: '', term: 'Term 1' }
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    setSaving(true);
    setError(null);
    try {
      await createExam(values);
      onDone(`Exam "${values.name}" created.`);
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not create exam.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Field label="Exam name">
        <input {...register('name', { required: true })} placeholder="e.g. Half Yearly" className={inputCls} />
      </Field>
      <Field label="Academic year">
        <input {...register('academicYear', { required: true })} placeholder="e.g. 2026-2027" className={inputCls} />
      </Field>
      <Field label="Term">
        <Select {...register('term')}>
          <option value="Term 1">Term 1</option>
          <option value="Term 2">Term 2</option>
        </Select>
      </Field>
      <Message type="error" text={error} />
      <PrimaryBtn onClick={handleSubmit(onSubmit)} loading={saving} loadingText="Creating...">
        Create Exam
      </PrimaryBtn>
    </div>
  );
}