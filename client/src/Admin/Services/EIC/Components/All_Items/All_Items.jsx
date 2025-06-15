import React, { useEffect, useState } from 'react';
import Item_Card from './item_card.jsx';

export default function All_Items() {
    const [items, setItems] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    // INITIAL RENDER
    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/eic/getAll`);
            const data = await response.json();
            setItems(data.payload);
        })();
    }, []);

    // SEARCH / FILTER
    useEffect(() => {
        (async () => {
            const response = await fetch(
                `/api/eic/getAll?status=${statusFilter}&category=${categoryFilter}&search=${search}`
            );
            const data = await response.json();
            setItems(data.payload);
        })();
    }, [statusFilter, categoryFilter, search]);

    // DELETE
    const handleDelete = async () => {
        if (selectedItems.length === 0) {
            alert('Please select items to delete.');
            return;
        }
        alert('items deleted');
        console.log(selectedItems);
    };
    const toggleSelectItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };
    const handleCancelDelete = () => {
        setIsDeleting(false);
        setSelectedItems([]);
    };
    const handleItemClick = (itemId) => {
        if (isDeleting) {
            toggleSelectItem(itemId);
        }
    };

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

                {/* ADD & DELETE */}
                <div className="flex gap-2">
                    <button
                        className="flex items-center justify-center px-4 py-1.5 rounded-lg text-sm font-medium shadow bg-green-500 hover:bg-green-600 text-white transition-all"
                        onClick={() =>
                            document.getElementById('my_modal_1').showModal()
                        }
                    >
                        New Item
                    </button>

                    {isDeleting ? (
                        <>
                            <button
                                className="flex items-center justify-center px-4 py-1.5 rounded-lg text-sm font-medium shadow bg-red-600 hover:bg-red-700 text-white transition-all"
                                onClick={handleDelete}
                            >
                                Delete Selected
                            </button>
                            <button
                                className="flex items-center justify-center px-4 py-1.5 rounded-lg text-sm font-medium shadow bg-gray-400 hover:bg-gray-500 text-white transition-all"
                                onClick={handleCancelDelete}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            className="flex items-center justify-center px-4 py-1.5 rounded-lg text-sm font-medium shadow bg-red-500 hover:bg-red-600 text-white transition-all"
                            onClick={() => setIsDeleting(true)}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-auto p-4 rounded-2xl">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="relative"
                        onClick={() => handleItemClick(item.id)}
                    >
                        {isDeleting && (
                            <input
                                type="checkbox"
                                className="absolute top-2 left-2 z-10"
                                checked={selectedItems.includes(item.id)}
                                onChange={() => toggleSelectItem(item.id)}
                            />
                        )}
                        <Item_Card
                            key={item.id}
                            item={item}
                            isSelected={selectedItems.includes(item.id)}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
