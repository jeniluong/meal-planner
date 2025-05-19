import React, { useEffect, useState } from 'react';
import { fetchUserPreferences, saveRecipe } from '../api/backend';
import { fetchMealPlan } from '../api/spoonacular';

function MealPlanner() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const preferences = await fetchUserPreferences();
        const recipes = await fetchMealPlan(preferences);
        setMeals(recipes);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  const handleSave = async (meal) => {
    const { id, title, image, sourceUrl } = meal;
    await saveRecipe({ id, title, image, sourceUrl });
    alert('Recipe saved!');
  };

  return (
    <div>
      <h2>Meal Planner</h2>
      {loading && <p>Loading meals...</p>}
      {meals.length > 0 ? (
        <ul>
          {meals.map(meal => (
            <li key={meal.id}>
              <strong>{meal.title}</strong><br />
              <img src={meal.image} width={100} alt={meal.title} /><br />
              <a href={meal.sourceUrl} target="_blank" rel="noreferrer">View Recipe</a>
              <br />
              <button onClick={() => handleSave(meal)}>Save Recipe</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No meals found.</p>
      )}
    </div>
  );
}
export default MealPlanner;