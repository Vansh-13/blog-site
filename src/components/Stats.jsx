import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../auth/AuthContext";
import { Link } from "react-router-dom";

function Stats() {
  const posts = useSelector(state => state.posts.posts);
  const { user } = useContext(AuthContext);

  const totalPosts = posts.length;
  const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);
  const savedPosts =
    JSON.parse(localStorage.getItem("savedPosts"))?.length || 0;

  const myPosts = user
    ? posts.filter(p => p.author === user.email)
    : [];

  const myLikes = myPosts.reduce((sum, p) => sum + p.likes, 0);
  const recentPosts = [...posts].slice(-3).reverse();

  const statsData = [
    { title: "Total Posts", value: totalPosts, icon: "📝", color: "from-emerald-400 to-emerald-600" },
    { title: "Total Likes", value: totalLikes, icon: "❤️", color: "from-rose-400 to-rose-600" },
    { title: "Saved Posts", value: savedPosts, icon: "🔖", color: "from-indigo-400 to-indigo-600" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* TOP BAR */}
        <Link
          to="/feed"
          className="text-sm text-slate-500 hover:text-slate-800"
        >
          ← Back to Feed
        </Link>

        {/* HERO HEADER */}
        <div className="mt-6 mb-12 bg-white/70 backdrop-blur rounded-3xl border p-6 sm:p-8 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Blog Insights
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-xl">
            Track your posts, likes and activity — all in one place.
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-14">
          {statsData.map((item, i) => (
            <StatCard key={i} {...item} />
          ))}
        </div>

        {/* USER INSIGHTS */}
        {user && (
          <div className="mb-14">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4">
              Your Activity
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <MiniStat label="Posts Written" value={myPosts.length} />
              <MiniStat label="Likes Received" value={myLikes} />
              <MiniStat label="Username" value={`@${user.email.split("@")[0]}`} />
            </div>
          </div>
        )}

        {/* RECENT POSTS */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4">
            Recent Posts
          </h2>

          <div className="bg-white rounded-3xl border p-5 sm:p-6 shadow-sm">
            {recentPosts.length === 0 ? (
              <p className="text-sm text-slate-500">
                No posts yet.
              </p>
            ) : (
              <div className="space-y-4">
                {recentPosts.map(post => (
                  <div
                    key={post.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b last:border-none pb-3"
                  >
                    <div>
                      <p className="font-medium text-slate-800">
                        {post.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        @{post.author.split("@")[0]} • ❤️ {post.likes}
                      </p>
                    </div>

                    <Link
                      to={`/post/${post.id}`}
                      className="text-sm text-emerald-600 hover:underline"
                    >
                      View →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}

/* ---------- COMPONENTS ---------- */

const StatCard = ({ title, value, icon, color }) => (
  <div className="relative bg-white rounded-3xl border p-6 shadow-sm
                  hover:shadow-xl hover:-translate-y-1 transition-all">

    <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl bg-gradient-to-r ${color}`} />

    <div className="flex items-center justify-between mb-4">
      <span className="text-3xl sm:text-4xl">{icon}</span>
      <span className="text-2xl sm:text-3xl font-bold text-slate-800">
        {value}
      </span>
    </div>

    <p className="text-sm text-slate-500">{title}</p>
  </div>
);

const MiniStat = ({ label, value }) => (
  <div className="bg-slate-50 rounded-2xl p-4 text-center">
    <p className="text-lg sm:text-xl font-semibold text-slate-800">
      {value}
    </p>
    <p className="text-xs text-slate-500 mt-1">
      {label}
    </p>
  </div>
);

export default Stats;
