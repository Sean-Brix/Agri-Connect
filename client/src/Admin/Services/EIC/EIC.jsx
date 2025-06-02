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

return (
    <>
        
        {/* SECTIONS */}
        <div className="fixed top-[10%] z-10 flex flex-col items-start justify-center w-full h-[10%] mt-8 bg-gradient-to-r from-blue-50 via-white to-blue-100 border-b border-gray-200 shadow-lg rounded-t-xl">
            <div className="flex gap-2 ml-4">
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
        </div>
                 
        {/* CONTENTS */}
        <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-900 mt-6 w-full rounded-b-xl shadow-xl p-8 border border-blue-100">
            <Page />
        </div>
      
    </>
)
}

export default EIC