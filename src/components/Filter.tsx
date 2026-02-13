import { Search } from 'lucide-react';

function Filter () {
    return (
        <div className="relative w-120 border rounded-lg bg-gray-100 border-gray-200 focus-within:border-gray-300 focus-within:border-4">
            <Search 
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
            />

            <input className="h-8 w-120 pl-9 pr-2 bg-transparent outline-none border-none" 
                type="etxt"
                placeholder="Search..."
            />
        </div>
    )
}

export default Filter;