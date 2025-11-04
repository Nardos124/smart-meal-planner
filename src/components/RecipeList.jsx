import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../components/ThemeContext"; // Import the context

export default function RecipeList() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme(); // Get darkMode & toggleTheme from context
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const scrollRef = useRef(null);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const menuButtons = [
    { name: "Tracker", action: () => navigate("/tracker") },
    { name: "Home", action: () => navigate("/") },
    { name: "Planner", action: () => navigate("/planner") },
  ];

  const recipes = [
    { id: 1, name: "Veggie Salad", image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg", nutrients: "Calories: 250 | Protein: 8g | Carbs: 30g | Fat: 10g", videoLink: "https://www.youtube.com/watch?v=example1", tags: ["Lunch","Dinner"] },
    { id: 2, name: "Grilled Chicken", image: "https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg", nutrients: "Calories: 400 | Protein: 35g | Carbs: 10g | Fat: 20g", videoLink: "https://www.youtube.com/watch?v=example2", tags: ["Lunch","Dinner"] },
    { id: 3, name: "Smoothie Bowl", image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg", nutrients: "Calories: 300 | Protein: 6g | Carbs: 50g | Fat: 5g", videoLink: "https://www.youtube.com/watch?v=example3", tags: ["Breakfast"] },
    { id: 4, name: "Pasta Primavera", image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg", nutrients: "Calories: 350 | Protein: 12g | Carbs: 50g | Fat: 10g", videoLink: "https://www.youtube.com/watch?v=example4", tags: ["Lunch","Dinner"] },
    { id: 5, name: "Fruit Smoothie", image: "https://images.pexels.com/photos/4055855/pexels-photo-4055855.jpeg", nutrients: "Calories: 180 | Protein: 2g | Carbs: 40g | Fat: 0g", videoLink: "https://www.youtube.com/watch?v=example5", tags: ["Breakfast"] }
  ];

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

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavs = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const filteredRecipes = recipes.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSearch = () => setShowSearch(!showSearch);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div style={{ 
      backgroundColor: darkMode ? "#121212" : "#f9f9f9",
      color: darkMode ? "#f1f1f1" : "#333",
      minHeight: "100vh",
      maxWidth:"100vw",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      transition: "0.5s ease"
    }}>
      {/* HEADER */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        padding: "15px 20px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: darkMode ? "#1e1e1eaa" : "#ffffffcc",
        backdropFilter: "blur(10px)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        transition: "0.3s"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>Recipe List & Analysis</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={toggleSearch} className="icon-btn">🔍</button>
            <button onClick={toggleTheme} className="icon-btn">{darkMode ? "🌙" : "☀️"}</button>
            <button onClick={toggleMenu} className="menu-btn">☰</button>
          </div>
        </div>

        {showSearch && (
          <input
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              marginTop: "10px",
              padding: "10px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #ccc",
              transition: "0.3s",
              backgroundColor: darkMode ? "#2a2a2a" : "#fff",
              color: darkMode ? "#f1f1f1" : "#333"
            }}
          />
        )}

        <div style={{
          display: "flex",
          gap: "10px",
          marginTop: showMenu ? "12px" : "0",
          maxHeight: showMenu ? "250px" : "0",
          overflow: "hidden",
          transition: "all 0.5s",
          flexWrap: "wrap"
        }}>
          {menuButtons.map((btn, idx) => (
            <button key={idx} style={menuButtonStyle} onClick={btn.action}>{btn.name}</button>
          ))}
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "40px 20px",
        maxWidth: "900px",
        margin: "40px auto"
      }}>
        <h2 style={{ fontSize: "2.2rem", fontWeight: "700", marginBottom: "15px", color: darkMode ? "#f1f1f1" : "#2c3e50" }}>
          Eat Better. Live Healthier.
        </h2>
        <p style={{ fontSize: "1.2rem", opacity: 0.9, maxWidth: "650px" }}>
          Healthy recipes designed for real life and real families. Track calories and nutrients effortlessly while enjoying what you love.
        </p>
      </section>

      {/* CAROUSEL */}
      <section style={{ overflow: "hidden", width: "100%", marginTop: "2vh", padding: "0 10px" }}>
        <div ref={scrollRef} style={{ display: "flex", gap: "20px", transition: "transform 0.3s ease" }}>
          {filteredRecipes.concat(filteredRecipes).map((r, i) => (
            <div key={i} className="card" style={{ minWidth: "220px", height: "270px", position: "relative", borderRadius: "12px", overflow: "hidden", transition: "transform 0.3s ease" }}>
              <img src={r.image} alt={r.name} className="recipe-img" />
              <div className="info">
                <p style={{ fontWeight: "700", fontSize: "1rem" }}>{r.name}</p>
                <small style={{ fontSize: "0.8rem" }}>{r.nutrients}</small>
                <a href={r.videoLink} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "5px" }}>
                  🎬 Watch Tutorial
                </a>
                <button onClick={() => toggleFavorite(r.id)} style={{
                  marginTop: "6px",
                  background: "gold",
                  border: "none",
                  borderRadius: "50%",
                  cursor: "pointer",
                  padding: "4px"
                }}>
                  {favorites.includes(r.id) ? "★" : "☆"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        marginTop: "50px",
        padding: "25px 20px",
        textAlign: "center",
        backgroundColor: darkMode ? "#1e1e1e" : "#ffffffcc",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid #ccc",
        transition: "0.3s",
        color: darkMode ? "#f1f1f1" : "#333"
      }}>
        <p>© 2025 Smart-meal-planner. All rights reserved.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "8px" }}>
          <a href="#">🐦 Twitter</a>
          <a href="#">📘 Facebook</a>
          <a href="#">📸 Instagram</a>
        </div>
      </footer>

      {showTopBtn && <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "12px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: "#FF6B6B",
        color: "#fff",
        cursor: "pointer",
        transition: "0.3s"
      }}>↑</button>}

      <style>{`
        .icon-btn { background: transparent; border: none; cursor: pointer; font-size: 20px; transition: 0.3s; }
        .menu-btn { background:#FF6B6B; border:none; border-radius:50%; cursor:pointer; padding:8px; transition: 0.3s; }
        .card { cursor:pointer; overflow:hidden; border-radius:12px; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card:hover { transform: scale(1.05); box-shadow: 0 10px 20px rgba(0,0,0,0.25); }
        .recipe-img { width:100%; height:100%; object-fit:cover; transition: transform 0.4s ease, filter 0.4s ease; }
        .card:hover .recipe-img { transform: scale(1.08); filter: brightness(1.2); }
        .info { position:absolute; bottom:0; width:100%; padding:10px; background:rgba(0,0,0,.65); color:white; opacity:0; transition:.35s; font-size:13px; }
        .card:hover .info { opacity:1; }
      `}</style>
    </div>
  );
}

const menuButtonStyle = {
  padding: "8px 16px",
  borderRadius: "6px",
  backgroundColor: "#FF6B6B",
  border: "none",
  color: "#fff",
  cursor: "pointer",
  transition: "0.3s"
};
