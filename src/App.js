import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tracker from "./components/Tracker";
import Home from "./pages/Home";
import RecipeList from './components/RecipeList';
import Planner from "./components/planner.jsx";
import { ThemeProvider } from "./components/ThemeContext";
// import progress

import './App.css';

function App() {
  return (
     <ThemeProvider>
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/Planner" element={<Planner />} />
 {/* added */}
        </Routes>
      </Router>
    </div></ThemeProvider>
  );
}


export default App;

