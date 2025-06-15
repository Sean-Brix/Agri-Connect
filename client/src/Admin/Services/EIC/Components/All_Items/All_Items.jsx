import React, { useState } from 'react';
import Item_Card from './Item_Card.jsx';

export default function All_Items() {
    const items = Array.from({ length: 10 });
    const [statusFilter, setStatusFilter] = useState('');
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    // Modern design: cleaner layout, glassmorphism, subtle shadows, improved spacing, icons, and responsive tweaks
    const [showAdd, setShowAdd] = useState(false);

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 max-w-7xl mx-auto gap-6 p-4 md:p-6 w-full">
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full flex-1">
                    {/* Search */}
                    <div className="relative flex-1 min-w-[220px] max-w-lg">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-green-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search items..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 text-black bg-white/70 backdrop-blur-md shadow-lg transition-all"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="relative flex-1 min-w-[180px] max-w-xs">
                        <select
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full border-none rounded-2xl px-4 py-2.5 bg-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 shadow-lg transition-all"
                        >
                            <option value="all">All Categories</option>
                            <option value="Farming Equipment">Farming Equipment</option>
                            <option value="Harvesting Tools">Harvesting Tools</option>
                            <option value="Irrigation Systems">Irrigation Systems</option>
                            <option value="Storage Equipment">Storage Equipment</option>
                            <option value="Processing Equipment">Processing Equipment</option>
                            <option value="Safety Gear">Safety Gear</option>
                            <option value="Pest Control">Pest Control</option>
                            <option value="Livestock Equipment">Livestock Equipment</option>
                            <option value="Measuring Tools">Measuring Tools</option>
                            <option value="Fisheries">Fisheries</option>
                            <option value="Machinery">Machinery</option>
                            <option value="Other">Other</option>
                        </select>
                        <span className="absolute right-4 top-3 text-green-400 pointer-events-none">
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                    </div>

                    {/* Status Filter */}
                    <div className="relative flex-1 min-w-[180px] max-w-xs">
                        <select
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full border-none rounded-2xl px-4 py-2.5 bg-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 shadow-lg transition-all"
                            defaultValue=""
                        >
                            <option value="all">All Status</option>
                            <option value="Ongoing">Available</option>
                            <option value="Completed">Returned</option>
                            <option value="Cancelled">Reserved</option>
                            <option value="Upcoming">Borrowed</option>
                        </select>
                        <span className="absolute right-4 top-3 text-green-400 pointer-events-none">
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                    </div>
                </div>

                {/* ADD */}
                <button
                    className="flex items-center gap-2 px-5 py-2 rounded-2xl text-base font-semibold shadow-lg bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white transition-all backdrop-blur-md mt-2 md:mt-0 w-full md:w-auto"
                    onClick={() => setShowAdd(true)}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    New Item
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full h-auto p-4 md:p-6 rounded-3xl bg-white/60 backdrop-blur-lg shadow-2xl">
                {items.map((_, idx) => (
                    <Item_Card key={idx} item={{}} />
                ))}
            </div>
        </>
    );
}
