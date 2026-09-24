import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      window.location.href = "/"
    } catch (error) {
      toast.error(error.response?.data?.message)
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-blue-50 px-4 py-10">
      <div className="mx-auto w-full max-w-md">
        {/* Login Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-blue-100 sm:p-8">
          {/* Heading */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Login to your TalkSphere account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
            >
              Login
            </button>
          </form>

          {/* Register */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;