import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { toast } from "react-toastify";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully");
    navigate("/login");
    setOpen(false);
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-emerald-700 font-medium border-b-2 border-emerald-500"
      : "text-slate-500 hover:text-slate-900";

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* BRAND */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center text-sm font-bold shadow-sm">
            NN
          </div>
          <span className="text-slate-900 font-semibold tracking-tight">
            NoteNest
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/" className={`${isActive("/")} pb-1`}>
            Feed
          </Link>

          {user && (
            <Link to="/my-posts" className={`${isActive("/my-posts")} pb-1`}>
              My Posts
            </Link>
          )}

          <Link to="/stats" className={`${isActive("/stats")} pb-1`}>
            Stats
          </Link>
        </div>

        {/* RIGHT DESKTOP */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-xs text-slate-500">
                @{user.email.split("@")[0]}
              </span>

              <Link
                to="/add"
                className="px-4 py-2 rounded-full bg-emerald-600 text-white text-xs hover:bg-emerald-700 shadow-sm transition"
              >
                Write
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm text-slate-400 hover:text-rose-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-slate-500 hover:text-slate-900"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 text-sm hover:bg-slate-900 hover:text-white transition"
              >
                Join
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-600 text-xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-sm px-4 py-5 space-y-4 text-sm">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block text-slate-700 hover:text-emerald-600"
          >
            Feed
          </Link>

          {user && (
            <Link
              to="/my-posts"
              onClick={() => setOpen(false)}
              className="block text-slate-700 hover:text-emerald-600"
            >
              My Posts
            </Link>
          )}

          <Link
            to="/stats"
            onClick={() => setOpen(false)}
            className="block text-slate-700 hover:text-emerald-600"
          >
            Stats
          </Link>

          {user ? (
            <>
              <Link
                to="/add"
                onClick={() => setOpen(false)}
                className="block text-slate-700 hover:text-emerald-600"
              >
                Write
              </Link>

              <button
                onClick={handleLogout}
                className="block text-left text-rose-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block text-slate-700 hover:text-emerald-600"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="block text-slate-700 hover:text-emerald-600"
              >
                Join
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
