import ProgressBar from './ProgressBar';

import { Users, Calendar } from 'lucide-react';

interface Card2Props {
    title : string,
    description : string,
    status : 'in_progress' | 'completed' | 'overdue' | 'planning' | 'on_hold',
    difficulty : string,
    taskCount : number,
    taskTotal : number,
    peopleCount : number,
    dateCreated : Date,
    dueDate : Date
    view: 'grid' | 'list'
};

function Card2 ( {title, description, status, difficulty, taskCount, taskTotal, peopleCount, dateCreated, dueDate, view} : Card2Props ) {
    const formattedDue = dueDate instanceof Date ? dueDate.toLocaleDateString() : String(dueDate);
    const formattedCreated = dateCreated instanceof Date ? dateCreated.toLocaleDateString() : String(dateCreated);
    const shortDescription = description && description.length > 120 ? description.slice(0,120) + '...' : description;

    return (
        <div className="h-85 border border-gray-300 rounded-md p-5 hover:cursor-pointer w-full bg-white">
            <div className="flex flex-col">
                <p className="font-medium">{title}</p>
                <p className="text-gray-600 mt-2">{view === 'grid' ? shortDescription : description}</p>
            </div>

            <div className="flex flex-row mt-8 gap-2">
                <div className="flex flex-row justify-center items-center w-25 bg-amber-100 border-none rounded-md text-orange-700"><p>{status}</p></div>
                <p className="flex flex-row justify-center items-center w-12 bg-red-200 border-none rounded-md text-red-500">{difficulty}</p>
            </div>
            <div className="mt-2">
                <ProgressBar value={taskCount} max={taskTotal} />
            </div>

            <div className="flex flex-row justify-items-start items-center mt-7 gap-5">
                <div className="flex flex-row gap-2 justify-center items-center text-gray-600">
                    <Users size={20}/>
                    <p>{peopleCount}</p>
                </div>
                
                <div className="flex flex-row justify-center items-center text-gray-600 gap-1">
                    <Calendar size={20}/>
                    <p>{formattedDue}</p>
                </div>

                <button className="font-medium">View Details</button>
            </div>
        </div>
    )
}

export default Card2