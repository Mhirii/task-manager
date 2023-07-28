import Button from "../components/common/Button.tsx";
import AuthForm from "../components/AuthForm/AuthForm.tsx";
import FormInput from "../components/AuthForm/FormInput.tsx";
import {useDispatch} from "react-redux";
import {login} from "../reducers/loginReducer.ts";
import React, {useState} from "react";
import swal from "sweetalert";
import axios from "axios";
import {authLogin} from "../api.tsx";

export default function LoginPage() {
  const [_username, setUsername] = useState("");
  const [_password, setPassword] = useState("");
  
  const dispatch = useDispatch()
  const onchangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    console.log(_username)
  }
  const onchangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    console.log(_password)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault()
    const username = _username;
    const password = _password;
    dispatch(login({username: username, password: password}))
    
    axios.post(authLogin, {
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        const accessToken = response.data.access_token;
        console.log(accessToken);
        swal({title: "Success!", text: `accessToken: ${accessToken}`})
          .then(r => console.log(r))
        dispatch(login({username: username, password: password, accessToken: accessToken}))
      })
      .catch(function (error) {
        console.log(error);
        swal("Error!", "invalid credentials", "error").then(r => console.log(r))
      });
  }
  
  return (
    <div
      className={`bg-indigo-700 w-screen h-screen flex items-center justify-center`}
    >
      <AuthForm onsubmit={handleSubmit}>
        <h1 className={`text-indigo-700 text-2xl font-medium my-4`}>Login</h1>
        <div className={`inputs my-4 gap-4 flex flex-col`}>
          <FormInput
            label={'Username'}
            id={'loginUsername'}
            type={'text'}
            name={'username'}
            onchange={onchangeUsername}
            value={_username}
          />
          <FormInput
            label={'Password'}
            id={'loginPass'}
            type={'password'}
            name={'password'}
            onchange={onchangePassword}
            value={_password}
          />
        </div>
        
        <div className={`m-4 flex flex-col items-center`}>
          <Button label={`Login`}
          
          />
          <a href="" className={`text-xs font-medium mt-2 text-blue-700`}>forgot my password</a>
        </div>
        
        <p className={`font-medium text-slate-700 text-sm my-4`}>
          Don't have an account?
          <a href="/register" className={`text-indigo-700`}>Register here</a>
        </p>
      </AuthForm>
    </div>
  )
}