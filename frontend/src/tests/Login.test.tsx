import {render, screen} from "@testing-library/react";
import LoginPage from "../routes/login.tsx";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";


const mockStore = createStore(() => ({}));
const page = (
  <BrowserRouter>
    <Provider store={mockStore}>
      <LoginPage/>
    </Provider>
  </BrowserRouter>
)
it('should display login components', async () => {
  render(page)
  
  expect(screen.getByLabelText('Username')).toBeInTheDocument()
  expect(screen.getByLabelText('Password')).toBeInTheDocument()
  expect(screen.getByRole('submitLogin')).toBeInTheDocument()
  expect(screen.getByText('forgot my password')).toBeInTheDocument()
  expect(screen.getByText('Register here')).toBeInTheDocument()
});


const user = userEvent.setup()
const userClick = async (link: HTMLElement) => {
  await user.click(link)
}
it('should call submit login', async () => {
  render(page)
  const login = vi.spyOn(user, 'click')
  const loginButton = screen.getByRole('submitLogin')
  await userClick(loginButton)
  expect(login).toHaveBeenCalledTimes(1)
})
it('should call register', async () => {
  render(page)
  const register = vi.spyOn(user, 'click')
  const registerLink = screen.getByText('Register here')
  await userClick(registerLink)
  expect(register).toHaveBeenCalledTimes(1)
})

// TODO: test if the login actually happens
