import WorkspaceLayout from "../components/common/WorkspaceLayout.tsx";

export const Activity = () => {
  return (
    <>
      
      <WorkspaceLayout currentPage={'Activity'} showView={false}>
        <div className=" p-1 w-full flex  justify-center">
          <div className="grid grid-cols-1 gap-1 sm:w-4/5 lg:w-2/3 w-full">
            <h6 className={`text-slate-500 font-medium py-2 my-2`}>Activity</h6>
          </div>
        </div>
      </WorkspaceLayout>
    </>
  );
};