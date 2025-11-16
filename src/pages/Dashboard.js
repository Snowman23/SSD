import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const API_BASE_USERS = "https://oracleapex.com/ords/social_media_bi/socialmedia/users";
const API_BASE_POSTS = "https://oracleapex.com/ords/social_media_bi/socialmedia/posts";

function Dashboard({ user }) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({}); // { user_id: username }

  const handleLogout = () => {
    signOut(auth);
    window.location.reload(); // or update App state to remove user
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_BASE_USERS);
      const data = await res.json();
      const map = {};
      data.items.forEach((u) => (map[u.user_id] = u.username));
      setUsers(map);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch(API_BASE_POSTS);
      const data = await res.json();
      setPosts(data.items || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  // Open APEX form to add a post, refresh after closing
  const openAddPostForm = () => {
    const win = window.open(
      "https://oracleapex.com/ords/r/social_media_bi/social_media/create-post",
      "_blank",
      "width=800,height=600"
    );

    const timer = setInterval(() => {
      if (win.closed) {
        clearInterval(timer);
        fetchPosts(); // refresh posts
      }
    }, 1000);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "800px", margin: "50px auto" }}>
      <h1>Welcome, {user.email}</h1>
      <button onClick={handleLogout} style={{ padding: "10px", marginBottom: "20px" }}>
        Logout
      </button>

      <h1>📊 Social Media Dashboard</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
    <button
      onClick={openAddPostForm}
      style={{
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "8px",
        padding: "10px 20px",
        cursor: "pointer",
      }}
    >
      ➕ Add New Post
    </button>

    <button
      onClick={() =>
        window.open(
          "https://app.powerbi.com/groups/me/reports/ef074f6b-98c6-42bd-a273-82f446e42fbb/83e453bae0ed9132d901?experience=power-bi&clientSideAuth=0",
          "_blank"
        )
      }
      style={{
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "8px",
        padding: "10px 20px",
        cursor: "pointer",
      }}
    >
      📈 Open Power BI Dashboard
    </button>
  </div>

      <div>
        {posts.map((post) => (
          <div
            key={post.post_id}
            style={{
              background: "#f9f9f9",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{users[post.user_id] || `User ${post.user_id}`}</h3>
            <p>{post.content_text}</p>
            <p>❤️ {post.likes_count} | 💬 {post.comments_count}</p>
            <small>{new Date(post.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
