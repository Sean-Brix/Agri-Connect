import React from 'react'
import Navbar from '../../Components/Navbar'
import backg from './Assets/backg.jpg'



export default function Distribution() {
const [filter, setFilter] = React.useState('All');

const items = [
    { id: 1, type: 'Fertilizer', variety: 'Urea', quantity: '50 kg', date: '2024-06-10', status: 'Delivered' },
    { id: 2, type: 'Fertilizer', variety: 'DAP', quantity: '50 kg', date: '2024-06-10', status: 'Delivered' },
    { id: 3, type: 'Seed', variety: 'Maize', quantity: '20 kg', date: '2024-06-10', status: 'Delivered' },
    { id: 4, type: 'Seed', variety: 'Wheat', quantity: '30 kg', date: '2024-06-10', status: 'Delivered' },
    { id: 5, type: 'Fertilizer', variety: 'Urea', quantity: '60 kg', date: '2024-06-10', status: 'Delivered' },
    { id: 6, type: 'Seed', variety: 'Maize', quantity: '25 kg', date: '2024-06-10', status: 'Delivered' },
];

const varieties = ['All', ...Array.from(new Set(items.map(i => i.variety)))];

const filteredItems = filter === 'All' ? items : items.filter(i => i.variety === filter);

// Pagination settings
// Pagination settings
const ITEMS_PER_PAGE = 8; // Increased items per page

// Add more default items to see the pagination
items.push(
    { id: 7, type: 'Fertilizer', variety: 'NPK', quantity: '40 kg', date: '2024-06-11', status: 'Delivered' },
    { id: 8, type: 'Seed', variety: 'Rice', quantity: '15 kg', date: '2024-06-11', status: 'Delivered' },
    { id: 9, type: 'Fertilizer', variety: 'Ammonium Sulfate', quantity: '55 kg', date: '2024-06-12', status: 'Delivered' },
    { id: 10, type: 'Seed', variety: 'Barley', quantity: '18 kg', date: '2024-06-12', status: 'Delivered' },
    { id: 11, type: 'Fertilizer', variety: 'Potash', quantity: '45 kg', date: '2024-06-13', status: 'Delivered' },
    { id: 12, type: 'Seed', variety: 'Sorghum', quantity: '22 kg', date: '2024-06-13', status: 'Delivered' },
    { id: 13, type: 'Fertilizer', variety: 'Lime', quantity: '35 kg', date: '2024-06-14', status: 'Delivered' },
    { id: 14, type: 'Seed', variety: 'Soybean', quantity: '28 kg', date: '2024-06-14', status: 'Delivered' },
    { id: 15, type: 'Fertilizer', variety: 'Gypsum', quantity: '30 kg', date: '2024-06-15', status: 'Delivered' },
    { id: 16, type: 'Seed', variety: 'Millet', quantity: '12 kg', date: '2024-06-15', status: 'Delivered' }
);
const [currentPage, setCurrentPage] = React.useState(1);

React.useEffect(() => {
    // Reset to first page when filter changes
    setCurrentPage(1);
}, [filter]);

const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
);

return (
<>
    <Navbar />
    <div
        className="flex min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-green-800 relative"
        style={{
            backgroundImage: `linear-gradient(rgba(20,30,40,0.85),rgba(20,30,40,0.85)), url(${backg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    >
        <div className="flex-1 w-full relative z-10">
            <div className="w-full px-4 flex justify-center items-center pt-12">
                <div className="relative flex flex-col items-center mt-30">
                    <span className="uppercase tracking-widest text-blue-300 text-sm font-semibold mb-2 letter-spacing-wide">
                        Welcome to
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-green-200 drop-shadow-lg text-center">
                        Distribution Overview
                    </h1>
                    <div className="mt-3 w-24 h-2 rounded-full bg-gradient-to-r from-blue-400 via-green-400 to-blue-400 opacity-80 animate-pulse"></div>
                </div>
            </div>
            {/* Modern Filter */}
            <div className="max-w-6xl mx-auto mt-10 px-4 flex justify-end">
                <div className="relative">
                    <label className="sr-only" htmlFor="variety-filter">Filter by Variety</label>
                    <div className="flex items-center space-x-2 bg-white rounded-full shadow-lg px-4 py-2 border border-gray-200 focus-within:ring-2 focus-within:ring-blue-400 transition">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-7 4h4m-7 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <select
                            id="variety-filter"
                            className="appearance-none bg-transparent outline-none px-2 py-1 text-gray-700 font-medium focus:ring-0 focus:outline-none"
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                        >
                            {varieties.map(v => (
                                <option key={v} value={v}>{v}</option>
                            ))}
                        </select>
                        <span className="pointer-events-none text-gray-400">
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto mt-8 px-4   rounded-3xl shadow-xl  w-[95vw] sm:w-[90vw] md:w-auto ">
                <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {paginatedItems.map((item, idx) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-3xl shadow border border-gray-200 flex flex-col hover:scale-[1.025] hover:shadow-lg transition-transform duration-300"
                        >
                            <div className="p-7 flex-1 flex flex-col">
                                <div className="flex items-center mb-5">
                                    <div className="relative">
                                        <img
                                            src={`https://source.unsplash.com/160x160/?${item.type},${item.variety},agriculture,${idx}`}
                                            alt={`Item ${item.id}`}
                                            className="w-24 h-24 object-cover rounded-2xl shadow border-4 border-white"
                                        />
                                        <span className="absolute -bottom-2 -right-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full shadow font-bold">
                                            {item.type}
                                        </span>
                                    </div>
                                    <div className="ml-6">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-1">
                                            {item.variety}
                                        </h2>
                                        <span className="text-xs text-gray-400 font-mono tracking-wider">#ID-00{item.id}</span>
                                    </div>
                                </div>
                                <dl className="mb-7 grid grid-cols-2 gap-x-6 gap-y-3 text-base text-gray-700">
                                    <div>
                                        <dt className="font-semibold text-gray-500">Quantity</dt>
                                        <dd className="text-gray-900">{item.quantity}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-semibold text-gray-500">Date</dt>
                                        <dd className="text-gray-900">{item.date}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-semibold text-gray-500">Status</dt>
                                        <dd>
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold shadow">
                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <circle cx="10" cy="10" r="10" />
                                                </svg>
                                                {item.status}
                                            </span>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                            <div className="px-7 pb-7 flex gap-2">
                                <button className="flex-1 bg-blue-700 text-white text-base px-5 py-3 rounded-xl font-bold shadow hover:bg-blue-800 transition-all duration-200 hover:scale-105">
                                    Acquire
                                </button>
                                <button className="flex-1 bg-gray-200 text-blue-700 text-base px-5 py-3 rounded-xl font-bold shadow hover:bg-blue-100 transition-all duration-200 hover:scale-105">
                                    Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {filteredItems.length === 0 && (
                    <div className="text-center text-blue-300 py-16 text-lg font-medium">
                        No items found for this variety.
                    </div>
                )}
                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-10 mb-10 space-x-2">
                        <button
                            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 disabled:opacity-50"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                className={`px-4 py-2 rounded-lg font-semibold ${
                                    currentPage === i + 1
                                        ? 'bg-blue-700 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 disabled:opacity-50"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
    <style>{`
        .letter-spacing-wide {
            letter-spacing: 0.15em;
        }
    `}</style>
</>
)
}
