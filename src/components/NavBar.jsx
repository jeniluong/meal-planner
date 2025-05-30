import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/about" style={styles.link}>About</Link>
      <Link to="/help" style={styles.link}>Help</Link>
      <Link to="/user-preferences" style={styles.link}>Preferences</Link>
      <Link to="/meal-planner" style={styles.link}>Meal Planner</Link>
      <Link to="/grocery-list" style={styles.link}>Grocery List</Link>
      <Link to="/saved-recipes" style={styles.link}>Saved Recipes</Link>
    </nav>
  );
}

const styles = {
  nav: {
    padding: '1rem',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    gap: '1rem',
    borderBottom: '1px solid #ccc',
    flexWrap: 'wrap',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '500',
  },
};

export default NavBar;
