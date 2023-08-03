import React, {useEffect} from "react";
import Task from "../../interfaces/TaskInterface.ts";
import TaskCard from "./TaskCard.tsx";
interface Props {
  view: string;
  tasks: Task[] | null;
  loading: boolean;
  fetchTasks: () => void;
}

const TaskBoard:React.FC<Props> = ({ view, tasks, loading, fetchTasks })=>{
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  
  if (loading || !tasks) return null;
  
  const tasksDone = tasks.filter((task: Task) => task.isDone);
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
    return <div className="flex flex-col gap-2">{renderedTasksInProgress}</div>;
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

export default TaskBoard