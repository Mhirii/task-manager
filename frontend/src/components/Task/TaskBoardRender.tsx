import React, {useEffect} from "react";
import Task from "../../interfaces/TaskInterface.ts";
import {fetchTasks} from "../../redux/actions/taskActions.ts";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../store.ts";
import {Droppable} from "react-beautiful-dnd";
import TaskDropArea from "./TaskDropArea.tsx";

// TODO: change actions to dispatch before sending update request, then if catch error then undo dispatch

interface Props {
  view: string;
}

const TaskBoardRender: React.FC<Props> = ({view}) => {
  
  
  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const tasks = useSelector((state: any) => state.task.tasks);
  const dispatch = useDispatch();
  const username: string = useSelector((state: RootState) => state.auth.username || 'User')
  
  
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchTasks(accessToken, username));
  }, [dispatch]);
  
  
  const tasksInProgress = useSelector((state: any) => state.task.tasks?.filter((task: Task) => !task.isDone));
  const tasksDone = useSelector((state: any) => state.task.tasks?.filter((task: Task) => task.isDone));

  if (!tasks) return;
  return (
    <div className={`flex flex-row gap-2 w-full`}>
      <div className={`w-full`}>
        <h6 className={`text-slate-500 font-medium py-2 my-2`}>In Progress</h6>
        <Droppable droppableId={'tasksProgressArea'} type={"dropArea"}>
          {(provided) => (
            <div className="flex flex-col gap-2" {...provided.droppableProps} ref={provided.innerRef}>
              <TaskDropArea tasks={tasksInProgress} view={view}/>
            </div>
          )}
        </Droppable>
      </div>
      {(view === "Grid")
        ? (<div></div>) : (
          <div className={`w-full`}>
            <h6 className={`text-emerald-500 font-medium py-2 my-2`}>Done</h6>
            <Droppable droppableId={'tasksDoneArea'} type={"dropArea"}>
              {(provided) => (
                <div className="flex flex-col gap-2" {...provided.droppableProps} ref={provided.innerRef}>
                  <TaskDropArea tasks={tasksDone} view={view}/>
                </div>
              )}
            </Droppable>
          </div>
        )
      }
    </div>
  )
};

export default TaskBoardRender;
