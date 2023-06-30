import React, { useState } from "react";

interface CardProps {
  title: string;
  description: string;
  dueDate: string;
}

const Card: React.FC<CardProps> = ({ title, description, dueDate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click event propagation
    setIsModalOpen(false);
  };

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

  //#endregion

  return (
    <div className="task-card" onClick={openModal}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-gray-500">Due Date: {dueDate}</p>
      <p className="text-gray-500">Time Left: {timeLeft}</p>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-30">
          <div className="modal bg-white p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-gray-500">Due Date: {dueDate}</p>
            <p className="text-gray-500">Time Left: {timeLeft}</p>
            <button
              className="bg-gray-200 px-2 py-1 rounded-md"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
