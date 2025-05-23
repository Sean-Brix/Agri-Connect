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
                 <div className="relative mt-30">
                            <hr className="border-black-300" />
                            <span className="absolute left-1/8 -translate-x-1/4 -top-5 bg-white  rounded-lg px-4 text-2xl font-semibold text-gray-700">
                                Available Equipments
                            </span>
                        </div>

                <div className="flex flex-col items-center bg-gradient-to-b from-blue-600 to-blue-800 text-white mt-10 w-full rounded-lg max-h-[70vh] overflow-y-auto p-10">
                    
                    {equipmentList.map((item, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg shadow-md flex flex-row flex-wrap items-center w-full max-w-6xl mx-auto   mb-8 ">
                            <img src={item.img} alt={item.name} className="w-full bg-blue-800 h-48 object-cover rounded-md mb-4  "  />
                            <div className="flex flex-col justify-center p-5">
                                <h3 className="text-xl font-semibold mb-2 text-black">{item.name}</h3>
                                <p className="text-gray-600 mb-4">{item.desc}</p>
                                <div className="flex space-x-2">
                                    <button className="bg-blue-500 text-white px-4 rounded-md border-2 border-black bg-blue-800 hover:bg-blue-600">Borrow</button>
                                    <button className="bg-gray-300 text-black px-4 py-2 rounded-md bg-white border-2 border-black hover:bg-gray-200">Details</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Navbar>
        </>
    )
}
