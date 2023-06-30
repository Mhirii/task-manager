import TaskCard from "../components/TaskCard";

function Home() {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const today = new Date().toLocaleDateString(undefined, options);

  return (
    <div className="p-2 mt-8 ">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold mb-2">Today's Tasks</h1>
        <h1 className="text-xl font-medium mb-2 hidden sm:inline-flex">
          {today}
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        <TaskCard
          title="Task 1"
          notes="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam suscipit deleniti fugit nihil aliquid tenetur quis corporis quam neque? Officiis?"
          dueDate="2023-07-24"
          project="project 1"
        />
        <TaskCard
          title="Task 1"
          notes="Lorem ipsum dolor, 
         "
          dueDate="2023-07-01"
        />
        <TaskCard
          title="Task 1"
          notes="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam suscipit deleniti fugit nihil aliquid tenetur quis corporis quam neque? Officiis?
         "
          dueDate="2023-07-02"
        />
        <TaskCard
          title="Task 1"
          notes="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam suscipit deleniti fugit nihil aliquid tenetur quis corporis quam neque? Officiis?
         "
          dueDate="2023-07-15"
        />
        <TaskCard
          title="Task 1"
          notes="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam suscipit deleniti fugit nihil aliquid tenetur quis corporis quam neque? Officiis?
         "
          dueDate="2023-07-31"
        />
      </div>
    </div>
  );
}

export default Home;
