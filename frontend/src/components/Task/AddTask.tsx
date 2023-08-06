import { Modal } from "../common/Modal.tsx";
import { useState } from "react";
import Button from "../common/Button.tsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {PlusOutlined} from "@ant-design/icons";
import {allTasksUrl} from "../../api/endPoints.ts";

export default function AddTask() {
  
  const dispatch = useDispatch();
  
  const username = useSelector((state:any) => state.auth.username);
  const accessToken = useSelector((state:any) => state.auth.accessToken);
  const TasksInProgress = useSelector((state:any) => state.user.tasksInProgress);
  

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [due, setDue] = useState("");
  const [isModalOpen, setModal] = useState(false);

  const toggleModal = () => {
    setModal((prevismodalopen) => !prevismodalopen);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const creationDate = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    const isDone = false;

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    // TasksInProgress.append(newTask)
    console.log('tasks in prog:', TasksInProgress)
    axios
      .post(
        allTasksUrl(),
        {
          title: title,
          owner: username,
          desc: desc,
          due: due,
          dateAdded: creationDate,
          updatedAt:updatedAt,
          isDone: isDone,
        },
        config
      )
      .then((response) => {
        dispatch({
          type: "ADD_TASK_INPROGRESS",
          payload: response.data.newTask,
        });
        dispatch({
          type: "ADD_TASK",
          payload: response.data.newTask,
        });
        // console.log(owner)
      })
      .catch(function (error) {
        console.log(error);
      });
    /*
    axios.put(usersUsername(username),
      {
        tasksInProgress: TasksInProgress
      }
      ,
      config
      )*/
  };

  // Modal
  const modalHeader = (
    <input
      type="text"
      placeholder={"Title"}
      name={"title"}
      required={true}
      className={"w-full bg-transparent focus:outline-none"}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
  const modalBody = (
    <>
      <div className={`w-full `}>
        <textarea
          name="desc"
          placeholder={"Desc"}
          rows={14}
          className={"w-full bg-transparent focus:outline-none"}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className={`task-footer w-full flex flex-col justify-between`}>
        <div className="flex flex-row items-center gap-1">
          <h6 className={`text-sm font-medium text-slate-700`}>Due: </h6>
          <input
            type="date"
            name="due"
            id="due"
            className={"w-auto bg-transparent focus:outline-none"}
            value={due}
            onChange={(e) => setDue(e.target.value)}
          />
        </div>
      </div>
    </>
  );
  const modalFooter = (
    <>
      <Button label={"Cancel"} variant={"ghost"} />
      <Button label={"Create"} variant={"confirm"} />
    </>
  );
  return (
    <>
      <button
        className="h-12 w-full flex flex-row justify-center items-center "
        onClick={toggleModal}
      >
        <PlusOutlined className="h-5 w-5 text-emerald-500"/>
        <p className="text-sm font-regular mx-1 text-slate-600">Add task</p>
      </button>
      <Modal
        header={modalHeader}
        body={modalBody}
        footer={modalFooter}
        state={isModalOpen}
        toggleState={toggleModal}
        posInit={"opacity-100 z-10"}
        posHidden={"opacity-0 -z-50"}
        form={true}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
