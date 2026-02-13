import Card1 from './components/Card1';
import Filter from './components/Filter';
import Nav from './components/Nav';
import Viewer from './components/Viewer';
import NewProjButton from './components/NewProjButton';
import ProgressBar from './components/ProgressBar';
import Card2 from './components/Card2';

import { LayoutGrid, Clock4, CircleCheck, CircleAlert } from 'lucide-react';

function App () {
  return (
    <div className="h-screen w-screen flex flex-col p-4 m-4 gap-4">
      <div className="flex flex-col">
        <p className="text-4xl font-medium">Project Manager</p>
        <p className="text-gray-600 mt-2">Track and manage all your projects in one place</p>
      </div>
      <div className="flex flex-row h-25 w-full gap-5 mt-5">
      <Card1 
        title="Total Projects"
        total={5}
        Icon={LayoutGrid}
        iconColor="text-sky-600"
        iconSize={30}
      />
      <Card1 
        title="In Progress"
        total={2}
        Icon={Clock4}
        iconColor="text-amber-400"
        iconSize={30}
      />
      <Card1 
        title="Completed"
        total={1}
        Icon={CircleCheck}
        iconColor="text-green-400"
        iconSize={30}
      />
      <Card1 
        title="Overdue"
        total={0}
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