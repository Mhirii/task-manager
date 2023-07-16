interface props {
  project?: {
    id: string;
    title: string;
    color: string;
  };
}
export default function ProjectBadge({ project }: props) {
  const color = `bg-${project?.color}-500`;
  // console.log(color);

  const circleStyle =  "w-3 h-3 rounded-full " + color;
  const textStyle = "text-xs font-medium uppercase text-slate-500";
  return (
    <div className="flex flex-row gap-1 items-end">
      {project ? (
        <div className="flex items-center justify-center gap-2 ">
          <p className={textStyle}>{project.title}</p>
          <div className={circleStyle}></div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <p className={`text-xs font-semibold text-slate-500 uppercase`}>
            Inbox
          </p>
          <div className={`w-3 h-3 bg-slate-500 rounded-full`}></div>
        </div>
      )}
    </div>
  );
}
