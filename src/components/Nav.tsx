function Nav () {
    return (
        <div className="flex flex-row justify-center items-center h-8 w-80 bg-gray-200 p-2 gap-2 border-none rounded-xl">
            <button className="bg-transparent h-6 w-10 border-none rounded-xl focus-within:bg-gray-50"><p className="font-medium"></p>All</button>
            <button className="bg-transparent h-6 w-22 border-none rounded-xl focus-within:bg-gray-50"><p className="font-medium"></p>Planning</button>
            <button className="bg-transparent h-6 w-28 border-none rounded-xl focus-within:bg-gray-50"><p className="font-medium"></p>In Progress</button>
            <button className="bg-transparent h-6 w-26 border-none rounded-xl focus-within:bg-gray-50"><p className="font-medium"></p>Completed</button>
        </div>
    )
}

export default Nav;