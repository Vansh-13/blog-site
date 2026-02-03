import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

function Welcome() {
  const { user } = useContext(AuthContext);

  // If already logged in, skip welcome page
  if (user) {
    return <Navigate to="/feed" replace />;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white flex items-center justify-center px-6">

      {/* subtle background blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl text-center">

        {/* badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium
            bg-emerald-100 text-emerald-700">
            ✨ Welcome to NoteNest
          </span>
        </div>

        {/* heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 mb-6 leading-tight">
          A calm place <br className="hidden sm:block" />
          for meaningful thoughts
        </h1>

        {/* subtitle */}
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-12">
          Read ideas worth your time, write without pressure,
          and save thoughts that truly matter — all in one peaceful space.
        </p>

        {/* actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Link
            to="/login"
            className="px-8 py-3 rounded-full bg-emerald-600 text-white text-sm
            hover:bg-emerald-700 transition shadow-md"
          >
            Sign in
          </Link>

          <Link
            to="/register"
            className="px-8 py-3 rounded-full border border-slate-300
            text-slate-700 text-sm hover:bg-slate-900 hover:text-white transition"
          >
            Join now
          </Link>

          <Link
            to="/feed"
            className="px-8 py-3 rounded-full text-slate-500 text-sm
            hover:text-slate-800 transition"
          >
            Explore posts →
          </Link>
        </div>

        {/* features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <Feature
            icon="📖"
            title="Read calmly."
            desc="Discover thoughtful posts without noise or distractions."
          />
          <Feature
            icon="🔖"
            title="Save freely."
            desc="Bookmark ideas you like and revisit them anytime."
          />
          <Feature
            icon="✍️"
            title="Write simply."
            desc="Share your thoughts without worrying about likes or trends."
          />
        </div>

      </div>
    </main>
  );
}

const Feature = ({ icon, title, desc }) => (
  <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-lg transition">
    <div className="text-2xl mb-3">{icon}</div>
    <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
    <p className="text-sm text-slate-600">{desc}</p>
  </div>
);

export default Welcome;
