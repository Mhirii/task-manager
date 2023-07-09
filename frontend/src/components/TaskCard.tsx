import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  CalendarDaysIcon,
  CalendarIcon,
  FolderIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";

interface CardProps {
  id: string;
  title: string;
  notes?: string;
  dueDate: string;
  project?: string;
}

const Card: React.FC<CardProps> = ({ title, notes, dueDate, id, project }) => {
  //#region Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const shortNotes =
    (notes ?? "").length > 60 ? `${(notes ?? "").slice(0, 60)}...` : notes;
  //#endregion

  const newdate = new Date(dueDate);

  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  const newDueDate = newdate.toLocaleDateString(undefined, options);

  //#endregion

  return (
    <div
      className="flex flex-row justify-between gap-2 p-2
      bg-slate-100 rounded-lg border border-slate-200 
      hover:shadow
      transition-all
      "
    >
      <div className="task-check">
        <input type="checkbox" id={id} className="hidden" />
        <label htmlFor={id} className="check">
          <svg width="32px" height="32px" viewBox="0 0 18 18">
            <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
            <polyline points="1 9 7 14 15 4"></polyline>
          </svg>
        </label>
      </div>
      <div className="content">
        <h3 className="text-base md:text-lg font-medium text-slate-800">
          {title}
        </h3>
        <p className="text-xs md:text-sm font-light text-slate-600">{notes}</p>
        <div className="task-footer flex flex-row justify-between">
          <div className="flex flex-row gap-1">
            <CalendarDaysIcon className="h-4 w-4 text-slate-500" />
            <p className="text-xs font-semibold text-slate-500 uppercase">
              {newDueDate}
            </p>
          </div>
          <div className="flex flex-row gap-1 items-end">
            {project ? (
              <>
                <p className="text-xs font-semibold text-slate-500 uppercase">
                  {project}
                </p>
                <FolderIcon className="h-4 w-4 text-slate-500" />
              </>
            ) : (
              <>
                <p className="text-xs font-semibold text-slate-500 uppercase">
                  Inbox
                </p>
                <FolderIcon className="h-4 w-4 text-slate-500" />
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <ChevronDownIcon className="w-6" />
      </div>
    </div>
  );
};

export default Card;
