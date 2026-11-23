import { useState } from 'react';
import { Field, Select, PrimaryBtn, Message } from '../../teacherPanel/components/TeacherUI';
import { createClass } from '../services/ClassAPI';

const LEVELS = Array.from({ length: 12 }, (_, i) => String(i + 1));

export default function ClassForm({ onDone }) {
  const [clevel, setClevel] = useState('1');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async () => {
    setSaving(true);
    setError(null);
    try {
      await createClass(clevel);
      onDone(`Class ${clevel} created.`);
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not create class.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Field label="Class">
        <Select value={clevel} onChange={(e) => setClevel(e.target.value)}>
          {LEVELS.map((l) => (
            <option key={l} value={l}>Class {l}</option>
          ))}
        </Select>
      </Field>
      <Message type="error" text={error} />
      <PrimaryBtn onClick={handleCreate} loading={saving} loadingText="Creating...">
        Create Class
      </PrimaryBtn>
    </div>
  );
}