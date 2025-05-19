const BASE_URL = 'https://api.spoonacular.com';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqemdyeHp1Y3B0dXJ4eHZhd3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NDIyMDEsImV4cCI6MjA2MzExODIwMX0.Yn6A5m8QnINFPzoTeHYMQs-DOHnMyf4Ay5eK5S8ScRo ';


const buildUrl = (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('apiKey', API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });
  return url.toString();
};


export const fetchRecipes = async (params = {}) => {
  const url = buildUrl('/recipes/complexSearch', params);
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch recipes');
  return res.json();
};


export const fetchRecipeById = async (id) => {
  const url = buildUrl(`/recipes/${id}/information`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch recipe ${id}`);
  return res.json();
};

// Generate meal plan (used on Meal Planner)
export const generateMealPlan = async (params = {}) => {
  const url = buildUrl('/mealplanner/generate', params);
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to generate meal plan');
  return res.json();
};

// Fetch ingredient breakdown (used on Grocery List)
export const fetchIngredients = async (id) => {
  const url = buildUrl(`/recipes/${id}/ingredientWidget.json`);
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch ingredients');
  return res.json();
};

// Search ingredients for nutrition (optional use in Grocery List)
export const searchIngredients = async (query) => {
  const url = buildUrl('/food/ingredients/search', { query });
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to search ingredients');
  return res.json();
};

// Nutrition breakdown (used on Recipe Detail)
export const fetchNutrition = async (id) => {
  const url = buildUrl(`/recipes/${id}/nutritionWidget.json`);
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch nutrition data');
  return res.json();
};