import React from 'react';

import { useLocation } from 'react-router-dom';
import { Introduction } from '../components/Pages/Introduction'
import { tasks } from "../data/content"; // adjust the path according to your project structure
import { CodingPreview } from '../components/Pages/CodingPreview';
import { CinemaSeatBooking } from '../components/BookingTicket/CinemaSeatBooking';


export const CinemaSeatBookingPage = () => {

  const location = useLocation();
  const path = location.pathname.slice(1);
  // Filter tasks that belong to "search" path
  const TasksData = tasks.filter(task => task.path === path);
  return (
    <div className={`max-w-6xl mx-auto bg-white-600 text-black`}>

      <Introduction TasksData={TasksData}/>
      <CinemaSeatBooking />
      <CodingPreview TasksData={TasksData}/>
      <div className='mb-6'>
        <h3 className="text-lg font-medium mb-4">🔍 Key Concepts Explained</h3>
        <ul className="list-disc  px-6 mb-6">
          <li className="text-gray-600 mb-2"><strong>Seat Map Modeling:</strong> Seats are represented using a row/column grid (e.g. A1, B12). This makes rendering and lookups predictable.</li>
          <li className="text-gray-600 mb-2"><strong>Fast Lookup with Sets:</strong> <code>bookedSeats</code> and <code>selectedSeats</code> are stored in <code>Set</code> for O(1) checks like <code>set.has(id)</code>.</li>
          <li className="text-gray-600 mb-2"><strong>Immutable Updates:</strong> When toggling a seat, we create a new <code>Set</code> (copy) and add/remove the seat id. This avoids mutating React state.</li>
          <li className="text-gray-600 mb-2"><strong>Derived Total using useMemo:</strong> Total price is computed from selected count (<code>selectedSeats.size</code>) and cached with <code>useMemo</code> for clean + efficient renders.</li>
          <li className="text-gray-600 mb-2"><strong>Booking Flow (Modal + Async):</strong> A modal collects user details, simulates API latency with <code>setTimeout</code>, then moves selected seats into booked state and shows a toast.</li>
        </ul>
      </div>
      <div className='mb-6'>
        <h3 className="text-lg font-medium mb-4">✅ Why This Is a Good Approach:</h3>
        <ul className="list-disc  px-6 mb-6">
          <li className="text-gray-600 mb-2"><strong>Scales well:</strong> With <code>Set</code>-based lookups, the UI remains responsive even if you increase rows/columns.</li>
          <li className="text-gray-600 mb-2"><strong>Reliable state transitions:</strong> The flow is clear: <code>available → selected → booked</code>. Disabling booked seats prevents invalid actions.</li>
          <li className="text-gray-600 mb-2"><strong>Great UX:</strong> Sticky booking bar shows selected seats + total at all times, and the user can reset quickly.</li>
          <li className="text-gray-600 mb-2"><strong>Easy to extend:</strong> You can add seat categories (VIP/Gold), aisle gaps, maximum seat limits, or server-driven availability without rewriting the core.</li>
          <li className="text-gray-600 mb-2"><strong>Strong interview answer:</strong> Demonstrates data modeling, immutable updates, derived state, conditional UI (modal/toast), and async thinking.</li>
        </ul>
      </div>

    </div>
  );
};



