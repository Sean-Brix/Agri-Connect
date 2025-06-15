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
        // BACKGROUND
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-1000">
            <div className="max-w-md border">
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">

                    {/* HEADER */}
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-black-700">
                            Added by: {editedItem.added_by}
                        </p>
                        <span
                            className="text-xl bold cursor-pointer"
                            onClick={onClose}
                        >
                            &times;
                        </span>
                    </div>

                    {/* IMAGE */}
                    <img
                        className="h-60 w-full object-cover object-center"
                        src={editedItem.image}
                        alt="blog"
                    />

                    {/* DETAILS */}
                    <div className="p-6 bg-cyan-100">
                        <h2 className="tracking-widest cursor-default text-xs title-font font-medium text-gray-400 mb-1">
                            ITEM NAME
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                            {editedItem.name}
                        </h1>
                        <p className="leading-relaxed mb-3">
                            {editedItem.description}
                        </p>

                        {/* PROPERTIES */}
                        <div className="flex items-center flex-wrap">

                            {/* CATEGORY */}
                            <div className="group relative">
                                <svg
                                    className="w-4 h-4 mr-1"
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
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Category
                                </div>
                            </div>
                            <span
                                className={`px-3 py-1.5 m-2 rounded-md text-xs cursor-default font-medium text-white flex items-center
                                ${
                                    editedItem.category === 'Farming Equipment'
                                        ? 'bg-blue-700'
                                        : editedItem.category ===
                                          'Harvesting Tools'
                                        ? 'bg-pink-700'
                                        : editedItem.category ===
                                          'Irrigation Systems'
                                        ? 'bg-purple-700'
                                        : editedItem.category ===
                                          'Storage Equipment'
                                        ? 'bg-yellow-700'
                                        : editedItem.category ===
                                          'Processing Equipment'
                                        ? 'bg-green-700'
                                        : editedItem.category === 'Safety Gear'
                                        ? 'bg-red-700'
                                        : editedItem.category === 'Pest Control'
                                        ? 'bg-indigo-700'
                                        : editedItem.category ===
                                          'Livestock Equipment'
                                        ? 'bg-orange-700'
                                        : editedItem.category ===
                                          'Measuring Tools'
                                        ? 'bg-teal-700'
                                        : editedItem.category === 'Fisheries'
                                        ? 'bg-lime-700'
                                        : editedItem.category === 'Machinery'
                                        ? 'bg-cyan-700'
                                        : 'bg-gray-700'
                                }`}
                                title="Category"
                            >
                                {editedItem.category}
                            </span>

                            {/* QUANTITY */}
                            <span
                                className="text-gray-400 mr-3 cursor-default inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200"
                                title="Quantity"
                            >
                                <svg
                                    className="w-4 h-4 mr-1"
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
                                className="text-gray-400 inline-flex items-center leading-none text-sm cursor-default"
                                title={`Status`}
                            >
                                <svg
                                    className="w-4 h-4 mr-1"
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
                        <div className="flex justify-between bg-green-100 p-3 border-t">
                            {/* CREATED AT */}
                            <div>
                                <span
                                    className="text-gray-700 block text-sm font-medium cursor-default"
                                    title={`Created At`}
                                >
                                    Created At
                                </span>
                                <span className="text-gray-500 block text-sm">
                                    {new Date(
                                        editedItem.created_at
                                    ).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </span>
                            </div>
                            
                            {/* UPDATED AT */}
                            <div>
                                <span
                                    className="text-gray-700 block text-sm font-medium cursor-default"
                                    title={`Updated At`}
                                >
                                    Recent Update
                                </span>
                                <span className="text-gray-500 block text-sm">
                                    {new Date(
                                        editedItem.updated_at
                                    ).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </span>
                            </div>
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
        // BACKGROUND
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-1000">
            {/* FORM */}
            <div className="flex flex-col justify-between bg-white border p-5 rounded w-[50%] h-[90%] max-w-lg">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold">Edit Item</h2>
                    <span className="text-xl cursor-pointer" onClick={onClose}>
                        &times;
                    </span>
                </div>

                {/* ITEMS */}
                <div className="flex-grow overflow-y-auto">
                    <div className="space-y-4">
                        {/* NAME */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={editedItem.name || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 bg-gray-50"
                                placeholder="Name"
                            />
                        </div>

                        {/* CATEGORY */}
                        <div>
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={editedItem.category || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 bg-gray-50"
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
                                <option value="Pest Control">
                                    Pest Control
                                </option>
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
                                className="block text-sm font-medium text-gray-700"
                            >
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={editedItem.status || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 bg-gray-50"
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
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={editedItem.description || ''}
                                onChange={handleChange}
                                rows="3"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 bg-gray-50 resize-none"
                                placeholder="Description"
                            ></textarea>
                        </div>

                        {/* IMAGE */}
                        <div>
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 bg-gray-50"
                            />
                        </div>

                        {/* IMAGE PREVIEW */}
                        {editedItem.image && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Image Preview
                                </label>
                                <img
                                    src={editedItem.image}
                                    alt="Item Preview"
                                    className="mt-1 w-32 h-32 object-cover rounded"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* CONTROLS */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
