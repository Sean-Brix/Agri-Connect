import { useState } from 'react';

// ASSETS
import default_image from './Assets/default_image.png';

// SUB COMPONENTS
import All_Items from './All_Items/All_Items.jsx';

export default function EIC() {
    const [section, setSection] = useState('all');

    return (
        <>
            {/* HEADER SECTIONS */}
            {Section_Buttons(section, setSection)}

            <All_Items />
        </>
    );
}

/* ________________________________________________________________________________________________________________________________________________ */

// SECTION CONTROL
function Section_Buttons(section, setSection) {
    return (
        <div className="flex mt-[10vh] space-x-4 mb-6 justify-center">
            {[
                { key: 'all', label: 'All Items' },
                { key: 'requests', label: 'Requests' },
                { key: 'issued', label: 'Issued' },
            ].map(({ key, label }) => (
                <button
                    key={key}
                    className={`relative px-6 py-2 font-semibold rounded-full transition-all duration-200
                        ${
                            section === key
                                ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg scale-105'
                                : 'bg-white text-blue-600 border border-blue-400 hover:bg-blue-50'
                        }
                        focus:outline-none focus:ring-2 focus:ring-blue-300`}
                    onClick={() => setSection(key)}
                >
                    {label}
                    {section === key && (
                        <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow"></span>
                    )}
                </button>
            ))}
        </div>
    );
}
