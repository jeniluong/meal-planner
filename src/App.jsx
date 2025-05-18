import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { Link } from 'react-router-dom'

function App() {
  const [preferences, setPreferences] = useState([])
  const [formData, setFormData] = useState({
    diet: '',
    allergies: '',
    goals: ''
  })

  useEffect(() => {
    fetchPreferences()
  }, [])

  const fetchPreferences = async () => {
    try {
      const { data, error } = await supabase.from('user_preferences').select('*')
      if (error) throw error
      setPreferences(data)
      console.log('✅ User Preferences:', data)
    } catch (error) {
      console.error('❌ Error fetching data:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { error } = await supabase.from('user_preferences').insert([formData])
      if (error) throw error
      fetchPreferences()
      setFormData({ diet: '', allergies: '', goals: '' })
    } catch (error) {
      console.error('❌ Error submitting data:', error)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* ✅ Navigation Bar */}
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/">Home</Link> | <Link to="/meal-planner">Meal Planner</Link>
      </nav>

      <h1>Welcome to the Meal Planner App</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="diet"
          placeholder="Diet (e.g. vegetarian)"
          value={formData.diet}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="allergies"
          placeholder="Allergies (e.g. peanuts)"
          value={formData.allergies}
          onChange={handleChange}
        />
        <input
          type="text"
          name="goals"
          placeholder="Health Goals (e.g. weight loss)"
          value={formData.goals}
          onChange={handleChange}
        />
        <button type="submit">Save Preferences</button>
      </form>

      <h2>Saved Preferences</h2>
      <ul>
        {preferences.map((pref, index) => (
          <li key={index}>
            <strong>Diet:</strong> {pref.diet} | <strong>Allergies:</strong> {pref.allergies} | <strong>Goals:</strong> {pref.goals}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App