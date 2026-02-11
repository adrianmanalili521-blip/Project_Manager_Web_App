import Card1 from './components/Card1';

function App () {
  return (
    <div className="h-screen w-screen flex flex-col p-4 m-4 gap-4">
      <div className="flex flex-col">
        <p className="text-3xl font-medium">Project Manager</p>
        <p className="text-gray-600">Track and manage all your projects in one place</p>
      </div>
      <div className="flex flex-row h-auto w-3/4 bg-amber-50 gap-4">
        <Card1 />
        <Card1 />
        <Card1 />
        <Card1 />
      </div>
      
    </div>
  );
}

export default App;