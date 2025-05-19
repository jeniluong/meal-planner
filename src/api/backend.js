export const fetchUserPreferences = async () => {
  const res = await fetch('http://localhost:5000/api/preferences');
  if (!res.ok) throw new Error('Failed to fetch user preferences');
  return await res.json();
};

// Save a recipe to your Supabase DB through your backend
export const saveRecipe = async (recipe) => {
  const res = await fetch('http://localhost:5000/api/save-recipe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe),
  });

  if (!res.ok) throw new Error('Failed to save recipe');
  return await res.json();
};