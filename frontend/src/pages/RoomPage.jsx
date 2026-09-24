import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import socket from '../socket';
import { ToastContainer, toast } from 'react-toastify';

// const room = { _id: "6aabcb36cd64db25b6205c8a", name: "English Practice", description: "Practice English speaking with others", topic: "Conversation", language: "English", level: "Beginner", maxUsers: 10, admin: { _id: "6aabc567fd66102a4ab2c9c3", name: "ashu", username: "ashu", avatar: "", bio: "", }, members: [ { _id: "6aabc567fd66102a4ab2c9c3", name: "ashu", username: "ashu", avatar: "", }, { _id: "6aaa7ac239718ec53239bec3", name: "sarthak", username: "sarthak", avatar: "", }, ], isPrivate: false, };

const RoomPage = () => {

    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [room, setRoom] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("Hello");
    const [msgHistory, setMsgHistory] = useState([]);

    useEffect(() => {
        const fetchMsgs = async () => {
            const { data } = await api.get(`/rooms/${id}/msg`)
            setMsgHistory(data)
        }
        fetchMsgs();
    }, [])

    useEffect(() => {

        socket.emit("join-room", id);

        const handleUserJoined = (data) => {
            console.log("New user joined:", data.socketId);
        };
        socket.on("user-joined", handleUserJoined);

        const handleMessage = (data) => {
            setMessages((prev) => [
                ...prev,
                data
            ])
            // console.log("New message:", data);
        };



        // socket.emit("send-msg", {roomId: id, msg: 'this is frontend msg'})

        socket.on("receive-msg", handleMessage);

        return () => {
            socket.emit("leave-room", id);

            socket.off("user-joined", handleUserJoined);
            socket.off("receive-msg", handleMessage);
        };

    }, [id]);

    const sendMessage = () => {

        if (!message.trim()) return;

        socket.emit("send-msg", {
            roomId: id,
            content: message,
            senderId: user._id
        });


        setMessage("");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get(`/rooms/${id}`);
                setRoom(data.room);
                // await api.post(`/rooms/${id}/join`);
            } catch (error) {
                console.log(error);
                // console.log("Status:", error.response?.status);
                // console.log("Backend message:", error.response?.data);
            }
        };

        fetchData();

    }, [id]);



    const handleLeave = async () => {
        try {
            const { data } = await api.post(`/rooms/${id}/leave`)
            navigate('/')
            toast.success(data.message)
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        }
    }

    const handleDeleteRoom = async () => {
        try {
            const { data } = await api.delete(`/rooms/${id}`)
            navigate('/')
            toast.success(data.message)
        } catch(err) {
            console.log(err)
            toast.error(err.message)
        }
    }
    // return (
    //     <div>
    //         <input
    //             value={message}
    //             onChange={(e) => setMessage(e.target.value)}
    //             placeholder="Type a message..."
    //         />

    //         <button onClick={sendMessage}>
    //             Send
    //         </button>
    //         <div>
    //             {messages.map((msg, index) => (
    //                 <div key={index}>
    //                     {msg.content}
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // )

    return (
        <div className="min-h-screen bg-blue-50">

            {/* Header */}
            <header className="border-b border-blue-100 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

                    <div>
                        <h1 className="text-xl font-semibold text-blue-900">
                            {room?.name}
                        </h1>

                        <p className="text-sm text-gray-500">
                            {room?.description}
                        </p>
                    </div>


                    <div>
                        {
                            (room?.admin?._id !== user?._id) ? <button className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white
                        hover:bg-red-600" onClick={handleLeave}>
                                Leave Room
                            </button> : <button className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white
                        hover:bg-red-600" onClick={handleDeleteRoom}>
                                Delete Room
                            </button>

                        }
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="mx-auto grid max-w-6xl gap-6 px-6 py-6 lg:grid-cols-3">

                {/* Left - Room Info */}
                <section className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">

                    <h2 className="mb-4 text-lg font-semibold text-blue-900">
                        Room Info
                    </h2>

                    <div className="space-y-3 text-sm">

                        <div className="flex justify-between">
                            <span className="text-gray-500">Topic</span>
                            <span className="font-medium text-gray-800">
                                {room.topic}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">Language</span>
                            <span className="font-medium text-gray-800">
                                {room.language}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">Level</span>
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                                {room.level}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">Members</span>
                            <span className="font-medium text-gray-800">
                                {room.members?.length} / {room.maxUsers}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">Room Type</span>
                            <span className="font-medium text-gray-800">
                                {room.isPrivate ? "Private" : "Public"}
                            </span>
                        </div>

                    </div>

                    {/* Admin */}
                    <div className="mt-6 border-t border-gray-100 pt-5">


                    </div>

                    <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-1">

                        {room.members?.map((member) => (
                            <div
                                key={member._id}
                                className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                                        {member.name.charAt(0).toUpperCase()}
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-800">
                                            {member.name}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            @{member.username}
                                        </p>
                                    </div>

                                </div>

                                {member._id === room.admin._id && (
                                    <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600">
                                        Admin
                                    </span>
                                )}

                            </div>
                        ))}

                    </div>



                </section>

                {/* Center - Chat */}
                <section className="flex min-h-[550px] flex-col rounded-xl border border-blue-100 bg-white shadow-sm lg:col-span-2">

                    {/* Chat Header */}
                    <div className="border-b border-blue-100 px-5 py-4">
                        <div className="flex items-center justify-between">

                            <div>
                                <h2 className="font-semibold text-blue-900">
                                    Room Chat
                                </h2>

                                <p className="text-xs text-gray-500">
                                    {room.members?.length} members online
                                </p>
                            </div>

                            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                                🎙️ Join Voice
                            </button>

                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 space-y-4 overflow-y-auto p-5">
                        {msgHistory.map((msg, index) => (
                            <div key={index}>
                                <b>{msg.sender.name}: </b> {msg.content}
                            </div>
                        ))}
                        {messages.map((msg, index) => (
                            <div key={index}>
                                <b>{msg.sender?.name}: </b> {msg.content}
                            </div>
                        ))}
                    </div>

                    {/* Message Input */}
                    <div className="border-t border-blue-100 p-4">

                        <div className="flex gap-3">

                            <input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                            <button onClick={sendMessage} className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
                                Send
                            </button>

                        </div>

                    </div>

                </section>

            </main>

            {/* Members */}
            <section className="mx-auto max-w-6xl px-6 pb-8">


            </section>

        </div>
    );

}

export default RoomPage