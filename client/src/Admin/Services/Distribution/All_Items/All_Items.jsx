import React, { useEffect, useState } from 'react';
import Item_Card from './Item_Card.jsx';
import default_image from '../Assets/default_image.png';
export default function All_Items() {
    const [items, setItems] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [newItemModalOpen, setNewItemModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '',
        description: '',
        quantity: 1,
        status: 'Available',
        category: 'Seeds',
        image: null,
        imagePreview: null,
    });
    const [originalItems, setOriginalItems] = useState([]); // Store original fetched items

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        // Apply filters and search on client-side
        let filteredItems = originalItems;

        if (statusFilter) {
            filteredItems = filteredItems.filter(
                (item) => item.status === statusFilter
            );
        }

        if (categoryFilter) {
            filteredItems = filteredItems.filter(
                (item) => item.category === categoryFilter
            );
        }

        if (search) {
            filteredItems = filteredItems.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        setItems(filteredItems);
    }, [statusFilter, categoryFilter, search, originalItems]);

    const fetchItems = async () => {
        try {
            const response = await fetch(
                `/api/distribution/getAll?status=${statusFilter}&category=${categoryFilter}&search=${search}`
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
                            `/api/distribution/getImage?id=${item.id}`
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
            setOriginalItems(itemsWithImages);
        } catch (error) {
            console.error('Error fetching items:', error);
            setItems([]);
        }
    };

    const handleDelete = async () => {
        if (selectedItems.length === 0) {
            alert('Please select items to delete.');
            return;
        }

        try {
            const deletePromises = selectedItems.map(async (id) => {
                const response = await fetch(
                    `/api/distribution/deleteDist?id=${id}`
                );
                const data = await response.json();
                console.log(data);

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
                const updatedItems = items.filter(
                    (item) => !selectedItems.includes(item.id)
                );
                setItems(updatedItems);
                setOriginalItems(
                    originalItems.filter(
                        (item) => !selectedItems.includes(item.id)
                    )
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
            name: '',
            description: '',
            quantity: 1,
            status: 'Available',
            category: 'Seeds',
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
            const response = await fetch('/api/distribution/addNew', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newItem.name,
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

                    const imageResponse = await fetch(
                        '/api/distribution/addImage',
                        {
                            method: 'POST',
                            body: formData,
                        }
                    );

                    if (imageResponse.ok) {
                        const imageFetchResponse = await fetch(
                            `/api/distribution/getImage?id=${newItemId}`
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
                const newItemWithImage = {
                    ...data.payload[0],
                    photo,
                };
                setItems([newItemWithImage, ...items]);
                setOriginalItems([newItemWithImage, ...originalItems]);
                handleCloseNewItemModal();
            } else {
                console.error('Failed to create new item:', response.status);
                alert('Failed to create new item.');
            }
        } catch (error) {
            alert('Cannot add item, Something went wrong');
            console.error('Error creating new item:', error);
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 max-w-7xl mx-auto gap-4 p-6">
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
                    <select
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full md:w-50 border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 shadow"
                    >
                        <option value="">All Category</option>
                        <option value="Seeds">Seeds</option>
                        <option value="Fertilizers">Fertilizers</option>
                        <option value="Livestock">Livestock</option>
                        <option value="Fish Fingerlings">
                            Fish Fingerlings
                        </option>
                        <option value="Organic Inputs">Organic Inputs</option>
                        <option value="Tools">Tools</option>
                        <option value="Plants">Plants</option>
                        <option value="Compost">Compost</option>
                        <option value="Other">Other</option>
                    </select>
                    <select
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full md:w-44 border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 shadow"
                        defaultValue=""
                    >
                        <option value="">All Items</option>
                        <option value="Available">Available</option>
                        <option value="Out of Stock">Out of Stock</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Discontinued">Discontinued</option>
                    </select>
                </div>
                <div className="flex gap-2">
                    <button
                        className="flex items-center justify-center px-4 py-1.5 rounded-lg text-sm font-medium shadow bg-green-500 hover:bg-green-600 text-white transition-all"
                        onClick={handleOpenNewItemModal}
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
                {items.length === 0 ? (
                    <div className="text-center w-full">No items found</div>
                ) : (
                    items.map((item) => (
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
                    ))
                )}
            </div>
            {newItemModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full border-2">
                        <h2 className="text-2xl font-bold mb-4">New Item</h2>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={newItem.name}
                                onChange={handleNewItemInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Description:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={newItem.description}
                                onChange={handleNewItemInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="quantity"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Quantity:
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={newItem.quantity}
                                onChange={handleNewItemInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="status"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Status:
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={newItem.status}
                                onChange={handleNewItemInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="Available">Available</option>
                                <option value="Out of Stock">
                                    Out of Stock
                                </option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Discontinued">
                                    Discontinued
                                </option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="category"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Category:
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={newItem.category}
                                onChange={handleNewItemInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="Seeds">Seeds</option>
                                <option value="Fertilizers">Fertilizers</option>
                                <option value="Livestock">Livestock</option>
                                <option value="Fish Fingerlings">
                                    Fish Fingerlings
                                </option>
                                <option value="Organic Inputs">
                                    Organic Inputs
                                </option>
                                <option value="Tools">Tools</option>
                                <option value="Plants">Plants</option>
                                <option value="Compost">Compost</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="image"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Image:
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleNewItemImageChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {newItem.imagePreview && (
                                <img
                                    src={newItem.imagePreview}
                                    alt="Image Preview"
                                    className="mt-2 max-h-48"
                                />
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                                onClick={handleCloseNewItemModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
