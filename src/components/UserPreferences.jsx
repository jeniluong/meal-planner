import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

function UserPreferences() {
  const [diet, setDiet] = useState('');
  const [allergies, setAllergies] = useState('');
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const { setPreferences } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPreferences({ diet, allergies, mealsPerDay });
    alert('Preferences saved!');
  };

  return (
    <div>
      <h2>User Preferences</h2>
      <form onSubmit={handleSubmit}>
        <label>Dietary Restrictions:
          <input value={diet} onChange={(e) => setDiet(e.target.value)} placeholder="e.g. vegan, keto" />
        </label>
        <br />
        <label>Allergies:
          <input value={allergies} onChange={(e) => setAllergies(e.target.value)} placeholder="e.g. peanuts" />
        </label>
        <br />
        <label>Meals per Day:
          <input type="number" value={mealsPerDay} onChange={(e) => setMealsPerDay(Number(e.target.value))} />
        </label>
        <br />
        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
}

export default UserPreferences;