import React, { useEffect, useState } from 'react';

// ASSETS
import default_image from '../../Assets/default_image.png';

// MODALS
import Edit_Modal from './Edit_Modal';

export default function Item_Card({ item }) {
    const [card, setCard] = useState(item);
    const [isOpen, setIsOpen] = useState({
        state: false,
        modal: 'details',
    });

    // INITIAL RENDER
    useEffect(() => {
        // Set default
        const defaultItem = {
            image: default_image,
            category: 'Other',
            name: 'Item Name',
            description:
                'This is where the description of eic item will be placed at. The text is just an example for reference',
            status: 'Available',
            quantity: 1,
            added_by: 'Admin',
            created_at: '2024-01-01',
            updated_at: '2025-06-15',
        };
        const newItem = {
            image: item.image || default_image,
            category: item.category || defaultItem.category,
            name: item.name || defaultItem.name,
            description: item.description || defaultItem.description,
            status: item.status || defaultItem.status,
            quantity: item.quantity || defaultItem.quantity,
            added_by: item.added_by || defaultItem.added_by,
            created_at: item.created_at || defaultItem.created_at,
            updated_at: item.updated_at || defaultItem.updated_at,
        };

        setCard(newItem);
    }, [item]);

    return (
        <>
            <div className="max-w-full max-h-[350px] rounded-md overflow-hidden shadow-md hover:shadow-lg m-3">
                <div className="relative">
                    {/* IMAGE */}
                    <img
                        className="w-full h-48 object-cover"
                        src={card.image}
                        alt="Product Image"
                    />

                    {/* CATEGORY */}
                    <div
                        className={`absolute top-0 right-0 px-2 py-1 m-2 rounded-md text-xs font-medium text-white
                        ${
                            card.category === 'Farming Equipment'
                                ? 'bg-blue-700'
                                : card.category === 'Harvesting Tools'
                                ? 'bg-pink-700'
                                : card.category === 'Irrigation Systems'
                                ? 'bg-purple-700'
                                : card.category === 'Storage Equipment'
                                ? 'bg-yellow-700'
                                : card.category === 'Processing Equipment'
                                ? 'bg-green-700'
                                : card.category === 'Safety Gear'
                                ? 'bg-red-700'
                                : card.category === 'Pest Control'
                                ? 'bg-indigo-700'
                                : card.category === 'Livestock Equipment'
                                ? 'bg-orange-700'
                                : card.category === 'Measuring Tools'
                                ? 'bg-teal-700'
                                : card.category === 'Fisheries'
                                ? 'bg-lime-700'
                                : card.category === 'Machinery'
                                ? 'bg-cyan-700'
                                : 'bg-gray-700'
                        }`}
                    >
                        {card.category}
                    </div>
                </div>
                <div className="p-3">
                    {/* ITEM NAME */}
                    <h3 className="text-lg font-medium mb-1">{card.name}</h3>

                    {/* DESCRIPTION */}
                    <p className="text-gray-600 text-xs mb-6">
                        {card.description}
                    </p>

                    {/* FOOTER */}
                    <div className="flex items-center justify-between">
                        {/* STATUS */}
                        <span className="text-sm text-gray-700 block">
                            Status:{' '}
                            <span
                                className={`font-semibold px-2 py-1 text-xs rounded-md
                                        ${
                                            card.status === 'Available'
                                                ? 'bg-green-200 text-green-700'
                                                : card.status === 'Returned'
                                                ? 'bg-blue-200 text-blue-700'
                                                : card.status === 'Reserved'
                                                ? 'bg-yellow-200 text-yellow-700'
                                                : card.status === 'Borrowed'
                                                ? 'bg-red-200 text-red-700'
                                                : 'bg-gray-200 text-gray-700'
                                        }`}
                            >
                                {card.status}
                            </span>
                        </span>

                        {/* CONTROLS */}
                        <div className="flex gap-2">
                            <button
                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-2 w-[70px] rounded text-xs"
                                onClick={() =>
                                    setIsOpen({ state: true, modal: 'details' })
                                }
                            >
                                Details
                            </button>

                            <button
                                onClick={() =>
                                    setIsOpen({ state: true, modal: 'edit' })
                                }
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded text-xs w-1/2"
                            >
                                Edit
                            </button>
                        </div>

                        <Edit_Modal
                            isOpen={isOpen}
                            item={card}
                            onClose={() =>
                                setIsOpen({ state: false, modal: 'details' })
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
