import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePost } from "../features/posts/postsSlice";
import { toast } from "react-toastify";

export default function EditPost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector(state =>
    state.posts.posts.find(p => String(p.id) === id)
  );

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setCategory(post.category || "");
      setContent(post.content);
    }
  }, [post]);

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Post not found</p>
      </div>
    );
  }

  const submitHandler = e => {
    e.preventDefault();

    // basic validation
    if (!title || !content) {
      toast.warning("Title and content are required");
      return;
    }

    dispatch(
      updatePost({
        id: post.id,
        title,
        category,
        content,
        likes: post.likes,
        likedBy: post.likedBy,
        author: post.author,
      })
    );

    toast.success("Post updated successfully");
    navigate("/");
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

          <span className="text-xs text-slate-400">
            Editing · {wordCount} words · {readingTime} min read
          </span>
        </div>
      </div>

      {/* PAGE INTRO */}
      <div className="max-w-3xl mx-auto px-6 mt-10 mb-6">
        <h1 className="text-3xl font-serif text-slate-900">
          Edit your post
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Make changes and update your post.
        </p>
      </div>

      {/* FORM */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm">

          <form onSubmit={submitHandler} className="space-y-8">

            <div>
              <label className="block text-xs uppercase font-medium text-slate-500 mb-2">
                Title
              </label>
              <input
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-medium text-slate-500 mb-2">
                Category
              </label>
              <input
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="journal, tech, notes"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-medium text-slate-500 mb-2">
                Content
              </label>
              <textarea
                rows="10"
                className="w-full border border-slate-300 rounded-xl px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="px-8 py-2.5 bg-slate-900 text-white text-sm rounded-xl hover:bg-slate-800"
              >
                Update post
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-8 py-2.5 text-sm rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}
