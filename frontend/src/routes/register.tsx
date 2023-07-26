import Button from "../components/common/Button.tsx";
import AuthForm from "../components/AuthForm/AuthForm.tsx";
import FormInput from "../components/AuthForm/FormInput.tsx";

export default function RegisterPage() {
  return (
    <div
      className={`bg-indigo-700 w-screen h-screen flex items-center justify-center`}
    >
      <AuthForm>
        <h1 className={`text-indigo-700 text-2xl font-medium my-4`}>Register</h1>
        <div className={`inputs my-4 gap-4 flex flex-col`}>
          <FormInput
            label={'Username'}
            id={'loginUsername'}
            type={'text'}
            name={'username'}
          />
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
          <FormInput
            label={'Validate Password'}
            id={'loginPass2'}
            type={'password'}
            name={'password2'}
          />
        </div>
        
        <div className={`m-4 flex flex-col items-center`}>
          <Button label={`Create Account`} />
        </div>
        
        <p className={`font-medium text-slate-700 text-sm my-4`}>Already have an account? <a href="login" className={`text-indigo-700`}>Login here</a></p>
      </AuthForm>
    </div>
  )
}