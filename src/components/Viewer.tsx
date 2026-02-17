import { LayoutGrid, List } from 'lucide-react';

interface ViewerProps {
    view: 'grid' | 'list';
    onView: (v: 'grid' | 'list') => void;
}

function Viewer({ view, onView }: ViewerProps) {
    return (
        <div className=" h-8  w-20 flex flex-row justify-center items-center bg-gray-200 p-2 border-none rounded-lg gap-2">
            <button
                onClick={() => onView('grid')}
                className={`flex flex-row justify-center items-center h-7 w-8 border-none rounded-lg ${view === 'grid' ? 'bg-white shadow' : 'focus-within:bg-gray-50'}`}
                aria-pressed={view === 'grid'}
            ><LayoutGrid size={18}/></button>
            <button
                onClick={() => onView('list')}
                className={`flex flex-row justify-center items-center h-7 w-8 border-none rounded-lg ${view === 'list' ? 'bg-white shadow' : 'focus-within:bg-gray-50'}`}
                aria-pressed={view === 'list'}
            ><List size={18}/></button>
        </div>
    )
}

export default Viewer;