import AddTask from "../components/Task/AddTask.tsx";
import {useDispatch, useSelector} from "react-redux";
import WorkspaceLayout from "../components/WorkspaceLayout.tsx";
import TaskBoardRender from "../components/Task/TaskBoardRender.tsx";
import {DragDropContext} from 'react-beautiful-dnd'
import axios from "axios";

export default function Today() {
  
  const view = useSelector((state: any) => state.view.value)
  
  const dispatch = useDispatch();
  const accessToken = useSelector((state:any) => state.auth.accessToken);
  const config = {
    headers: {Authorization: `Bearer ${accessToken}`},
  };
  const handleCheck = async (checked: boolean, id:string) => {
    const updatedData = {
      isDone: checked,
    };
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, updatedData, config)
        .then((response) => {
          dispatch({
            type: "UPDATE_TASK",
            payload: response.data.task,
          })
        });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  
  const handleDragDrop = (results: any) => {
    console.log(results)
    const {source, destination, type} = results
    if (!destination) return;
    if (source.droppableId === destination.droppableId
      && source.index === destination.index)
      return;
    if (source.droppableId === "tasksProgressArea"
    && destination.droppableId === "tasksDoneArea") {
      console.log(`set ${results.draggableId} to done`)
      handleCheck(true, results.draggableId)
    }
    else if(source.droppableId === "tasksDoneArea"
      && destination.droppableId === "tasksProgressArea") {
      console.log(`undo task ${results.draggableId}`)
      handleCheck(false, results.draggableId)
    }
      
    if(type === 'dropArea'){
    
    }
    
  }
  
  return (
    <WorkspaceLayout>
      <div className=" p-1 w-full flex  justify-center">
        <div className="grid grid-cols-1 gap-1 sm:w-4/5 lg:w-2/3 w-full">
          <DragDropContext onDragEnd={handleDragDrop}>
            <TaskBoardRender view={view}/>
          </DragDropContext>
          <AddTask/>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
