
import '../../../styles/sidebar-project.css'

interface Props{
  color: "purple" | "blue" | "cyan" | "green" | "yellow" | "orange"
  selected:boolean
}

const SidebarProjectRadio = ({color, selected}:Props) => {
  return (
    <>
      <button type={"button"}
        className={
          `project-radio ${color} ${selected? color+'-active':''}`
        }
      />
    </>
  )
}

export default SidebarProjectRadio