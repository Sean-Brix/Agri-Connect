import React, { useState, useEffect } from 'react';

const categories = [
    'Farming Equipment',
    'Harvesting Tools',
    'Irrigation Systems',
    'Storage Equipment',
    'Processing Equipment',
    'Safety Gear',
    'Pest Control',
    'Livestock Equipment',
    'Measuring Tools',
    'Fisheries',
    'Machinery',
    'Other',
];

const statuses = ['Available', 'Borrowed', 'Damaged', 'Out of Stock'];

function Content() {
    const [items, setItems] = useState([
        {
            category: 'Harvesting Tools',
            created_at: '2025-06-18 21:00:44',
            description: 'Handheld harvesting tool with a curved blade',
            id: 2,
            name: 'Sickle',
            quantity: 25,
            status: 'Available',
            updated_at: '2025-06-18 21:00:44',
        },
    ]);
    const [form, setForm] = useState({
        name: '',
        quantity: '',
        description: '',
        category: 'Other',
        status: 'Available',
    });
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [editItemId, setEditItemId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('/api/inventory/getAll');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setItems(data.payload.list);
            } 
            catch (error) {
                console.error('Failed to fetch inventory:', error);
                setItems([]);
            }
        })();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.quantity) return;
        setItems([
            ...items,
            {
                id: Date.now(),
                name: form.name,
                quantity: Number(form.quantity),
                description: form.description,
                category: form.category,
                status: form.status,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
        ]);
        setForm({
            name: '',
            quantity: '',
            description: '',
            category: 'Other',
            status: 'Available',
        });
        setShowModal(false);
    };

    const handleEdit = (item) => {
        setEditItemId(item.id);
        setForm({
            name: item.name,
            quantity: item.quantity,
            description: item.description,
            category: item.category,
            status: item.status,
        });
        setShowEditModal(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!form.name || !form.quantity) return;

        setItems(
            items.map((item) =>
                item.id === editItemId
                    ? {
                          ...item,
                          name: form.name,
                          quantity: Number(form.quantity),
                          description: form.description,
                          category: form.category,
                          status: form.status,
                          updated_at: new Date().toISOString(),
                      }
                    : item
            )
        );

        setForm({
            name: '',
            quantity: '',
            description: '',
            category: 'Other',
            status: 'Available',
        });
        setShowEditModal(false);
        setEditItemId(null);
    };

    const filteredItems = items.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategoryFilter =
            categoryFilter === 'All' || item.category === categoryFilter;
        const matchesStatusFilter =
            statusFilter === 'All' || item.status === statusFilter;
        return matchesSearch && matchesCategoryFilter && matchesStatusFilter;
    });

    const truncate = (str, n = 40) =>
        str && str.length > n ? str.slice(0, n) + '...' : str;

    const handleRemoveSelected = () => {
        setItems(items.filter((item) => !selectedItems.includes(item.id)));
        setSelectedItems([]);
        setSelectAll(false);
        setShowDelete(false);
    };

    const handleSelectAll = (e) => {
        setSelectAll(e.target.checked);
        if (e.target.checked) {
            setSelectedItems(filteredItems.map((item) => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
            setSelectAll(false);
        } else {
            const newSelected = [...selectedItems, id];
            setSelectedItems(newSelected);
            if (newSelected.length === filteredItems.length) setSelectAll(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[91%] w-full bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 p-2 sm:p-4 md:p-8 rounded-2xl shadow-2xl mt-[5%] transition-all">
            <div className="w-full max-w-5xl z-20 sticky top-0 md:top-14 bg-white/80 backdrop-blur-md p-4 sm:p-6 md:p-10 rounded-2xl shadow-lg border-b border-blue-200">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-800 mb-4 text-center tracking-tight drop-shadow">
                    Inventory Management
                </h1>
                <div className="flex flex-col md:flex-row gap-2 sm:gap-3 md:gap-4 w-full max-w-2xl mx-auto">
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 border border-blue-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 shadow transition text-blue-900 placeholder:text-blue-400 text-sm sm:text-base"
                    />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="border border-blue-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 shadow transition text-blue-900 text-sm sm:text-base"
                    >
                        <option key="All">All</option>
                        {categories.map((cat) => (
                            <option key={cat}>{cat}</option>
                        ))}
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border border-blue-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 shadow transition text-blue-900 text-sm sm:text-base"
                    >
                        <option key="All">All</option>
                        {statuses.map((status) => (
                            <option key={status}>{status}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold px-4 sm:px-6 py-2 rounded-xl hover:from-blue-600 hover:to-blue-800 transition shadow-lg flex items-center gap-2 text-sm sm:text-base"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Add Item
                    </button>
                    <button
                        onClick={() => setShowDelete(!showDelete)}
                        className="bg-gradient-to-r from-red-400 to-red-600 text-white font-bold px-4 sm:px-6 py-2 rounded-xl hover:from-red-500 hover:to-red-700 transition shadow-lg flex items-center gap-2 text-sm sm:text-base"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        Delete
                    </button>
                </div>
                {showDelete && (
                    <div className="flex flex-col sm:flex-row justify-end mt-4 gap-2">
                        <button
                            onClick={handleRemoveSelected}
                            disabled={selectedItems.length === 0}
                            className={`px-4 py-2 rounded-xl font-semibold transition shadow-lg bg-red-500 text-white hover:bg-red-600 disabled:bg-red-200 disabled:cursor-not-allowed text-sm sm:text-base`}
                        >
                            Remove Selected
                        </button>
                        <button
                            onClick={() => {
                                setSelectAll(true);
                                setSelectedItems(
                                    filteredItems.map((item) => item.id)
                                );
                            }}
                            className="px-4 py-2 rounded-xl font-semibold transition shadow-lg bg-blue-500 text-white hover:bg-blue-600 text-sm sm:text-base"
                        >
                            Select All
                        </button>
                    </div>
                )}
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 w-[98vw] max-w-lg relative border border-blue-200 animate-fadeIn">
                        <button
                            className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-2xl sm:text-3xl transition"
                            onClick={() => setShowModal(false)}
                            aria-label="Close"
                        >
                            <svg
                                className="w-7 h-7"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-blue-800 text-center tracking-tight">
                            Add New Item
                        </h2>
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Item Name"
                                className="border border-blue-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 shadow text-sm sm:text-base"
                                required
                            />
                            <input
                                type="number"
                                name="quantity"
                                value={form.quantity}
                                onChange={handleChange}
                                placeholder="Quantity"
                                className="border border-blue-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 shadow text-sm sm:text-base"
                                min="1"
                                required
                            />
                            <input
                                type="text"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Description"
                                className="border border-blue-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 shadow text-sm sm:text-base"
                            />
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="border border-blue-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 shadow transition text-blue-900 text-sm sm:text-base"
                            >
                                {categories.map((cat) => (
                                    <option key={cat}>{cat}</option>
                                ))}
                            </select>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="border border-blue-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 shadow transition text-blue-900 text-sm sm:text-base"
                            >
                                {statuses.map((status) => (
                                    <option key={status}>{status}</option>
                                ))}
                            </select>
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 rounded-xl hover:from-blue-600 hover:to-blue-800 transition shadow-lg mt-2 text-sm sm:text-base"
                            >
                                Add Item
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 w-[98vw] max-w-lg relative border border-blue-200 animate-fadeIn">
                        <button
                            className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-2xl sm:text-3xl transition"
                            onClick={() => setShowEditModal(false)}
                            aria-label="Close"
                        >
                            <svg
                                className="w-7 h-7"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-blue-800 text-center tracking-tight">
                            Edit Item
                        </h2>
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={handleUpdate}
                        >
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Item Name"
                                className="border border-blue-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 shadow text-sm sm:text-base"
                                required
                            />
                            <input
                                type="number"
                                name="quantity"
                                value={form.quantity}
                                onChange={handleChange}
                                placeholder="Quantity"
                                className="border border-blue-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 shadow text-sm sm:text-base"
                                min="1"
                                required
                            />
                            <input
                                type="text"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Description"
                                className="border border-blue-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 shadow text-sm sm:text-base"
                            />
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="border border-blue-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 shadow transition text-blue-900 text-sm sm:text-base"
                            >
                                {categories.map((cat) => (
                                    <option key={cat}>{cat}</option>
                                ))}
                            </select>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="border border-blue-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 shadow transition text-blue-900 text-sm sm:text-base"
                            >
                                {statuses.map((status) => (
                                    <option key={status}>{status}</option>
                                ))}
                            </select>
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 rounded-xl hover:from-blue-600 hover:to-blue-800 transition shadow-lg mt-2 text-sm sm:text-base"
                            >
                                Update Item
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="w-full max-w-5xl mt-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800 mb-4 text-center tracking-tight">
                    Current Inventory
                </h2>
                <div className="overflow-x-auto rounded-2xl shadow-lg bg-white/80 backdrop-blur-md border border-blue-100">
                    <table className="min-w-full bg-transparent rounded-2xl text-xs sm:text-sm md:text-base">
                        <thead>
                            <tr>
                                <th className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-left text-xs md:text-sm text-blue-700 font-semibold">
                                    <input
                                        type="checkbox"
                                        checked={
                                            selectAll &&
                                            filteredItems.length > 0
                                        }
                                        onChange={handleSelectAll}
                                        aria-label="Select all"
                                    />
                                </th>
                                <th className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-left text-xs md:text-sm text-blue-700 font-semibold">
                                    Name
                                </th>
                                <th className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-left text-xs md:text-sm text-blue-700 font-semibold">
                                    Quantity
                                </th>
                                <th className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-left text-xs md:text-sm text-blue-700 font-semibold">
                                    Description
                                </th>
                                <th className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-left text-xs md:text-sm text-blue-700 font-semibold">
                                    Category
                                </th>
                                <th className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-left text-xs md:text-sm text-blue-700 font-semibold">
                                    Status
                                </th>
                                <th className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-left text-xs md:text-sm text-blue-700 font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="py-6 text-center text-blue-400 font-semibold"
                                    >
                                        No items found.
                                    </td>
                                </tr>
                            ) : (
                                filteredItems.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-blue-50/70 transition"
                                    >
                                        <td className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(
                                                    item.id
                                                )}
                                                onChange={() =>
                                                    handleSelectItem(item.id)
                                                }
                                                aria-label={`Select ${item.name}`}
                                            />
                                        </td>
                                        <td className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b font-semibold text-blue-900">
                                            {item.name}
                                        </td>
                                        <td className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-blue-700">
                                            {item.quantity}
                                        </td>
                                        <td className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-blue-700">
                                            <span
                                                title={item.description}
                                                className="block max-w-[120px] sm:max-w-[180px] truncate"
                                            >
                                                {truncate(item.description, 40)}
                                            </span>
                                        </td>
                                        <td className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-blue-700">
                                            {item.category}
                                        </td>
                                        <td className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-blue-700">
                                            {item.status}
                                        </td>
                                        <td className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-blue-700">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="bg-gradient-to-r from-green-400 to-green-600 text-white font-bold px-2 py-1 rounded-xl hover:from-green-500 hover:to-green-700 transition shadow-lg text-xs sm:text-sm"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Content;
