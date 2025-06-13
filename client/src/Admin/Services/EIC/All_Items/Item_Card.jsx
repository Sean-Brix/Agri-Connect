import React from 'react'
import default_image from '../Assets/default_image.png';

export default function Item_Card() {
  return (
    <>
    <div className="container mx-auto">
        <div className="flex bg-white shadow-md rounded-lg overflow-hidden p-5">
            <img
                className="w-[160px] h-[160px] rounded-4xl"
                src={default_image}
                alt="Item"
            />

            <div className='flex-col w-full h-full'>
                {/* DESCRIPTION */}
                <div className="px-6">
                    <div className="font-bold text-xl mb-2">Items</div>
                    <p className="text-gray-700 text-base">
                        This is where the items will be displayed.
                    </p>
                </div>

                {/* TAGS */}
                <div className="px-6 pt-4 pb-2 w-full">

                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #placeholder
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #example
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #items
                    </span>

                </div>

                {/* CONTROLS */}
                <div className="flex justify-end px-6 gap-4 w-full">

                    <button className="bg-gray-200 border hover:bg-gray-300 text-gray-800 font-semibold py-2 px-5 rounded-lg shadow transition">
                        Details
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow transition">
                        Edit
                    </button>


                </div>

            </div>
        </div>
    </div>
    </>
    )
}
