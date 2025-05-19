import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function SavedRecipes() {
  const { savedRecipes } = useContext(AppContext);

  return (
    <div>
      <h2>Saved Recipes</h2>
      {savedRecipes.length > 0 ? (
        <ul>
          {savedRecipes.map((recipe, idx) => (
            <li key={idx}>{recipe}</li>
          ))}
        </ul>
      ) : (
        <p>No saved recipes yet.</p>
      )}
    </div>
  );
}

export default SavedRecipes;