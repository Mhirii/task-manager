

export const baseUrl = 'http://localhost:5000'
// export const baseUrl = 'https://taskmanager-backend.vercel.app/'
export function allTasksUrl(){return baseUrl+'/tasks'}
export function tasksUserUrl(userId:string){return baseUrl+`/tasks/${userId}`}
export function tasksIdUrl(taskId:string){return baseUrl+`/tasks/${taskId}`}
export function allUsersUrl(){return baseUrl+`/user`}
export function usersId(userId: string){return baseUrl+`/user/${userId}`}
export function usersUsername(username: string){return baseUrl+`/user/username/${username}`}
export function usersTasksInProgress(username: string){return baseUrl+`/user/${username}/tasksInProgress`}
export function usersAddTasksInProgress(username: string, taskId:string){return baseUrl+`/user/${username}/tasksInProgress/${taskId}`}
export function usersDeleteTasksInProgress(username: string, taskId:string){return baseUrl+`/user/${username}/tasksInProgress/${taskId}`}
export function usersTasksDone(username: string){return baseUrl+`/user/${username}/tasksDone`}
export function usersDeleteTasksDone(username: string, taskId:string){return baseUrl+`/user/${username}/tasksDone/${taskId}`}
export function userMoveTask(username: string, taskId: string){return baseUrl+`/user/${username}/moveTask/${taskId}`}
export function userReorderTask(username: string,list:string,taskId: string, currentIndex:number, targetIndex:number){
  return baseUrl+`/user/reorder/${username}/${list}/${taskId}/${currentIndex}/${targetIndex}`
}
export function usersProjects(username: string){return baseUrl+`/user/${username}/projects`}

export function projects(){return baseUrl+`/projects`}
export function usersAddProject(username:string){return baseUrl+`/user/${username}/projects`}
export function userProjectsById(username :string, projectId:string){return baseUrl+`/user/${username}/projects/${projectId}`}

export function projectById(projectId:string){return baseUrl+`/projects/${projectId}`}
export function addTaskToProject(projectId:string, TaskId:string){return baseUrl+`/projects/${projectId}/add/${TaskId}`}
export function removeTaskFromProject(projectId:string, TaskId:string){return baseUrl+`/projects/${projectId}/remove/${TaskId}`}
export function getTasksFromProject(projectId:string){return baseUrl+`tasks/project/${projectId}`}


export function authLogin(){return baseUrl+`/auth/login`}
export function authRegister(){return baseUrl+`/auth/register`}
export function authLogout(){return baseUrl+`/auth/logout`}
export function authRefresh(){return baseUrl+`/auth/refresh`}

