

export const baseUrl = 'http://localhost:5000'

export function allTasksUrl(){return baseUrl+'/tasks'}
export function tasksUserUrl(userId:string){return baseUrl+`/tasks/${userId}`}
export function tasksIdUrl(taskId:string){return baseUrl+`/tasks/${taskId}`}
export function allUsersUrl(){return baseUrl+`/user`}
export function usersId(userId){return baseUrl+`/user/${userId}`}
export function authLogin(){return baseUrl+`/auth/login`}
export function authRegister(){return baseUrl+`/auth/register`}
export function authLogout(){return baseUrl+`/auth/logout`}
export function authRefresh(){return baseUrl+`/auth/refresh`}

