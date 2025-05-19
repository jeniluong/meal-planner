import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const SPOONACULAR_API_KEY = '8b1965faa315437786308096acf62571';

function Home() {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ diet: '', intolerances: '' });
  const [filterOptions] = useState({
    diets: ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Vegan', 'Pescetarian'],
    intolerances: ['Dairy', 'Egg', 'Gluten', 'Peanut', 'Seafood', 'Soy', 'Tree Nut', 'Wheat'],
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFeatured() {
      setLoadingFeatured(true);
      try {
        const res = await fetch(`https://api.spoonacular.com/recipes/random?number=6&apiKey=${SPOONACULAR_API_KEY}`);
        const data = await res.json();
        setFeaturedRecipes(data.recipes || []);
      } catch (err) {
        console.error('Error loading featured:', err);
      } finally {
        setLoadingFeatured(false);
      }
    }
    fetchFeatured();
  }, []);

  const handleSearch = async () => {
    setLoadingSearch(true);
    try {
      const url = new URL('https://api.spoonacular.com/recipes/complexSearch');
      url.searchParams.append('apiKey', SPOONACULAR_API_KEY);
      url.searchParams.append('query', searchQuery);
      if (filters.diet) url.searchParams.append('diet', filters.diet);
      if (filters.intolerances) url.searchParams.append('intolerances', filters.intolerances);
      url.searchParams.append('number', '10');
      url.searchParams.append('addRecipeInformation', 'true');

      const res = await fetch(url);
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoadingSearch(false);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="home-container">
      <h1>Smart Meal Planner</h1>

      <div className="search-filters">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={filters.diet} onChange={(e) => setFilters({ ...filters, diet: e.target.value })}>
          <option value="">Select Diet</option>
          {filterOptions.diets.map((diet) => (
            <option key={diet} value={diet.toLowerCase()}>{diet}</option>
          ))}
        </select>
        <select value={filters.intolerances} onChange={(e) => setFilters({ ...filters, intolerances: e.target.value })}>
          <option value="">Select Intolerance</option>
          {filterOptions.intolerances.map((intol) => (
            <option key={intol} value={intol.toLowerCase()}>{intol}</option>
          ))}
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>

      <section>
        <h2>Featured Recipes</h2>
        {loadingFeatured ? (
          <p>Loading featured recipes...</p>
        ) : (
          <Slider {...sliderSettings}>
            {featuredRecipes.map((recipe) => (
              <div key={recipe.id} className="featured-recipe-card" onClick={() => navigate(`/recipe/${recipe.id}`)}>
                <img src={recipe.image} alt={recipe.title} />
                <h4>{recipe.title}</h4>
              </div>
            ))}
          </Slider>
        )}
      </section>

      <section style={{ marginTop: '40px' }}>
        <h2>Search Results</h2>
        {loadingSearch ? (
          <p>Searching recipes...</p>
        ) : searchResults.length > 0 ? (
          <ul className="search-results-list">
            {searchResults.map((recipe) => (
              <li key={recipe.id} onClick={() => navigate(`/recipe/${recipe.id}`)} style={{ cursor: 'pointer' }}>
                <img src={recipe.image} alt={recipe.title} />
                <div className="recipe-info">
                  <h3>{recipe.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: recipe.summary?.slice(0, 150) + '...' }} />
                  <a href={recipe.sourceUrl} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer">View Full Recipe</a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recipes found. Try a different search.</p>
        )}
      </section>
    </div>
  );
}

export default Home;