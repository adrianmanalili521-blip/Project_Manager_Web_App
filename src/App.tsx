import { useState, useEffect } from 'react'

//my components
import Card1 from './components/Card1';
import Filter from './components/Filter';
import Nav from './components/Nav';
import Viewer from './components/Viewer';
import NewProjButton from './components/NewProjButton';
import Card2 from './components/Card2';

import { LayoutGrid, Clock4, CircleCheck, CircleAlert } from 'lucide-react';

function App () {
  
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showNew, setShowNew] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newStatus, setNewStatus] = useState('planning');
  const [newDifficulty, setNewDifficulty] = useState('medium');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPeopleCount, setNewPeopleCount] = useState(1);
  const [newTaskCount, setNewTaskCount] = useState(0);

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:3001/projects/all-projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const [statusCounts, setStatusCounts] = useState({ in_progress: 0, overdue: 0, completed: 0 });

  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const res = await fetch('http://localhost:3001/projects/status-counts');
        const data = await res.json();
        setStatusCounts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStatusCounts();
  }, []);

  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await fetch('http://localhost:3001/projects/total-count');
        const data = await res.json();
        setTotalProjects(data.totalProjects);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTotal();
  }, []);


  return (
    <div className="h-screen w-screen flex flex-col p-4 m-4 gap-4">
      <div className="flex flex-col">
        <p className="text-4xl font-medium">Project Manager</p>
        <p className="text-gray-600 mt-2">Track and manage all your projects in one place</p>
      </div>
      <div className="flex flex-row h-25 w-full gap-5 mt-5">
      <Card1 
        title="Total Projects"
        total={totalProjects}
        Icon={LayoutGrid}
        iconColor="text-sky-600"
        iconSize={30}
      />
      <Card1 
        title="In Progress"
        total={statusCounts.in_progress}
        Icon={Clock4}
        iconColor="text-amber-400"
        iconSize={30}
      />
      <Card1 
        title="Completed"
        total={statusCounts.completed}
        Icon={CircleCheck}
        iconColor="text-green-400"
        iconSize={30}
      />
      <Card1 
        title="Overdue"
        total={statusCounts.overdue}
        Icon={CircleAlert}
        iconColor="text-red-500"
        iconSize={30}
      />
      </div>

      <div className="flex flex-row w-full h-20 items-center gap-5 mt-5">
        <Filter
          search={search}
          onSearch={setSearch}
          status={statusFilter}
          onStatus={setStatusFilter}
          difficulty={difficultyFilter}
          onDifficulty={setDifficultyFilter}
        />
        <Nav status={statusFilter} onStatus={setStatusFilter} />
        <Viewer view={view} onView={setView} />
        <NewProjButton onOpen={() => setShowNew(true)} />
      </div>

      {showNew && (
        <div className="mt-4 p-4 border rounded-md bg-white w-full max-w-xl">
          <h3 className="text-lg font-medium mb-2">Create New Project</h3>
          <div className="flex flex-col gap-2">
            <input className="border p-2 rounded" placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <textarea className="border p-2 rounded" placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
            <div className="flex gap-2">
              <select className="border p-2 rounded" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                <option value="planning">Planning</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
                <option value="on_hold">On Hold</option>
              </select>
              <select className="border p-2 rounded" value={newDifficulty} onChange={(e) => setNewDifficulty(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <input type="date" className="border p-2 rounded" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <input type="number" className="border p-2 rounded w-32" value={newPeopleCount} onChange={(e) => setNewPeopleCount(Number(e.target.value))} />
              <input type="number" className="border p-2 rounded w-32" value={newTaskCount} onChange={(e) => setNewTaskCount(Number(e.target.value))} />
            </div>
            <div className="flex gap-2 mt-2">
              <button className="px-4 py-2 bg-slate-900 text-white rounded" onClick={async () => {
                const payload = {
                  title: newTitle,
                  description: newDescription,
                  peopleCount: newPeopleCount,
                  dateCreate: new Date().toISOString(),
                  dueDate: newDueDate || null,
                  taskCount: newTaskCount,
                  tasktotal: newTaskCount,
                  difficulty: newDifficulty,
                  status: newStatus
                };
                try {
                  const res = await fetch('http://localhost:3001/projects', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                  });
                  if (!res.ok) throw new Error('Failed to create project');
                  // refresh list and close form
                  await fetchProjects();
                  setShowNew(false);
                  // reset
                  setNewTitle(''); setNewDescription(''); setNewPeopleCount(1); setNewTaskCount(0);
                } catch (err) {
                  console.error(err);
                }
              }}>Create</button>
              <button className="px-4 py-2 border rounded" onClick={() => setShowNew(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      
      <div className={view === 'grid' ? 'flex flex-row justify-items-start gap-8 h-auto w-full flex-wrap mt-5' : 'flex flex-col items-center gap-8 h-auto w-full mt-5'}>
        {projects && projects.length > 0 ? (
          projects
            .filter((p:any) => {
              const q = search.trim().toLowerCase();
              if (q) {
                const inTitle = (p.title || '').toLowerCase().includes(q);
                const inDesc = (p.description || '').toLowerCase().includes(q);
                if (!inTitle && !inDesc) return false;
              }
              if (statusFilter !== 'all' && p.status !== statusFilter) return false;
              if (difficultyFilter !== 'all' && String((p.difficulty || '').toLowerCase()) !== difficultyFilter) return false;
              return true;
            })
            .map((p:any, index:number) => (
            <div key={p.id ?? p._id ?? index} className={view === 'grid' ? 'w-90' : 'w-3/4'}>
              <Card2
                title={p.title}
                description={p.description}
                status={p.status}
                difficulty={p.difficulty}
                taskCount={p.taskCount}
                taskTotal={p.tasktotal ?? p.taskTotal ?? 0}
                peopleCount={p.peopleCount}
                dateCreated={p.dateCreate ? new Date(p.dateCreate) : new Date()}
                dueDate={p.dueDate ? new Date(p.dueDate) : new Date()}
                view={view}
              />
            </div>
          ))
        ) : (
          <p>No projects found</p>
        )}
      </div>
    </div>
  );
}

export default App;