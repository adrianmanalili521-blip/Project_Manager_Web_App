interface NavProps {
    status: string;
    onStatus: (v: string) => void;
}

const statuses: { key: string; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'planning', label: 'Planning' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
    { key: 'overdue', label: 'Overdue' },
    { key: 'on_hold', label: 'On Hold' },
];

function Nav({ status, onStatus }: NavProps) {
    return (
        <div className="flex flex-row justify-center items-center h-8 w-auto bg-gray-200 p-2 gap-2 border-none rounded-xl">
            {statuses.map(s => {
                const active = status === s.key;
                return (
                    <button
                        key={s.key}
                        onClick={() => onStatus(s.key)}
                        className={`h-8 px-3 rounded-xl transition-colors text-sm ${active ? 'bg-white font-semibold shadow' : 'bg-transparent'}`}
                        aria-pressed={active}
                    >
                        {s.label}
                    </button>
                )
            })}
        </div>
    )
}

export default Nav;