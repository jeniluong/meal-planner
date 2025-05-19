import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

// Setup Supabase client
const supabase = createClient('https://ajzgrxzucpturxxvawzd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqemdyeHp1Y3B0dXJ4eHZhd3pkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzU0MjIwMSwiZXhwIjoyMDYzMTE4MjAxfQ.tGO_6_C5pagbtNaDGxRIxyuNNdDEyuN7KlHq0hUsAPo');

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