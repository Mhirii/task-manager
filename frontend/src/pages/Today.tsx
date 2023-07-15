import { PlusIcon } from "@heroicons/react/24/solid";
import TaskBoard from "../components/TaskBoard";
import Button from "../components/common/Button";
import tasks from "../dataSample/tasks.json";
interface projectRef {
  id: string;
  title: string;
  color: string;
}

interface Task {
  _id: {
    $oid: string;
  };
  title: string;
  desc: string;
  project?: projectRef;
  dateAdded: {
    $date: string;
  };
  due: {
    $date: string;
  };
  isDone: boolean;
}

interface props {
  view:string;
}

export default function Today({view}:props) {
  const taskData: Task[] = tasks as Task[];

  return (
    <div className=" p-1 w-full flex  justify-center">
      
      <div className="grid grid-cols-1 gap-1 sm:w-4/5 lg:w-2/3 w-full">
        <TaskBoard data={taskData} view={view} />
        <button className="h-12 w-full hidden sm:flex flex-row justify-center items-center ">
          <PlusIcon className="h-5 w-5 text-lime-600" />
          <p className="text-sm font-regular mx-1 text-slate-600">Add task</p>
        </button>
      </div>
      
      <Button
        icon={<PlusIcon className="w-6 h-6 text-slate-100" />}
        // label="Add"
        className="rounded-full w-12 h-12 fixed z-10 bottom-2 right-2 sm:hidden"
      />
      
    </div>
  );
}
