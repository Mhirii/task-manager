import React, { useEffect } from "react";
import TaskCard from "./TaskCard.tsx";
import Task from "../interfaces/TaskInterface.ts";
import { fetchTasks } from "../redux/actions/taskActions.ts";
import { useSelector, useDispatch } from "react-redux";

interface Props {
  view: string;
}

const TaskBoardRender: React.FC<Props> = ({ view }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  
  const tasks = useSelector((state: any) => state.task.tasks);
  const loading = useSelector((state: any) => state.task.loading);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchTasks(accessToken));
  }, [dispatch]);
  
  if (loading || !tasks) return null;
  
  const { tasksDone, tasksInProgress } = tasks.reduce(
    (acc: { tasksDone: Task[]; tasksInProgress: Task[] }, task: Task) => {
      if (task.isDone) {
        acc.tasksDone.push(task);
      } else {
        acc.tasksInProgress.push(task);
      }
      return acc;
    },
    { tasksDone: [], tasksInProgress: [] }
  );
  
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
  
  let current: JSX.Element;
  if (view === "List") {
    current = <div className="flex flex-col gap-2">{renderedTasksInProgress}</div>;
  } else {
    current = (
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
  return current;
};

export default TaskBoardRender;
