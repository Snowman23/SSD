// src/services/api.js
import axios from "axios";

const API_BASE = "https://oracleapex.com/ords/social_media_bi/socialmedia";

// Fetch all users (already exists)
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE}/users`);
    return response.data.items;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Fetch all posts
export const getPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE}/posts`);
    return response.data.items; // Make sure APEX REST returns { items: [...] }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
