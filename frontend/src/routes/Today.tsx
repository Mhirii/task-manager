import AddTask from "../components/Task/AddTask.tsx";
import {useDispatch, useSelector} from "react-redux";
import WorkspaceLayout from "../components/common/WorkspaceLayout.tsx";
import TaskBoardRender from "../components/Task/TaskBoardRender.tsx";
import {DragDropContext} from 'react-beautiful-dnd'
import axios from "axios";
import {tasksIdUrl, userMoveTask, userReorderTask} from "../api/endPoints.ts";

export default function Today() {
  
  const view = useSelector((state: any) => state.view.value)
  const username = useSelector((state: any) => state.user.username)
  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const tasksInProgress = useSelector((state: any) => state.tasksInProgress.tasks)
  const tasksDone = useSelector((state: any) => state.tasksDone.tasks)
  
  const dispatch = useDispatch();
  
  const config = { headers: {Authorization: `Bearer ${accessToken}`}};
  
  const handleCheck = async (checkingOperation: boolean, id: string) => {
    let to = ''
    let from = ''
    const completedAt = checkingOperation ? (new Date()) : null;
    const updatedData = {
      isDone: checkingOperation,
      completedAt: completedAt,
    };
    if (checkingOperation) {
      from = "tasksInProgress"
      to = "tasksDone"
    } else {
      from = "tasksDone"
      to = "tasksInProgress"
    }
    
    try {
      await axios.put(tasksIdUrl(id), updatedData, config)
        .then((response) => {
          if (checkingOperation) {
            console.log(response)
            dispatch({
              type: "DELETE_TASKS_INPROGRESS",
              payload: response.data.task,
            })
            dispatch({
              type: "ADD_TASK_DONE",
              payload: response.data.task,
            })
          } else {
            dispatch({
              type: "DELETE_TASKS_DONE",
              payload: response.data.task,
            })
            dispatch({
              type: "ADD_TASK_INPROGRESS",
              payload: response.data.task,
            })
          }
        });
      await axios.patch(userMoveTask(username, id),
        {
          from: from,
          to: to,
        },
        config)
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  
  const handleDragDrop = async (results: any) => {
    // console.log(results)
    const {source, destination, type} = results
    if (!destination) return;
    if (source.droppableId === destination.droppableId
      && source.index === destination.index)
      return;
    if (source.droppableId === "tasksProgressArea"
      && destination.droppableId === "tasksDoneArea") {
      await handleCheck(true, results.draggableId)
      try {
        const taskId = results.draggableId
        const currentIndex = tasksDone.length
        const targetIndex = results.destination.index
        await axios.post(
          userReorderTask(username, 'tasksDone', taskId, currentIndex - 1, targetIndex),
          config
        )
        dispatch({
          type: 'REORDER_TASKS_DONE',
          payload: {
            taskId,
            currentIndex,
            targetIndex,
          },
        })
      } catch (error) {
        console.log(error)
      }
    } else if (source.droppableId === "tasksDoneArea"
      && destination.droppableId === "tasksProgressArea") {
      handleCheck(false, results.draggableId)
      try {
        const taskId = results.draggableId
        const currentIndex = tasksInProgress.length
        const targetIndex = results.destination.index
        await axios.post(
          userReorderTask(username, 'tasksInProgress', taskId, currentIndex - 1, targetIndex),
          config
        )
        dispatch({
          type: 'REORDER_TASKS_INPROGRESS',
          payload: {
            taskId,
            currentIndex,
            targetIndex,
          },
        })
      } catch (error) {
        console.log(error)
      }
    }
    if (source.droppableId === destination.droppableId) {
      // console.log(results)
      const list = destination.droppableId === 'tasksProgressArea' ? 'tasksInProgress' : 'tasksDone'
      const taskId = results.draggableId;
      const currentIndex = results.source.index;
      const targetIndex = results.destination.index;
      console.log('reorder operation ', taskId, 'from', currentIndex, 'to', targetIndex, 'in', list)
      try {
        axios.post(
          userReorderTask(username, list, taskId, currentIndex, targetIndex),
          config
        )
        const reorderList = list === 'tasksInProgress' ? 'REORDER_TASKS_INPROGRESS' : 'REORDER_TASKS_DONE'
        dispatch({
          type: reorderList,
          payload: {
            taskId,
            currentIndex,
            targetIndex,
          },
        });
      } catch (error) {
        console.log(error)
      }
    }
    if (type === 'dropArea') {
      console.log('dunno what to do')
    }
  }
  
  return (
    <WorkspaceLayout currentPage={'Today'} showView={true}>
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
