import {useContext, useEffect, useState} from "react";
import {WebsocketContext} from "../../context/WebsocketContext.tsx";
import {Point} from "../../interfaces/Collaborator.ts";
import {useSelector} from "react-redux";


const SocketMousePosition = (mousePosition: Point) => {
  const socket = useContext(WebsocketContext);
  
  const [socketUsername, setSocketUsername] = useState('')
  const [mousePosX, setMousePosX] = useState(0)
  const [mousePosY, setMousePosY] = useState(0)
  
  const username = useSelector((state: any) => state.user.username)
  const project = useSelector((state: any) => state.projectPage.project._id)
  
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to gateway')
    })
    socket.on('onMessage', (data) => {
      if (data.msg === "new Mouse Movement") {
          if (data.content.username !== username) {
            setSocketUsername(data.content.username)
            setMousePosX(data.content.mousePosition.x)
            setMousePosY(data.content.mousePosition.y)
          }
        }
    })
    return () => {
      console.log('clean up function')
      socket.off('connect');
      socket.off('onMessage')
    }
  }, []);
  socket.emit('message', {username, project, mousePosition})
  if (socketUsername === '') return;
  return (
    <>
      {/*<div>{socketUsername}: {JSON.stringify(mousePosition)}</div>*/}
      <div className={`h-2 w-2 bg-slate-700 rounded-full fixed`}
           style={{top: mousePosY, left: mousePosX}}><h1
        className={`text-slate-700 opacity-60 pt-2 text-xs font-medium`}>{socketUsername}</h1></div>
    
    </>
  )
}

export default SocketMousePosition
