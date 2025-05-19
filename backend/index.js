import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Setup Supabase client with service role key
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// API Endpoint 1: GET user preferences
app.get('/api/preferences', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .limit(1)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error while fetching preferences' });
  }
});

// API Endpoint 2: POST save a recipe
app.post('/api/save-recipe', async (req, res) => {
  const { id, title, image, sourceUrl } = req.body;

  if (!id || !title) {
    return res.status(400).json({ error: 'Recipe id and title are required' });
  }

  try {
    const { data, error } = await supabase
      .from('saved_recipes')
      .insert([{ id, title, image, sourceUrl }]);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ success: true, data });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error while saving recipe' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
