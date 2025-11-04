import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snacks"];

const initialMeals = {
  Mon: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
  Tue: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
  Wed: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
  Thu: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
  Fri: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
  Sat: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
  Sun: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
};

export default function Planner() {
  const [weekMeals, setWeekMeals] = useState(initialMeals);
  const [popup, setPopup] = useState({ visible: false, day: "", type: "" });
  const [newMeal, setNewMeal] = useState({ name: "", calories: 0, protein: "", carbs: "" });
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [showDaysList, setShowDaysList] = useState(false);

  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme(); // Use global dark mode

  // Load meals
  useEffect(() => {
    const stored = localStorage.getItem("weekMeals");
    if (stored) setWeekMeals(JSON.parse(stored));
  }, []);

  // Save meals
  useEffect(() => {
    localStorage.setItem("weekMeals", JSON.stringify(weekMeals));
  }, [weekMeals]);

  const openPopup = (day, type) => setPopup({ visible: true, day, type });

  const handleAddMeal = () => {
    if (!newMeal.name) return;
    const { day, type } = popup;
    const meal = { ...newMeal, completed: false };

    setWeekMeals(prev => ({
      ...prev,
      [day]: { ...prev[day], [type]: [...prev[day][type], meal] },
    }));

    setPopup({ visible: false, day: "", type: "" });
    setNewMeal({ name: "", calories: 0, protein: "", carbs: "" });
  };

  const handleDeleteMeal = (day, type, index) => {
    const updatedMeals = [...weekMeals[day][type]];
    updatedMeals.splice(index, 1);
    setWeekMeals({ ...weekMeals, [day]: { ...weekMeals[day], [type]: updatedMeals } });
  };

  const getDailySummary = (day) => {
    let calories = 0, protein = 0, carbs = 0;
    mealTypes.forEach(type => {
      weekMeals[day][type].forEach(meal => {
        calories += meal.calories;
        protein += parseInt(meal.protein) || 0;
        carbs += parseInt(meal.carbs) || 0;
      });
    });
    return { calories, protein, carbs };
  };

  const backgroundImage =
    "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80')";

  const cardBg = darkMode ? "rgba(26, 17, 21, 0.75)" : "rgba(255, 255, 255, 0.97)";
  const textColor = darkMode ? "#fff" : "#000";

  return (
    <div
      style={{
        ...containerStyle,
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: textColor,
      }}
    >
      <div style={{
        ...overlay,
        backgroundColor: darkMode ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.2)"
      }}></div>

      {/* Navbar + Dark Mode Toggle */}
      <nav style={navBar}>
        {["/", "/recipes", "/tracker"].map((path, idx) => {
          const labels = ["Home", "Food List & Analysis", "Tracker"];
          return (
            <Link
              key={path}
              to={path}
              style={{
                ...navLink,
                backgroundColor: cardBg,
                color: textColor,
                border: `1px solid ${darkMode ? "#444" : "#ddd"}`,
              }}
            >
              {labels[idx]}
            </Link>
          );
        })}
        <button onClick={toggleTheme} style={modeToggleBtn}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </nav>

      <h2 style={{ ...sectionTitle, color: textColor }}>Weekly Planner</h2>

      {/* Day Selector */}
      <div style={daySelectorContainer}>
        <div
          onClick={() => setShowDaysList(!showDaysList)}
          style={{ ...daySelector, backgroundColor: cardBg, color: textColor }}
        >
          {selectedDay} ⬇
        </div>
        {showDaysList && (
          <div style={{ ...dayListContainer, backgroundColor: cardBg }}>
            {daysOfWeek.map(day => (
              <div
                key={day}
                onClick={() => { setSelectedDay(day); setShowDaysList(false); }}
                style={{ ...dayItem, color: textColor }}
              >
                {day}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Day Card */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", flexWrap: 'wrap' }}>
        {(() => {
          const day = selectedDay;
          const summary = getDailySummary(day);
          return (
            <div key={day} style={{ ...dayCard, backgroundColor: cardBg, color: textColor }}>
              <div style={{ ...summaryBox }}>
                <p>Calories: {summary.calories}</p>
                <p>Protein: {summary.protein}g</p>
                <p>Carbs: {summary.carbs}g</p>
              </div>

              {mealTypes.map(type => (
                <div key={type} style={{ ...mealTypeBox }}>
                  <button style={{ ...addMealButton }} onClick={() => openPopup(day, type)}>
                    + Add {type}
                  </button>

                  {weekMeals[day][type].map((meal, idx) => (
                    <div key={idx} style={{ ...mealCard, color: textColor }}>
                      <span>{meal.name} ({meal.calories} cal)</span>
                      <button style={deleteMealButton} onClick={() => handleDeleteMeal(day, type, idx)}>✕</button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {/* Progress Button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          style={progressButton}
          onClick={() => navigate("/tracker", { state: { weekMeals } })}
        >
          My Meal Week Progress
        </button>
      </div>

      {/* Popup */}
      {popup.visible && (
        <div style={popupOverlay}>
          <div style={{ ...popupBox, color: textColor }}>
            <h3>Add {popup.type} for {popup.day}</h3>
            <input placeholder="Meal name" value={newMeal.name} onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })} style={inputStyle} />
            <input placeholder="Calories" type="number" value={newMeal.calories} onChange={(e) => setNewMeal({ ...newMeal, calories: parseInt(e.target.value) })} style={inputStyle} />
            <input placeholder="Protein (g)" value={newMeal.protein} onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })} style={inputStyle} />
            <input placeholder="Carbs (g)" value={newMeal.carbs} onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })} style={inputStyle} />
            <div style={{ marginTop: "10px", textAlign: "right" }}>
              <button onClick={() => setPopup({ visible: false, day: "", type: "" })} style={cancelBtn}>Cancel</button>
              <button onClick={handleAddMeal} style={saveBtn}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ ...footer, backgroundColor: cardBg, color: textColor }}>
        <p>© 2025 Weekly Planner. All rights reserved.</p>
      </footer>
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const containerStyle = { width: "100%", maxWidth: "1250px", margin: "0 auto", fontFamily: "'Poppins', sans-serif", paddingTop: "20px", minHeight: "100vh", position: "relative" };
const overlay = { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 };
const navBar = { display: "flex", gap: "15px", justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginBottom: "20px", position: "relative", zIndex: 1 };
const navLink = { textDecoration: "none", fontWeight: "600", borderRadius: "8px", padding: "6px 10px", cursor: "pointer" };
const modeToggleBtn = { border: "none", borderRadius: "8px", padding: "6px 12px", cursor: "pointer", fontWeight: "600" };
const sectionTitle = { fontWeight: "600", marginBottom: "15px", textAlign: "center" };
const daySelectorContainer = { display: "flex", justifyContent: "center", position: "relative" };
const daySelector = { padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "500", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", zIndex:2 };
const dayListContainer = { position: "absolute", top: "45px", display: "flex", gap: "10px", flexWrap: "wrap", padding: "10px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex:2 };
const dayItem = { padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "500" };
const dayCard = { flex: "0 1 400px", borderRadius: "12px", padding: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", marginBottom:'20px' };
const summaryBox = { borderRadius: "8px", padding: "12px", marginBottom: "15px", fontSize: "14px" };
const mealTypeBox = { margin: "15px", borderRadius: "8px", padding: "16px", gap:'15px' };
const addMealButton = { marginTop: "6px", backgroundColor: "#911515ff", color: "#fff", border: "none", borderRadius: "6px", padding: "6px 10px", cursor: "pointer", fontSize: "14px", fontWeight: "500", marginLeft:'15px' };
const progressButton = { backgroundColor: "#FF9F1C", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", marginTop:"15px" };
const mealCard = { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "6px", padding: "6px 8px", borderRadius: "6px", backgroundColor: "#EDF1F5" };
const deleteMealButton = { background: "transparent", border: "none", color: "#FF4D4F", cursor: "pointer", fontWeight: "bold" };
const popupOverlay = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const popupBox = { padding: "20px", borderRadius: "12px", width: "90%", maxWidth: "400px", boxShadow: "0 6px 20px rgba(0,0,0,0.15)" };
const inputStyle = { display: "block", width: "100%", marginBottom: "12px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" };
const cancelBtn = { backgroundColor: "#ccc", color: "#000", border: "none", padding: "6px 12px", borderRadius: "6px", marginRight: "6px", cursor: "pointer" };
const saveBtn = { backgroundColor: "#007AFF", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" };
const footer = { textAlign: "center", padding: "20px", marginTop: "40px", borderTop: "1px solid #ccc", fontSize: "14px", position:'relative', zIndex:1 };
