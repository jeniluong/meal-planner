import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*');

      if (error) {
        console.error('❌ Error fetching data:', error);
      } else {
        console.log('✅ User Preferences:', data);
        setUserPreferences(data);
        buildChart(data);
      }
    };

    fetchData();
  }, []);

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

      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Nutrition Overview' },
            },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}

      {/* Recipe Detail Links Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Recipe Links</h2>
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
    </div>
  );
};

export default MealPlanner;