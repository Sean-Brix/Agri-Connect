import React, { useState, useEffect } from 'react';

export default function Edit_Modal({ isOpen, onClose, item, onSave }) {
    const [editedItem, setEditedItem] = useState({});

    useEffect(() => {
        setEditedItem(item || {});
    }, [item]);

    if (!isOpen) {
        return null;
    }

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
                                <option value="">Select Category</option>
                                <option value="electronics">Electronics</option>
                                <option value="clothing">Clothing</option>
                                <option value="books">Books</option>
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
                                <option value="">Select Status</option>
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
