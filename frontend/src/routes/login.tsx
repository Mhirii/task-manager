import Button from "../components/common/Button.tsx";
import AuthForm from "../components/AuthForm/AuthForm.tsx";
import FormInput from "../components/AuthForm/FormInput.tsx";

export default function LoginPage() {
  return (
    <div
      className={`bg-indigo-700 w-screen h-screen flex items-center justify-center`}
    >
      <AuthForm>
        <h1 className={`text-indigo-700 text-2xl font-medium my-4`}>Login</h1>
        <div className={`inputs my-4 gap-4 flex flex-col`}>
          <FormInput
            label={'Email'}
            id={'loginEmail'}
            type={'email'}
            name={'email'}
          />
          <FormInput
            label={'Password'}
            id={'loginPass'}
            type={'password'}
            name={'password'}
          />
        </div>
        
        <div className={`m-4 flex flex-col items-center`}>
          <Button label={`Login`} />
          <a href="" className={`text-xs font-medium mt-2 text-blue-700`}>forgot my password</a>
        </div>
        
        <p className={`font-medium text-slate-700 text-sm my-4`}>Don't have an account? <a href="register" className={`text-indigo-700`}>Register here</a></p>
      </AuthForm>
    </div>
  )
}