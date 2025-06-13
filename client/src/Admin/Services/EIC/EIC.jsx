import { useState } from 'react';

// ASSETS
import default_image from './Assets/default_image.png';

// SUB COMPONENTS
import Item_Card from './All_Items/Item_Card.jsx';

export default function EIC() {
    const [section, setSection] = useState('all');

    return (
        <>
            {/* HEADER SECTIONS */}
            {Section_Buttons(section, setSection)}

            <Item_Card />
        </>
    );
}

/* ________________________________________________________________________________________________________________________________________________ */

// SECTION CONTROL
function Section_Buttons(section, setSection) {
    return (
        <div className="flex mt-[7%] space-x-4 mb-4">
            <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                    section === 'all' ? 'bg-blue-800' : ''
                }`}
                onClick={() => setSection('all')}
            >
                All Items
            </button>

            <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                    section === 'requests' ? 'bg-blue-800' : ''
                }`}
                onClick={() => setSection('requests')}
            >
                Requests
            </button>

            <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                    section === 'issued' ? 'bg-blue-800' : ''
                }`}
                onClick={() => setSection('issued')}
            >
                Issued
            </button>
        </div>
    );
}
