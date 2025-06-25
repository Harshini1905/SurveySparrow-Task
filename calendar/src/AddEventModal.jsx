import React, { useState } from 'react';

const AddEventModal = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [color, setColor] = useState('#3b82f6');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !start || !end) return;
    const newEvent = {
      title,
      start: `${date}T${start}`,
      end: `${date}T${end}`,
      color,
    };
    onSave(newEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Add New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Event Title"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <div className="flex gap-2">
            <input
              type="time"
              className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
            />
            <input
              type="time"
              className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-600 rounded hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-white-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded shadow-md hover:from-blue-700 hover:to-purple-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
