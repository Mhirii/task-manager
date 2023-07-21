import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {CalendarDaysIcon} from "@heroicons/react/24/solid";
import React, {useState} from "react";
import "../styles/TaskCard.css";
import ProjectBadge from "./Task/ProjectBadge";
import Button from "./common/Button.tsx";
import {EditOutlined} from "@ant-design/icons";
import {Modal} from "./common/Modal.tsx";
import axios from "axios";

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
}

function formatDate(dueDate: Date): string {
  const newDate = new Date(dueDate);
  const day = newDate.getDate();
  const month = newDate.toLocaleString('default', {month: 'long'});

  return `${day} ${month}`;
}

const deleteTask = (id: string) => {
  console.log(`http://localhost:5000/tasks/${id}`)
  axios.delete(`http://localhost:5000/tasks/${id}`)
};

const Card: React.FC<CardProps> = ({title, desc, dateAdded, dueDate, id, project, view}) => {


  const newDueDate = formatDate(dueDate);
  const creationDate = formatDate(dateAdded);
  const [isModalOpen, setModal] = useState(false);

  const toggleModal = () => {
    setModal((prevismodalopen) => !prevismodalopen);
  };

  const modalHeader = (
    <>
      <h6>{title}</h6>
      <Button icon={<EditOutlined/>} variant={"transparent"}/>
    </>
  )
  const modalBody = (
    <>
      <div className={`w-full `}>
        <p className={"text-sm font-normal text-left text-slate-600"}>{desc}</p>
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
          <p className="text-sm font-normal text-slate-600 uppercase">
            {newDueDate}
          </p>
        </div>
        <div className="flex flex-row gap-1 items-end">
          <ProjectBadge project={project}/>
        </div>
      </div>
    </>
  )
  const modalFooter = (
    <>
      <Button label={"Delete"} variant={"danger"}
        // @ts-ignore
              onClick={deleteTask} id={id}/>
      <Button label={"Finished"} variant={"confirm"}/>
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
              <input type="checkbox" id={id} className="hidden"/>
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
          <div>
            <ChevronDownIcon className="w-6"/>
          </div>
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

      {/* @ts-ignore*/}
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
