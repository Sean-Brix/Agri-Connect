import React, {useRef, useState} from 'react'

// EIC Sections
import Available from './Available.jsx'
import Borrowed from './Borrowed.jsx';
import Items from './Items.jsx';

function EIC() {

// Content State
  const elements = useRef({
    available: ()=>Available,
    borrowed: ()=>Borrowed,
    items: ()=>Items,
  });

  const [Page, setPage] = useState(elements.current.available);

const [active, setActive] = useState("available");

// Handler functions
const handleFilter = () => {
    alert("Filter functionality coming soon!");
};

// Example function for adding an item
const handleAdd = () => {
    // You can replace this with your actual add logic
    console.log("Add button clicked");
    alert("Add functionality executed!");
};

// Example function for deleting an item
const handleDelete = () => {
    // You can replace this with your actual delete logic
    console.log("Delete button clicked");
    alert("Delete functionality executed!");
};

return (
        <>
                {/* SECTIONS */}
                        <div className="sticky top-[72px] left-0 right-0 z-20 flex flex-col items-start justify-center w-full min-h-[80px] mt-0 bg-gradient-to-r from-blue-50 via-white to-blue-100 border-b border-gray-200 shadow-lg rounded-t-xl">
                                <div className="flex items-center justify-between w-full px-4">
                                <div className="flex gap-2">
                                        {[
                                        { key: "available", label: "Available" },
                                        { key: "borrowed", label: "Borrowed" },
                                        { key: "items", label: "Item List" },
                                        ].map(({ key, label }) => (
                                        <button
                                                key={key}
                                                className={`px-5 py-2 rounded-lg font-semibold transition-all duration-200
                                                ${
                                                        active === key
                                                        ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md"
                                                        : "bg-white text-blue-700 hover:bg-blue-100 border border-blue-200"
                                                }
                                                focus:outline-none`}
                                                onClick={() => {
                                                setActive(key);
                                                setPage(elements.current[key]);
                                                }}
                                        >
                                                {label}
                                        </button>
                                        ))}
                                </div>
                                <div className="flex gap-2">
                                        {/* Filter Icon */}
                                        <button
                                                className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition"
                                                title="Filter"
                                                onClick={handleFilter}
                                        >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.586V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.414a2 2 0 00-.293-1.293L2.293 6.707A1 1 0 012 6V4z" />
                                                </svg>
                                        </button>
                                        {/* Add Icon */}
                                        <button
                                        className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white transition"
                                        title="Add"
                                        onClick={handleAdd}
                                        >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        </button>
                                        {/* Delete Icon */}
                                        <button
                                        className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition"
                                        title="Delete"
                                        onClick={handleDelete}
                                        >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        </button>
                                </div>
                                </div>
                        </div>
                                 
                {/* CONTENTS */}
                <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-900 mt-6 w-full rounded-b-xl shadow-xl p-8 border border-blue-100">
                        <Page />
                </div>
        </>
)
}

export default EIC