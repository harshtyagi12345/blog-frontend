// src/pages/Blogs.jsx

import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard"; // Make sure this path is correct

const API_URL = "https://blog-backend-59fp.onrender.com/api/blogging/blogs";

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Something went wrong while fetching blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blogs-container" style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Our Services</h1>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div
        className="blogs-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {blogs.length > 0 ? (
          blogs.map((blog) => {
  console.log("Blog:", blog); // DEBUG
  return <BlogCard key={blog._id} {...blog} />;
})
        ) : (
          !loading && <p style={{ textAlign: "center" }}>No blogs found.</p>
        )}
      </div>
    </div>
  );
};
