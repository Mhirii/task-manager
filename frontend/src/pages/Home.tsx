import TaskCard from "../components/TaskCard";

function Home() {
  return (
    <div className="p-2 flex flex-wrap gap-2">
      <TaskCard
        title="Task 1"
        description="This is the description of Task 1."
        dueDate="2023-07-15"
      />
      <TaskCard
        title="Task 1"
        description="This is the description of Task 1."
        dueDate="2023-07-15"
      />
      <TaskCard
        title="Task 1"
        description="This is the description of Task 1."
        dueDate="2023-07-15"
      />
      <TaskCard
        title="Task 1"
        description="This is the description of Task 1."
        dueDate="2023-07-15"
      />
      <TaskCard
        title="Task 1"
        description="This is the description of Task 1."
        dueDate="2023-07-15"
      />

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A, nostrum.
      </p>
    </div>
  );
}

export default Home;
