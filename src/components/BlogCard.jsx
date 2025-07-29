// src/components/BlogCard.jsx

import React from "react";
import { useAuth } from "../store/auth";

const BlogCard = ({ title, description, service, provider ,}) => {
      const { user } = useAuth();
    
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "1rem",
      borderRadius: "8px",
      background: "#fff",
    }}>
      <img
        src={`https://blog-backend-59fp.onrender.com/uploads/${provider}`}
        alt={title}
        style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "6px" }}
      />
      <h2>{title}</h2>
      <p><strong>Title:</strong> {service}</p>
     <p>
      By{user ? `, ${user.username}` : ""}
     </p>
      <p>{description}</p>
    </div>
  );
};

export default BlogCard;
