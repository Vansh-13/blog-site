import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../auth/AuthContext";
import { Link } from "react-router-dom";

function MyPosts() {
  const { user } = useContext(AuthContext);
  const posts = useSelector(state => state.posts.posts);

  // sirf current user ke posts
  const myPosts = posts.filter(p => p.author === user?.email);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* TOP BAR */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/feed"
            className="text-sm text-slate-500 hover:text-slate-800 transition"
          >
            ← Back to Feed
          </Link>

          <Link
            to="/add"
            className="px-4 py-2 text-sm rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            + New Post
          </Link>
        </div>

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-slate-800">
            My Posts
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            All the stories you’ve written so far ✨
          </p>
        </div>

        {/* EMPTY STATE */}
        {myPosts.length === 0 && (
          <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-16 text-center">
            <p className="text-slate-600 mb-4 text-sm">
              You haven’t written any posts yet.
            </p>
            <Link
              to="/add"
              className="inline-block px-6 py-2 rounded-full bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition"
            >
              Write your first post
            </Link>
          </div>
        )}

        {/* POSTS LIST */}
        <div className="grid gap-8">
          {myPosts.map(post => (
            <article
              key={post.id}
              className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              {/* CATEGORY + DATE */}
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                  {post.category || "General"}
                </span>

                <span className="text-slate-400">
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : ""}
                </span>
              </div>

              {/* TITLE */}
              <Link to={`/post/${post.id}`}>
                <h2 className="text-xl font-medium text-slate-800 hover:text-emerald-600 transition">
                  {post.title}
                </h2>
              </Link>

              {/* CONTENT */}
              <p className="text-sm text-slate-600 mt-3 line-clamp-3">
                {post.content}
              </p>

              {/* FOOTER */}
              <div className="flex items-center justify-between mt-6 text-sm">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                  ❤️ {post.likes}
                </span>

                <div className="flex items-center gap-4">
                  <Link
                    to={`/post/${post.id}`}
                    className="text-slate-500 hover:text-slate-800"
                  >
                    View
                  </Link>

                  <Link
                    to={`/edit/${post.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}

export default MyPosts;
