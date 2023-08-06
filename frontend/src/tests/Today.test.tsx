import Today from "../routes/Today.tsx";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import store from "../store.ts";
import userEvent from "@testing-library/user-event";


const page = (
  <Provider store={store}>
    <Today/>
  </Provider>
)

it('should load today page', async () => {
  render(page)
  // general layout
  expect(screen.getByText('List')).toBeInTheDocument()
  expect(screen.getByText('Add task')).toBeInTheDocument()
  expect(screen.getByRole('togglesSidebar')).toBeInTheDocument()
  
  // check if sidebar is loaded
  expect(screen.getByText('Activity')).toBeInTheDocument()
  expect(screen.getByText('All Tasks')).toBeInTheDocument()
  expect(screen.getByText('Upcoming')).toBeInTheDocument()
  expect(screen.getByText('Activity')).toBeInTheDocument()
  expect(screen.getByText('Projects')).toBeInTheDocument()
  expect(screen.getByText('Logout')).toBeInTheDocument()
});


const user = userEvent.setup()
const userClick = async (link: HTMLElement) => {
  await user.click(link)
}
const expectCall = async ({screenGet}:any) => {
  const name = vi.spyOn(user, 'click')
  const nameButton = screenGet
  await userClick(nameButton)
  expect(name).toHaveBeenCalledTimes(1)
}

it('should call Add task', async () => {
  render(page)
  await expectCall(screen.getByText('Add task'))
})
it('should change view', async () => {
  render(page)
  await expectCall(screen.getByText('List'))
})
it('should toggle sidebar', async () => {
  render(page)
  await expectCall(screen.getByRole('togglesSidebar'))
})

