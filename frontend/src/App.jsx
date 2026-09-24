import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import RoomPage from "./pages/RoomPage";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/room/:id/join" element={<RoomPage />} />

        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        
        <Route
          path="/"
          element={<ProtectedRoute><Dashboard/></ProtectedRoute>}
        />

        <Route path="/not" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;