import {useState} from "react";
import "../../styles/TaskCard.css";
import ProjectBadge from "./ProjectBadge.tsx";
import {CalendarOutlined} from "@ant-design/icons";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import CheckBox from "./CheckBox.tsx";
import TaskModal from "./TaskModal.tsx";
import {tasksIdUrl, userMoveTask} from "../../api/endPoints.ts";

interface Project {
  id: string;
  title: string;
  color: string;
}

interface Props {
  title: string
  desc?: string
  dateAdded: Date
  dueDate: Date
  id: string
  project?: Project
  isDone: boolean
  view: string
  index?: number
}


function formatDate(dueDate: Date): string {
  const newDate = new Date(dueDate);
  const day = newDate.getDate();
  const month = newDate.toLocaleString('default', {month: 'long'});
  
  return `${day} ${month}`;
}

// @ts-ignore
function Card({title, desc, dateAdded, dueDate, id, project, isDone, view, index}: Props) {
  
  const dispatch = useDispatch();
  const username = useSelector((state: any) => state.user.username)
  
  // @ts-ignore
  const accessToken = useSelector((state) => state.auth.accessToken);
  const config = {
    headers: {Authorization: `Bearer ${accessToken}`},
  };
  
  const newDueDate = formatDate(dueDate);
  const creationDate = formatDate(dateAdded);
  
  const [checked, setChecked] = useState(isDone);
  const [isModalOpen, setModal] = useState(false);
  
  const handleCheck = async () => {
    let to = ''
    let from = ''
    const completedAt = isDone ? null : (new Date());
    const updatedData = {
      isDone: !checked,
      completedAt: completedAt
    };
    if (!isDone) {
      // checking
      from = "tasksInProgress"
      to = "tasksDone"
    } else {
      // unchecking
      from = "tasksDone"
      to = "tasksInProgress"
    }
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await axios.put(tasksIdUrl(id), updatedData, config)
        .then((response) => {
          if (!isDone) {
            dispatch({
              type: "DELETE_TASKS_INPROGRESS",
              payload: response.data.task,
            })
            dispatch({
              type: "ADD_TASK_DONE",
              payload: response.data.task,
            })
          }else{
            dispatch({
              type: "DELETE_TASKS_DONE",
              payload: response.data.task,
            })
            dispatch({
              type: "ADD_TASK_INPROGRESS",
              payload: response.data.task,
            })
          }
          // dispatch({
          //   type: "UPDATE_TASK",
          //   payload: response.data.task,
          // })
        })
      await axios.patch(userMoveTask(username, id),
          {
            from: from,
            to: to,
          },
          config)
        .then((response) => {
          console.log("moveTask operation succeeded, response: ",response)
        });
      
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const toggleModal = () => {
    setModal((prevismodalopen) => !prevismodalopen);
  };
  
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
            <div onClick={
              () => {
                setChecked((state) => !state)
                handleCheck()
              }
            }>
              <CheckBox checked={checked}/>
            </div>
            <h3 className="text-base md:text-lg font-medium text-slate-800">
              {title}
            </h3>
          </div>
        </div>
        <div className="task-content flex flex-col w-full" onClick={toggleModal}>
          <p className="text-xs px-10 pb-1 md:text-sm font-light text-slate-600">{desc}</p>
          <div className={`task-footer pl-9 flex ${(view === "List") ? "flex-row" : "flex-col"}  justify-between`}>
            <div className="flex flex-row gap-1">
              <CalendarOutlined className="h-4 w-4 text-slate-500"/>
              <p className="text-xs font-medium text-slate-500 uppercase">
                {newDueDate}
              </p>
            </div>
            <div className="flex flex-row gap-1 items-end">
              <ProjectBadge project={project}/>
            </div>
          </div>
        </div>
      </div>
      <TaskModal
        title={title}
        id={id}
        newDueDate={newDueDate}
        desc={desc}
        creationDate={creationDate}
        isDone={isDone}
        project={project}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
      />
    </>
  );
}

// const Card: React.FC<CardProps> = (

export default Card;
