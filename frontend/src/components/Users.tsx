import {useState, useEffect} from "react";
import axios from '../api/axios.tsx'

const Users = ()=>{
  const [users, setusers] = useState()
  
  useEffect(()=>{
    let isMounted = true
    const controller = new AbortController()
    
    const getUsers = async() => {
      try{
        const response = await axios.get('/users',{
          signal: controller.signal
        })
        isMounted && setusers(response.data)
      }catch(err){
        console.error(err)
      }
    }
    getUsers()
    
    return() => {
      isMounted = false
      controller.abort()
    }
  },[])
  return (
    <article>
      <h2>users list</h2>
      {
        users?.length
        ?(
          <ul>
            {users.map((user, i) => {<li key={i}>{user?.username}</li>})}
          </ul>
          ) : (
            <p>no users</p>
          )
      }
    </article>
  )
}

export default Users