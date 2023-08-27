import Task from "../../interfaces/TaskInterface.ts";
import {Draggable} from "react-beautiful-dnd";
import TaskCardCollaboration from "./TaskCardCollaboration.tsx";

interface Props{
  tasks: Task[]
  view:string
}

const tasksDraggable = ({tasks, view}:Props) =>{
  return (
    <>
      {tasks.map((task: Task, index: number) => (
        <Draggable draggableId={task._id} index={index} key={task._id}>
          {(provided) => (
            <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
              <
                TaskCardCollaboration
                index={index}
                key={task._id}
                task={task}
                view={view}
              />
            </div>
          )}
        </Draggable>
      ))}
    </>
  )
}


const TaskDropArea = ({tasks, view}:Props) => {
  if (!tasks){return <></>}
  return tasksDraggable({tasks, view})
}
export default TaskDropArea
