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
      <Button
        icon={<PlusIcon className="w-6 h-6 text-slate-100" />}
        // label="Add"
        className="rounded-full w-14 h-14 fixed z-10 bottom-2 right-2
        md:rounded-lg md:w-auto md:h-auto md:relative  "
      />

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
      </div>
    </div>
  );
}

export default Home;
