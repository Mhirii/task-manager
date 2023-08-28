import Task from "../../interfaces/TaskInterface.ts";
import {Droppable} from "react-beautiful-dnd";
import React from "react";

const ProjectDropArea = React.lazy(() => import('./ProjectDropArea.tsx'))

interface Props{
  view: string;
  tasksInProgress: Task[];
  tasksDone: Task[];
}

const ProjectTasks = ({view, tasksInProgress, tasksDone}: Props) =>{
  if (!tasksInProgress) return;
  if (!tasksDone) return;
return(
  <div className={`flex flex-row gap-2 w-full`}>
    <div className={`w-full`}>
      <h6 className={`text-slate-500 font-medium py-2 my-2`}>In Progress</h6>
      <Droppable droppableId={'projectProgressArea'} type={"dropArea"}>
        {(provided) => (
          <div className="flex flex-col gap-2" {...provided.droppableProps} ref={provided.innerRef}>
            <ProjectDropArea tasks={tasksInProgress} view={view}/>
          </div>
        )}
      </Droppable>
    </div>
    {(view === "List")
      ? (<div></div>) : (
        <div className={`w-full`}>
          <h6 className={`text-emerald-500 font-medium py-2 my-2`}>Done</h6>
          <Droppable droppableId={'projectDoneArea'} type={"dropArea"}>
            {(provided) => (
              <div className="flex flex-col gap-2" {...provided.droppableProps} ref={provided.innerRef}>
                <ProjectDropArea tasks={ tasksDone} view={view}/>
              </div>
            )}
          </Droppable>
        </div>
      )
    }
  </div>
)
}

export default ProjectTasks