import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likePost, deletePost } from "../features/posts/postsSlice";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { toast } from "react-toastify";

function PostLists() {
  const posts = useSelector(state => state.posts.posts);
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  /* ---------- STATE ---------- */
  const [category, setCategory] = useState("All");
  const [author, setAuthor] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [saved, setSaved] = useState([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  /* ---------- LOAD SAVED ---------- */
  useEffect(() => {
    setSaved(JSON.parse(localStorage.getItem("savedPosts")) || []);
  }, []);

  /* ---------- SAVE / UNSAVE ---------- */
  const toggleSave = (id) => {
    const updated = saved.includes(id)
      ? saved.filter(pid => pid !== id)
      : [...saved, id];

    setSaved(updated);
    localStorage.setItem("savedPosts", JSON.stringify(updated));
  };

  /* ---------- FILTER ---------- */
  const categories = ["All", ...new Set(posts.map(p => p.category || "General"))];
  const authors = ["All", ...new Set(posts.map(p => p.author))];

  let visiblePosts = posts.filter(
    p =>
      (category === "All" || (p.category || "General") === category) &&
      (author === "All" || p.author === author) &&
      (p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.content.toLowerCase().includes(search.toLowerCase()))
  );

  if (sort === "popular") {
    visiblePosts = [...visiblePosts].sort((a, b) => b.likes - a.likes);
  }

  if (showSavedOnly) {
    visiblePosts = visiblePosts.filter(p => saved.includes(p.id));
  }

  /* ---------- ACTIONS ---------- */
  const handleLike = (id) => {
    if (!user) {
      toast.info("Login to like posts");
      return;
    }
    dispatch(likePost({ postId: id, userEmail: user.email }));
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
    toast.error("Post deleted");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 pb-24">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 pt-10 space-y-6">

        {/* TITLE + ACTIONS */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">
              Reading Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Explore • Save • Share
            </p>
          </div>

          {/* TOP ACTIONS */}
          <div className="flex gap-3">
            <Link
              to="/stats"
              className="px-4 py-2 rounded-xl text-sm font-medium
                         bg-slate-900 text-white hover:bg-slate-800 transition"
            >
              📊 View Stats
            </Link>

            {user && (
              <Link
                to="/add"
                className="px-4 py-2 rounded-xl text-sm font-medium
                           bg-emerald-600 text-white hover:bg-emerald-700 transition"
              >
                + New Post
              </Link>
            )}
          </div>
        </div>

        {/* SEARCH / SORT */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-200
                       focus:ring-2 focus:ring-emerald-300 outline-none"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-3 rounded-2xl border border-slate-200 bg-white"
          >
            <option value="latest">Latest</option>
            <option value="popular">Most liked</option>
          </select>
        </div>
      </div>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-12 gap-8">

        {/* SIDEBAR */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-3xl border p-6 space-y-8 shadow-sm">

            {/* USER */}
            {user ? (
              <div className="rounded-2xl bg-emerald-50 p-4">
                <p className="text-xs text-slate-500">Signed in as</p>
                <p className="text-sm font-semibold text-emerald-700">
                  @{user.email.split("@")[0]}
                </p>
              </div>
            ) : (
              <div className="rounded-2xl bg-slate-50 p-4 text-center">
                <p className="text-sm font-semibold text-slate-700">
                  Guest mode
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Login to like & save posts
                </p>
                <Link
                  to="/login"
                  className="inline-block mt-3 px-5 py-2 text-xs
                             rounded-full bg-slate-900 text-white"
                >
                  Login
                </Link>
              </div>
            )}

            <SidebarBox title="Categories">
              {categories.map(c => (
                <FilterBtn
                  key={c}
                  active={category === c}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </FilterBtn>
              ))}
            </SidebarBox>

            <SidebarBox title="Authors">
              {authors.map(a => (
                <button
                  key={a}
                  onClick={() => setAuthor(a)}
                  className={`block text-sm ${
                    author === a
                      ? "text-emerald-600 font-medium"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {a === "All" ? "All authors" : `@${a.split("@")[0]}`}
                </button>
              ))}
            </SidebarBox>

            <SidebarBox title="Saved">
              <button
                onClick={() => setShowSavedOnly(!showSavedOnly)}
                className={`w-full py-2.5 rounded-xl text-sm font-medium transition ${
                  showSavedOnly
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                }`}
              >
                {showSavedOnly ? "Showing saved" : "Show saved"}
              </button>
            </SidebarBox>

          </div>
        </aside>

        {/* POSTS */}
        <div className="col-span-12 lg:col-span-9">
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {visiblePosts.map(post => {
              const isLiked = post.likedBy?.includes(user?.email);
              const isSaved = saved.includes(post.id);

              return (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl border p-6 shadow-sm
                             hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="flex justify-between items-center text-xs mb-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                      {post.category || "General"}
                    </span>

                    <span className="text-slate-400">
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                  </div>

                  <Link to={`/post/${post.id}`}>
                    <h2 className="font-semibold text-lg mb-2 hover:text-emerald-600">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-sm text-slate-600 line-clamp-3 mb-6">
                    {post.content}
                  </p>

                  <div className="pt-4 border-t flex items-center justify-between text-xs">
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="hover:text-rose-600"
                      >
                        {isLiked ? "❤️" : "🤍"} {post.likes}
                      </button>

                      <button
                        onClick={() => toggleSave(post.id)}
                        className="hover:text-emerald-600"
                      >
                        {isSaved ? "🔖 Saved" : "📑 Save"}
                      </button>

                      {user?.email === post.author && (
                        <>
                          <Link to={`/edit/${post.id}`} className="text-blue-600">
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="text-red-500"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>

                    <span className="text-slate-400">
                      @{post.author.split("@")[0]}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

const SidebarBox = ({ title, children }) => (
  <div className="space-y-3">
    <h4 className="text-xs uppercase tracking-wide text-slate-500">
      {title}
    </h4>
    {children}
  </div>
);

const FilterBtn = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-xs mr-2 mb-2 transition ${
      active
        ? "bg-emerald-600 text-white"
        : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
    }`}
  >
    {children}
  </button>
);

export default PostLists;
