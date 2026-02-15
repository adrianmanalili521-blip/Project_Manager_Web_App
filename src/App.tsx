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

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await fetch('http://localhost:3001/projects');
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.log(err);
      }
    }
    getProjects();
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
        <Filter />
        <Nav />
        <Viewer />
        <NewProjButton />
      </div>
      
      <div className="flex flex-row justify-items-start gap-8 h-auto w-full flex-wrap mt-5 ">
        <Card2 />
        <Card2 />
        <Card2 />
        <Card2 />
        <Card2 />
        <Card2 />
        <Card2 />
        <Card2 />
        <Card2 />
        <Card2 />
        <Card2 />
        <Card2 /> 
      </div>
    </div>
  );
}

export default App;