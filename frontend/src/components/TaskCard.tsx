import React, { useState } from "react";

interface CardProps {
  title: string;
  notes?: string;
  dueDate: string;
  project?: string;
}

const Card: React.FC<CardProps> = ({ title, notes, dueDate, project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const shortNotes = notes.length > 60 ? `${notes.slice(0, 60)}...` : notes;

  //# time left
  const currentDate: Date = new Date();
  const formattedDueDate: Date = new Date(dueDate);
  const timeDiff: number = Math.abs(
    formattedDueDate.getTime() - currentDate.getTime()
  );
  let timeLeft: string;

  if (timeDiff < 86400000) {
    // Less than a day (24 hours)
    const hoursLeft: number = Math.ceil(timeDiff / (1000 * 3600));
    timeLeft = `${hoursLeft} hour${hoursLeft !== 1 ? "s" : ""} left`;
  } else {
    const daysLeft: number = Math.ceil(timeDiff / (1000 * 3600 * 24));
    timeLeft = `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`;
  }

  const date = new Date(dueDate);

  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  const newDueDate = date.toLocaleDateString(undefined, options);

  //#endregion

  return (
    <div className="task-card flex justify-between" onClick={openModal}>
      <div className="flex flex-col">
        <div>
          {project ? (
            <>
              <h3 className="text-xs font-thin text-gray-600 uppercase ">
                {project}
              </h3>
              <h3 className="text-lg font-medium mb-2 leading-4">{title}</h3>
            </>
          ) : (
            <h3 className="text-lg font-medium mb-2">{title}</h3>
          )}
        </div>
        <p className="text-gray-600 mb-4  ">{shortNotes}</p>
      </div>
      <div className=" flex justify-between items-end">
        <div>
          <p className="text-gray-500 text-xs font-light -mb-1">Due</p>
          <p className="text-gray-500 text-xs sm:text-sm font-regular leading-none">
            {newDueDate}
          </p>
        </div>
        <p className="text-gray-500 text-xs sm:text-sm font-medium leading-3">
          {timeLeft}
        </p>
      </div>
      {isModalOpen && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="modal">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 mb-4 flex-shrink">{notes}</p>
              </div>
              <div className=" flex justify-between">
                <p className="text-gray-500">Due {dueDate}</p>
                <p className="text-gray-500 ">{timeLeft}</p>
              </div>
              <div className="modal-buttons p-1 mt-4 flex  justify-between flex-row-reverse">
                <button className="bg-indigo-300 px-4 py-2 rounded-md hover:brightness-95 transition-all">
                  Finished
                </button>
                <button
                  className="bg-gray-200 px-4 py-2 rounded-md hover:brightness-95 transition-all"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
