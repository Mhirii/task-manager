

export const baseUrl = 'http://localhost:5000'
// export const baseUrl = 'https://taskmanager-backend.vercel.app/'
export function allTasksUrl(){return baseUrl+'/tasks'}
export function tasksUserUrl(userId:string){return baseUrl+`/tasks/${userId}`}
export function tasksIdUrl(taskId:string){return baseUrl+`/tasks/${taskId}`}
export function allUsersUrl(){return baseUrl+`/user`}
export function usersId(userId: string){return baseUrl+`/user/${userId}`}
export function usersUsername(username: string){return baseUrl+`/user/username/${username}`}
export function usersTasksInProgress(username: string){return baseUrl+`/user/${username}/tasksInProgress`}
export function usersDeleteTasksInProgress(username: string, taskId:string){return baseUrl+`/user/${username}/tasksInProgress/${taskId}`}
export function usersTasksDone(username: string){return baseUrl+`/user/${username}/tasksDone`}
export function usersDeleteTasksDone(username: string, taskId:string){return baseUrl+`/user/${username}/tasksDone/${taskId}`}
export function userMoveTask(username: string, taskId: string){return baseUrl+`/user/${username}/moveTask/${taskId}`}
export function userReorderTask(username: string,list:string,taskId: string, currentIndex:number, targetIndex:number){
  return baseUrl+`/user/reorder/${username}/${list}/${taskId}/${currentIndex}/${targetIndex}`
}

export function authLogin(){return baseUrl+`/auth/login`}
export function authRegister(){return baseUrl+`/auth/register`}
export function authLogout(){return baseUrl+`/auth/logout`}
export function authRefresh(){return baseUrl+`/auth/refresh`}

