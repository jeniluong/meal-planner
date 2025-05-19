import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import MealPlanner from './pages/mealplanner';
import RecipeDetail from './pages/RecipeDetail';
import Help from './pages/Help';
import GroceryList from './pages/GroceryList';
import SavedRecipes from './pages/SavedRecipes';              
import GeneratedMealPlans from './pages/GeneratedMealPlans';  
import UserPreferences from './pages/UserPreferences';        
import NavBar from './components/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/help" element={<Help />} />
        <Route path="/grocery-list" element={<GroceryList />} />
        <Route path="/saved-recipes" element={<SavedRecipes />} />
        <Route path="/generated-meal-plans" element={<GeneratedMealPlans />} />
        <Route path="/user-preferences" element={<UserPreferences />} />
      </Routes>
    </div>
  );
}

export default App;