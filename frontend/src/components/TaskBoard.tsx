// import TaskCard from "../components/TaskCard";
import axios from "axios";
import React from "react";
import TaskCard from "./TaskCard.tsx";

const TaskURL: string = "http://localhost:5000/tasks";

interface props {
  // data: Task[];
  view: string;
}

interface Task {
  _id: string;
  title: string;
  desc: string;
  project?: {
    id: string
  };
  dateAdded: Date;
  due: Date;
  isDone: boolean;
}

// api still wip
/*
interface Project {
  _id: string;
  desc: string;
  color: string;
}
*/


export default function TaskBoard({/*data,*/ view}: props) {
  const [tasks, setTasks] = React.useState(null);
  React.useEffect(() => {
    axios.get(TaskURL).then((response) => {
      setTasks(response.data);
    });
  }, []);
  let board: any;
  // console.log(tasks)

  if (!tasks) return null;
  // @ts-ignore
  const tasksDone = tasks.filter((task: Task) => task.isDone);
  // @ts-ignore
  const tasksInProgress = tasks.filter((task: Task) => !task.isDone);
  const renderedTasksDone = tasksDone.map((task: Task) => (
    <TaskCard
      key={task._id}
      id={task._id}
      title={task.title}
      desc={task.desc}
      dueDate={task.due}
      dateAdded={new Date()}
      view={view}
      isDone={task.isDone}
    />
  ));

  const renderedTasksInProgress = tasksInProgress.map((task: Task) => (
    <TaskCard
      key={task._id}
      id={task._id}
      title={task.title}
      desc={task.desc}
      dueDate={task.due}
      dateAdded={new Date()}
      view={view}
      isDone={task.isDone}
    />
  ));


  if (view === "List") {
    return (<div className="flex flex-col gap-2">{renderedTasksInProgress}</div>);
  } else {
    return (
      <div className={`flex flex-row gap-2 w-full`}>
        <div className={`w-full`}>
          <h6 className={`text-slate-500 font-medium py-2 my-2`}>In Progress</h6>
          <div className="flex flex-col gap-2">{renderedTasksInProgress}</div>
        </div>
        <div className={`w-full`}>
          <h6 className={`text-emerald-500 font-medium py-2 my-2`}>Done</h6>
          <div className="flex flex-col gap-2">{renderedTasksDone}</div>
        </div>
      </div>
    );
  }
}
