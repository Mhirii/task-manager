import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import RegisterPage from "../routes/register.tsx";
import userEvent from "@testing-library/user-event";



const page = (
  <BrowserRouter>
      <RegisterPage/>
  </BrowserRouter>
)
it('should display register components', async () => {
  render(page)
  
  expect(screen.getByLabelText('Username')).toBeInTheDocument()
  expect(screen.getByLabelText('Email')).toBeInTheDocument()
  expect(screen.getByLabelText('Password')).toBeInTheDocument()
  expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument()
  expect(screen.getByText('Create Account')).toBeInTheDocument()
  expect(screen.getByText('Login here')).toBeInTheDocument()

});

const user = userEvent.setup()
const userClick = async (link: HTMLElement) => {
  await user.click(link)
}
it('should call create account', async () => {
  render(page)
  const register = vi.spyOn(user, 'click')
  const registerButton = screen.getByText('Create Account')
  await userClick(registerButton)
  expect(register).toHaveBeenCalledTimes(1)
})
it('should call login', async () => {
  render(page)
  const login = vi.spyOn(user, 'click')
  const loginLink = screen.getByText('Login here')
  await userClick(loginLink)
  expect(login).toHaveBeenCalledTimes(1)
})

// TODO: test if the register actually happens