import React from "react";

function Post({ username, content, likes, comments }) {
  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        padding: "15px",
        margin: "10px 0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ color: "#333", marginBottom: "5px" }}>{username}</h3>
      <p style={{ color: "#555", marginBottom: "10px" }}>{content}</p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#888",
          fontSize: "14px",
        }}
      >
        <span>👍 {likes ?? 0} Likes</span>
        <span>💬 {comments ?? 0} Comments</span>
      </div>
    </div>
  );
}

export default Post;
