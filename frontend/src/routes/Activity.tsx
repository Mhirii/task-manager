import WorkspaceLayout from "../components/common/WorkspaceLayout.tsx";
import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTasksDone} from "../redux/actions/taskActions.ts";
import LineChart from "../components/charts/LineChart.tsx";

interface TaskData{
  day: number,
  tasksCompleted: number
}

export const Activity = () => {
 
  const dispatch = useDispatch();
  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const username = useSelector((state: any) => state.user.username)
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`
    },
  }
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchTasksDone(username, config));
  }, [dispatch]);
  let tasksDone = useSelector((state: any) => state.tasksDone.tasks)
  if (!tasksDone) {
    tasksDone = []
  }
  const [taskData, setTaskData] = useState<TaskData[]>([]);
  
  const [chartData, setChartData] = useState({
    labels: taskData.map((task) => task.day),
    datasets: [
      {
        label: "tasks completed ",
        data: taskData.map((task) => task.tasksCompleted),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });
  
  useEffect(() => {
    setTaskData([]);
    const currentDate = new Date()
    const updatedTaskData = [...taskData];
    
    tasksDone.forEach((task: any) => {
      const completedAt = new Date(task.completedAt)
      const dayOfMonth = completedAt.getDate();
      if (currentDate.getMonth() === completedAt.getMonth() && currentDate.getFullYear() === completedAt.getFullYear()) {
        const existingDayIndex = updatedTaskData.findIndex((entry: any) => entry.day === dayOfMonth);
        if (existingDayIndex !== -1) {
          updatedTaskData[existingDayIndex].tasksCompleted += 1;
        } else {
          updatedTaskData.push({
            day: dayOfMonth,
            tasksCompleted: 1,
          });
        }
      }
    })
    updatedTaskData.sort((a, b) => a.day - b.day);
    setTaskData(updatedTaskData);
    
    setChartData({
      labels: updatedTaskData.map((task) => task.day),
      datasets: [
        {
          label: "tasks completed ",
          data: updatedTaskData.map((task) => task.tasksCompleted),
          backgroundColor: ["rgba(75,192,192,1)"],
          borderColor: "black",
          borderWidth: 1
        }
      ]
    })
  }, []);
  
  return (
    <>
      <WorkspaceLayout currentPage={'Activity'} showView={false}>
        <div className=" p-1 w-full flex  justify-center">
          <div className="grid grid-cols-1 gap-1 sm:w-4/5 lg:w-2/3 w-full">
            <h6 className={`text-slate-500 font-medium py-2 my-2`}>Activity</h6>
            <LineChart chartData={chartData}/>
          </div>
        </div>
      </WorkspaceLayout>
    </>
  )
}

Chart.register(CategoryScale);
export default Activity