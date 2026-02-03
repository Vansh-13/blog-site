import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/posts/postsSlice";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { toast } from "react-toastify";

export default function PostForm() {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [content, setContent] = useState("");

  const predefinedCategories = [
    "General",
    "Technology",
    "Personal",
    "Education",
    "Lifestyle",
    "Food",
    "Other",
  ];

  if (!user) {
    toast.info("Please login to write a post");

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-2xl border text-center max-w-sm w-full">
          <p className="mb-4 text-slate-600">
            Please login to write a post
          </p>
          <Link
            to="/login"
            className="inline-block px-5 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const submitHandler = e => {
    e.preventDefault();

    if (!title.trim()) {
      toast.warning("Title is required");
      return;
    }

    if (!category) {
      toast.warning("Please select a category");
      return;
    }

    if (category === "Other" && !customCategory.trim()) {
      toast.warning("Please enter your custom category");
      return;
    }

    if (!content.trim()) {
      toast.warning("Content cannot be empty");
      return;
    }

    const finalCategory =
      category === "Other" ? customCategory : category;

    dispatch(
      addPost({
        id: Date.now(),
        title,
        category: finalCategory,
        content,
        likes: 0,
        likedBy: [],
        author: user.email,
        createdAt: new Date().toISOString(), 
      })
    );

    toast.success("Post published successfully");
    navigate("/feed");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-24">

   
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link
            to="/feed"
            className="text-sm text-slate-500 hover:text-slate-900"
          >
            ← Back to feed
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-10 mb-6">
        <h1 className="text-3xl font-serif text-slate-900">
          Write something meaningful
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Calm thoughts, shared openly.
        </p>
      </div>
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white border rounded-3xl p-10 shadow-sm">
          <form onSubmit={submitHandler} className="space-y-8">
            <div>
              <label className="block text-xs uppercase font-medium text-slate-500 mb-2">
                Title
              </label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Give your story a title"
                className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-medium text-slate-500 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-emerald-200"
              >
                <option value="">Select category</option>
                {predefinedCategories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            {category === "Other" && (
              <div>
                <label className="block text-xs uppercase font-medium text-slate-500 mb-2">
                  Custom Category
                </label>
                <input
                  value={customCategory}
                  onChange={e => setCustomCategory(e.target.value)}
                  placeholder="Enter your category"
                  className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            )}
            <div>
              <label className="block text-xs uppercase font-medium text-slate-500 mb-2">
                Content
              </label>
              <textarea
                rows="10"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Start writing here…"
                className="w-full border rounded-xl px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200 resize-none"
              />
            </div>
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="px-8 py-2.5 bg-slate-900 text-white text-sm rounded-xl hover:bg-slate-800 transition"
              >
                Publish
              </button>

              <button
                type="button"
                onClick={() => navigate("/feed")}
                className="px-8 py-2.5 text-sm rounded-xl border text-slate-600 hover:bg-slate-100 transition"
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
