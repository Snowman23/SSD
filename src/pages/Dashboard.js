import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "./dashboard.css";

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
    <div className="dashboard">
      <h1 className="title">📊 Social Media Dashboard</h1>

      <div className="top-bar">
        <span className="welcome">Welcome, {user.email}</span>
        <button className="btn secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="actions">
        <button className="btn primary" onClick={openAddPostForm}>
          ➕ Add New Post
        </button>

        <button
          className="btn success"
          onClick={() =>
            window.open(
              "https://app.powerbi.com/groups/me/reports/ef074f6b-98c6-42bd-a273-82f446e42fbb/83e453bae0ed9132d901?experience=power-bi&clientSideAuth=0",
              "_blank"
            )
          }
        >
          📈 Open Power BI Dashboard
        </button>
      </div>

      <div className="posts">
        {posts.map((post) => (
          <div key={post.post_id} className="post-card">
            <h3>{users[post.user_id] || `User ${post.user_id}`}</h3>

            <p className="content">{post.content_text}</p>

            {/* Display image if exists */}
            {post.image_url && (
              <img src={post.image_url} alt="Post" className="post-media" />
            )}

            {/* Display YouTube video if exists */}
            {post.video_url && (
              <iframe
                className="post-media"
                width="100%"
                height="300"
                src={post.video_url}
                title="Post video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}


            <div className="meta">
              <span>❤️ {post.likes_count}</span>
              <span>💬 {post.comments_count}</span>
            </div>

            <small className="timestamp">
              {new Date(post.timestamp).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
