import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import Help from './pages/Help';
import UserPreferences from './components/UserPreferences';
import MealPlanner from './pages/mealplanner';
import GroceryList from './pages/GroceryList';
import SavedRecipes from './pages/SavedRecipes';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/user-preferences" element={<UserPreferences />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
        <Route path="/grocery-list" element={<GroceryList />} />
        <Route path="/saved-recipes" element={<SavedRecipes />} />
      </Routes>
    </div>
  );
}

export default App;