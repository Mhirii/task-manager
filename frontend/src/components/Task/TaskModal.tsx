import {Modal} from "../common/Modal.tsx";
import Button from "../common/Button.tsx";
import EditOutlined from "@ant-design/icons/EditOutlined";
import ProjectBadge from "./ProjectBadge.tsx";
import {useState} from "react";
import axios from "axios";
import {setRefreshTrigger} from "../../redux/reducers/appReducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {
  addTaskToProject,
  removeTaskFromProject,
  tasksIdUrl,
  usersDeleteTasksDone,
  usersDeleteTasksInProgress,
} from "../../api/endPoints.ts";
import SelectProject from "./SelectProject.tsx";
import Task from "../../interfaces/TaskInterface.ts";

interface Props {
  // id: string
  // title: string
  // desc?: string
  // isDone: boolean
  // project?: any
  task: Task
  newDueDate?: any
  creationDate?: any
  isModalOpen: any
  toggleModal: any
}

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function TaskModal({task,newDueDate, creationDate, isModalOpen, toggleModal}: Props) {
  const username = useSelector((state: any) => state.user.username)
  
  
  const [isEditMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDesc, setEditedDesc] = useState(task.desc);
  const [editedProject, setEditedProject] = useState(task.project_id);
  const [editedDueDate, setEditedDueDate] = useState(newDueDate);
  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };
  // @ts-ignore
  const accessToken = useSelector((state) => state.auth.accessToken);
  const config = {
    headers: {Authorization: `Bearer ${accessToken}`},
  };
  const dispatch = useDispatch();
  
  const projects = useSelector((state: any) => state.projects.projects)
  
  
  const onSaveChanges = async () => {
    if (!task._id) {
      console.error("ID is not available.");
      return;
    }
    const projectIsChanged = task.project_id !==  editedProject
    const updatedData = {
      title: editedTitle,
      desc: editedDesc,
      dueDate: editedDueDate,
      project_id: editedProject,
    };
    console.log("updatedData: ", updatedData)
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await axios.put(tasksIdUrl(task._id), updatedData, config)
        .then((response) => {
          if (!task.isDone) {
            dispatch({
              type: "UPDATE_TASKS_INPROGRESS",
              payload: response.data.task,
            })
          } else {
            dispatch({
              type: "UPDATE_TASKS_DONE",
              payload: response.data.task,
            })
          }
        })
      if (projectIsChanged && (editedProject !== undefined && editedProject !== "")){
        if (task.project_id !== undefined) {
          try{
          
          await axios.put(removeTaskFromProject(task.project_id, task._id), config)
            .then((response) => {
              console.log(response)
            })
          }catch (e) {
            console.log(e)
          }
        }
        await axios.put(addTaskToProject(editedProject, task._id), config)
          .then((response)=>{
            console.log(response)
          })
        
      }
      // console.log("Successfully updated task.");
    } catch (error) {
      console.error("Error updating task:", error);
    }
    toggleEditMode();
    toggleModal();
  };
  
  const deleteTask = async (id: string) => {
    try {
      await axios.delete(tasksIdUrl(id), config).then((response) => {
        dispatch({
          type: "DELETE_TASKS_DONE",
          payload: response.data.task,
        })
        dispatch({
          type: "DELETE_TASKS_INPROGRESS",
          payload: response.data.task,
        })
      })
      await axios.delete(usersDeleteTasksDone(username, id), config)
      await axios.delete(usersDeleteTasksInProgress(username, id), config)
      
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
        <h6>{task.title}</h6>
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
          <p className={"text-sm font-normal text-left text-slate-600"}>{task.desc}</p>
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
          {isEditMode ? (
            <SelectProject currentProject={editedProject} projects={projects}
                           onchange={(e: any) => {
                             e.preventDefault()
                             console.log("taskModal > SelectedProject", e.target.value)
                             setEditedProject(e.target.value)
                           }}/>
          ) : (
            <ProjectBadge projectId={editedProject}/>
          )}
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
                onClick={() => deleteTask(task._id)}/>
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