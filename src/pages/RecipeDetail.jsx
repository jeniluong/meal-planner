import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SPOONACULAR_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqemdyeHp1Y3B0dXJ4eHZhd3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NDIyMDEsImV4cCI6MjA2MzExODIwMX0.Yn6A5m8QnINFPzoTeHYMQs-DOHnMyf4Ay5eK5S8ScRo ';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`);
        if (!res.ok) throw new Error('Failed to fetch recipe');
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        console.error('❌ Error fetching recipe:', err);
        setError('Could not load recipe.');
      }
    };

    fetchRecipe();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!recipe) return <p>Loading recipe...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="rounded-lg mb-4" />

      <div dangerouslySetInnerHTML={{ __html: recipe.summary }} className="mb-6" />

      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc list-inside mb-4">
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Instructions</h2>
      <p>{recipe.instructions || 'No instructions available.'}</p>
    </div>
  );
};

export default RecipeDetail;