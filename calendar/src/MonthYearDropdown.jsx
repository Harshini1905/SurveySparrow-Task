import React, { useState, useRef, useEffect } from 'react';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - 10 + i);

const MonthYearDropdown = ({ date, onSelect }) => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef();

  const selectedMonth = date.getMonth();
  const selectedYear = date.getFullYear();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="text-lg font-semibold text-blue-700 bg-white px-4 py-2 rounded shadow hover:bg-blue-100 border border-gray-300 transition"
        onClick={() => setShow(!show)}
      >
        {months[selectedMonth]} {selectedYear}
      </button>

      {show && (
        <div className="absolute z-50 mt-2 bg-white border border-gray-300 shadow-xl p-4 rounded flex gap-4 max-h-64 overflow-y-auto w-[300px]">
          {/* Month Select */}
          <div className="flex flex-col gap-1">
            <p className="font-semibold mb-1">Month</p>
            {months.map((m, i) => (
              <button
                key={m}
                onClick={() => {
                  const newDate = new Date(date);
                  newDate.setMonth(i);
                  onSelect(newDate);
                  setShow(false);
                }}
                className={`text-left px-2 py-1 rounded hover:bg-blue-100 transition ${
                  i === selectedMonth ? 'bg-blue-200 font-bold' : ''
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Year Select */}
          <div className="flex flex-col gap-1">
            <p className="font-semibold mb-1">Year</p>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => {
                  const newDate = new Date(date);
                  newDate.setFullYear(y);
                  onSelect(newDate);
                  setShow(false);
                }}
                className={`text-left px-2 py-1 rounded hover:bg-blue-100 transition ${
                  y === selectedYear ? 'bg-blue-200 font-bold' : ''
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthYearDropdown;