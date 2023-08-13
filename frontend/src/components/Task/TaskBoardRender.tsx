import React from "react";
import {Droppable} from "react-beautiful-dnd";
import TaskDropArea from "./TaskDropArea.tsx";
import Task from "../../interfaces/TaskInterface.ts";

// TODO: change actions to dispatch before sending update request, then if catch error then undo dispatch

interface Props {
  view: string;
  tasksInProgress: Task[];
  tasksDone: Task[];
  print: "today" | "all"
}

const TaskBoardRender: React.FC<Props> = ({view, tasksInProgress ,tasksDone, print}: Props) => {

  if (!tasksInProgress) return;
  if (!tasksDone) return;
  
  const todayDate = new Date();
  const todayTasksInProgress: Task[] = tasksInProgress.filter((task)=>{
    const dueDate = new Date(task.due)
    const isSameDay = todayDate.getDate() === dueDate.getDate()
    const isSameMonth = todayDate.getMonth() === dueDate.getMonth()
    const isSameYear = todayDate.getFullYear() === dueDate.getFullYear()
    return isSameDay && isSameMonth && isSameYear
  })
  const todayTasksDone: Task[] = tasksDone.filter((task)=>{
    const dueDate = new Date(task.due)
    const isSameDay = todayDate.getDate() === dueDate.getDate()
    const isSameMonth = todayDate.getMonth() === dueDate.getMonth()
    const isSameYear = todayDate.getFullYear() === dueDate.getFullYear()
    return isSameDay && isSameMonth && isSameYear
  })

  return (
    <div className={`flex flex-row gap-2 w-full`}>
      <div className={`w-full`}>
        <h6 className={`text-slate-500 font-medium py-2 my-2`}>In Progress</h6>
        <Droppable droppableId={'tasksProgressArea'} type={"dropArea"}>
          {(provided) => (
            <div className="flex flex-col gap-2" {...provided.droppableProps} ref={provided.innerRef}>
              <TaskDropArea tasks={(print === "today") ? todayTasksInProgress :tasksInProgress} view={view}/>
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
                  <TaskDropArea tasks={(print === "today") ? todayTasksDone :tasksDone} view={view}/>
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
