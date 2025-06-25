import React, { useState } from 'react';
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  addDays, addMonths, subMonths, format, isSameDay,
  isSameMonth, parseISO
} from 'date-fns';
import AddEventModal from '../AddEventModal';
import initialEvents from '../data/events.json';
import MonthYearDropdown from '../MonthYearDropdown';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [allEvents, setAllEvents] = useState([...initialEvents]);

  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const nextMonth = () => setSelectedDate(addMonths(selectedDate, 1));
  const prevMonth = () => setSelectedDate(subMonths(selectedDate, 1));

  const handleSave = (newEvent) => {
    setAllEvents((prev) => [...prev, newEvent]);
  };

  const getEventsForDate = (date) => {
    return allEvents.filter((event) =>
      isSameDay(date, parseISO(event.start))
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 font-sans">

     <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 drop-shadow-lg">Calendar</h1>
            <p className="text-md text-gray-600 italic">Plan your events with style.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <MonthYearDropdown
              date={selectedDate}
              onSelect={(newDate) => setSelectedDate(newDate)}
            />
            <button onClick={prevMonth} className="text-blue-600 bg-white border border-blue-600 px-3 py-1 rounded hover:bg-blue-100 shadow-sm transition">◀</button>
            <button onClick={nextMonth} className="text-blue-600 bg-white border border-blue-600 px-3 py-1 rounded hover:bg-blue-100 shadow-sm transition">▶</button>
            <button onClick={() => setShowModal(true)} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded shadow-lg hover:from-blue-700 hover:to-purple-700 transition">Add Event</button>
          </div>
        </div>

        <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-700 border-y border-gray-300 py-2 uppercase mt-4 bg-white rounded-t-lg shadow">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="space-y-px bg-gray-200 rounded-b-lg shadow">
          {(() => {
            const rows = [];
            let day = startDate;

            while (day <= endDate) {
              const week = [];

              for (let i = 0; i < 7; i++) {
                const cloneDay = day;
                const isCurrent = isSameDay(cloneDay, new Date());
                const isInMonth = isSameMonth(cloneDay, monthStart);
                const isSelected = isSameDay(cloneDay, selectedDate);
                const events = getEventsForDate(cloneDay);

                week.push(
                  <div
                    key={cloneDay.toISOString()}
                    onClick={() => setSelectedDate(cloneDay)}
                    className={`
                      bg-white w-full min-h-[120px] px-3 py-2 border border-gray-200 
                      relative overflow-y-auto text-sm transition-all cursor-pointer 
                      hover:bg-purple-50
                      ${isCurrent ? 'shadow-md border-yellow-400 border-2' : ''}
                      ${!isInMonth ? 'bg-gray-100 text-gray-400' : ''}
                      ${isSelected ? 'ring-2 ring-purple-500' : ''}
                    `}
                  >
                    <div className="text-sm font-bold text-gray-700 mb-1">
                      {format(cloneDay, 'd')}
                    </div>

                    <div className="flex flex-col gap-1">
                      {events.slice(0, 2).map((event, idx) => (
                        <div
                          key={idx}
                          title={event.title}
                          className="flex items-center gap-1 truncate px-2 py-0.5 text-xs text-gray-800 rounded bg-gradient-to-r from-blue-100 to-purple-100"
                        >
                          <span
                            className="inline-block w-2 h-2 rounded-full"
                            style={{ backgroundColor: event.color || '#3b82f6' }}
                          ></span>
                          <span className="font-medium">{format(parseISO(event.start), 'h:mm a')}</span>
                          <span className="truncate">– {event.title}</span>
                        </div>
                      ))}
                      {events.length > 2 && (
                        <div className="text-[10px] text-purple-400 italic">
                          And {events.length - 2} more...
                        </div>
                      )}
                    </div>
                  </div>
                );

                day = addDays(day, 1);
              }

              rows.push(
                <div key={day.toISOString()} className="grid grid-cols-7">
                  {week}
                </div>
              );
            }

            return rows;
          })()}
        </div>
      </div>

      {showModal && (
        <AddEventModal onClose={() => setShowModal(false)} onSave={handleSave} />
      )}
    </div>
  );
};

export default Calendar;
