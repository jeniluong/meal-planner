import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Setup Supabase client with env variables
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET user preferences
app.get('/api/preferences', async (req, res) => {
  const { data, error } = await supabase
    .from('preferences')
    .select('*')
    .limit(1)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST to save recipe
app.post('/api/save-recipe', async (req, res) => {
  const { id, title, image, sourceUrl } = req.body;

  const { data, error } = await supabase
    .from('saved_recipes')
    .insert([{ id, title, image, sourceUrl }]);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));