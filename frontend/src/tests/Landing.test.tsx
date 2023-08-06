import Landing from '../routes/Landing.tsx'
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// TODO: FIX PARALLAX ISSUE
import Greeter from "../components/landingPage/Greeter.tsx";
import {ParallaxProvider} from "react-scroll-parallax";


const user = userEvent.setup()
const userClick = async (link:HTMLElement) =>{ await user.click(link)}

it('Landing page should load', async () => {
  // ARRANGE
  render(<Landing/>)
  expect(screen.getByText('Login')).toBeInTheDocument()
  
  // ACT
  const login = vi.spyOn(user,'click')
  const loginLink = screen.getByText('Login')
  
  // ASSERT
  await userClick(loginLink)
  expect(login).toHaveBeenCalledTimes(1)
});


/*fix parallax issue*/

it('greeting section should load', async () => {
  render(<Greeter/>, {wrapper: ParallaxProvider})
  expect(screen.getByText('Join us')).toBeInTheDocument()
  const joinUs = vi.spyOn(user, 'click')
  const joinUsLink = screen.getByText('Join us')
  
  await userClick(joinUsLink)
  expect(joinUs).toHaveBeenCalledTimes(1)
});
