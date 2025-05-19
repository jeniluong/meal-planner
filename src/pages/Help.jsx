import React from 'react';

const Help = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Help & Support</h1>
      <p className="text-gray-700 leading-relaxed mb-2">
        If you have questions or need assistance, please try the following:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>Check the FAQ section (coming soon).</li>
        <li>Reach out to support at <a href="mailto:support@example.com" className="text-blue-600 underline">support@example.com</a>.</li>
        <li>Visit our GitHub repository for known issues and documentation.</li>
      </ul>
    </div>
  );
};

export default Help;
