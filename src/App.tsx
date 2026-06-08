import { useEffect, useMemo, useState } from 'react'

//my components
import Card1 from './components/Card1';
import Filter from './components/Filter';
import Nav from './components/Nav';
import Viewer from './components/Viewer';
import NewProjButton from './components/NewProjButton';
import Card2 from './components/Card2';

import { LayoutGrid, Clock4, CircleCheck, CircleAlert } from 'lucide-react';

function App() {
  const [projects, setProjects] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showNew, setShowNew] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newStatus, setNewStatus] = useState('planning');
  const [newDifficulty, setNewDifficulty] = useState('medium');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPeopleCount, setNewPeopleCount] = useState(1);
  const [newTaskCount, setNewTaskCount] = useState(0);

  const [statusCounts, setStatusCounts] = useState({ in_progress: 0, overdue: 0, completed: 0 });
  const [totalProjects, setTotalProjects] = useState(0);

  const clearNewProjectForm = () => {
    setNewTitle('');
    setNewDescription('');
    setNewStatus('planning');
    setNewDifficulty('medium');
    setNewDueDate('');
    setNewPeopleCount(1);
    setNewTaskCount(0);
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:3001/projects/all-projects');
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Unable to load projects. Check your backend connection.');
    }
  };

  const fetchStatusCounts = async () => {
    try {
      const res = await fetch('http://localhost:3001/projects/status-counts');
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setStatusCounts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTotal = async () => {
    try {
      const res = await fetch('http://localhost:3001/projects/total-count');
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setTotalProjects(data.totalProjects ?? 0);
    } catch (err) {
      console.error(err);
    }
  };

  const createProject = async () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      setError('Please provide a title and description for the new project.');
      return;
    }

    const payload = {
      title: newTitle.trim(),
      description: newDescription.trim(),
      peopleCount: Math.max(1, newPeopleCount),
      dateCreate: new Date().toISOString(),
      dueDate: newDueDate || null,
      taskCount: Math.max(0, newTaskCount),
      tasktotal: Math.max(0, newTaskCount),
      difficulty: newDifficulty,
      status: newStatus,
    };

    try {
      const res = await fetch('http://localhost:3001/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to create project');
      await fetchProjects();
      fetchStatusCounts();
      fetchTotal();
      clearNewProjectForm();
      setShowNew(false);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Unable to create the project. Please try again.');
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchStatusCounts();
    fetchTotal();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project: any) => {
      const query = search.trim().toLowerCase();
      if (query) {
        const titleMatch = (project.title || '').toLowerCase().includes(query);
        const descMatch = (project.description || '').toLowerCase().includes(query);
        if (!titleMatch && !descMatch) return false;
      }

      if (statusFilter !== 'all' && project.status !== statusFilter) return false;
      if (difficultyFilter !== 'all' && String((project.difficulty || '').toLowerCase()) !== difficultyFilter) return false;

      return true;
    });
  }, [projects, search, statusFilter, difficultyFilter]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
          <h1 className="text-4xl font-semibold text-slate-950">Project Manager</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Track and manage all your projects, deadlines, and team load in one polished dashboard.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card1 title="Total Projects" total={totalProjects} Icon={LayoutGrid} iconColor="text-sky-600" iconSize={30} />
          <Card1 title="In Progress" total={statusCounts.in_progress} Icon={Clock4} iconColor="text-amber-500" iconSize={30} />
          <Card1 title="Completed" total={statusCounts.completed} Icon={CircleCheck} iconColor="text-emerald-500" iconSize={30} />
          <Card1 title="Overdue" total={statusCounts.overdue} Icon={CircleAlert} iconColor="text-rose-500" iconSize={30} />
        </section>

        <section className="mt-6 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Filter search={search} onSearch={setSearch} status={statusFilter} onStatus={setStatusFilter} difficulty={difficultyFilter} onDifficulty={setDifficultyFilter} />
            <Nav status={statusFilter} onStatus={setStatusFilter} />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Viewer view={view} onView={setView} />
            <NewProjButton onOpen={() => setShowNew(true)} />
          </div>
        </section>

        {error && (
          <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {showNew && (
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/60 p-4">
            <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-950">Create New Project</h2>
                  <p className="mt-1 text-sm text-slate-600">Add a new project to the dashboard.</p>
                </div>
                <button className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-slate-200" onClick={() => setShowNew(false)}>
                  Close
                </button>
              </div>

              <div className="grid gap-4">
                <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400" placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                <textarea className="min-h-[120px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400" placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                <div className="grid gap-3 sm:grid-cols-3">
                  <select className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                    <option value="planning">Planning</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="overdue">Overdue</option>
                    <option value="on_hold">On Hold</option>
                  </select>
                  <select className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400" value={newDifficulty} onChange={(e) => setNewDifficulty(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <input type="date" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input type="number" min={1} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400" value={newPeopleCount} onChange={(e) => setNewPeopleCount(Number(e.target.value) || 1)} placeholder="Team size" />
                  <input type="number" min={0} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400" value={newTaskCount} onChange={(e) => setNewTaskCount(Number(e.target.value) || 0)} placeholder="Task count" />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100" onClick={() => setShowNew(false)}>
                    Cancel
                  </button>
                  <button className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800" onClick={createProject}>
                    Create project
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <section className={`mt-8 grid gap-6 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project: any, index: number) => (
              <Card2
                key={project.id ?? project._id ?? index}
                title={project.title}
                description={project.description}
                status={project.status}
                difficulty={project.difficulty}
                taskCount={project.taskCount}
                taskTotal={project.tasktotal ?? project.taskTotal ?? 0}
                peopleCount={project.peopleCount}
                dateCreated={project.dateCreate ? new Date(project.dateCreate) : new Date()}
                dueDate={project.dueDate ? new Date(project.dueDate) : new Date()}
                view={view}
              />
            ))
          ) : (
            <div className="rounded-3xl bg-white p-8 text-center text-slate-600 shadow-sm">
              No projects found for the selected filters or search.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
