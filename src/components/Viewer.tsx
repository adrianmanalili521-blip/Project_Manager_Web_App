import { LayoutGrid, List } from 'lucide-react';

function Viewer () {
    return (
        <div className=" h-8  w-20 flex flex-row justify-center items-center bg-gray-200 p-2 border-none rounded-lg gap-2">
            <button className="flex flex-row justify-center items-center h-7 w-8 border-none rounded-lg focus-within:bg-gray-50"><LayoutGrid size={18}/></button>
            <button className="flex flex-row justify-center items-center h-7 w-8 border-none rounded-lg focus-within:bg-gray-50"><List size={18}/></button>
        </div>
    )
}

export default Viewer;