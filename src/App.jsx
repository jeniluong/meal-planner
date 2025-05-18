import React from 'react';
import { Routes, Route } from 'react-router-dom';  // <-- No BrowserRouter here!
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import MealPlanner from './pages/mealplanner';
import RecipeDetail from './pages/RecipeDetail';

const App = () => (
  <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/meal-planner" element={<MealPlanner />} />
      <Route path="/recipes/:id" element={<RecipeDetail />} />
    </Routes>
  </>
);

export default App;