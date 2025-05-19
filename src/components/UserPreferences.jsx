import React, { useEffect, useState } from 'react';
import { fetchUserPreferences } from '../api/backend';

const UserPreferences = () => {
  const [preferences, setPreferences] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const data = await fetchUserPreferences();
        setPreferences(data);
      } catch (err) {
        setError('Failed to fetch user preferences');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, []);

  if (loading) return <div className="p-4">Loading preferences...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">User Preferences</h1>
      <ul className="list-disc pl-6 space-y-2">
        {Object.entries(preferences).map(([key, value]) => (
          <li key={key}>
            <strong className="capitalize">{key}:</strong> {String(value)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPreferences;
