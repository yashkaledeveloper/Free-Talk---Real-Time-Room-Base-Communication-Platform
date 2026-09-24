import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';

const RoomCard = ({ room, isAdmin }) => {

  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);

  const { user } = useAuth();

  // useEffect(() => {
  //   const isAdmin = (room.admin._id == user._id) ? true : false 
  //   setAdmin(isAdmin)
  // }, [user && room])

  const handleJoinRoom = async (room) => {
    try {
      const { data } = await api.post(`/rooms/${room._id}/join`);
      toast.success(data.message)
      navigate(`/room/${room._id}/join`)
    } catch (err) {
      toast.error(err.message)
      console.log(err.message)
    }
  }

  const handleDeleteRoom = async () => {
    try {
      const { data } = await api.delete(`/rooms/${room._id}`)
      console.log(data);
      window.location.href = ""
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="border-blue-100 w-full max-w-sm rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md ">

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

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${room.isPrivate
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

        {(isAdmin) ?
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleDeleteRoom}
              className="rounded-lg  bg-red-100 px-4 py-2 hover:bg-red-200"
            >D</button>

            <button
              type="button"
              onClick={() => navigate(`/room/${room._id}/join`)}
              className="rounded-lg  bg-blue-100 px-4 py-2 text-sm font-medium 
          text-blue-600 transition hover:bg-blue-200 active:scale-95"
            >
              Your Room
            </button>
          </div>
          :
          <button
            type="button"
            onClick={() => handleJoinRoom(room)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
          >
            Join Room
          </button>

        }


      </div>
    </div>
  );
};

export default RoomCard;