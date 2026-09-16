import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>My Profile</h1>

      <img
        src={user.avatar || "https://via.placeholder.com/100"}
        alt={user.username}
        width="100"
      />

      <h2>{user.name}</h2>

      <p>@{user.username}</p>

      <p>{user.bio || "No bio yet"}</p>

      <p>
        Followers: {user.followers?.length || 0}
      </p>

      <p>
        Following: {user.following?.length || 0}
      </p>
    </div>
  );
};

export default Profile;