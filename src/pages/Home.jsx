import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import './Home.css';

const SPOONACULAR_API_KEY = '8b1965faa315437786308096acf62571';

function Home() {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    diet: '',
    intolerances: '',
  });
  const [filterOptions, setFilterOptions] = useState({
    diets: ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Vegan', 'Pescetarian'],
    intolerances: ['Dairy', 'Egg', 'Gluten', 'Peanut', 'Seafood', 'Soy', 'Tree Nut', 'Wheat'],
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  // Fetch featured recipes for slider
  useEffect(() => {
    async function fetchFeatured() {
      setLoadingFeatured(true);
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/random?number=6&apiKey=${SPOONACULAR_API_KEY}`
        );
        const data = await response.json();
        setFeaturedRecipes(data.recipes || []);
      } catch (error) {
        console.error('Error fetching featured recipes:', error);
      }
      setLoadingFeatured(false);
    }
    fetchFeatured();
  }, []);

  // Search recipes based on query and filters
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

      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
    setLoadingSearch(false);
  };

  // Slider settings for React Slick
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

      {/* Search Bar and Filters */}
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          value={filters.diet}
          onChange={(e) => setFilters((prev) => ({ ...prev, diet: e.target.value }))}
        >
          <option value="">Select Diet</option>
          {filterOptions.diets.map((diet) => (
            <option key={diet} value={diet.toLowerCase()}>
              {diet}
            </option>
          ))}
        </select>

        <select
          value={filters.intolerances}
          onChange={(e) => setFilters((prev) => ({ ...prev, intolerances: e.target.value }))}
        >
          <option value="">Select Intolerance</option>
          {filterOptions.intolerances.map((intol) => (
            <option key={intol} value={intol.toLowerCase()}>
              {intol}
            </option>
          ))}
        </select>

        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Featured Recipes Slider */}
      <section>
        <h2>Featured Recipes</h2>
        {loadingFeatured ? (
          <p>Loading featured recipes...</p>
        ) : (
          <Slider {...sliderSettings}>
            {featuredRecipes.map((recipe) => (
              <div key={recipe.id} className="featured-recipe-card">
                <img src={recipe.image} alt={recipe.title} />
                <h4>{recipe.title}</h4>
              </div>
            ))}
          </Slider>
        )}
      </section>

      {/* Search Results */}
      <section style={{ marginTop: '40px' }}>
        <h2>Search Results</h2>
        {loadingSearch ? (
          <p>Searching recipes...</p>
        ) : searchResults.length > 0 ? (
          <ul className="search-results-list">
            {searchResults.map((recipe) => (
              <li key={recipe.id}>
                <img src={recipe.image} alt={recipe.title} />
                <div className="recipe-info">
                  <h3>{recipe.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: recipe.summary?.slice(0, 150) + '...' }} />
                  <a href={recipe.sourceUrl} target="_blank" rel="noreferrer">
                    View Full Recipe
                  </a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recipes found. Try searching for something.</p>
        )}
      </section>
    </div>
  );
}

export default Home;