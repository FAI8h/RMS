import { useEffect, useState } from 'react';
import { Field, Select, PrimaryBtn, Message } from '../../teacherPanel/components/TeacherUI';
import { createSection, fetchClassDocs } from '../services/ClassAPI';

const SECTIONS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function SectionForm({ onDone }) {
  const [classes, setClasses] = useState([]);
  const [cId, setCId] = useState('');
  const [name, setName] = useState('A');
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const loadClasses = async () => {
      try {
        const docs = await fetchClassDocs();
        if (active) setClasses(docs);
      } catch (e) {
        if (active) setError(e?.response?.data?.message || 'Could not load classes.');
      } finally {
        if (active) setLoadingClasses(false);
      }
    };
    loadClasses();
    return () => {
      active = false;
    };
  }, []);

  const handleAdd = async () => {
    if (!cId) {
      setError('Please select a class first.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await createSection({ name, cId });
      const cls = classes.find((c) => c._id === cId);
      onDone(`Section ${name} added to ${cls?.name || 'class'}.`);
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not add section.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Field label="Class">
        <Select value={cId} onChange={(e) => setCId(e.target.value)} disabled={loadingClasses}>
          <option value="">{loadingClasses ? 'Loading classes...' : 'Select class'}</option>
          {classes.map((c) => (
            <option key={c._id} value={c._id} className="capitalize">{c.name}</option>
          ))}
        </Select>
      </Field>
      <Field label="Section">
        <Select value={name} onChange={(e) => setName(e.target.value)}>
          {SECTIONS.map((s) => (
            <option key={s} value={s}>Section {s}</option>
          ))}
        </Select>
      </Field>
      <Message type="error" text={error} />
      <PrimaryBtn onClick={handleAdd} loading={saving} loadingText="Adding...">
        Add Section
      </PrimaryBtn>
    </div>
  );
}