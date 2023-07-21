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
  if (view === "List") {
    const renderedTasks = tasks.map((task: Task) => (
      <TaskCard
        dateAdded={task.dateAdded}
        key={task._id}
        id={task._id}
        title={task.title}
        desc={task.desc}
        dueDate={task.due}
        // project={task.project}
        view={view}
      />
    ));
    board = (<div className="flex flex-col gap-2">{renderedTasks}</div>);
  } else {
    const renderedTasks = tasks.map((task: Task) => (
      <TaskCard
        key={task._id}
        id={task._id}
        title={task.title}
        desc={task.desc}
        dueDate={task.due.$date}
        // project={task.project}
        view={view}
      />
    ));
    board = (
      <div className={`flex flex-row gap-2`}>
        <div className={``}>
          <h6 className={`text-slate-500 font-medium py-2 my-2`}>In Progress</h6>
          <div className="flex flex-col gap-2">{renderedTasks}</div>
        </div>
        <div className={``}>
          <h6 className={`text-emerald-500 font-medium py-2 my-2`}>Done</h6>
          <div className="flex flex-col gap-2">{renderedTasks}</div>
        </div>
      </div>
    );
  }
  return board
}
