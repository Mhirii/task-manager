import WorkspaceLayout from "../components/common/WorkspaceLayout.tsx";

export const AllTasks = () => {
  return (
    <>
      
      <WorkspaceLayout currentPage={'All Tasks'} showView={true} >
        <div className=" p-1 w-full flex  justify-center">
          <div className="grid grid-cols-1 gap-1 sm:w-4/5 lg:w-2/3 w-full">
            <h6 className={`text-slate-500 font-medium py-2 my-2`}>All Tasks</h6>
          </div>
        </div>
      </WorkspaceLayout>
    </>
  );
};