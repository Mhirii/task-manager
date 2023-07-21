import TaskBoard from "../components/TaskBoard";
import AddTask from "../components/AddTask.tsx";


interface props {
  view:string;
}

export default function Today({view}:props) {

  return (
    <div className=" p-1 w-full flex  justify-center">
      
      <div className="grid grid-cols-1 gap-1 sm:w-4/5 lg:w-2/3 w-full">
        <TaskBoard view={view} />
        <AddTask/>
      </div>
      
      {/*<Button*/}
      {/*  icon={<PlusIcon className="w-6 h-6 text-slate-100" />}*/}
      {/*  // label="Add"*/}
      {/*  className="rounded-full w-12 h-12 fixed z-10 bottom-2 right-2 sm:hidden"*/}
      {/*/>*/}
      
    </div>
  );
}
