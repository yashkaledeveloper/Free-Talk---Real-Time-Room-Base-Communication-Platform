import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between bg-white px-4 py-3 shadow-sm border-b border-blue-100 sm:px-6">
       {/* Logo */} 
       <Link to="/" className="text-xl font-semibold text-blue-600 hover:text-blue-700 transition" > TalkSphere </Link> 
       {/* Navigation */} 
       <div className="flex items-center gap-3 sm:gap-5"> 
        {user ? (<> 
        <Link to="/profile" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition" > Profile </Link> 
        <button onClick={logout} className="rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 transition" > Logout </button> </>) : (<> <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition" > Login </Link> <Link to="/register" className="rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 transition" > Register </Link> </>)} </div> </nav>
  );
};

export default Navbar;