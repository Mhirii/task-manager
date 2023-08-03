import React, {useCallback, useEffect, useState} from "react";
import TaskCard from "./TaskCard.tsx";
import Task from "../../interfaces/TaskInterface.ts";
import {fetchTasks} from "../../redux/actions/taskActions.ts";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../store.ts";

interface Props {
  view: string;
}

const TaskBoardRender: React.FC<Props> = ({view}) => {
  
  
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const accessToken = useSelector((state) => state.auth.accessToken);
  const tasks = useSelector((state: any) => state.task.tasks);
  const dispatch = useDispatch();
  const username: string = useSelector((state:RootState) => state.auth.username || 'User')
  
  
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchTasks(accessToken, username));
  }, [dispatch]);
  
  const loading = useSelector((state: any) => state.task.loading);
  

  

  
  if (loading || !tasks) return null;
  
  const {tasksDone, tasksInProgress} = tasks.reduce(
    (acc: { tasksDone: Task[]; tasksInProgress: Task[] }, task: Task, index: number) => {
      if (task.isDone) {
        acc.tasksDone.push(task);
      } else {
        acc.tasksInProgress.push(task);
      }
      return acc;
    },
    {tasksDone: [], tasksInProgress: []}
  );
 

  
  if (loading || !tasks) return (<h1>no tasks to show</h1>);
  return (
    <div className={`flex flex-row gap-2 w-full`}>
      <div className={`w-full`}>
        <h6 className={`text-slate-500 font-medium py-2 my-2`}>In Progress</h6>
        <div className="flex flex-col gap-2">
          {tasksInProgress.map((task: Task, index: number) => (
            <TaskCard
              index={index}
              key={task._id}
              id={task._id}
              title={task.title}
              desc={task.desc}
              dueDate={task.due}
              dateAdded={new Date()}
              view={view}
              isDone={task.isDone}
            />
          ))}
        </div>
      </div>
      {(view === "Grid")
        ? (<div></div>)
        : (
          <div className={`w-full`}>
            <h6 className={`text-emerald-500 font-medium py-2 my-2`}>Done</h6>
            <div className="flex flex-col gap-2">
              {tasksDone.map((task: Task, index: number) => (
                <TaskCard
                  index={index}
                  key={task._id}
                  id={task._id}
                  title={task.title}
                  desc={task.desc}
                  dueDate={task.due}
                  dateAdded={new Date()}
                  view={view}
                  isDone={task.isDone}
                />
              ))}
            </div>
          </div>
        )
      }
    </div>
  )
};

export default TaskBoardRender;
