import React, { useEffect, useMemo, useState } from 'react'

// Cinema Seat Booking - single-file React component
// - Tailwind CSS based UI (replace with your CSS if not using Tailwind)
// - Responsive seat map, seat selection, pricing, and booking modal
// - Mock backend: pre-booked seats generated randomly
// - Features: select/deselect seats, show legend, sticky booking bar, confirm booking

const ROWS = 'ABCDEFGHIJ'.split('')
const COLS = 12
const SEAT_PRICE = 250



export const CinemaSeatBooking = () => {
  const [bookedSeats, setBookedSeats] = useState(new Set())
  const [selectedSeats, setSelectedSeats] = useState(new Set())
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  // create seat id like A1, B12
  const seatId = (r, c) => `${r}${c}`

  // initially mark some seats as booked (mock)
  useEffect(() => {
    const s = new Set()
    // deterministic-ish random: book 12 seats
    const seed = 7
    for (let i = 0; i < 12; i++) {
      const r = ROWS[(i * seed) % ROWS.length]
      const c = ((i * 13) % COLS) + 1
      s.add(seatId(r, c))
    }
    setBookedSeats(s)
  }, [])

  const toggleSeat = (id) => {
    if (bookedSeats.has(id)) return
    setSelectedSeats(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const total = useMemo(() => selectedSeats.size * SEAT_PRICE, [selectedSeats])

  const confirmBooking = async () => {
    if (selectedSeats.size === 0) return
    if (!name.trim() || !email.trim()) {
      alert('Please enter name and email to continue')
      return
    }
    setLoading(true)
    // mock API delay
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    // mark selected as booked
    setBookedSeats(prev => new Set([...prev, ...Array.from(selectedSeats)]))
    setSelectedSeats(new Set())
    setShowModal(false)
    setSuccessMsg('Booking confirmed! Enjoy your show 🎬')
    setTimeout(() => setSuccessMsg(''), 4000)
  }

  const reset = () => {
    setSelectedSeats(new Set())
    setSuccessMsg('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-6 sm:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Cinema Hall — Screen 1</h1>
            <p className="text-sm text-gray-600">Tonight · 7:30 PM · Dolby Atmos</p>
          </div>
          <div className="sm:text-right">
            <div className="text-sm text-gray-500">Price per seat</div>
            <div className="text-lg font-semibold">₹{SEAT_PRICE}</div>
          </div>
        </header>

        <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
          {/* Screen */}
          <div className="mb-6">
            <div className="mx-auto w-3/4 md:w-1/2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-md text-center py-2 text-sm font-medium text-gray-700">
              SCREEN
            </div>
          </div>

          {/* Seats grid */}
          <div className="overflow-x-auto overflow-y-hidden -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="flex flex-col gap-2 sm:gap-3 min-w-[560px]">
              {ROWS.map(r => (
                <div key={r} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 text-sm text-gray-500">{r}</div>
                  <div className="grid grid-cols-12 gap-2 sm:gap-3 flex-1">
                    {Array.from({ length: COLS }).map((_, ci) => {
                      const c = ci + 1
                      const id = seatId(r, c)
                      const isBooked = bookedSeats.has(id)
                      const isSelected = selectedSeats.has(id)
                      return (
                        <button
                          key={id}
                          onClick={() => toggleSeat(id)}
                          disabled={isBooked}
                          className={`h-9 sm:h-10 w-9 sm:w-auto rounded-md text-[11px] sm:text-xs font-medium flex items-center justify-center select-none transition-shadow duration-150
                            ${isBooked ? 'bg-red-200 text-red-800 cursor-not-allowed line-through' : ''}
                            ${isSelected ? 'bg-emerald-500 text-white shadow-lg' : ''}
                            ${!isBooked && !isSelected ? 'bg-gray-100 hover:bg-gray-200' : ''}`}
                        >
                          {c}
                        </button>
                      )
                    })}
                  </div>
                  <div className="w-6 text-sm text-gray-500 text-right">{r}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <Legend colorClass="bg-gray-100" label="Available" />
            <Legend colorClass="bg-emerald-500 text-white" label="Selected" />
            <Legend colorClass="bg-red-200 text-red-800" label="Booked" />
            <div className="sm:ml-auto text-gray-600">Screen-side seats are best for sound</div>
          </div>
        </div>

        {/* Sticky booking bar */}
        <div className="w-full max-w-4xl mt-4 px-0 sm:px-4 pointer-events-none">
          <div className="pointer-events-auto">
            <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-500">Selected</div>
                <div className="font-semibold truncate">{Array.from(selectedSeats).join(', ') || '—'}</div>
              </div>
              <div className="sm:text-right">
                <div className="text-sm text-gray-500">Total</div>
                <div className="text-lg font-bold">₹{total}</div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:ml-4 w-full sm:w-auto">
                <button onClick={reset} className="w-full sm:w-auto px-4 py-2 rounded-md border">Reset</button>
                <button
                  onClick={() => setShowModal(true)}
                  disabled={selectedSeats.size === 0}
                  className={`w-full sm:w-auto px-4 py-2 rounded-md text-white font-semibold ${selectedSeats.size===0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-xl max-w-lg w-full shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">Confirm Booking</h2>
                <p className="text-sm text-gray-600 mb-4">Seats: {Array.from(selectedSeats).join(', ')}</p>

                <div className="grid grid-cols-1 gap-3">
                  <input value={name} onChange={e=>setName(e.target.value)} className="border p-2 rounded" placeholder="Your name" />
                  <input value={email} onChange={e=>setEmail(e.target.value)} className="border p-2 rounded" placeholder="Email" />
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-sm text-gray-600">Total: <span className="font-semibold">₹{total}</span></div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                    <button onClick={()=>setShowModal(false)} className="w-full sm:w-auto px-4 py-2 rounded border">Cancel</button>
                    <button onClick={confirmBooking} disabled={loading} className="w-full sm:w-auto px-4 py-2 rounded bg-emerald-600 text-white font-semibold">
                      {loading ? 'Booking...' : 'Confirm'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success toast */}
        {successMsg && (
          <div className="fixed right-6 top-6 bg-emerald-600 text-white px-4 py-2 rounded shadow">{successMsg}</div>
        )}
      </div>
    </div>
  )
}

function Legend({ colorClass, label }){
  return (
    <div className="flex items-center gap-2">
      <div className={`w-6 h-6 rounded ${colorClass} border`} />
      <div className="text-sm text-gray-700">{label}</div>
    </div>
  )
}
