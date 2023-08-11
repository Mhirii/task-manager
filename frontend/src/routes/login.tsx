import Button from "../components/common/Button.tsx";
import AuthForm from "../components/AuthForm/AuthForm.tsx";
import FormInput from "../components/AuthForm/FormInput.tsx";
import React, {useEffect, useRef, useState} from "react";
import axios from '../api/axios.tsx'
import useAuth from "../hooks/useAuth.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "../redux/reducers/AuthReducer.ts";
import {initUser} from '../redux/reducers/userReducer.ts'
// @ts-ignore
import {AxiosResponse} from "axios/index";
import {axiosUserInfo} from '../api/initialFetch.ts'
// import {Link, useNavigate, useLocation} from "react-router-dom";

const login_url = '/auth/login'


export function axiosLogin(username: string, password: string): AxiosResponse<any, any> {
  return axios.post(
    login_url,
    JSON.stringify({username: username, password: password}),
    {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
      // withCredentials: true
    }
  )
}

export default function LoginPage() {
  
  const dispatch = useDispatch()
  
  // @ts-ignore
  const {setAuth} = useAuth()
  
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
  
  const userRef = useRef(null)
  const errRef = useRef()
  
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  
  useEffect(() => {
    if (userRef.current) {
      // @ts-ignore
      userRef.current.focus();
    }
  }, [])
  
  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      const response = await axiosLogin(user, pwd)
      const accessToken = response?.data?.access_token;
      const refreshToken = response?.data?.refresh_token;
      const username = user;
      
      setAuth({user, pwd, accessToken})
      dispatch(login({username, accessToken, refreshToken}))
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`
        },
        // withCredentials: true,
        mode: 'no-cors',
      }
      
      const userResponse = await axiosUserInfo(username, config)
      const id = userResponse?.data?._id
      const tasksInProgress = userResponse?.data?.tasksInProgress
      const tasksDone = userResponse?.data?.tasksDone
      dispatch(initUser({id, username, tasksInProgress, tasksDone}))

      setUser('')
      setPwd('')
      
      navigate(from, {replace: true})
      navigate('/today')
      
    } catch (err) {
      // @ts-ignore
      if (!err?.response) {
        setErrMsg('Server error')
      } else { // @ts-ignore
        if (err.response?.status === 400) {
          setErrMsg('Missing credentials')
        } else { // @ts-ignore
          if (err.response?.status === 401) {
            setErrMsg('unauthorized')
          } else {
            setErrMsg('some other error')
          }
        }
      }
    }
  }
  
  return (
    <section
      className={`bg-indigo-700 w-screen h-screen flex items-center justify-center`}
    >
      <AuthForm onsubmit={handleSubmit}>
        {/*@ts-ignore*/}
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
            //@ts-ignore
            onchange={(e) => setUser((e.target.value))}
            value={user}
            isRequired={true}
          />
          <FormInput
            label={'Password'}
            id={'loginPass'}
            type={'password'}
            name={'password'}
            //@ts-ignore
            onchange={(e) => setPwd((e.target.value))}
            value={pwd}
            isRequired={true}
          />
        </div>
        
        <div className={`m-4 flex flex-col items-center`} role={'submitLogin'}>
          <Button label={`Login`}/>
          <a href="" className={`text-xs font-medium mt-2 text-blue-700`}>forgot my password</a>
        </div>
        
        <p className={`font-medium text-slate-700 text-sm my-4`}>
          Don't have an account?
          <a href="/register" className={`text-indigo-700`}>Register here</a>
        </p>
      </AuthForm>
    </section>
  
  )
}