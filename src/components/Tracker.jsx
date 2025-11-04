// src/components/Tracker.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUtensils, FaLeaf, FaTint } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "./ThemeContext";

// ICON MAP
const iconMap = {
  FaUtensils: <FaUtensils />,
  FaLeaf: <FaLeaf />,
  FaTint: <FaTint />,
};

// SAMPLE DATA
const recipeData = [
  {
    id: 1,
    name: "Veggie Salad",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    nutrients: "Calories: 250 | Protein: 8g | Carbs: 30g | Fat: 10g",
    videoLink: "#",
  },
  {
    id: 2,
    name: "Grilled Chicken",
    image:
      "https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg",
    nutrients: "Calories: 400 | Protein: 35g | Carbs: 10g | Fat: 20g",
    videoLink: "#",
  },
  {
    id: 3,
    name: "Smoothie Bowl",
    image:
      "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
    nutrients: "Calories: 300 | Protein: 6g | Carbs: 50g | Fat: 5g",
    videoLink: "#",
  },
  {
    id: 4,
    name: "Pasta Primavera",
    image:
      "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg",
    nutrients: "Calories: 350 | Protein: 12g | Carbs: 50g | Fat: 10g",
    videoLink: "#",
  },
  {
    id: 5,
    name: "Fruit Smoothie",
    image:
      "https://images.pexels.com/photos/4055855/pexels-photo-4055855.jpeg",
    nutrients: "Calories: 180 | Protein: 2g | Carbs: 40g | Fat: 0g",
    videoLink: "#",
  },
];

const trackerData = {
  summary: [
    { label: "Calories", value: "1,550", icon: "FaUtensils" },
    { label: "Protein", value: "125g", icon: "FaLeaf" },
    { label: "Carbs", value: "65g", icon: "FaLeaf" },
    { label: "Water", value: "2.5L", icon: "FaTint" },
  ],
  meals: {
    Breakfast: [
      {
        name: "Veggie Salad",
        calories: 350,
        protein: "12g",
        carbs: "25g",
        image:
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      },
    ],
    Lunch: [
      {
        name: "Grilled Chicken",
        calories: 500,
        protein: "35g",
        carbs: "50g",
        image:
          "https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg",
      },
    ],
    Dinner: [
      {
        name: "Salmon with Veggies",
        calories: 600,
        protein: "40g",
        carbs: "35g",
        image:
          "https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg",
      },
    ],
    Snacks: [
      {
        name: "Mixed Nuts",
        calories: 200,
        protein: "6g",
        carbs: "12g",
        image:
          "https://images.pexels.com/photos/1070882/pexels-photo-1070882.jpeg",
      },
    ],
  },
  suggestions: [
    { text: "Increase protein at breakfast", icon: "FaLeaf" },
    { text: "Add vegetables to lunch", icon: "FaLeaf" },
    { text: "Drink more water before evening", icon: "FaTint" },
  ],
};

