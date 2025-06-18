import React, { useEffect, useState } from 'react';
import Item_Card from './item_card.jsx';
import default_image from '../../Assets/default_image.png';

export default function All_Items() {
    const [items, setItems] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [newItemModalOpen, setNewItemModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({
        Name: '',
        description: '',
        quantity: 1,
        status: 'Available',
        category: 'Farming Equipment',
        image: null,
        imagePreview: null,
    });

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        fetchItems();
    }, [statusFilter, categoryFilter, search]);

    const fetchItems = async () => {
        const response = await fetch(
            `/api/eic/getAll?status=${statusFilter}&category=${categoryFilter}&search=${search}`
        );
        const data = await response.json();

        if (!data.payload || data.payload.length === 0) {
            setItems([]);
            return;
        }

        const itemsWithImages = await Promise.all(
            data.payload.map(async (item) => {
                try {
                    const imageResponse = await fetch(
                        `/api/eic/getImage?id=${item.id}`
                    );
                    if (imageResponse.ok) {
                        if (imageResponse.status === 204) {
                            return { ...item, photo: default_image };
                        }
                        const imageBlob = await imageResponse.blob();
                        const imageUrl = URL.createObjectURL(imageBlob);
                        return { ...item, photo: imageUrl };
                    } else {
                        return { ...item, photo: default_image };
                    }
                } catch (error) {
                    console.error('Error fetching image:', error);
                    return { ...item, photo: default_image };
                }
            })
        );
        setItems(itemsWithImages);
    };

    const handleDelete = async () => {
        if (selectedItems.length === 0) {
            alert('Please select items to delete.');
            return;
        }

        try {
            const deletePromises = selectedItems.map(async (id) => {
                const response = await fetch(`/api/eic/deleteEIC?id=${id}`);
                const data = await response.json();

                if (response.ok && data.status === 'Success') {
                    return true;
                } else {
                    console.error(
                        `Failed to delete item with id ${id}: ${
                            data.message || 'Unknown error'
                        }`
                    );
                    return false;
                }
            });

            const results = await Promise.all(deletePromises);
            if (results.every((result) => result)) {
                alert('Items deleted successfully.');
                setItems(
                    items.filter((item) => !selectedItems.includes(item.id))
                );
                setSelectedItems([]);
                setIsDeleting(false);
            } else {
                alert(
                    'Some items failed to delete. Please check the console for errors.'
                );
            }
        } catch (error) {
            console.error('Error deleting items:', error);
            alert('Failed to delete items. Please try again.');
        }
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

    const handleOpenNewItemModal = () => {
        setNewItemModalOpen(true);
    };
    const handleCloseNewItemModal = () => {
        setNewItemModalOpen(false);
        setNewItem({
            Name: '',
            description: '',
            quantity: 1,
            status: 'Available',
            category: 'Farming Equipment',
            image: null,
            imagePreview: null,
        });
    };
    const handleNewItemInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };
    const handleNewItemImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewItem({
                    ...newItem,
                    image: file,
                    imagePreview: reader.result,
                });
            };
            reader.readAsDataURL(file);
        } else {
            setNewItem({ ...newItem, image: null, imagePreview: null });
        }
    };
    const handleCreateNewItem = async () => {
        try {
            const response = await fetch('/api/eic/addNew', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name: newItem.Name,
                    description: newItem.description,
                    quantity: newItem.quantity,
                    status: newItem.status,
                    category: newItem.category,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const newItemId = data.payload[0].id;

                let photo = default_image;

                if (newItem.image) {
                    const formData = new FormData();
                    formData.append('id', newItemId);
                    formData.append('image', newItem.image);

                    const imageResponse = await fetch('/api/eic/addImage', {
                        method: 'POST',
                        body: formData,
                    });

                    if (imageResponse.ok) {
                        const imageFetchResponse = await fetch(
                            `/api/eic/getImage?id=${newItemId}`
                        );
                        if (imageFetchResponse.ok) {
                            const imageBlob = await imageFetchResponse.blob();
                            photo = URL.createObjectURL(imageBlob);
                        } else {
                            console.error('Failed to fetch image after upload');
                        }
                    } else {
                        console.error(
                            'Failed to upload image:',
                            imageResponse.status
                        );
                    }
                }

                const newItemWithImage = { ...data.payload[0], photo };
                setItems([newItemWithImage, ...items]);
                handleCloseNewItemModal();
            } else {
                console.error('Failed to create new item:', response.status);
            }
        } catch (error) {
            alert('Cannot add item, Something went wrong');
            console.error('Error creating new item:', error);
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 max-w-7xl mx-auto gap-4 p-4 md:p-6">
                <div className="flex-1 flex flex-col md:flex-row gap-3 md:gap-4 w-full">
                    <div className="relative w-full max-w-lg">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-blue-400"
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
                            className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white shadow-sm transition"
                        />
                    </div>
                    <select
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full md:w-52 border border-blue-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-sm transition"
                        value={categoryFilter}
                    >
                        <option value="">All Category</option>
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
                    <select
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full md:w-44 border border-blue-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-sm transition"
                        value={statusFilter}
                    >
                        <option value="">All Items</option>
                        <option value="Available">Available</option>
                        <option value="Returned">Returned</option>
                        <option value="Reserved">Reserved</option>
                        <option value="Borrowed">Borrowed</option>
                    </select>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                    <button
                        className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium shadow bg-blue-600 hover:bg-blue-700 text-white transition"
                        onClick={handleOpenNewItemModal}
                    >
                       
                        New Item
                    </button>
                    {isDeleting ? (
                        <>
                            <button
                                className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium shadow bg-red-600 hover:bg-red-700 text-white transition"
                                onClick={handleDelete}
                            >
                                
                                Delete Selected
                            </button>
                            <button
                                className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium shadow bg-gray-400 hover:bg-gray-500 text-white transition"
                                onClick={handleCancelDelete}
                            >
                                
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium shadow bg-red-500 hover:bg-red-600 text-white transition"
                            onClick={() => setIsDeleting(true)}
                        >
                            
                            Delete
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-auto p-2 md:p-4 rounded-2xl max-w-7xl mx-auto">
                {items.length === 0 ? (
                    <div className="text-center w-full col-span-full text-blue-500 py-12 bg-white rounded-xl shadow">
                        No items found
                    </div>
                ) : (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className={`relative transition-transform hover:scale-[1.02]`}
                            onClick={() => handleItemClick(item.id)}
                        >
                            {isDeleting && (
                                <input
                                    type="checkbox"
                                    className="absolute top-3 left-3 z-10 w-5 h-5 accent-blue-500"
                                    checked={selectedItems.includes(item.id)}
                                    onChange={() => toggleSelectItem(item.id)}
                                    onClick={e => e.stopPropagation()}
                                />
                            )}
                            <Item_Card
                                key={item.id}
                                item={item}
                                isSelected={selectedItems.includes(item.id)}
                            />
                        </div>
                    ))
                )}
            </div>

            {newItemModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div
                        className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full border shadow-xl animate-fadeIn"
                        style={{
                            maxHeight: '90vh',
                            overflowY: 'auto',
                        }}
                    >
                        <h2 className="text-2xl font-bold mb-6 text-blue-800">New Item</h2>
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="Name"
                                    className="block text-blue-700 text-sm font-semibold mb-1"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="Name"
                                    name="Name"
                                    value={newItem.Name}
                                    onChange={handleNewItemInputChange}
                                    className="w-full border border-blue-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800 bg-blue-50"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-blue-700 text-sm font-semibold mb-1"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={newItem.description}
                                    onChange={handleNewItemInputChange}
                                    className="w-full border border-blue-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800 bg-blue-50 resize-none"
                                    rows={2}
                                />
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <label
                                        htmlFor="quantity"
                                        className="block text-blue-700 text-sm font-semibold mb-1"
                                    >
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        min={1}
                                        value={newItem.quantity}
                                        onChange={handleNewItemInputChange}
                                        className="w-full border border-blue-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800 bg-blue-50"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label
                                        htmlFor="status"
                                        className="block text-blue-700 text-sm font-semibold mb-1"
                                    >
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={newItem.status}
                                        onChange={handleNewItemInputChange}
                                        className="w-full border border-blue-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800 bg-blue-50"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Returned">Returned</option>
                                        <option value="Reserved">Reserved</option>
                                        <option value="Borrowed">Borrowed</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="category"
                                    className="block text-blue-700 text-sm font-semibold mb-1"
                                >
                                    Category
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={newItem.category}
                                    onChange={handleNewItemInputChange}
                                    className="w-full border border-blue-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800 bg-blue-50"
                                >
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
                            </div>
                            <div>
                                <label
                                    htmlFor="image"
                                    className="block text-blue-700 text-sm font-semibold mb-1"
                                >
                                    Image
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleNewItemImageChange}
                                    className="w-full border border-blue-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800 bg-blue-50"
                                />
                                {newItem.imagePreview && (
                                    <img
                                        src={newItem.imagePreview}
                                        alt="Image Preview"
                                        className="mt-2 max-h-40 rounded-lg border object-contain mx-auto"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                                onClick={handleCloseNewItemModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                onClick={handleCreateNewItem}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
