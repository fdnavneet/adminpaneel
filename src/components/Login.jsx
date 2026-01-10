import  { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState({});

  const validate = () => {
    const err = {};
    if (form.username === "") {
      err.username = "Please enter username";
    }
    if (form.password === "") {
      err.password = "Please enter password";
    }
    if (form.password !== "" && form.password.length < 4) {
      err.password = "Password must be 4 characters long";
    }
    setError(err);
    if (Object.keys(err).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const sucess = login(form.username, form.password);
    if (sucess) navigate("/dashboard");
    else setError({ auth: "UserName and PAssword is Wrong" });
  };

  return (
    <>
      <div className="min-h-screen flex bg-slate-100">
        <div className="hidden lg:flex w-1/2 bg-indigo-600 text-white p-12 flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold">Employee Dashboard Login</h1>
            <p className="mt-4 text-indigo-200">Manage employees</p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome Back 👋
            </h2>
            <p className="text-gray-500 mt-1">Login to your dashboard</p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {error.username ? (
                  <p style={{ color: "red" }}>{error.username}</p>
                ) : null}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {error.password ? (
                  <p style={{ color: "red" }}>{error.password}</p>
                ) : null}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>
                <a href="#" className="text-indigo-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white cursor-pointer py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Login
              </button>
              {error.auth && <p style={{ color: "red" }}>{error.auth}</p>}
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don’t have an account?{" "}
              <span className="text-indigo-600 font-medium cursor-pointer">
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
