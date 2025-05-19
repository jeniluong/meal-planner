import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import MealPlanner from './pages/mealplanner';
import SavedRecipes from './pages/SavedRecipes';
import UserPreferences from './components/UserPreferences';
import About from './pages/About';
import Help from './pages/Help';
import GroceryList from './pages/GroceryList';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="pt-4 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/user-preferences" element={<UserPreferences />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/grocery-list" element={<GroceryList />} />
          <Route path="*" element={<div className="p-4">404 - Page Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
