import {useSelector} from "react-redux";
import Project from "../../interfaces/ProjectInterface.ts";

interface props {
  projectId: string | undefined;
}
export default function ProjectBadge({ projectId }: props) {
  const projects: Project[] = useSelector((state: any) => state.projects.projects)
  const projectFilter = projects.filter((p)=>{
    return projectId == p._id
  })
  const project = projectFilter[0]
  // console.log(project)
  const color = `bg-${project?.color}-500`;
  
  const circleStyle =  "w-3 h-3 rounded-full " + color;
  const textStyle = "text-xs font-semibold text-slate-500 uppercase";
  
  return (
    <div className="flex flex-row gap-1 items-end">
      {project ? (
        <div className="flex items-center justify-center gap-2 ">
          <p className={textStyle}>
            {project.title}
          </p>
          <div className={circleStyle}></div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <p className={textStyle}>
            Inbox
          </p>
          <div className={`w-3 h-3 bg-slate-500 rounded-full`}></div>
        </div>
      )}
    </div>
  );
}
