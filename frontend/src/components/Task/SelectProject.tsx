import Project from "../../interfaces/ProjectInterface.ts";


interface Props {
  currentProject: string | undefined;
  projects: Project[];
  onchange: any;
}
const SelectProject = ({currentProject, projects, onchange }: Props) => {

  let current
  if (currentProject === undefined || currentProject === ""){
    current = {
      _id: undefined,
      title:'inbox',
    }
  }else{
    const projectFilter = projects.filter((p)=>{
      return currentProject == p._id
    })
    current = projectFilter[0]
  }
  
  // DELETE ME
  console.log("current",current)
  
  if(!projects) return;
  return (
    <>
      <select name="select-project" id="select-project" onChange={onchange}>
        {current._id ? (
          <option value={current._id}>{current.title}</option>
          ) : (
          <option value={undefined}>INBOX</option>
          )
        }
        {
          projects.map((project) => (
              <option value={(project._id)?project._id:''}>
                {project.title}
              </option>
          ))
        }
        {current._id ? (
        <option value={undefined}>INBOX</option>
          ):(<></>)}
      </select>
    </>
  )
}

export default SelectProject