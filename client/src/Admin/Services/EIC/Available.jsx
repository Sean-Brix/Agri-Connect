import Shovel from './Assets/Shovel.webp'
import Pandilig from './Assets/pandilig.webp'  
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const equipmentList = [
    // ... your equipmentList as before ...
];

export default function Available() {
    const [products, setProducts] = useState(equipmentList);
    const [deleteMode, setDeleteMode] = useState(false);
    const [selectedToDelete, setSelectedToDelete] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        desc: '',
        img: '',
    });

    const handleOpenModal = () => {
        setShowModal(true);
        setNewProduct({ name: '', desc: '', img: '' });
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!newProduct.name || !newProduct.desc || !newProduct.img) return;
        setProducts([...products, newProduct]);
        setShowModal(false);
    };

    const handleDeleteMode = () => {
        setDeleteMode(!deleteMode);
        setSelectedToDelete([]);
    };

    const handleSelectToDelete = (idx) => {
        if (selectedToDelete.includes(idx)) {
            setSelectedToDelete(selectedToDelete.filter(i => i !== idx));
        } else {
            setSelectedToDelete([...selectedToDelete, idx]);
        }
    };

    const handleDeleteSelected = () => {
        const updatedProducts = products.filter((_, idx) => !selectedToDelete.includes(idx));
        setProducts(updatedProducts);
        setDeleteMode(false);
        setSelectedToDelete([]);
    };

    // Helper to truncate description
    const truncate = (str, n) => {
        return str.length > n ? str.slice(0, n) + '...' : str;
    };

    return (
       <div className="pt-10 min-h-screen w-full pb-5 bg-gradient-to-br from-neutral-100 via-slate-100 to-zinc-200 flex flex-col items-center px-2 sm:px-6">
            <div className="w-full max-w-7xl">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-extrabold text-neutral-900 text-center tracking-tight drop-shadow">
                        Available Equipment
                    </h2>
                    <div className="flex gap-4">
                        <button
                            onClick={handleOpenModal}
                            className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white py-2 px-6 rounded-xl font-semibold text-base hover:from-blue-700 hover:to-blue-800 transition-colors border border-transparent shadow"
                        >
                            + Add Product
                        </button>
                        <button
                            onClick={handleDeleteMode}
                            className={`bg-gradient-to-r from-red-400 to-red-600 text-white py-2 px-6 rounded-xl font-semibold text-base border border-red-400 hover:from-red-500 hover:to-red-700 transition-colors shadow ${deleteMode ? 'ring-2 ring-red-400' : ''}`}
                        >
                            {deleteMode ? 'Cancel Delete' : '- Delete Products'}
                        </button>
                        {deleteMode && (
                            <button
                                onClick={handleDeleteSelected}
                                disabled={selectedToDelete.length === 0}
                                className={`ml-2 bg-red-700 text-white py-2 px-6 rounded-xl font-semibold text-base border border-red-700 shadow ${selectedToDelete.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-800'}`}
                            >
                                Delete Selected
                            </button>
                        )}
                    </div>
                </div>
                <div
                    className="overflow-y-auto pr-2"
                    style={{
                        maxHeight: '600px',
                    }}
                >
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 p-5">
                        {products.map((item, idx) => (
                            <div
                                key={idx}
                                className={`bg-white/90 backdrop-blur-md rounded-3xl shadow-xl flex flex-col justify-between items-center w-full min-h-[370px] p-7 relative hover:shadow-2xl transition-shadow duration-300 border border-slate-200 ${deleteMode && selectedToDelete.includes(idx) ? 'ring-4 ring-red-400' : ''}`}
                                onClick={deleteMode ? () => handleSelectToDelete(idx) : undefined}
                                style={deleteMode ? { cursor: 'pointer' } : {}}
                            >
                                {deleteMode && (
                                    <div className="absolute top-4 right-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedToDelete.includes(idx)}
                                            onChange={() => handleSelectToDelete(idx)}
                                            onClick={e => e.stopPropagation()}
                                            className="w-6 h-6 accent-red-500"
                                        />
                                    </div>
                                )}
                                <div className="w-full flex justify-center mb-4">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-32 h-32 object-contain rounded-xl bg-gradient-to-br from-neutral-100 to-zinc-200 shadow"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-start w-full text-center">
                                    <h3 className="text-xl font-bold text-neutral-800 mb-2">{item.name}</h3>
                                    <p
                                        className="text-neutral-500 text-base mb-4 overflow-hidden text-ellipsis"
                                        style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            minHeight: '3.2em',
                                        }}
                                        title={item.desc}
                                    >
                                        {item.desc}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 w-full mt-2">
                                    <Link
                                        to={`/edit/${idx}`}
                                        className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white py-2.5 rounded-xl font-semibold text-base hover:from-blue-700 hover:to-blue-800 transition-colors border border-transparent text-center shadow"
                                    >
                                        Edit Product
                                    </Link>
                                </div>
                            </div>
                        ))}
                        {/* Plus button for adding a product */}
                        <button
                            onClick={handleOpenModal}
                            className="flex flex-col items-center justify-center bg-white/90 backdrop-blur-md rounded-3xl shadow-xl w-full min-h-[370px] p-7 border-2 border-dashed border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
                            style={{ fontSize: '3rem', color: '#2563eb' }}
                            aria-label="Add Product"
                        >
                            <span className="text-6xl font-bold mb-2">+</span>
                            <span className="text-lg font-semibold text-blue-700">Add Product</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Modern Minimalist Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl px-8 py-10 w-full max-w-sm relative flex flex-col gap-6 border border-neutral-200">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-neutral-400 hover:text-blue-600 transition-colors text-2xl"
                            aria-label="Close"
                            tabIndex={0}
                        >
                            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12"/>
                            </svg>
                        </button>
                        <h3 className="text-xl font-semibold text-neutral-900 text-center mb-2 tracking-tight">Add New Product</h3>
                        <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Product Name"
                                value={newProduct.name}
                                onChange={handleInputChange}
                                className="border border-neutral-200 rounded-lg px-4 py-2 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                required
                                autoFocus
                            />
                            <textarea
                                name="desc"
                                placeholder="Description"
                                value={newProduct.desc}
                                onChange={handleInputChange}
                                className="border border-neutral-200 rounded-lg px-4 py-2 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                                rows={3}
                                required
                            />
                            <input
                                type="text"
                                name="img"
                                placeholder="Image URL"
                                value={newProduct.img}
                                onChange={handleInputChange}
                                className="border border-neutral-200 rounded-lg px-4 py-2 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                required
                            />
                            <button
                                type="submit"
                                className="mt-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2 rounded-lg font-semibold text-base shadow-sm"
                            >
                                Add Product
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div> 
    )
}
