import React from 'react';
import default_image from '../Assets/default_image.png';

export default function Item_Card() {
    return (
        <>
            <div className="max-w-full max-h-[350px] rounded-md overflow-hidden shadow-md hover:shadow-lg m-3">
                <div className="relative">
                    <img
                        className="w-full h-48 object-cover"
                        src={default_image}
                        alt="Product Image"
                    />
                    <div className="absolute top-0 right-0 bg-green-700 text-white px-2 py-1 m-2 rounded-md text-xs font-medium">
                        Category
                    </div>
                </div>
                <div className="p-3">
                    <h3 className="text-sm font-medium mb-1">Product Title</h3>

                    <p className="text-gray-600 text-xs mb-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 block">
                            Status:{' '}
                            <span className="font-semibold bg-gray-200 px-2 py-1 rounded-full text-xs">
                                Reserved
                            </span>
                        </span>

                        {/* CONTROLS */}
                        <div className="flex gap-2">
                            <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-2 w-[70px] rounded text-xs">
                                Details
                            </button>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded text-xs w-1/2">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
