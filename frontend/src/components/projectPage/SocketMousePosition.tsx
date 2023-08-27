import {useContext, useEffect, useState} from "react";
import {WebsocketContext} from "../../context/WebsocketContext.tsx";
import {Point} from "../../interfaces/Collaborator.ts";
import {useSelector} from "react-redux";


const SocketMousePosition = (mousePosition: Point) => {
  const socket = useContext(WebsocketContext);
  
  const [socketUsername, setSocketUsername] = useState("")
  
  useEffect(() => {
    socket.on('connect', () =>{
      console.log('Connected to gateway')
    })
    socket.on('onMessage', (data) =>{
      console.log(data)
      setSocketUsername(data.content.username)
    })
    return () => {
      console.log('clean up function')
      socket.off('connect');
      socket.off('onMessage')
    }
  }, []);
  
  const username = useSelector((state: any) => state.user.username)
  const project = useSelector((state: any) => state.projectPage.project._id)
  
  socket.emit('message', {username, project, mousePosition})
  return (
    <>
      <div className={`h-2 w-2 bg-slate-700 rounded-full fixed`} style={{ top: mousePosition.y, left: mousePosition.x }}>{socketUsername}</div>
    </>
  )
}

export default SocketMousePosition