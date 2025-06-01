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

return (
    <>
        {/* SECTIONS */}
        <div className='sticky top-[10%] z-10 flex flex-col items-start font-bol justify-center w-full h-[10%] mt-[5%] bg-amber-200 border-2'>
            <div className='flex gap-4 ml-4'>

            <button 
                className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200' 
                onClick={()=>setPage(elements.current["available"])}
            >
                Available
            </button>

            <button 
                className='bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors duration-200'
                onClick={()=>setPage(elements.current["borrowed"])}
            >
                Borrowed
            </button>

            <button 
                className='bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors duration-200'
                onClick={()=>setPage(elements.current["items"])}
            >
                Item List
            </button>

            </div>
        </div>

        {/* CONTENTS */}
        <div className="bg-gradient-to-b from-blue-400 to-blue-200 text-white mt-5 w-full rounded-lg overflow-y-auto p-10">
            <Page/>
        </div>
    </>
)
}

export default EIC