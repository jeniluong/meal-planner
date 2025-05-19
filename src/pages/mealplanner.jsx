import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { generateMealPlan, fetchRecipeById } from '../api/api'; // ✅ API functions

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MealPlanner = () => {
  const [userPreferences, setUserPreferences] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [generatedRecipes, setGeneratedRecipes] = useState([]);

  useEffect(() => {
    fetchSupabaseData();
    fetchGeneratedMealPlan(); // ✅ Load Spoonacular meal plan too
  }, []);

  const fetchSupabaseData = async () => {
    const { data, error } = await supabase.from('user_preferences').select('*');
    if (error) {
      console.error('❌ Error fetching Supabase data:', error);
    } else {
      setUserPreferences(data);
      buildChart(data);
    }
  };

  const fetchGeneratedMealPlan = async () => {
    try {
      const plan = await generateMealPlan({ timeFrame: 'day', targetCalories: 2000 });
      const meals = plan.meals || [];

      const detailedRecipes = await Promise.all(
        meals.map((meal) => fetchRecipeById(meal.id))
      );

      setGeneratedRecipes(detailedRecipes);
    } catch (err) {
      console.error('❌ Error generating meal plan:', err);
    }
  };

  const buildChart = (data) => {
    const labels = data.map((item, index) => `Entry ${index + 1}`);
    const calories = data.map((item) => item.calories || 0);
    const protein = data.map((item) => item.protein || 0);
    const fat = data.map((item) => item.fat || 0);
    const carbs = data.map((item) => item.carbs || 0);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Calories',
          data: calories,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
        {
          label: 'Protein (g)',
          data: protein,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
        {
          label: 'Fat (g)',
          data: fat,
          backgroundColor: 'rgba(255, 206, 86, 0.6)',
        },
        {
          label: 'Carbs (g)',
          data: carbs,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Meal Planner</h1>

      {/* Chart from Supabase */}
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Nutrition Overview (User Preferences)' },
            },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}

      {/* Supabase Recipe Links */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Your Saved Recipe Links</h2>
        <ul className="space-y-2">
          {userPreferences.map((item, index) => (
            <li key={item.id}>
              <Link 
                to={`/recipes/${item.recipe_id || item.id}`} 
                className="text-blue-500 hover:underline"
              >
                View Recipe {index + 1}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Spoonacular Generated Meal Plan */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Generated Meal Plan (Spoonacular)</h2>
        {generatedRecipes.length > 0 ? (
          <ul className="space-y-2">
            {generatedRecipes.map((recipe) => (
              <li key={recipe.id}>
                <Link
                  to={`/recipes/${recipe.id}`}
                  className="text-green-600 hover:underline"
                >
                  {recipe.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading generated meal plan...</p>
        )}
      </div>
    </div>
  );
};

export default MealPlanner;