const progressData = [
  { goodMeals: 5, mediumMeals: 2, badMeals: 1 },
  { goodMeals: 3, mediumMeals: 4, badMeals: 2 },
  { goodMeals: 6, mediumMeals: 1, badMeals: 1 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMeal, setActiveMeal] = useState("Breakfast");
  const [chartData, setChartData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const scrollRef = useRef(null);

  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const formatted = progressData.map((week, idx) => ({
      name: `Week ${idx + 1}`,
      green: week.goodMeals,
      yellow: week.mediumMeals,
      red: week.badMeals,
    }));
    setChartData(formatted);

    const sug = progressData.map((week, idx) => {
      if (week.badMeals > week.goodMeals)
        return `⚠️ Week ${idx + 1}: Nutrition is low. Increase balanced meals.`;
      else if (week.mediumMeals >= week.goodMeals)
        return `🟡 Week ${idx + 1}: Some nutrients missing. Add more vegetables and protein.`;
      else return `✅ Week ${idx + 1}: Excellent nutrition! Keep it up!`;
    });
    setSuggestions(sug);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let start = 0;
    const speed = 0.35;
    const animate = () => {
      start -= speed;
      if (Math.abs(start) >= scrollContainer.scrollWidth / 2) start = 0;
      scrollContainer.style.transform = `translateX(${start}px)`;
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#121212" : "#f9f9f9",
        color: darkMode ? "#f1f1f1" : "#333",
        transition: "0.5s",
        minHeight: "100vh",
      }}
    >
      {/* Left menu */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          left: "0",
          display: "flex",
          alignItems: "flex-start",
          zIndex: 100,
        }}
      >
        <button style={menuBtn} onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        <div
          style={{
            ...menuPanel,
            backgroundColor: darkMode ? "#1e1e1e" : "#fff",
            transform: menuOpen ? "translateX(0)" : "translateX(-180px)",
          }}
        >
          <Link to="/" style={{...menuItem,color: darkMode ? "#ffffffff" : "#040404ff",}}>
            Home
          </Link>
          <Link to="/planner" style={{...menuItem,color: darkMode ? "#ffffffff" : "#040404ff",}}>
            Planner
          </Link>
          <Link to="/recipes"style={{...menuItem,color: darkMode ? "#ffffffff" : "#040404ff",}}>
            Recipe Analysis
          </Link>
           <button
          onClick={toggleTheme}
          style={{
            ...menuItem,
            backgroundColor: darkMode ? "#FFD43B" : "#222",
            color: darkMode ? "#222" : "#fff",
          }}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
        </div>
      </div>

      <div
        style={{
          marginLeft: "60px",
          padding: "20px",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        {/* Recipes Carousel */}
        <h2 style={{ marginBottom: "10px" }}>Recipes</h2>
        <section style={{ overflow: "hidden", width: "100%", marginBottom: "20px" }}>
          <div ref={scrollRef} style={{ display: "flex", gap: "20px" }}>
            {recipeData.concat(recipeData).map((r, i) => (
              <div
                key={i}
                style={{
                  minWidth: "200px",
                  height: "250px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  cursor: "pointer",
                  position: "relative",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  transition: "0.3s",
                }}
              >
                <img
                  src={r.image}
                  alt={r.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "0.4s",
                    borderRadius: "12px",
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Tracker Summary */}
        <h2>Daily Summary</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
          {trackerData.summary.map((item) => (
            <div
              key={item.label}
              style={{
                flex: 1,
                minWidth: "120px",
                background: darkMode ? "#1e1e1e" : "#fff",
                padding: "12px",
                borderRadius: "10px",
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ fontSize: "20px", marginBottom: "5px" }}>
                {iconMap[item.icon]}
              </div>
              <h3 style={{ margin: 0 }}>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          ))}
        </div>

        {/* Progress Chart */}
        <h2>Weekly Nutrition Progress</h2>
        <div
          style={{
            width: "100%",
            height: "300px",
            marginBottom: "20px",
            background: darkMode ? "#1e1e1e" : "#fff",
            padding: "10px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="green" stroke="green" strokeWidth={3} />
              <Line type="monotone" dataKey="yellow" stroke="gold" strokeWidth={3} />
              <Line type="monotone" dataKey="red" stroke="red" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Suggestions */}
        <h2>Suggestions</h2>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              style={{
                background: darkMode ? "#2a2a2a" : "#F0F8FF",
                marginBottom: "5px",
                padding: "8px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaLeaf /> {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          marginTop: "30px",
          borderTop: "1px solid #ccc",
          backgroundColor: darkMode ? "#1e1e1e" : "#fff",
          transition: "0.3s",
        }}
      >
        <p>© 2025 Smart-meal-planner. All rights reserved.</p>
      </footer>
    </div>
  );
}

const menuBtn = {
  backgroundColor: "#007AFF",
  color: "#fff",
  border: "none",
  padding: "10px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "20px",
  zIndex: 101,
};
const menuPanel = {
  position: "fixed",
  left: "0",
  top: "60px",
  width: "180px",
  borderRadius: "0 8px 8px 0",
  boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.4s ease",
  overflow: "hidden",
  zIndex: 100,
};
const menuItem = {
  padding: "12px 15px",
  textDecoration: "none",
  color: "#333",
  fontWeight: "500",
  borderBottom: "1px solid #f0f0f0",
  cursor: "pointer",
};
