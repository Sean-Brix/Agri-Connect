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


const handleFilter = () => {
    alert("Filter functionality coming soon!");
};


const handleAdd = () => {
    
    alert("Add functionality executed!");
};


const handleDelete = () => {
    
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
                                                className={`px-2 py-2 rounded-lg font-semibold transition-all duration-200
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
                                            type="button"
                                            className=" px-2 py-1 rounded-sm border border-blue-300 bg-blue-50 text</svg>-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1"
                                            title="Filter options"
                                            onClick={() => setShowFilter((prev) => !prev)}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a2 2 0 0 1-.553 1.382l-5.894 6.183A2 2 0 0 0 14 15.118V19a1 1 0 0 1-1.447.894l-2-1A1 1 0 0 1 10 18v-2.882a2 2 0 0 0-.553-1.382L3.553 7.382A2 2 0 0 1 3 6V4Z" />
                                            </svg>
                                            <span className="hidden sm:inline text-xs">Filter</span>
                                        </button>`
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
                <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-900 w-full rounded-b-xl shadow-xl p-8 border border-blue-100">
                        <Page />
                </div>
        </>
)
}

export default EIC