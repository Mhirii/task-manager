import {useDispatch, useSelector} from "react-redux";
import {DragDropContext} from 'react-beautiful-dnd'
import {tasksIdUrl, userMoveTask, userReorderTask} from "../api/endPoints.ts";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {socket, WebsocketProvider} from "../context/WebsocketContext.tsx";
import useMousePosition from '../hooks/useMousePosition.ts'
import SocketMousePosition from "../components/projectPage/SocketMousePosition.tsx";

const ProjectTasks = React.lazy(() => import('../components/projectPage/ProjectTasks.tsx'))
const WorkspaceLayout = React.lazy(() => import('../components/common/WorkspaceLayout.tsx'))
const AddTask = React.lazy(() => import('../components/Task/AddTask.tsx'))

export default function Project() {
  
  const view = useSelector((state: any) => state.view.value)
  const username = useSelector((state: any) => state.user.username)
  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const project = useSelector((state: any) => state.projectPage.project)
  const tasksInProgress = useSelector((state: any) => state.projectPage.tasksInProgress)
  const tasksDone = useSelector((state: any) => state.projectPage.tasksDone)
  
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const mousePosition = useMousePosition()
  const config = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`
    },
  }
  
  useEffect(() => {
    if(project._id === "" || project._id === undefined){
      navigate('/home')
    }
  }, []);
  
  useEffect(() => {
    // @ts-ignore
    axios
      .get(`http://localhost:5000/tasks/project/${project._id}`)
      .then((response)=>{
        console.log(response.data)
        dispatch({
          type: "SET_PROJECT_TASKS",
          payload: response.data
        })
 
      })
      .catch((error)=>{
        dispatch({
          type: "SET_ERROR",
          payload: "Error fetching project tasks " + error,
        })
      })
  }, [dispatch]);
  
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
    console.log(results)
    const {source, destination, /*type*/} = results
    if (!destination) return;
    if (source.droppableId === destination.droppableId
      && source.index === destination.index)
      return;
    if (source.droppableId === "projectProgressArea"
      && destination.droppableId === "projectDoneArea") {
      await handleCheck(true, results.draggableId)
      try {
        console.log()
      } catch (error) {
        console.log(error)
      }
    } else if (source.droppableId === "projectDoneArea"
      && destination.droppableId === "projectProgressArea") {
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
      const currentIndex = list === 'tasksInProgress' ? results.source.index : results.source.index + tasksInProgress.length;
      const targetIndex = list === 'tasksInProgress' ? results.destination.index : results.destination.index + tasksInProgress.length;
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
    // if (type === 'dropArea') {}
  }
  
  return (
    <WorkspaceLayout currentPage={project.title} showView={true}>
      <div className=" p-1 w-full flex  justify-center">
        <div className="grid grid-cols-1 gap-1 sm:w-4/5 lg:w-2/3 w-full">
          <DragDropContext onDragEnd={handleDragDrop}>
            <WebsocketProvider value={socket}>
              <SocketMousePosition x={mousePosition.x} y={mousePosition.y}/>
              <ProjectTasks view={view} tasksInProgress={tasksInProgress} tasksDone={tasksDone}/>
            </WebsocketProvider>
          </DragDropContext>
          <AddTask project_id={project._id}/>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
