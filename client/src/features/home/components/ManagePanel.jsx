import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '../../../shared/components/Modal';
import { Message } from '../../teacherPanel/components/TeacherUI';
import ClassForm from '../../classManagement/components/ClassForm';
import SectionForm from '../../classManagement/components/SectionForm';
import ExamForm from '../../exams/components/ExamForm';

const svgProps = {
  viewBox: '0 0 24 24',
  className: 'h-5 w-5',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.7',
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

const ACTIONS = [
  {
    key: 'class',
    label: 'Create class',
    hint: 'Add a class from 1 to 12.',
    gradient: 'bg-gradient-to-br from-emerald-600 to-teal-700',
    icon: (
      <svg {...svgProps}>
        <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5M9.5 21v-6h5v6" />
      </svg>
    )
  },
  {
    key: 'section',
    label: 'Add section',
    hint: 'Add section A–F to a class.',
    gradient: 'bg-gradient-to-br from-teal-600 to-cyan-700',
    icon: (
      <svg {...svgProps}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <path d="M17.5 14v7M14 17.5h7" />
      </svg>
    )
  },
  {
    key: 'exam',
    label: 'Create exam',
    hint: 'Set up a new exam for a term.',
    gradient: 'bg-gradient-to-br from-emerald-700 to-emerald-900',
    icon: (
      <svg {...svgProps}>
        <rect x="5" y="3" width="14" height="18" rx="2.5" />
        <path d="M9 8h6M9 12h6M9 16h3.5" />
      </svg>
    )
  }
];

const MODALS = {
  class: { eyebrow: 'Classes', title: 'Create a class', Form: ClassForm },
  section: { eyebrow: 'Sections', title: 'Add a section', Form: SectionForm },
  exam: { eyebrow: 'Exams', title: 'Create an exam', Form: ExamForm }
};

export default function ManagePanel({ onCreated }) {
  const [active, setActive] = useState(null);
  const [message, setMessage] = useState(null);

  const open = (key) => {
    setMessage(null);
    setActive(key);
  };

  const handleDone = (text) => {
    setMessage(text);
    setActive(null);
    onCreated?.();
  };

  const current = active ? MODALS[active] : null;

  return (
    <section className="space-y-3">
      <Message type="success" text={message} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {ACTIONS.map((a) => (
          <motion.button
            key={a.key}
            type="button"
            onClick={() => open(a.key)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="glass flex items-center gap-4 rounded-3xl p-5 text-left"
          >
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-md ${a.gradient}`}>
              {a.icon}
            </span>
            <span className="min-w-0">
              <span className="block font-display text-base font-bold text-slate-800">{a.label}</span>
              <span className="block text-xs text-slate-500">{a.hint}</span>
            </span>
          </motion.button>
        ))}
      </div>

      <Modal
        open={!!current}
        onClose={() => setActive(null)}
        eyebrow={current?.eyebrow}
        title={current?.title}
      >
        {current && <current.Form onDone={handleDone} />}
      </Modal>
    </section>
  );
}