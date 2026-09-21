import React from "react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {

  const navigate = useNavigate();

  const handleJoinRoom = (room) => {
    navigate(`/room/${room._id}/join`)
  }
  return (
    <div className="w-full max-w-sm rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition hover:shadow-md">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-blue-950">
            {room.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {room.topic}
          </p>
        </div>

        {/* Room Type */}
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            room.isPrivate
              ? "bg-gray-100 text-gray-600"
              : "bg-blue-50 text-blue-600"
          }`}
        >
          {room.isPrivate ? "Private" : "Public"}
        </span>
      </div>

      {/* Room Info */}
      <div className="mt-4 flex gap-2">
        <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
          {room.language}
        </span>

        <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
          {room.level}
        </span>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">
            {room.members?.length || 0}
          </span>
          {" / "}
          {room.maxUsers} members
        </div>

        <button
          type="button"
          onClick={() => handleJoinRoom(room)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default RoomCard;