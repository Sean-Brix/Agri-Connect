import Shovel from './Assets/Shovel.webp'
import Pandilig from './Assets/pandilig.webp'  
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const equipmentList = [
    {
        name: 'Plows',
        desc: 'Used for turning over soil to prepare for planting.',
        img: 'plow-image-url',
    },
    {
        name: 'Pandilig',
        desc: 'njwdwsdwdwd. ',
        img: Pandilig,
    },
    {
        name: 'Plows',
        desc: 'Pang hukay ng bangkay to boss',
        img: Shovel,
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
     {
        name: 'Plows',
        desc: 'Used for turning over soil to prepare for planting.',
        img: 'plow-image-url',
    },
]

export default function Available() {
    // Handler to add a new product
    const [products, setProducts] = useState(equipmentList);

    const handleAddProduct = () => {
        const newProduct = {
            name: 'New Product',
            desc: 'Description of the new product.',
            img: 'plow-image-url',
        };
        setProducts([...products, newProduct]);
    };

    const handleRemoveProduct = (idx) => {
        const updatedProducts = products.filter((_, i) => i !== idx);
        setProducts(updatedProducts);
    };

    return (
       <div className="pt-10 min-h-screen w-full pb-5 bg-gradient-to-br from-indigo-100 via-sky-100 to-emerald-100 flex flex-col items-center px-2 sm:px-6">
            <div className="w-full max-w-7xl">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight drop-shadow">
                    Available Equipment
                </h2>
                <div
                    className="overflow-y-auto pr-2"
                    style={{
                        maxHeight: '600px',
                    }}
                >
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {products.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl flex flex-col justify-between items-center w-full min-h-[370px] p-7 relative hover:shadow-2xl transition-shadow duration-300 border border-slate-200"
                            >
                                <div className="w-full flex justify-center mb-4">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-32 h-32 object-contain rounded-xl bg-gradient-to-br from-indigo-100 to-emerald-100 shadow"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-start w-full text-center">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                                    <p className="text-gray-500 text-base mb-4">{item.desc}</p>
                                </div>
                                <div className="flex flex-col gap-2 w-full mt-2">
                                    <Link
                                        to={`/edit/${idx}`}
                                        className="w-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 text-white py-2.5 rounded-xl font-semibold text-base hover:from-indigo-600 hover:to-emerald-500 transition-colors border border-transparent text-center shadow"
                                    >
                                        Edit Product
                                    </Link>
                                    <button
                                        onClick={() => handleRemoveProduct(idx)}
                                        className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2.5 rounded-xl font-semibold text-base border border-red-400 hover:from-pink-600 hover:to-red-600 transition-colors text-center shadow mt-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        {/* Plus button for adding a product */}
                        <button
                            onClick={handleAddProduct}
                            className="flex flex-col items-center justify-center bg-white/80 backdrop-blur-md rounded-3xl shadow-xl w-full min-h-[370px] p-7 border-2 border-dashed border-indigo-400 hover:bg-indigo-50 transition-colors cursor-pointer"
                            style={{ fontSize: '3rem', color: '#6366f1' }}
                            aria-label="Add Product"
                        >
                            <span className="text-6xl font-bold mb-2">+</span>
                            <span className="text-lg font-semibold text-indigo-600">Add Product</span>
                        </button>
                    </div>
                </div>
            </div>
        </div> 
    )
}
