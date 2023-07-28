import Button from "../components/common/Button.tsx";
import AuthForm from "../components/AuthForm/AuthForm.tsx";
import FormInput from "../components/AuthForm/FormInput.tsx";
import {useDispatch} from "react-redux";
import {login} from "../reducers/loginReducer.ts";
import React, {useEffect, useRef, useState, useContext} from "react";
import swal from "sweetalert";
import {authLogin} from "../api.tsx";
import AuthContext from "../context/AuthProvider.tsx";
import axios from '../api/axios.tsx'
import {json} from "react-router-dom";

const login_url = '/auth/login'

export default function LoginPage() {
  
  const {setAuth} = useContext(AuthContext)
  
  const userRef = useRef(null)
  const errRef = useRef()
  
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)
  
  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, [])
  
  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])
  
  
  const dispatch = useDispatch()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      const response = await axios.post(
        login_url,
        JSON.stringify({username: user, password: pwd}),
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
      )
      console.log(JSON.stringify(response?.data))
      const accessToken = response?.data?.accessToken;
      setAuth({user, pwd, accessToken})
      setUser('')
      setPwd('')
      setSuccess(true)
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Server error')
      } else if(err.response?.status === 400){
        setErrMsg('Missing credentials')
      } else if (err.response?.status === 401){
        setErrMsg('unauthorized')
      }else{
        setErrMsg('some other error')
      }
    }
  }
  
  return (
    <>
      {success ? (
        <section className={`bg-indigo-700 w-screen h-screen flex items-center justify-center`}>
          <div className={`bg-slate-200 px-8 py-4 rounded-lg shadow-lg flex flex-col items-center`}>
            <h1 className={`text-indigo-700 text-2xl font-medium my-4`}>Logged in Successfully</h1>
            <form action={'/today'}>
              <Button label={`Home`}/>
            </form>
          </div>
        </section>
      ) : (
        <section
          className={`bg-indigo-700 w-screen h-screen flex items-center justify-center`}
        >
          <AuthForm onsubmit={handleSubmit}>
            <p ref={errRef} className={errMsg ? "translate-x-0" : "translate-x-full"}
               aria-live={"assertive"}>{errMsg}</p>
            <h1 className={`text-indigo-700 text-2xl font-medium my-4`}>Login</h1>
            <div className={`inputs my-4 gap-4 flex flex-col`}>
              <FormInput
                reference={userRef}
                label={'Username'}
                id={'loginUsername'}
                type={'text'}
                name={'username'}
                onchange={(e) => setUser((e.target.value))}
                value={user}
                isRequired={true}
              />
              <FormInput
                label={'Password'}
                id={'loginPass'}
                type={'password'}
                name={'password'}
                onchange={(e) => setPwd((e.target.value))}
                value={pwd}
                isRequired={true}
              />
            </div>
            
            <div className={`m-4 flex flex-col items-center`}>
              <Button label={`Login`}/>
              <a href="" className={`text-xs font-medium mt-2 text-blue-700`}>forgot my password</a>
            </div>
            
            <p className={`font-medium text-slate-700 text-sm my-4`}>
              Don't have an account?
              <a href="/register" className={`text-indigo-700`}>Register here</a>
            </p>
          </AuthForm>
        </section>
      )}
    </>
  )
}