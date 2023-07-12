import TaskCard from "../components/TaskCard";

interface props {
  data: Task[];
  view: string;
}
interface Project {
  id: string;
  title: string;
  color: string;
}
interface Task {
  _id: {
    $oid: string;
  };
  title: string;
  desc: string;
  project?: Project;
  dateAdded: {
    $date: string;
  };
  due: {
    $date: string;
  };
  isDone: boolean;
}

export default function TaskBoard({ data, view }: props) {
  const renderedTasks = data.map((task: Task) => (
    <TaskCard
      key={task._id.$oid}
      id={task._id.$oid}
      title={task.title}
      desc={task.desc}
      dueDate={task.due.$date}
      project={task.project}
      view={view}
    />
  ));
  return <div className="flex flex-col gap-2">{renderedTasks}</div>;
}
