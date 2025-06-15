import React, { useState, useEffect } from 'react';

export default function Edit_Modal({ isOpen, onClose, item, onSave }) {
    const [editedItem, setEditedItem] = useState({});

    useEffect(() => {
        setEditedItem(item || {});
    }, [item]);

    if (!isOpen.state) {
        return null;
    }

    return isOpen.modal === 'details'
        ? render_details(onClose, editedItem, setEditedItem, onSave)
        : render_edit(onClose, editedItem, setEditedItem, onSave);
}

function render_details(onClose, editedItem) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/60">
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col">
                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">Added by:</span>
                        <span className="text-sm font-medium text-gray-700">
                            {editedItem.added_by}
                        </span>
                    </div>
                    <button
                        className="text-2xl text-gray-400 hover:text-gray-700 transition-colors"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>

                {/* IMAGE */}
                <div className="w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                    {editedItem.image ? (
                        <img
                            className="object-cover w-full h-full"
                            src={editedItem.image}
                            alt="Item"
                        />
                    ) : (
                        <div className="text-gray-400 text-3xl">No Image</div>
                    )}
                </div>

                {/* DETAILS */}
                <div className="px-6 py-6 bg-white">
                    <div className="mb-2">
                        <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                            Item Name
                        </span>
                        <h1 className="text-2xl font-bold text-gray-900 mt-1">
                            {editedItem.name}
                        </h1>
                    </div>
                    <p className="text-gray-600 mb-4">
                        {editedItem.description}
                    </p>

                    {/* PROPERTIES */}
                    <div className="flex flex-wrap gap-3 mb-4">
                        {/* CATEGORY */}
                        <span
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold
                                ${
                                    editedItem.category === 'Farming Equipment'
                                        ? 'bg-blue-100 text-blue-800'
                                        : editedItem.category ===
                                          'Harvesting Tools'
                                        ? 'bg-pink-100 text-pink-800'
                                        : editedItem.category ===
                                          'Irrigation Systems'
                                        ? 'bg-purple-100 text-purple-800'
                                        : editedItem.category ===
                                          'Storage Equipment'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : editedItem.category ===
                                          'Processing Equipment'
                                        ? 'bg-green-100 text-green-800'
                                        : editedItem.category === 'Safety Gear'
                                        ? 'bg-red-100 text-red-800'
                                        : editedItem.category === 'Pest Control'
                                        ? 'bg-indigo-100 text-indigo-800'
                                        : editedItem.category ===
                                          'Livestock Equipment'
                                        ? 'bg-orange-100 text-orange-800'
                                        : editedItem.category ===
                                          'Measuring Tools'
                                        ? 'bg-teal-100 text-teal-800'
                                        : editedItem.category === 'Fisheries'
                                        ? 'bg-lime-100 text-lime-800'
                                        : editedItem.category === 'Machinery'
                                        ? 'bg-cyan-100 text-cyan-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}
                            title="Category"
                        >
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                            </svg>
                            {editedItem.category}
                        </span>

                        {/* QUANTITY */}
                        <span
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold"
                            title="Quantity"
                        >
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect
                                    x="4"
                                    y="4"
                                    width="16"
                                    height="16"
                                    rx="2"
                                    ry="2"
                                />
                                <line x1="12" y1="8" x2="12" y2="16" />
                                <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                            {editedItem.quantity}
                        </span>

                        {/* STATUS */}
                        <span
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold
                                ${
                                    editedItem.status === 'available'
                                        ? 'bg-green-100 text-green-800'
                                        : editedItem.status === 'borrowed'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : editedItem.status === 'reserved'
                                        ? 'bg-blue-100 text-blue-800'
                                        : editedItem.status === 'returned'
                                        ? 'bg-gray-100 text-gray-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}
                            title="Status"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            {editedItem.status}
                        </span>
                    </div>
                </div>

                {/* DATES */}
                <div className="flex justify-between items-center px-6 py-3 bg-gray-50 border-t">
                    {/* CREATED AT */}
                    <div>
                        <span className="block text-xs text-gray-400 font-medium">
                            Created At
                        </span>
                        <span className="block text-sm text-gray-700">
                            {editedItem.created_at
                                ? new Date(
                                      editedItem.created_at
                                  ).toLocaleDateString(undefined, {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                  })
                                : '-'}
                        </span>
                    </div>
                    {/* UPDATED AT */}
                    <div>
                        <span className="block text-xs text-gray-400 font-medium">
                            Recent Update
                        </span>
                        <span className="block text-sm text-gray-700">
                            {editedItem.updated_at
                                ? new Date(
                                      editedItem.updated_at
                                  ).toLocaleDateString(undefined, {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                  })
                                : '-'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function render_edit(onClose, editedItem, setEditedItem, onSave) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(editedItem);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col">
                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-xl font-bold text-gray-900">
                        Edit Item
                    </h2>
                    <button
                        className="text-2xl text-gray-400 hover:text-gray-700 transition-colors"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>

                {/* FORM */}
                <form
                    className="flex-1 overflow-y-auto px-6 py-6 space-y-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                >
                    {/* NAME */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={editedItem.name || ''}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition px-4 py-2 bg-gray-50"
                            placeholder="Name"
                            autoComplete="off"
                        />
                    </div>

                    {/* CATEGORY */}
                    <div>
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={editedItem.category || ''}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition px-4 py-2 bg-gray-50"
                        >
                            <option value="Other">Not Specified</option>
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
                            <option value="Measuring Tools">
                                Measuring Tools
                            </option>
                            <option value="Fisheries">Fisheries</option>
                            <option value="Machinery">Machinery</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* STATUS */}
                    <div>
                        <label
                            htmlFor="status"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={editedItem.status || ''}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition px-4 py-2 bg-gray-50"
                        >
                            <option value="available">Available</option>
                            <option value="borrowed">Borrowed</option>
                            <option value="reserved">Reserved</option>
                            <option value="returned">Returned</option>
                        </select>
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={editedItem.description || ''}
                            onChange={handleChange}
                            rows="3"
                            className="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition px-4 py-2 bg-gray-50 resize-none"
                            placeholder="Description"
                        ></textarea>
                    </div>

                    {/* IMAGE */}
                    <div>
                        <label
                            htmlFor="image"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setEditedItem((prev) => ({
                                            ...prev,
                                            image: reader.result,
                                        }));
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition px-4 py-2 bg-gray-50"
                        />
                    </div>

                    {/* IMAGE PREVIEW */}
                    {editedItem.image && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image Preview
                            </label>
                            <img
                                src={editedItem.image}
                                alt="Item Preview"
                                className="w-32 h-32 object-cover rounded-lg border border-gray-200 shadow"
                            />
                        </div>
                    )}
                </form>

                {/* CONTROLS */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
                    <button
                        onClick={onClose}
                        type="button"
                        className="px-5 py-2 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        type="button"
                        className="px-5 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition shadow"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
