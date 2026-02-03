import React, { useContext, useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

function Login() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // already logged in → redirect
  if (user) {
    return <Navigate to="/feed" replace />;
  }

  const submit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Email and password are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    const success = login(email, password);

    if (!success) {
      toast.error("Wrong email or password");
      return;
    }

    toast.success("Login successful");
    navigate("/feed", { replace: true });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-10 shadow-sm">

        <h2 className="text-3xl font-serif text-slate-900 mb-2">
          Welcome back
        </h2>
        <p className="text-sm text-slate-500 mb-8">
          Sign in to continue to <span className="font-medium">NoteNest</span>
        </p>

        <form onSubmit={submit} className="space-y-6">

          {/* EMAIL */}
          <div>
            <label className="block text-xs uppercase font-medium text-slate-500 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-xs uppercase font-medium text-slate-500 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200 pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-slate-900 text-white text-sm hover:bg-slate-800 transition"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-8">
          New here?{" "}
          <Link
            to="/register"
            className="text-slate-900 font-medium hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
