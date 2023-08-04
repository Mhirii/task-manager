import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import LoginPage from '../../routes/login.tsx'
import {fireEvent, waitFor, render, screen} from "@testing-library/react";
import axios from "../../api/axios.tsx";
import MockAdapter from "axios-mock-adapter";

const mockAxios = new MockAdapter(axios);

describe("LoginPage", () => {
  // Mock the successful login response
  const mockLoginResponse = {
    data: {
      access_token: "mock_access_token",
      refresh_token: "mock_refresh_token",
    },
  };
  
  beforeEach(() => {
    render(<LoginPage/>);
  });
  
  afterEach(() => {
    // Clear mock history and reset the inputs
    mockAxios.reset();
    screen.getByLabelText("Username").value = "";
    screen.getByLabelText("Password").value = "";
  });
  
  
  test('submits username and password', async () => {
    
    
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    
    fireEvent.change(usernameInput, {target: {value: "User1234"}});
    fireEvent.change(passwordInput, {target: {value: "1234"}});
    
    // Mock the login response with success
    mockAxios.onPost("/auth/login").reply(200, mockLoginResponse);
    
    fireEvent.click(screen.getByText("Login"));
    
    await waitFor(() => {
      expect(window.location.pathname).toEqual("/today");
    });
  })
})