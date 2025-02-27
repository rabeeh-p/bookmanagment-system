import React from 'react';

const Sample = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-green-400">Tailwind is Working! 🚀</h1>
      <p className="mt-4 text-lg text-gray-300">
        If this text is styled, Tailwind is properly installed.
      </p>
      <button className="mt-6 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg shadow-lg">
        Click Me
      </button>
    </div>
  );
};

export default Sample;
