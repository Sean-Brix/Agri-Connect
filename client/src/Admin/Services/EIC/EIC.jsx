import { useState } from 'react'

// EIC Sections
import Available from './Available.jsx'
import Borrowed from './Borrowed.jsx'
import Items from './Items.jsx'

const sectionComponents = {
        available: Available,
        borrowed: Borrowed,
        items: Items,
}

function EIC() {
        const [active, setActive] = useState("available")

        const handleFilter = () => {
                alert("Filter functionality coming soon!")
        }

       

        const Page = sectionComponents[active]

        return (
                <>
                        {/* SECTIONS */}
                        <div className="flex flex-col items-start justify-center w-full bg-gradient-to-r from-blue-50 via-white to-blue-100 border-b border-gray-200 shadow-lg rounded-t-xl mt-20">
                                <div className="flex items-center justify-between w-full px-4 py-4">
                                        <div className="flex gap-2">
                                                {[
                                                        { key: "available", label: "Available" },
                                                        { key: "borrowed", label: "Borrowed" },
                                                        { key: "items", label: "Item List" },
                                                ].map(({ key, label }) => (
                                                        <button
                                                                key={key}
                                                                className={`px-2 py-2 rounded-lg font-semibold transition-all duration-200
                                                                        ${active === key
                                                                                ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md"
                                                                                : "bg-white text-blue-700 hover:bg-blue-100 border border-blue-200"
                                                                        }
                                                                        focus:outline-none`}
                                                                onClick={() => setActive(key)}
                                                        >
                                                                {label}
                                                        </button>
                                                ))}
                                        </div>
                                        <div className="flex gap-2">
                                                {/* Filter Icon */}
                                                <button
                                                        type="button"
                                                        className="px-2 py-1 rounded-sm border border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1"
                                                        title="Filter options"
                                                        onClick={handleFilter}
                                                >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                                <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a2 2 0 0 1-.553 1.382l-5.894 6.183A2 2 0 0 0 14 15.118V19a1 1 0 0 1-1.447.894l-2-1A1 1 0 0 1 10 18v-2.882a2 2 0 0 0-.553-1.382L3.553 7.382A2 2 0 0 1 3 6V4Z" />
                                                        </svg>
                                                        <span className="hidden sm:inline text-xs">Filter</span>
                                                </button>
                                               
                                        </div>
                                </div>
                        </div>
                        {/* CONTENTS */}
                        <div className="flex flex-col items-center bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-900 w-full rounded-b-xl shadow-xl border border-blue-100 =">
                                <Page />
                        </div>
                </>
        )
}

export default EIC
