import TaskBoard from "../components/TaskBoardRender.tsx";
import AddTask from "../components/AddTask.tsx";
import {useSelector} from "react-redux";
import WorkspaceLayout from "../components/WorkspaceLayout.tsx";
import { useDispatch } from "react-redux";
import { setRefreshTrigger } from "../redux/reducers/appReducer.ts";

export default function Today() {
  // @ts-ignore
  const view = useSelector((state) => state.view.value)
  const dispatch = useDispatch();
  const handleTaskChange = () => {
    // Perform the task addition, editing, or deletion logic here
    
    // Dispatch the action to set the refreshTrigger to true to trigger the refresh in the TaskBoard
    dispatch(setRefreshTrigger(true));
  };
  
  
  return (
    <WorkspaceLayout>
      <div className=" p-1 w-full flex  justify-center">
        <div className="grid grid-cols-1 gap-1 sm:w-4/5 lg:w-2/3 w-full">
          <TaskBoard view={view}/>
          <AddTask/>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
