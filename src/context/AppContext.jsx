import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(null);
  const [mealPlan, setMealPlan] = useState([]);
  const [groceryList, setGroceryList] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  return (
    <AppContext.Provider value={{
      preferences,
      setPreferences,
      mealPlan,
      setMealPlan,
      groceryList,
      setGroceryList,
      savedRecipes,
      setSavedRecipes,
    }}>
      {children}
    </AppContext.Provider>
  );
};