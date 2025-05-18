import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY

function MealPlanner() {
  const [preferences, setPreferences] = useState([])
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetchPreferences()
  }, [])

  const fetchPreferences = async () => {
    const { data, error } = await supabase.from('user_preferences').select('*')
    if (!error && data.length > 0) {
      setPreferences(data)
      fetchRecipes(data[0]) // just use first preference for now
    }
  }

  const fetchRecipes = async (pref) => {
    const diet = pref.diet || ''
    const allergies = pref.allergies || ''
    const url = `https://api.spoonacular.com/recipes/complexSearch?diet=${diet}&intolerances=${allergies}&number=5&apiKey=${API_KEY}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      setRecipes(data.results || [])
    } catch (err) {
      console.error('❌ Failed to fetch recipes:', err)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Meal Planner</h1>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <h3>{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} width="200" />
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes found yet. Try adding preferences on the Home page!</p>
      )}
    </div>
  )
}

export default MealPlanner