import { Search } from 'lucide-react';
import React from 'react';

interface FilterProps {
    search: string;
    onSearch: (v: string) => void;
    status: string;
    onStatus: (v: string) => void;
    difficulty: string;
    onDifficulty: (v: string) => void;
}

function Filter({ search, onSearch, status, onStatus, difficulty, onDifficulty }: FilterProps) {
    return (
        <div className="flex gap-3 items-center">
            <div className="relative w-64 border rounded-lg bg-gray-100 border-gray-200 focus-within:border-gray-300 focus-within:border-4">
                <Search 
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                />

                <input
                    className="h-8 w-full pl-9 pr-2 bg-transparent outline-none border-none"
                    type="text"
                    placeholder="Search projects..."
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>

            <select className="h-8 rounded-md border p-2 bg-white" value={status} onChange={(e) => onStatus(e.target.value)}>
                <option value="all">All status</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
                <option value="planning">Planning</option>
                <option value="on_hold">On Hold</option>
            </select>

            <select className="h-8 rounded-md border p-2 bg-white" value={difficulty} onChange={(e) => onDifficulty(e.target.value)}>
                <option value="all">All difficulty</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>
    )
}

export default Filter;