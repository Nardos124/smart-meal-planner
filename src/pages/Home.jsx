import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";

export default function Home() {
  const { darkMode, toggleTheme } = useTheme(); // Shared theme
  const [dailyTip, setDailyTip] = useState("");

  useEffect(() => {
    const tips = [
      "🥗 Include more fiber-rich foods like oats and beans.",
      "💧 Stay hydrated — water helps digestion and energy!",
      "🍎 Avoid skipping breakfast; it boosts your metabolism.",
      "🏃 Take a short walk after meals to aid digestion.",
      "🌿 Add more greens and colorful veggies to your plate.",
    ];
    setDailyTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  return (
    <div
      style={{
        ...container,
        backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: darkMode ? "#fff" : "#222",
        backgroundColor: darkMode ? "#121212" : "rgba(255, 255, 255, 0.5)",
      }}
    >
      <div style={overlay}></div>

      {/* Navigation Bar */}
      <nav style={{ ...navBar, backgroundColor: darkMode ? "#333" : "#007AFF" }}>
        <Link to="/planner" style={navLink}>Planner</Link>
        <Link to="/tracker" style={navLink}>Tracker</Link>
        <Link to="/recipes" style={navLink}>Food List</Link>
        <button
          onClick={toggleTheme}
          style={{
            ...modeButton,
            backgroundColor: darkMode ? "#FFD43B" : "#222",
            color: darkMode ? "#222" : "#fff",
          }}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </nav>

      {/* Welcome Section */}
      <section style={welcomeSection}>
        <h1 style={title}>Welcome to Smart Meal Planner 🍽️</h1>
        <p style={subtitle}>
          Plan, track, and improve your weekly meals with simple insights.
        </p>
      </section>

      {/* Quick Stats Section */}
      <section style={statsContainer}>
        <div style={{ ...statCard, backgroundColor: darkMode ? "rgba(255, 212, 59, 0.7)" : "rgba(255,255,255,0.9)", color: darkMode ? "#222" : "#322525ff" }}>
          <h2>6</h2>
          <p>Meals Planned This Week</p>
        </div>
        <div style={{ ...statCard, backgroundColor: darkMode ? "rgba(255, 212, 59, 0.7)" : "rgba(255,255,255,0.9)", color: darkMode ? "#222" : "#322525ff" }}>
          <h2>2100</h2>
          <p>Avg. Daily Calories</p>
        </div>
        <div style={{ ...statCard, backgroundColor: darkMode ? "rgba(255, 212, 59, 0.7)" : "rgba(255,255,255,0.9)", color: darkMode ? "#222" : "#322525ff" }}>
          <h2>5</h2>
          <p>Days Tracked</p>
        </div>
      </section>

      {/* Quick Action Buttons */}
      <section style={buttonsContainer}>
        <Link to="/planner" style={buttonPrimary}>Start Planning Meals</Link>
        <Link to="/tracker" style={buttonSecondary}>View Weekly Progress</Link>
      </section>

      {/* Daily Tip */}
      <section style={tipSection}>
        <h3 style={{color: "#222"}}>💡 Today’s Nutrition Tip</h3>
        <p style={{color:  "#222"}}>{dailyTip}</p>
      </section>

      {/* Footer */}
      <footer style={{ ...footer, color:"#fff"  }}>
        © 2025 Smart Meal Planner — Built for healthy living 🌿
      </footer>
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const container = {
  fontFamily: "Poppins, sans-serif",
  padding: "20px",
  minHeight: "100vh",
  position: "relative",
  overflowX: "hidden",
};

const overlay = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
  zIndex: -1,
};

const navBar = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "15px",
  padding: "10px 0",
  borderRadius: "10px",
  marginBottom: "25px",
  transition: "background-color 0.3s ease",
};

const navLink = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "600",
};

const modeButton = {
  border: "none",
  borderRadius: "6px",
  padding: "6px 10px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "0.3s",
};

const welcomeSection = {
  textAlign: "center",
  marginBottom: "25px",
};

const title = {
  fontSize: "2rem",
  color: "#fff",
  marginBottom: "8px",
  textShadow: "0 2px 6px rgba(0,0,0,0.3)",
};

const subtitle = {
  color: "#fff",
  fontSize: "1.3rem",
  textShadow: "0 1px 4px rgba(0,0,0,0.3)",
  fontWeight: "600",
};

const statsContainer = {
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  gap: "15px",
  marginBottom: "25px",
};

const statCard = {
  flex: "1 1 30%",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  textAlign: "center",
  padding: "20px",
  minWidth: "150px",
};

const buttonsContainer = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "20px",
  marginBottom: "25px",
};

const buttonPrimary = {
  backgroundColor: "#007AFF",
  color: "#fff",
  textDecoration: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  fontWeight: "600",
  transition: "0.3s",
};

const buttonSecondary = {
  backgroundColor: "#fff",
  color: "#007AFF",
  border: "2px solid #007AFF",
  textDecoration: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  fontWeight: "600",
  transition: "0.3s",
};

const tipSection = {
  backgroundColor: "rgba(255,255,255,0.95)",
  borderRadius: "12px",
  padding: "15px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  marginBottom: "25px",
};

const footer = {
  textAlign: "center",
  color: "#ddd",
  fontSize: "0.9rem",
};
