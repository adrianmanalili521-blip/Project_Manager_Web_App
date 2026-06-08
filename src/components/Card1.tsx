import type { LucideProps } from 'lucide-react';

interface Card1Props {
  title: string;
  total: number;
  Icon: React.ComponentType<LucideProps>;
  iconColor?: string;
  iconSize?: number;
}

function Card1({ title, total, Icon, iconColor = 'black', iconSize = 30 }: Card1Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">{total}</p>
        </div>
        <div className="rounded-3xl bg-slate-100 p-3 text-slate-900">
          <Icon className={iconColor} size={iconSize} />
        </div>
      </div>
    </div>
  );
}

export default Card1;