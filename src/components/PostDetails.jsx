import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function PostDetails() {
  const { id } = useParams();

  const post = useSelector(state =>
    state.posts.posts.find(p => String(p.id) === id)
  );

  const getReadingTime = text =>
    Math.max(1, Math.ceil(text.split(" ").length / 200));

  // if post not found
  if (!post) {
    toast.error("Post not found");

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Post not found</p>
      </div>
    );
  }

  // copy link handler
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Post link copied");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-24">

      {/* TOP BAR */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-sm text-slate-500 hover:text-slate-900"
          >
            ← Back to feed
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400">
              {getReadingTime(post.content)} min read
            </span>

            <button
              onClick={copyLink}
              className="text-xs text-slate-500 hover:text-slate-900"
            >
              Copy link
            </button>
          </div>
        </div>
      </div>

      {/* ARTICLE */}
      <article className="max-w-3xl mx-auto px-6 mt-14">

        {/* META */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
            {post.category || "General"}
          </span>

          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs">
            @{post.author?.split("@")[0]}
          </span>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-serif text-slate-900 leading-snug mb-10">
          {post.title}
        </h1>

        {/* CONTENT */}
        <p className="whitespace-pre-line leading-relaxed text-slate-700">
          {post.content}
        </p>

        {/* FOOTER */}
        <div className="mt-20 pt-8 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            Written by @{post.author?.split("@")[0]}
          </span>

          <Link
            to="/"
            className="hover:text-slate-900"
          >
            Back to Feed
          </Link>
        </div>
      </article>
    </main>
  );
}

export default PostDetails;
