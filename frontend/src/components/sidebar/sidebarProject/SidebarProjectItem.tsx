import {useState} from "react";
import {DeleteOutlined, FullscreenOutlined} from "@ant-design/icons";
import axios from "axios";
import {
  userProjectsById,
} from "../../../api/endPoints.ts";
import {useDispatch, useSelector} from "react-redux";


interface Props {
  name: string,
  color: string,
  numberOfTasks: string,
  id: string,
  hoverState: boolean
  isProjectOpen: boolean
}


export default function SidebarProjectItem({name, color, numberOfTasks, id, hoverState, isProjectOpen}: Props) {
  
  const dispatch = useDispatch();
  
  const username = useSelector((state :any)=> state.auth.username)
  const accessToken = useSelector((state:any) => state.auth.accessToken);
  const config = {
    headers: {Authorization: `Bearer ${accessToken}`},
  };
  
  const [click, setClick] = useState(false);
  const toggleClick = () => {
    setClick(!click)
  };
  const handleDelete = async () => {
    try {
      await axios.delete(userProjectsById(username, id), config)
        .then((response)=>{
          dispatch({
            type: "DELETE_PROJECTS",
            payload: response.data.deletedProject,
          })
        })
      
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  return (
    <li className={`h-12 w-full rounded-lg hover:bg-slate-400 hover:bg-opacity-20 flex flex-row justify-between items-center
																				${isProjectOpen ? "" : "hidden"}
																		`}
        id={id} onClick={toggleClick}
    >
      <div className={"flex flex-row items-center px-2 w-full"}>
        <div className={`${color}-active h-4 w-4  rounded-full`}></div>
        <h6 className={"text-slate-700 ml-2"}>
          {name}
        </h6>
      </div>
      <p className={`font-medium text-sm text-slate-500  px-4  transition-opacity duration-300
									${hoverState ? "opacity-70" : "opacity-0"}
									${click? "hidden" : ""}
								`}>
        {numberOfTasks}
      </p>
      <div className={`${(click)? "" : "hidden"} absolute right-8 flex flex-row p-2`}>
        <button
          className={`w-10 h-10 z-10 hover:bg-slate-400 hover:bg-opacity-20 p-2 rounded-lg flex items-center justify-center`}
          onClick={handleDelete}>
          <DeleteOutlined className={`pb-1 transition-all duration-300 text-xl text-center text-slate-500`}/>
        </button>
        <button
        className={`w-10 h-10 z-10 hover:bg-slate-400 hover:bg-opacity-20 p-2 rounded-lg flex items-center justify-center`}
        onClick={()=>console.log('hi')}>
        <FullscreenOutlined className={`pb-1 transition-all duration-300 text-xl text-center text-slate-500`}/>
      </button>
      </div>
    </li>
  )
}