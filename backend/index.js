// index.js (Express Backend Server)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Supabase setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET user preferences
app.get('/api/preferences', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('preferences')
      .select('*')
      .limit(1)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST save recipe
app.post('/api/save-recipe', async (req, res) => {
  const { id, title, image, sourceUrl } = req.body;

  try {
    const { data, error } = await supabase
      .from('saved_recipes')
      .insert([{ id, title, image, sourceUrl }]);

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});