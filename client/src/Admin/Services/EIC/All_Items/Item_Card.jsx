import React from 'react';
import default_image from '../Assets/default_image.png';

export default function Item_Card() {
    return (
        <>
            <div className="max-w-full max-h-[300px] rounded-md overflow-hidden shadow-md hover:shadow-lg m-3">
                
                <div className="relative">
                    <img
                        className="w-full h-48 object-cover"
                        src={default_image}
                        alt="Product Image"
                    />
                    <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-xs font-medium">
                        SALE
                    </div>
                </div>
                <div className="p-2">
                    <h3 className="text-sm font-medium mb-1">Product Title</h3>

                    <p className="text-gray-600 text-xs mb-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>

                    <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">$19.99</span>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-xs">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
