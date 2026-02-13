import ProgressBar from './ProgressBar';

import { Users, Calendar } from 'lucide-react';

function Card2 () {
    return (
        <div className="h-85 w-90 border border-gray-300 rounded-md p-5 hover:cursor-pointer">
            <div className="flex flex-col">
                <p className="font-medium">Title</p>
                <p className="text-gray-600 mt-2">Description</p>
            </div>

            <div className="flex flex-row mt-8 gap-2">
                <div className="flex flex-row justify-center items-center w-25 bg-amber-100 border-none rounded-md text-orange-700"><p>In Progress</p></div>
                <p className="flex flex-row justify-center items-center w-12 bg-red-200 border-none rounded-md text-red-500">High</p>
            </div>
            <div className="mt-2">
                <ProgressBar />
            </div>

            <div className="flex flex-row justify-items-start items-center mt-7 gap-5">
                <div className="flex flex-row gap-2 justify-center items-center text-gray-600">
                    <Users size={20}/>
                    <p>5</p>
                </div>
                
                <div className="flex flex-row justify-center items-center text-gray-600 gap-1">
                    <Calendar size={20}/>
                    <p>15/03/2026</p>
                </div>

                <button className="font-medium">View Details</button>
            </div>
        </div>
    )
}

export default Card2