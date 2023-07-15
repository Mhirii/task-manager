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

export default function TaskBoard({data, view}: props) {
		let board: any;
		if (view === "List") {
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
				board = (<div className="flex flex-col gap-2">{renderedTasks}</div>);
		} else {
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
