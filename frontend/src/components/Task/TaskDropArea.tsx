import Task from "../../interfaces/TaskInterface.ts";
import {Draggable} from "react-beautiful-dnd";
import TaskCard from "./TaskCard.tsx";

interface Props{
  tasks: any
  view:string
}

const tasksDraggable = (tasks:any,view:string) =>{
  return (
    <>
    {tasks.map((task: Task, index: number) => (
        <Draggable draggableId={task._id} index={index} key={task._id}>
          {(provided) => (
            <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
              <
                TaskCard
                index={index}
                key={task._id}
                id={task._id}
                title={task.title}
                desc={task.desc}
                dueDate={task.due}
                dateAdded={new Date()}
                view={view}
                isDone={task.isDone}
              />
            </div>
          )}
        </Draggable>
      ))}
    </>
  )
}

const tasksUndraggable = (tasks:any,view:string) =>{
  return (
    <>
      {tasks.map((task: Task, index: number) => (
              <
                TaskCard
                index={index}
                key={task._id}
                id={task._id}
                title={task.title}
                desc={task.desc}
                dueDate={task.due}
                dateAdded={new Date()}
                view={view}
                isDone={task.isDone}
              />
      ))}
    </>
  )
}

const TaskDropArea = ({tasks, view}:Props) => {
  if (!tasks){return <></>}
    return tasksDraggable(tasks,view)
  }
export default TaskDropArea
