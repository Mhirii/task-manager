import  { createContext, useState} from "react";

const AuthContext = createContext({})


// @ts-ignore
export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({})
  // console.log('authProvider',auth)
  
  return(
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
)
}

export default AuthContext;