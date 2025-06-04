import { useState } from 'react';

// EIC Sections
import Items from './Items.jsx';

function EIC() {

    return (
        <>
            {/* CONTENTS */}
            <div className="flex flex-col items-center mt-[5%] bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-900 w-full rounded-b-xl shadow-xl border border-blue-100 =">
                <Items />
            </div>
        </>
    );
}

export default EIC;
