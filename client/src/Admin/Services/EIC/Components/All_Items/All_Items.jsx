import React, { useState } from 'react';
import Item_Card from './item_card.jsx';

export default function All_Items() {
    const items = Array.from({ length: 10 });
    const [statusFilter, setStatusFilter] = useState('');
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 max-w-7xl mx-auto gap-4">
                <div className="flex-1 flex flex-col md:flex-row gap-4 w-full">

                    <div className="relative w-full max-w-lg">

                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-400"
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
                            placeholder="Search programs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-black bg-white shadow"
                        />

                    </div>

                    {/* Category Filter */}
                    <select
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full md:w-50 border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 shadow"
                    >
                        <option value="all">All Category</option>
                        <option value="Farming Equipment">
                            Farming Equipment
                        </option>
                        <option value="Harvesting Tools">
                            Harvesting Tools
                        </option>
                        <option value="Irrigation Systems">
                            Irrigation Systems
                        </option>
                        <option value="Storage Equipment">
                            Storage Equipment
                        </option>
                        <option value="Processing Equipment">
                            Processing Equipment
                        </option>
                        <option value="Safety Gear">Safety Gear</option>
                        <option value="Pest Control">Pest Control</option>
                        <option value="Livestock Equipment">
                            Livestock Equipment
                        </option>
                        <option value="Measuring Tools">Measuring Tools</option>
                        <option value="Fisheries">Fisheries</option>
                        <option value="Machinery">Machinery</option>
                        <option value="Other">Other</option>
                    </select>

                    {/* Status Filter */}
                    <select
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full md:w-44 border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 shadow"
                        defaultValue=""
                    >
                        <option value="all">All Items</option>
                        <option value="Ongoing">Available</option>
                        <option value="Completed">Returned</option>
                        <option value="Cancelled">Reserved</option>
                        <option value="Upcoming">Borrowed</option>
                    </select>
                </div>

                {/* ADD */}
                <button
                    className="flex items-center justify-center px-4 py-1.5 rounded-lg text-sm font-medium shadow bg-green-500 hover:bg-green-600 text-white transition-all"
                    onClick={() => setShowAdd(true)}
                >
                    New Item
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-auto p-4 rounded-2xl">
                <Item_Card item={{}} />
                <Item_Card item={{}} />
                <Item_Card item={{}} />
                <Item_Card item={{}} />
                <Item_Card item={{}} />
                <Item_Card item={{}} />
            </div>
        </>
    );
}
