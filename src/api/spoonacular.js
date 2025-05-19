const API_KEY = "8b1965faa315437786308096acf62571";
const BASE_URL = "https://api.spoonacular.com";

export async function fetchMealPlan(preferences) {
  const diet = preferences.diet || "vegetarian";
  const exclude = preferences.exclude || "";

  const url = `${BASE_URL}/mealplanner/generate?timeFrame=day&diet=${diet}&exclude=${exclude}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Failed to fetch meal plan:", error);
    return [];
  }
}