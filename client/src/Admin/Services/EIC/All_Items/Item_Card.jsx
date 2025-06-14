import React, { useEffect, useState } from 'react';

// ASSETS
import default_image from '../Assets/default_image.png';

// MODALS
import Edit_Modal from './Edit_Modal';

export default function Item_Card({ item }) {
    const [card, setCard] = useState(item);
    const [isOpen, setIsOpen] = useState(false);

    // INITIAL RENDER
    useEffect(() => {

        const defaultItem = {
            image: default_image,
            category: 'Category',
            name: 'Item Name',
            description:
                'This is where the description of eic item will be placed at. The text is just an example for reference',
            status: 'Available',
        };

        const newItem = {
            image: item.image || default_image,
            category: item.category || defaultItem.category,
            name: item.name || defaultItem.name,
            description: item.description || defaultItem.description,
            status: item.status || defaultItem.status,
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
                    <div className="absolute top-0 right-0 bg-green-700 text-white px-2 py-1 m-2 rounded-md text-xs font-medium">
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

                    {/* STATUS */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 block">
                            Status:{' '}
                            <span className="font-semibold bg-gray-200 px-2 py-1 rounded-full text-xs">
                                {card.status}
                            </span>
                        </span>

                        {/* CONTROLS */}
                        <div className="flex gap-2">
                            <button 
                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-2 w-[70px] rounded text-xs"
                                onClick={()=>setIsOpen(true)}
                            >
                                Details
                            </button>

                            <button
                                onClick={()=>setIsOpen(true)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded text-xs w-1/2"
                            >
                                Edit
                            </button>
                        </div>

                        <Edit_Modal
                            isOpen={isOpen}
                            item={card}
                            onClose={()=>setIsOpen(false)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
