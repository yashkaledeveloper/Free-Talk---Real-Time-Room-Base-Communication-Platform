import React, { useEffect, useState } from 'react'
import SearchFilter from '../components/SearchFilter'
import RoomCard from '../components/RoomCard'
import api from '../services/api'
import CreateRoom from '../components/CreateRoom'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({});
  // const rooms = [{
  //   id: 1,
  //   name: "English Speaking Club",
  //   description:
  //     "Practice your English speaking skills with other learners.",
  //   topic: "Daily Conversation",
  //   language: "English",
  //   level: "Intermediate",
  //   maxUsers: 10,
  //   isPrivate: false,
  //   members: [
  //     "user1",
  //     "user2",
  //     "user3",
  //   ],
  // },
  // {
  //   id: 2,
  //   name: "English Speaking Club",
  //   description:
  //     "Practice your English speaking skills with other learners.",
  //   topic: "Daily Conversation",
  //   language: "Hindi",
  //   level: "Beginner",
  //   maxUsers: 10,
  //   isPrivate: false,
  //   members: [
  //     "user1",
  //     "user2",
  //     "user3",
  //   ],
  // }]

  const { user } = useAuth();


  const fetchData = async (parameters) => {
    try {
      const response = await api.get('/rooms/', { params: parameters });
      setCards(response.data.rooms); // Axios auto-parses JSON into response.data
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(params);
  }, [])

  useEffect(() => {
    fetchData(params)
  }, [params])

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <CreateRoom />
      {/* {cards} */}
      <div className="search-filter w-[100%]">
        <SearchFilter setParams={setParams} />
      </div>
      <div className="cards">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mr-12 ml-12">
          {cards.map((room) => (
            // (room.admin._id == )
            <RoomCard key={room._id} room={room}
             isAdmin={(user?._id === room.admin?._id) ? true : false}/>
          ))}
        </div>
        {/* <RoomCard room={room} /> */}
      </div>
    </div>
  )
}

export default Dashboard