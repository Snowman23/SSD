import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!user ? <Login onLogin={setUser} /> : <Dashboard user={user} />}
        />
        {/* Future routes can go here */}
      </Routes>
    </Router>
  );
}

export default App;
