import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import api from "../services/api";
import { useState } from "react";

const Profile = () => {
  const { user } = useAuth();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const following = await api.get("/users/following");
      setFollowing(following.data.following);
      const followers = await api.get("/users/followers");
      setFollowers(followers.data.followers);
    }
    fetchData()
  }, [followers & following])

  const handleFollow = async (userId, isFollow) => {
    if (isFollow) {
      await api.delete(`/users/${userId}/follow`)
    } else {
      await api.post(`/users/${userId}/follow`)
    }
    console.log(userId, isFollow)
  }

  if (!user) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-blue-50">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-blue-50 px-4 py-10">
      <div className="mx-auto max-w-lg">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-blue-100">

          {/* Profile Header */}
          <div className="flex flex-col items-center px-6 py-8 text-center sm:px-10">
            <img
              src='https://static.thenounproject.com/png/638636-200.png'
              alt={user.username}
              className="h-24 w-24 object-cover ring-4 ring-blue-50"
            />

            <h1 className="mt-5 text-2xl font-semibold text-gray-900">
              {user.name}
            </h1>

            <p className="mt-1 text-sm text-blue-500">
              @{user.username}
            </p>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
              {user.bio || "No bio yet"}
            </p>
          </div>

          {/* Stats */}
          <div className="border-t border-gray-100">
            <div className="grid grid-cols-2">
              <div className="px-4 py-5 text-center">
                <p className="text-xl font-semibold text-gray-900">
                  {user.followers?.length || 0}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Followers
                </p>

                <ul style={{ marginTop: '20px' }}>
                  {
                    followers.map(item => <li key={item._id} className="my-2 grid grid-cols-2">
                      {item.name}
                      <button onClick={() => handleFollow(item._id, false)} className="bg-blue-400 px-2">follow</button>
                    </li>)
                  }
                </ul>
              </div>

              <div className="px-4 py-5 text-center">
                <p className="text-xl font-semibold text-gray-900">
                  {user.following?.length || 0}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Following
                </p>

                <ul style={{ marginTop: '20px' }}>
                  {
                    following.map(item => <li key={item._id} className="my-2 grid grid-cols-2">
                      {item.name}
                      <button onClick={() => handleFollow(item._id, true)}
                        className="bg-blue-200 px-2">unfollow</button>
                    </li>)
                  }
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Profile;