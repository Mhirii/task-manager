import {useContext, useEffect, useState} from "react";
import "../../styles/TaskCard.css";
import ProjectBadge from "../Task/ProjectBadge.tsx";
import CalendarOutlined from "@ant-design/icons/CalendarOutlined";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import CheckBox from "../Task/CheckBox.tsx";
import TaskModal from "../Task/TaskModal.tsx";
import {tasksIdUrl, userMoveTask} from "../../api/endPoints.ts";
import Task from "../../interfaces/TaskInterface.ts";
import {WebsocketContext} from "../../context/WebsocketContext.tsx";

interface Props {
  task: Task
  view: string;
  index?: number;
}

function formatDate(dueDate: Date): string {
  const newDate = new Date(dueDate);
  const day = newDate.getDate();
  const month = newDate.toLocaleString("default", {month: "long"});
  
  return `${day} ${month}`;
}

// @ts-ignore
function TaskCardCollaboration({task, view}: Props) {
  const dispatch = useDispatch();
  const username = useSelector((state: any) => state.user.username);
  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const config = {
    headers: {Authorization: `Bearer ${accessToken}`},
  };
  
  const newDueDate = formatDate(task.due);
  const creationDate = formatDate(task.dateAdded);
  
  const project = useSelector((state: any) => state.projectPage.project._id)
  
  const [checked, setChecked] = useState(task.isDone);
  const [isModalOpen, setModal] = useState(false);
  

  
  const socket = useContext(WebsocketContext);
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to gateway')
    })
    socket.on('onMessage', (data) => {
      if (data.msg === "new activity" && data.content.username !== username) {
        if (data.content.checking){
            dispatch({
              type: "PROJECT_DELETE_TASKS_PROGRESS",
              payload: data.content.task,
            });
            dispatch({
              type: "PROJECT_ADD_TASK_DONE",
              payload: data.content.task,
            });
        }
        if(!data.content.checking){
            console.log('unchecking')
          dispatch({
            type: "PROJECT_DELETE_TASKS_DONE",
            payload: data.content.task,
          });
          dispatch({
            type: "PROJECT_ADD_TASK_PROGRESS",
            payload: data.content.task,
          });
        }
      }
    })
    return () => {
      console.log('clean up function')
      socket.off('connect');
      socket.off('onMessage')
    }
  }, []);
  
  
  const handleCheck = async () => {
    let to = "";
    let from = "";
    const completedAt = task.isDone ? null : new Date();
    const updatedData = {
      isDone: !checked,
      completedAt: completedAt,
    };
    if (!task.isDone) {
      // checking
      from = "tasksInProgress";
      to = "tasksDone";
    } else {
      // unchecking
      from = "tasksDone";
      to = "tasksInProgress";
    }
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await axios.put(tasksIdUrl(task._id), updatedData, config).then((response) => {
        if (!task.isDone) {
          dispatch({
            type: "PROJECT_DELETE_TASKS_PROGRESS",
            payload: response.data.task,
          });
          dispatch({
            type: "PROJECT_ADD_TASK_DONE",
            payload: response.data.task,
          });
          const task = response.data.task
          socket.emit('activity', {username, project, task, checking:true})
        } else {
          dispatch({
            type: "PROJECT_DELETE_TASKS_DONE",
            payload: response.data.task,
          });
          dispatch({
            type: "PROJECT_ADD_TASK_PROGRESS",
            payload: response.data.task,
          });
          const task = response.data.task
          socket.emit('activity', {username, project, task, checking:false})
        }
      });
      await axios
        .patch(
          userMoveTask(username, task._id),
          {
            from: from,
            to: to,
          },
          config
        )
        .then((response) => {
          console.log("moveTask operation succeeded, response: ", response);
        });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const toggleModal = () => {
    setModal((prevismodalopen) => !prevismodalopen);
  };
  
  // console.log(task.title, task.projectId)
  return (
    <>
      <div
        className="flex flex-col p-2
      bg-slate-100 rounded-lg border border-slate-200
      hover:shadow
      transition-all
      "
      >
        <div className={`task-header flex flex-row justify-between`}>
          <div className={"inline-flex gap-2"}>
            <div
              onClick={() => {
                setChecked((state) => !state);
                handleCheck();
              }}
            >
              <CheckBox checked={checked}/>
            </div>
            <h3 className="text-base md:text-lg font-medium text-slate-800">
              {task.title}
            </h3>
          </div>
        </div>
        <div
          className="task-content flex flex-col w-full"
          onClick={toggleModal}
        >
          <p className="text-xs px-10 pb-1 md:text-sm font-light text-slate-600">
            {task.desc}
          </p>
          <div
            className={`task-footer pl-9 flex ${
              view === "List" ? "flex-row" : "flex-col"
            }  justify-between`}
          >
            <div className="flex flex-row gap-1">
              <CalendarOutlined className="h-4 w-4 text-slate-500"/>
              <p className="text-xs font-medium text-slate-500 uppercase">
                {newDueDate}
              </p>
            </div>
            <div className="flex flex-row gap-1 items-end">
              <ProjectBadge projectId={task.project_id}/>
            </div>
          </div>
        </div>
      </div>
      <TaskModal
        task={task}
        // title={title}
        // id={id}
        newDueDate={newDueDate}
        // desc={desc}
        creationDate={creationDate}
        // isDone={isDone}
        // project={project}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
      />
    </>
  );
}

// const Card: React.FC<CardProps> = (

export default TaskCardCollaboration;
