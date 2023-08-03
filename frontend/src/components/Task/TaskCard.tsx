import {useRef, useState} from "react";
import "../../styles/TaskCard.css";
import ProjectBadge from "./ProjectBadge.tsx";
import Button from "../common/Button.tsx";
import {CalendarOutlined, EditOutlined} from "@ant-design/icons";
import {Modal} from "../common/Modal.tsx";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {setRefreshTrigger} from '../../redux/reducers/appReducer.ts';
import CheckBox from "./CheckBox.tsx";
import {useDrag, useDrop} from "react-dnd";

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
  moveTask?:any
}


function formatDate(dueDate: Date): string {
  const newDate = new Date(dueDate);
  const day = newDate.getDate();
  const month = newDate.toLocaleString('default', {month: 'long'});
  
  return `${day} ${month}`;
}

function Card({title, desc, dateAdded, dueDate, id, project, isDone, view, index, moveTask}: Props) {
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  const [{ isDragging }, dragRef] = useDrag({
    type: 'task',
    item:{id, index},
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })
  const [spec, dropRef] = useDrop({
    accept: 'task',
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;
      
      
      if (dragIndex === hoverIndex) {
        return;
      }
      
      // If dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) {
        return;
      }
      // If dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) {
        return;
      }
      
      // Move the task
      moveTask(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  })
  const ref = useRef(null)
  const dragDropRef = dragRef(dropRef(ref))
  
  
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const accessToken = useSelector((state) => state.auth.accessToken);
  const config = {
    headers: {Authorization: `Bearer ${accessToken}`},
  };
  
  const newDueDate = formatDate(dueDate);
  const creationDate = formatDate(dateAdded);
  
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [checked, setChecked] = useState(isDone);
  const [isModalOpen, setModal] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDesc, setEditedDesc] = useState(desc);
  const [editedDueDate, setEditedDueDate] = useState(newDueDate);
  
  
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleCheck = async () => {
    const updatedData = {
      isDone: !checked,
      title: editedTitle,
      desc: editedDesc,
      dueDate: editedDueDate,
    };
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await axios.put(`http://localhost:5000/tasks/${id}`, updatedData, config)
        .then((response) => {
          dispatch({
            type: "UPDATE_TASK",
            payload: response.data.task,
          })
        });
      // console.log("Successfully updated task.");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
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
    const updatedData = {
      title: editedTitle,
      desc: editedDesc,
      dueDate: editedDueDate,
    };
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await axios.put(`http://localhost:5000/tasks/${id}`, updatedData, config)
        .then((response) => {
          dispatch({
            type: "UPDATE_TASK",
            payload: response.data.task,
          })
        });
      console.log("Successfully updated task.");
    } catch (error) {
      console.error("Error updating task:", error);
    }
    toggleEditMode();
    toggleModal();
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`, config)
        .then((response) => {
          // console.log(response.data.task)
          dispatch({
            type: "DELETE_TASK",
            payload: response.data.task,
          })
        })
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
      <Button icon={<EditOutlined/>} variant={"transparent"} className={`${isEditMode ? "hidden" : ""}`}
              onClick={toggleEditMode}/>
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
      ) : (
        <Button label={"Delete"} variant={"danger"}
                onClick={() => deleteTask(id)}/>
      )}
      {isEditMode ? (
        <Button label={"Save"} variant={"confirm"} onClick={onSaveChanges}/>
      ) : (
        <Button label={"Finished"} variant={"confirm"}/>
      )}
    </>
  )
  
  
  return (
    <>
      <div ref={dragDropRef}
        className="flex flex-col p-2
      bg-slate-100 rounded-lg border border-slate-200
      hover:shadow
      transition-all
      "
      
      >
        <div className={`task-header flex flex-row justify-between`}>
          <div className={"inline-flex gap-2"}>
            <div /*className="task-check"*/ onClick={
              () => {
                // console.log('updating state... state: ', checked)
                setChecked((state) => !state)
                // console.log('state updated: ', checked)
                handleCheck()
              }
            }>
              <CheckBox checked={checked}/>
            </div>
            <h3 className="text-base md:text-lg font-medium text-slate-800">
              {title}
            </h3>
          </div>
          {/*<div>*/}
          {/*  <ChevronDownIcon className="w-6"/>*/}
          {/*</div>*/}
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
}
// const Card: React.FC<CardProps> = (

export default Card;
