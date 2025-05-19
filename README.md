Description: 
SmartMeal Planner is a web-based meal planning assistant that generates personalized daily meal plans based on a user's dietary preferences and allergies. Users can save recipes and view them later, streamlining the process of healthy and conscious eating.

The application integrates with the Spoonacular API for real-time recipe suggestions and uses Supabase for storing user preferences and saved meals.

Our target browsers include:
Chrome (Latest), Safari (iOS), Firefox, Microsoft Edge, Android WebView (Chrome-based), and iOS Safari (iOS 14+)

Developer Manual
This section is intended for developers who are setting up and maintaining the application locally. This manual assumes knowledge of Node.js, JavaScript modules, and web development best practices.

Installation:
1. Clone the repository

    git clone https://github.com/your-username/smartmeal-planner.git
    cd smartmeal-planner
2. Install dependencies

    npm install
3. Setup Variables

    Create a .env file in your root directory:
    SUPABASE_URL=https://your-project.supabase.co
    SUPABASE_SERVICE_ROLE_KEY=your-secret-key
4. Start Frontend and Backend Development Servers:

    Frontend (React): npm run dev
    Backend (Express): node server/index.js

Running Tests:
There are currently no automated tests written. Future developers are encouraged to integrate Jest or Vitest for unit testing and Cypress for end-to-end testing.

API Documentation:
GET /api/preferences
Description: Returns the most recent user preferences
Response:
    {
    "diet": "vegan",
     "exclude": "peanuts",
    "meals_per_day": 3
    }

POST /api/save-recipe
Description: Saves a recipe to the user's saved list.
Request Body:
    {
    "id": 123,
     "title": "Vegan Lasagna",
    "image": "https://...",
     "sourceUrl": "https://..."
    }
Response:
    {
    "success": true,
    "data": { ... }
    }

Known Bugs:
Currently, only one user’s preferences are fetched — multi-user support not yet implemented.
No validation when submitting preferences.
Saved recipes are not yet retrieved from Supabase (only saved).

Future Plans:
Multi-user support via Supabase auth

Retrieve and display saved recipes

Allow editing user preferences

Unit + integration tests

Add support for generating grocery lists from recipes

Mobile responsiveness improvements