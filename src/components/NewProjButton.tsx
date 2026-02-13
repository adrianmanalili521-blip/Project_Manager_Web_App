import { Plus } from 'lucide-react';

function NewProjButton () {
    return (
        <button>
            <div className="h-8 w-35 bg-slate-950 flex flex-row justify-center items-center border-none rounded-lg gap-2 hover:bg-slate-950/90">
                <Plus size={18} className="text-gray-300"/>
                <p className="font-medium text-gray-50">New Project</p>
            </div>
        </button>
    )
}

export default NewProjButton;