import {PlusIcon} from "@heroicons/react/24/solid";
import {Modal} from "./common/Modal.tsx";
import React, {useState} from "react";
import Button from "./common/Button.tsx";
import axios from 'axios';

const url: string = "http://localhost:5000/tasks";


interface FormValues {
  title: string;
  desc: string;
  dateAdded: string,
  due: string;
  isDone: boolean;
}

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [due, setDue] = useState("");
  const [task, setTask] = useState();





  const handleSubmit = (event) => {
    event.preventDefault();
    const creationDate = new Date().toISOString();

    const isDone: boolean = false;
    alert(`The values you entered are: ${title} ${desc} ${creationDate} ${due} ${isDone}`)
    axios.post(url, {
        title: title,
        desc: desc,
        due: due,
        dateAdded: creationDate,
        isDone: isDone,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  const [isModalOpen, setModal] = useState(false);


  const toggleModal = () => {
    setModal((prevismodalopen) => !prevismodalopen);
  };

  const modalHeader = (
    <input type="text" placeholder={"Title"} name={"title"} required={true}
           className={"w-full bg-transparent focus:outline-none"}
           value={title}
           onChange={(e) =>
             setTitle(e.target.value)}
    />
  )
  const modalBody = (
    <>
      <div className={`w-full `}>
        <textarea name="desc" placeholder={"Desc"} rows={14}
                  className={"w-full bg-transparent focus:outline-none"}
                  value={desc}
                  onChange={(e) =>
                    setDesc(e.target.value)}
        />

      </div>
      <div className={`task-footer w-full flex flex-col justify-between`}>
        <div className="flex flex-row items-center gap-1">
          <h6 className={`text-sm font-medium text-slate-700`}>Due: </h6>
          <input type="date" name="due" id="due"
                 className={"w-auto bg-transparent focus:outline-none"}
                 value={due}
                 onChange={(e) =>
                   setDue(e.target.value)}
          />
        </div>
        {/*
        <div className="flex flex-row gap-1 items-end">}
        <ProjectBadge project={project}/>
        </div>*/}
      </div>
    </>
  )
  const modalFooter = (
    <>
      <Button label={"Cancel"} variant={"ghost"}/>
      <Button label={"Create"} variant={"confirm"}/>
    </>
  )
  return (
    <>
      <button className="h-12 w-full flex flex-row justify-center items-center "
              onClick={toggleModal}>
        <PlusIcon className="h-5 w-5 text-emerald-500"/>
        <p className="text-sm font-regular mx-1 text-slate-600">Add task</p>
      </button>
      <Modal header={modalHeader}
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
