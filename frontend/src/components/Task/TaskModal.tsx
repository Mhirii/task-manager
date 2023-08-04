import {Modal} from "../common/Modal.tsx";
import Button from "../common/Button.tsx";
import {EditOutlined} from "@ant-design/icons";
import ProjectBadge from "./ProjectBadge.tsx";
import {useState} from "react";
import axios from "axios";
import {setRefreshTrigger} from "../../redux/reducers/appReducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {tasksIdUrl} from "../../api/endPoints.ts";

interface Props{
  id:string
  title: string
  desc?:string
  newDueDate?: any
  creationDate?: any
  project?:any
  isModalOpen:any
  toggleModal:any
}

function TaskModal({id, title, desc,newDueDate,creationDate,project,isModalOpen, toggleModal}:Props){
  const [isEditMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDesc, setEditedDesc] = useState(desc);
  const [editedDueDate, setEditedDueDate] = useState(newDueDate);
  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };
  // @ts-ignore
  const accessToken = useSelector((state) => state.auth.accessToken);
  const config = {
    headers: {Authorization: `Bearer ${accessToken}`},
  };
  const dispatch = useDispatch();
  
  
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
      await axios.put(tasksIdUrl(id), updatedData, config)
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
      await axios.delete(tasksIdUrl(id), config)
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
    <Modal header={modalHeader}
           body={modalBody}
           footer={modalFooter}
           state={isModalOpen}
           toggleState={toggleModal}
           posInit={"opacity-100 z-10"}
           posHidden={"opacity-0 -z-50"}
           form={false}
    
    />
  )
  
}
export default TaskModal