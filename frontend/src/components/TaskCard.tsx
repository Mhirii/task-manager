import {CalendarDaysIcon} from "@heroicons/react/24/solid";
import React, {useState} from "react";
import "../styles/TaskCard.css";
import ProjectBadge from "./Task/ProjectBadge";
import Button from "./common/Button.tsx";
import {EditOutlined} from "@ant-design/icons";
import {Modal} from "./common/Modal.tsx";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import { setRefreshTrigger } from '../redux/reducers/appReducer.ts';
import {removeTask, updateTask} from '../redux/actions/taskActions.ts';
import Task from "../interfaces/TaskInterface.ts";

interface Project {
  id: string;
  title: string;
  color: string;
}

interface CardProps {
  id: string;
  title: string;
  desc?: string;
  dateAdded: Date;
  dueDate: Date;
  project?: Project;
  view: string;
  isDone: boolean;
}

function formatDate(dueDate: Date): string {
  const newDate = new Date(dueDate);
  const day = newDate.getDate();
  const month = newDate.toLocaleString('default', {month: 'long'});

  return `${day} ${month}`;
}



const Card: React.FC<CardProps> = ({title, desc, dateAdded, dueDate, id, project,isDone, view}) => {
  
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  
  const newDueDate = formatDate(dueDate);
  const creationDate = formatDate(dateAdded);

  const [checked, setChecked] = React.useState(false);
  const [isModalOpen, setModal] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDesc, setEditedDesc] = useState(desc);
  const [editedDueDate, setEditedDueDate] = useState(newDueDate);


  const toggleModal = () => {
    setModal((prevismodalopen) => !prevismodalopen);
  };
  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };


  const onSaveChanges = async () => {
    if (!id) {
      console.error("ID is not available.");
      return;
    }
    // console.error(id);
    
    const updatedData = {
      title: editedTitle,
      desc: editedDesc,
      dueDate: editedDueDate,
    };
    try {
      // await axios.put(`http://localhost:5000/tasks/${id}`, updatedData, config);
      console.log("Successfully updated task.");
      dispatch(updateTask({ ...updatedData, _id:id }, config));
    } catch (error) {
      console.error("Error updating task:", error);
    }
    toggleEditMode();
      toggleModal();
  };
  
  const deleteTask = async (id: string) => {
    // console.log(`http://localhost:5000/tasks/${id}`)
    // axios.delete(`http://localhost:5000/tasks/${id}`)
    
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`,config)
        .then((response) => {
          console.log(response.data.task)
          dispatch({
            type: "DELETE_TASK",
            payload: response.data.task,
          })
        })
      // dispatch(removeTask({_id:id }));
      console.log(`Task: ${id} deleted`);
      dispatch(setRefreshTrigger(true));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };


  // Modal stuff
  const modalHeader = (
    <>
      {isEditMode ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="text-sm md:text-base text-slate-700 w-full bg-transparent focus:outline-none"
        />
      ) : (
        <h6>{title}</h6>
      )}
      <Button icon={<EditOutlined/>} variant={"transparent"} className={`${isEditMode ? "hidden" : "" }`} onClick={toggleEditMode}/>
    </>
  )
  const modalBody = (
    <>
      <div className={`w-full `}>
        {isEditMode ? (
          <textarea name="desc" placeholder={"Desc"} rows={12}
                    className={"text-sm md:text-sm text-slate-700 w-full bg-transparent focus:outline-none "}
                    value={editedDesc}
                    onChange={(e) => setEditedDesc(e.target.value)}
          />
        ) : (
          <p className={"text-sm font-normal text-left text-slate-600"}>{desc}</p>
        )}
      </div>
      <div className={`task-footer w-full flex flex-col justify-between`}>
        <div className="flex flex-row items-center gap-1">
          <h6 className={`text-sm font-medium text-slate-700`}>Created: </h6>
          <p className="text-sm font-normal text-slate-600 uppercase">
            {creationDate}
          </p>
        </div>
        <div className="flex flex-row items-center gap-1">
          <h6 className={`text-sm font-medium text-slate-700`}>Due: </h6>
          {isEditMode ? (
            <input type="date" name="due" id="due"
                   className={"w-auto bg-transparent focus:outline-none"}
                   value={editedDueDate}
                   onChange={(e) => setEditedDueDate(e.target.value)}
            />
          ) : (
            <p className="text-sm font-normal text-slate-600 uppercase">
              {newDueDate}
            </p>
          )}
        </div>
        <div className="flex flex-row gap-1 items-end">
          <ProjectBadge project={project}/>
        </div>
      </div>
    </>
  )
  const modalFooter = (
    <>
    {isEditMode ? (
      <Button label={"Cancel"} variant={"ghost"}
              onClick={toggleEditMode}/>
      ):(
      <Button label={"Delete"} variant={"danger"}
              onClick={() => deleteTask(id)}/>
      )}
      {isEditMode ? (
      <Button label={"Save"} variant={"confirm"} onClick={onSaveChanges}/>
        ):(
        <Button label={"Finished"} variant={"confirm"}/>
        )}
    </>
  )


  return (
    <>
      <div
        className="flex flex-col p-2
      bg-slate-100 rounded-lg border border-slate-200
      hover:shadow
      transition-all
      "
        onClick={toggleModal}
      >
        <div className={`task-header flex flex-row justify-between`}>
          <div className={"inline-flex gap-2"}>
            <div className="task-check">
              <input type="checkbox" id={id} className="hidden"
                     defaultChecked={isDone}
                     onChange={() => setChecked((state) => !state)}
              />
              <label htmlFor={id} className="check">
                <svg width="32px" height="32px" viewBox="0 0 18 18">
                  <path
                    d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                  <polyline points="1 9 7 14 15 4"></polyline>
                </svg>
              </label>
            </div>
            <h3 className="text-base md:text-lg font-medium text-slate-800">
              {title}
            </h3>
          </div>
          {/*<div>*/}
          {/*  <ChevronDownIcon className="w-6"/>*/}
          {/*</div>*/}
        </div>
        <div className="task-content flex flex-col w-full">
          <p className="text-xs px-10 pb-1 md:text-sm font-light text-slate-600">{desc}</p>
          <div className={`task-footer pl-9 flex ${(view === "List") ? "flex-row" : "flex-col"}  justify-between`}>
            <div className="flex flex-row gap-1">
              <CalendarDaysIcon className="h-4 w-4 text-slate-500"/>
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

      <Modal header={modalHeader}
             body={modalBody}
             footer={modalFooter}
             state={isModalOpen}
             toggleState={toggleModal}
             posInit={"opacity-100 z-10"}
             posHidden={"opacity-0 -z-50"}
             form={false}

      />
    </>
  );
};

export default Card;
