// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { getPosts } from "../services/api";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
      {posts.length === 0 && <p>Loading posts...</p>}
      {posts.map((post) => (
        <div key={post.post_id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <h3>{post.username}</h3>
          <p>{post.content}</p>
          {post.media_url && <img src={post.media_url} alt="Post media" style={{ maxWidth: "300px" }} />}
          <p>Likes: {post.likes_count} | Comments: {post.comments_count}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
