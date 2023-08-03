import AddTask from "../components/Task/AddTask.tsx";
import {useSelector} from "react-redux";
import WorkspaceLayout from "../components/WorkspaceLayout.tsx";
import TaskBoardRender from "../components/Task/TaskBoardRender.tsx";

export default function Today() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const view = useSelector((state) => state.view.value)
  
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore

  
  return (
    <WorkspaceLayout>
      <div className=" p-1 w-full flex  justify-center">
        <div className="grid grid-cols-1 gap-1 sm:w-4/5 lg:w-2/3 w-full">
          <TaskBoardRender view={view}/>
            <AddTask/>
        </div>
      </div>
    </WorkspaceLayout>
);
}
