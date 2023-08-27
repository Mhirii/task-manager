import React from "react";
import {Droppable} from "react-beautiful-dnd";
import TaskDropArea from "./TaskDropArea.tsx";
import Task from "../../interfaces/TaskInterface.ts";
import Project from "../../interfaces/ProjectInterface.ts";

// TODO: change actions to dispatch before sending update request, then if catch error then undo dispatch

interface Props {
  view: string;
  tasksInProgress: Task[];
  tasksDone: Task[];
  print: "today" | "all" | Project
}

const TaskBoardRender: React.FC<Props> = ({view, tasksInProgress, tasksDone, print}: Props) => {
  
  if (!tasksInProgress) return;
  if (!tasksDone) return;
  
  let filteredTasksInProgress: Task[];
  let filteredTasksDone: Task[];
  
  if (print !== "all") {
    if (print === "today") {
      const todayDate = new Date();
      filteredTasksInProgress = tasksInProgress.filter((task) => {
        const dueDate = new Date(task.due)
        const isSameDay = todayDate.getDate() === dueDate.getDate()
        const isSameMonth = todayDate.getMonth() === dueDate.getMonth()
        const isSameYear = todayDate.getFullYear() === dueDate.getFullYear()
        return isSameDay && isSameMonth && isSameYear
      })
      filteredTasksDone = tasksDone.filter((task) => {
        const dueDate = new Date(task.due)
        const isSameDay = todayDate.getDate() === dueDate.getDate()
        const isSameMonth = todayDate.getMonth() === dueDate.getMonth()
        const isSameYear = todayDate.getFullYear() === dueDate.getFullYear()
        return isSameDay && isSameMonth && isSameYear
      })
    } else {
      filteredTasksInProgress = tasksInProgress.filter((task) => {
        return task.project_id === print._id
      })
      filteredTasksDone = tasksDone.filter((task) => {
        return task.project_id === print._id
      })
    }
  }
  return (
    <div className={`flex flex-row gap-2 w-full`}>
      <div className={`w-full`}>
        <h6 className={`text-slate-500 font-medium py-2 my-2`}>In Progress</h6>
        <Droppable droppableId={'tasksProgressArea'} type={"dropArea"}>
          {(provided) => (
            <div className="flex flex-col gap-2" {...provided.droppableProps} ref={provided.innerRef}>
              <TaskDropArea tasks={(print === "all") ? tasksInProgress : filteredTasksInProgress} view={view}/>
            </div>
          )}
        </Droppable>
      </div>
      {(view === "List")
        ? (<div></div>) : (
          <div className={`w-full`}>
            <h6 className={`text-emerald-500 font-medium py-2 my-2`}>Done</h6>
            <Droppable droppableId={'tasksDoneArea'} type={"dropArea"}>
              {(provided) => (
                <div className="flex flex-col gap-2" {...provided.droppableProps} ref={provided.innerRef}>
                  <TaskDropArea tasks={(print === "all") ? tasksDone : filteredTasksDone} view={view}/>
                </div>
              )}
            </Droppable>
          </div>
        )
      }
    </div>
  )
};

export default TaskBoardRender;
