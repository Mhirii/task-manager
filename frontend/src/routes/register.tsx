import Button from "../components/common/Button.tsx";
import AuthForm from "../components/AuthForm/AuthForm.tsx";
import FormInput from "../components/AuthForm/FormInput.tsx";
import {useRef, useState, useEffect} from "react";
import axios from '../api/axios.tsx'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,30}$/;

const register_url = "/auth/register"

export default function RegisterPage() {
  const userRef = useRef(null);
  const errRef = useRef();
  
  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)
  
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  // @ts-ignore
  const [emailFocus, setEmailFocus] = useState(false)
  
  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)
  
  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  // @ts-ignore
  const [matchFocus, setMatchFocus] = useState(false)
  
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)
  
  // set focus on load
  useEffect(() => {
    if (userRef.current) {
      // @ts-ignore
      userRef.current.focus();
    }
  }, [])
  
  // username validation
  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user])
  
  // email validation
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email])
  
  // password validation
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd])
  
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])
  
  // @ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault()
    const doubleCheckUser = USER_REGEX.test(user)
    const doubleCheckEmail = EMAIL_REGEX.test(email)
    const doubleCheckPwd = PWD_REGEX.test(pwd)
    if (!doubleCheckUser || !doubleCheckPwd || !doubleCheckEmail) {
      setErrMsg("Invalid!")
      return;
    }
    try {
      const response = await axios.post(
        register_url,
        JSON.stringify({username: user, email: email, password: pwd}),
        {
          headers: {'Content-type': 'application/json'},
          withCredentials: true
        }
      )
      console.log(response.data)
      // @ts-ignore
      console.log(response.accessToken)
      console.log(JSON.stringify(response))
      setSuccess(true);
      
    } catch (err) {
      // @ts-ignore
      if(!err?.response){
        setErrMsg('server error')
      }else { // @ts-ignore
        if(err.response?.status === 409){
                setErrMsg('email taken')
              }else{
                setErrMsg('some error happened')
              }
      }
    }
  }
  
  return (
    <>
      {success ? (
        <section className={`bg-indigo-700 w-screen h-screen flex items-center justify-center`}>
          <div className={`bg-slate-200 px-8 py-4 rounded-lg shadow-lg flex flex-col items-center`}>
            <h1 className={`text-indigo-700 text-2xl font-medium my-4`}>Registered Successfully</h1>
            <form action={'/login'}>
              <Button label={`Login`} />
            </form>
          </div>
        </section>
      ) : (
        
        <section
          className={`bg-indigo-700 w-screen h-screen flex items-center justify-center`}
        >
          <AuthForm onsubmit={handleSubmit}>
            {/*@ts-ignore*/}
            <p ref={errRef} className={errMsg ? "translate-x-0" : "translate-x-full"}
               aria-live={"assertive"}>{errMsg}</p>
            <h1 className={`text-indigo-700 text-2xl font-medium my-4`}>Register</h1>
            <div className={`inputs my-4 gap-4 flex flex-col`}>
              <FormInput
                reference={userRef}
                label={validName || !user ? 'Username' : "Invalid Username!"}
                id={'loginUsername'}
                type={'text'}
                name={'username'}
                // @ts-ignore
                onchange={(e) => setUser(e.target.value)}
                isRequired={true}
                ariaInvalid={validName ? "false" : "true"}
                ariaDescribedBy={"userDescBy"}
                onfocus={() => setUserFocus(true)}
                onblur={() => setUserFocus(false)}
              />
              {/*shows when user input is focused and has something in it*/}
              <p id={"userDescBy"} className={`${userFocus && user && !validName ? "" : "hidden"} text-sm`}>
                4 to 24 Characters <br/>
                Must begin with a letter <br/>
                Letters, numbers, <br/>
                underscores, hyphens allowed.
              </p>
              <FormInput
                label={validEmail || !email ? 'Email' : "Invalid Email!"}
                id={'loginEmail'}
                type={'email'}
                name={'email'}
                // @ts-ignore
                onchange={(e) => setEmail(e.target.value)}
                ariaInvalid={validEmail ? "false" : "true"}
                isRequired={true}
                onfocus={() => setEmailFocus(true)}
                onblur={() => setEmailFocus(false)}
              />
              <FormInput
                label={validPwd || !pwd ? 'Password' : "Invalid Password!"}
                id={'loginPass'}
                type={'password'}
                name={'password'}
                // @ts-ignore
                onchange={(e) => setPwd(e.target.value)}
                // value={_username}
                isRequired={true}
                ariaInvalid={validPwd ? "false" : "true"}
                ariaDescribedBy={"pwdDescBy"}
                onfocus={() => setPwdFocus(true)}
                onblur={() => setPwdFocus(false)}
              />
              <p id={"pwdDescBy"} className={`${pwdFocus && pwd && !validPwd ? "" : "hidden"} text-sm`}>
                8 to 30 Characters <br/>
                Must include uppercase,<br/>
                lowercase<br/>
                and a number<br/>
              </p>
              <FormInput
                label={validMatch || !matchPwd ? 'Confirm Password' : "Invalid Password!"}
                id={'loginPass2'}
                type={'password'}
                name={'password2'}
                // @ts-ignore
                onchange={(e) => setMatchPwd(e.target.value)}
                // value={_username}
                isRequired={true}
                ariaInvalid={validMatch ? "false" : "true"}
                onfocus={() => setMatchFocus(true)}
                onblur={() => setMatchFocus(false)}
              />
            </div>
            
            <div className={`m-4 flex flex-col items-center`}>
              <Button label={`Create Account`}/>
            </div>
            
            <p className={`font-medium text-slate-700 text-sm my-4`}>Already have an account? <a href="login"
                                                                                                 className={`text-indigo-700`}>Login
              here</a></p>
          </AuthForm>
        </section>
      )}
    
    </>
  )
}