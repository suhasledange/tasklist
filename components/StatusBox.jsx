import React from "react";

const StatusBox = ({ currentStatus, hovered, onChangeStatus }) => {
  if (!hovered) return null;

  return (
     
      <div className="absolute -left-52 top-5 z-10 bg-white border-gray-300 shadow-lg shadow-slate-400 px-5 py-6 pt-2 mt-2">
        <div>
            <h1 className="uppercase font-medium py-4 pt-3">Status</h1>
        </div>
        <div>
        <button
          className={`px-8 py-2 ${
            currentStatus === "Open" ? "bg-orange-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => onChangeStatus("Open")}
        >
          Open
        </button>
        <button
          className={`px-8 py-2 ${
            currentStatus === "Closed" ? "bg-orange-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => onChangeStatus("Closed")}
        >
          Closed
        </button>
        </div>
       
      </div>
  );
};

export default StatusBox;
