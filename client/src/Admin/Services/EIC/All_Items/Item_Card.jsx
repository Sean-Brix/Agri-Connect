import React from 'react'
import default_image from '../Assets/default_image.png';

export default function Item_Card() {
return (
    <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row p-8 gap-8 border border-gray-100">
        <img
            className="w-36 h-36 object-cover rounded-2xl shadow-md self-center md:self-start bg-gray-50"
            src={default_image}
            alt="Item"
        />
        <div className="flex flex-col justify-between flex-1">
            {/* DESCRIPTION */}
            <div>
                <h2 className="font-bold text-3xl text-gray-900 mb-2 tracking-tight">Items</h2>
                <p className="text-gray-600 text-lg mb-4">
                    This is where the items will be displayed.
                </p>
            </div>
            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">#placeholder</span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">#example</span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">#items</span>
            </div>
            {/* CONTROLS */}
            <div className="flex gap-4 justify-end">
                <button className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-5 rounded-xl border border-gray-200 transition-all shadow-sm">
                    Details
                </button>
                <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2 px-5 rounded-xl shadow-md transition-all">
                    Edit
                </button>
            </div>
        </div>
    </div>
)
}
