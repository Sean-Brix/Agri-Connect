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
        name: 'Plowsfeef',
        desc: 'Used for turning over soil to prepare for plantingvdffffefefeffef.',
        img: 'plow-image-url',
    },
]

export default function Items() {
    const [products, setProducts] = useState(
        equipmentList.map((item, idx) => ({
            ...item,
            available: true,
            id: idx + '_' + Math.random().toString(36).substr(2, 9), // unique id
        }))
    );
    const [filter, setFilter] = useState('all');

    const handleAddProduct = () => {
        const newProduct = {
            name: 'New Product',
            desc: 'Description of theefefef fefefefefefefeffefefefefefwfeffefefenew producfefefefefefefefefefet.',
            img: 'plow-image-url',
            available: true,
            id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        };
        setProducts([...products, newProduct]);
    };

    const handleRemoveProduct = (id) => {
        setProducts(products => products.filter(item => item.id !== id));
    };

    const handleToggleAvailable = (id) => {
        setProducts(products =>
            products.map(item =>
                item.id === id ? { ...item, available: !item.available } : item
            )
        );
    };

    const filteredProducts = products.filter(product => {
        if (filter === 'all') return true;
        if (filter === 'available') return product.available;
        if (filter === 'unavailable') return !product.available;
        return true;
    });

    // Helper to truncate description
    const truncate = (str, max = 60) => {
        if (!str) return '';
        return str.length > max ? str.slice(0, max) + '...' : str;
    };

    return (
        <div className="pt-10 min-h-screen w-full pb-5 bg-gradient-to-br from-indigo-100 via-sky-100 to-emerald-100 flex flex-col items-center px-2 sm:px-6">
            <div className="w-full max-w-3xl">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight drop-shadow">
                    Equipment List
                </h2>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-2">
                        <button
                            className={`px-4 py-2 rounded-lg font-semibold ${filter === 'all' ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-600 border border-indigo-300'} transition`}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg font-semibold ${filter === 'available' ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-600 border border-emerald-300'} transition`}
                            onClick={() => setFilter('available')}
                        >
                            Available
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg font-semibold ${filter === 'unavailable' ? 'bg-red-500 text-white' : 'bg-white text-red-600 border border-red-300'} transition`}
                            onClick={() => setFilter('unavailable')}
                        >
                            Unavailable
                        </button>
                    </div>
                    <button
                        onClick={handleAddProduct}
                        className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-indigo-600 transition"
                    >
                        <span className="text-2xl leading-none">+</span>
                        Add Product
                    </button>
                </div>
                <ul className="divide-y divide-gray-200 bg-white/80 rounded-2xl shadow-lg">
                    {filteredProducts.length === 0 && (
                        <li className="py-8 text-center text-gray-400">No products found.</li>
                    )}
                    {filteredProducts.map((item) => (
                        <li key={item.id} className="flex items-center justify-between px-6 py-5 hover:bg-indigo-50 transition">
                            <div className="flex items-center gap-4 min-w-0">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-16 h-16 object-contain rounded-xl bg-gradient-to-br from-indigo-100 to-emerald-100 shadow"
                                />
                                <div className="min-w-0">
                                    <h3 className="text-lg font-bold text-gray-800 truncate">{item.name}</h3>
                                    <p
                                        className="text-gray-500 text-sm truncate max-w-[180px] sm:max-w-xs"
                                        title={item.desc}
                                    >
                                        {truncate(item.desc, 60)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleToggleAvailable(item.id)}
                                    className={`px-3 py-1 rounded-lg font-semibold text-sm transition ${
                                        item.available
                                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                                            : 'bg-red-100 text-red-700 border border-red-300'
                                    }`}
                                >
                                    {item.available ? 'Available' : 'Unavailable'}
                                </button>
                                <Link
                                    to={`/edit/${item.id}`}
                                    className="px-3 py-1 rounded-lg bg-indigo-500 text-white font-semibold text-sm hover:bg-indigo-600 transition"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleRemoveProduct(item.id)}
                                    className="px-3 py-1 rounded-lg bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
