import TaskBoard from "../components/TaskBoard";
import AddTask from "../components/AddTask.tsx";
import {useSelector} from "react-redux";



export default function Today() {
  // @ts-ignore
  const view = useSelector((state) => state.view.value)

  return (
    <div className=" p-1 w-full flex  justify-center">

      <div className="grid grid-cols-1 gap-1 sm:w-4/5 lg:w-2/3 w-full">
        <TaskBoard view={view} />
        <AddTask/>
      </div>

    </div>
  );
}
