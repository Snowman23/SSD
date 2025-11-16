import React, { useState } from "react";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import SignUp from "./SignUp";
import emailjs from "emailjs-com"; // ← import here

// Function to send dev login notification
const notifyDevLogin = () => {
  emailjs.send(
    "service_9a4rnh1",      
    "template_lvxo1u4",     
    { message: "Development login skip button used." },
    "5N1sLj3nMiZIc_YBz"          
  )
  .then(response => console.log("Email sent!", response))
  .catch(err => console.error("Email error", err));
};

const sendLoginNotification = (userEmail, message = "User logged in via social media") => {
  emailjs.send(
    "service_9a4rnh1",   // EmailJS Service ID
    "template_d0c3wid",  // EmailJS Template ID
    { message },         // Template variable
    "5N1sLj3nMiZIc_YBz"    // EmailJS Public Key
  )
  .then(response => console.log("Email sent!", response))
  .catch(err => console.error("Email error:", err));
};

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);

  if (showSignUp) {
    return <SignUp onSignUp={onLogin} />;
  }

  // Email/Password login
const handleEmailLogin = async (e) => {
  e.preventDefault();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Trigger APEX email after successful login
    const token = 'aerodinamic';  // secret only in your React app
    fetch('https://oracleapex.com/ords/social_media_bi/send_login_email/idk_dud', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, token })
    })
    .then(res => res.json())
    .then(data => console.log('Email API response:', data))
    .catch(err => console.error('Email API error:', err));

    // Continue normal login flow
    onLogin(user);

  } catch (err) {
    setError(err.message);
  }
};


// Google login
const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Send notification email
    sendLoginNotification(user.email, "User logged in via Google");

    // Continue normal login flow
    onLogin(user);
  } catch (err) {
    setError(err.message);
  }
};

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleEmailLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          required
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "10px"
          }}
        >
          Login
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#db4437",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "10px"
        }}
      >
        Sign in with Google
      </button>

      {/* 👇 Skip Login only in development */}
      {process.env.NODE_ENV === "development" && (
        <div style={{ marginTop: 12 }}>
          <button
            type="button"
            onClick={() => {
              // Send dev login notification
              notifyDevLogin();

              // Continue login flow
              onLogin({
                uid: "dev-user-1",
                email: "dev@local",
                displayName: "Dev User"
              });
            }}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Skip Login (dev)
          </button>
        </div>
      )}

      <p style={{ marginTop: "10px" }}>
        Don't have an account?
        <button
          type="button"
          onClick={() => setShowSignUp(true)}
          style={{ marginLeft: "5px" }}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default Login;
