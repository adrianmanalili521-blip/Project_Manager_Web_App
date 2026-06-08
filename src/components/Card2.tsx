import ProgressBar from './ProgressBar';
import { Users, Calendar } from 'lucide-react';

interface Card2Props {
  title: string;
  description: string;
  status: 'in_progress' | 'completed' | 'overdue' | 'planning' | 'on_hold';
  difficulty: string;
  taskCount: number;
  taskTotal: number;
  peopleCount: number;
  dateCreated: Date;
  dueDate: Date;
  view: 'grid' | 'list';
}

const statusStyles = {
  planning: { label: 'Planning', color: 'bg-sky-100 text-sky-700' },
  in_progress: { label: 'In Progress', color: 'bg-amber-100 text-amber-700' },
  completed: { label: 'Completed', color: 'bg-emerald-100 text-emerald-700' },
  overdue: { label: 'Overdue', color: 'bg-rose-100 text-rose-700' },
  on_hold: { label: 'On Hold', color: 'bg-violet-100 text-violet-700' },
};

const difficultyStyles = {
  low: { label: 'Low', color: 'bg-emerald-100 text-emerald-700' },
  medium: { label: 'Medium', color: 'bg-amber-100 text-amber-700' },
  high: { label: 'High', color: 'bg-rose-100 text-rose-700' },
};

function Card2({ title, description, status, difficulty, taskCount, taskTotal, peopleCount, dateCreated, dueDate, view }: Card2Props) {
  const formattedDue = dueDate instanceof Date ? dueDate.toLocaleDateString() : String(dueDate);
  const formattedCreated = dateCreated instanceof Date ? dateCreated.toLocaleDateString() : String(dateCreated);
  const shortDescription = description && description.length > 120 ? `${description.slice(0, 120)}...` : description;
  const statusInfo = statusStyles[status] || { label: status, color: 'bg-slate-100 text-slate-700' };
  const difficultyInfo = difficultyStyles[(String(difficulty).toLowerCase() as keyof typeof difficultyStyles)] || { label: difficulty, color: 'bg-slate-100 text-slate-700' };
  const maxValue = Math.max(taskTotal, 1);

  return (
    <div className="flex h-full flex-col justify-between rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-slate-950">{title}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{view === 'grid' ? shortDescription : description}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">Created {formattedCreated}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${difficultyInfo.color}`}>
            {difficultyInfo.label}
          </span>
        </div>

        <div className="mt-5">
          <ProgressBar value={taskCount} max={maxValue} />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Users size={18} />
          <span>{peopleCount} team member{peopleCount === 1 ? '' : 's'}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={18} />
          <span>{formattedDue}</span>
        </div>

        <button className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
          View Details
        </button>
      </div>
    </div>
  );
}

export default Card2;