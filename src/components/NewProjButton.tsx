import { Plus } from 'lucide-react';

interface NewProjButtonProps {
  onOpen: () => void;
}

function NewProjButton({ onOpen }: NewProjButtonProps) {
  return (
    <button onClick={onOpen} aria-label="Open new project form" className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
      <Plus size={18} className="text-white" />
      New Project
    </button>
  );
}

export default NewProjButton;