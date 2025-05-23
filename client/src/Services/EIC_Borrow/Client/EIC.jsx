import React from 'react'
import Navbar from '../../../Components/Navigation/Navbar'

const equipmentList = [
    {
        name: 'Plows',
        desc: 'Used for turning over soil to prepare for planting.',
        img: 'plow-image-url',
    },
    // Add more equipment objects here if needed
    {
        name: 'Plows',
        desc: 'Used for turning over soil to prepare for planting.',
        img: 'plow-image-url',
    },
    {
        name: 'Plows',
        desc: 'Used for turning over soil to prepare for planting.',
        img: 'plow-image-url',
    },
    {
        name: 'Plows',
        desc: 'Used for turning over soil to prepare for planting.',
        img: 'plow-image-url',
    },
    {
        name: 'Plows',
        desc: 'Used for turning over soil to prepare for planting.',
        img: 'plow-image-url',
    },
]

export default function EIC() {
    return (
        <>
            <Navbar>
                <h2 className="text-2xl font-bold mb-4 mt-20">Available Equipment</h2>
                <div className="flex flex-col items-center bg-gradient-to-b from-blue-600 to-blue-800 text-white mt-10 rounded-lg max-h-[70vh] overflow-y-auto p-4">
                    
                    {equipmentList.map((item, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg shadow-md flex flex-row items-center w-full max-w-6xl mx-auto mb-8">
                            <img src={item.img} alt={item.name} className="w-1/2 bg-blue-600 h-48 object-cover rounded-md mb-4" />
                            <div className="flex flex-col justify-center p-5">
                                <h3 className="text-xl font-semibold mb-2 text-black">{item.name}</h3>
                                <p className="text-gray-600 mb-4">{item.desc}</p>
                                <div className="flex space-x-2">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Borrow</button>
                                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Schedule</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Navbar>
        </>
    )
}
