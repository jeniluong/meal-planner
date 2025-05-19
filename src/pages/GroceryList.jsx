import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

function GroceryList() {
  const { mealPlan, groceryList, setGroceryList } = useContext(AppContext);

  useEffect(() => {
    if (mealPlan.length > 0) {
      const dummyGroceries = ['Tofu', 'Broccoli', 'Quinoa', 'Avocados', 'Lentils'];
      setGroceryList(dummyGroceries);
    }
  }, [mealPlan]);

  return (
    <div>
      <h2>Grocery List</h2>
      {groceryList.length > 0 ? (
        <ul>
          {groceryList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No grocery list yet. Generate a meal plan first.</p>
      )}
    </div>
  );
}

export default GroceryList;