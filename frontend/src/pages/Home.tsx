import { PlusIcon } from "@heroicons/react/24/solid";
import TaskCard from "../components/TaskCard";
import Button from "../components/common/Button";

function Home() {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const today = new Date().toLocaleDateString(undefined, options);

  return (
    <div className=" p-1">
      <div className="grid grid-cols-1 gap-1">
        <TaskCard
          title="Task 1"
          notes="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam suscipit deleniti fugit nihil aliquid tenetur quis corporis quam neque? Officiis?"
          dueDate="2023-07-24"
          project="project 1"
          id="1"
        />
        <TaskCard
          title="Task 2"
          notes="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam suscipit deleniti fugit nihil aliquid tenetur quis corporis quam neque? Officiis?"
          id="2"
          dueDate="2023-07-06"
        />
        <button className="h-12 w-full hidden sm:flex flex-row justify-center items-center ">
          <PlusIcon className="h-5 w-5 text-lime-600" />
          <p className="text-sm font-regular mx-1 text-slate-600">Add task</p>
        </button>

      </div>
      <Button
        icon={<PlusIcon className="w-6 h-6 text-slate-100" />}
        // label="Add"
        className="rounded-full w-12 h-12 fixed z-10 bottom-2 right-2 sm:hidden"
      />

    </div>
  );
}

export default Home;
