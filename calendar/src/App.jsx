import React from 'react';
import Calendar from './Components/Calendar';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl p-6">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 text-center mb-6">
          React Event Calendar
        </h1>
        <Calendar />
      </div>
    </div>
  );
}

export default App;
