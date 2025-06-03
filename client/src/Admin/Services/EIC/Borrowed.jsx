import Shovel from './Assets/Shovel.webp'
import Pandilig from './Assets/pandilig.webp'  
import { Link } from 'react-router-dom';
import { useState } from 'react';

const equipmentList = [
    {
        name: 'hiram',
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
]
export default function Borrowed() {
    // Handler to add a new product
    const [products, setProducts] = useState(
        equipmentList.map(item => ({ ...item, status: 'Borrowed' }))
    );
    const [deleteMode, setDeleteMode] = useState(false);
    const [selectedToDelete, setSelectedToDelete] = useState([]);

    const handleAddProduct = () => {
        const newProduct = {
            name: 'New Product',
            desc: 'Description of the new product.',
            img: 'plow-image-url',
            status: 'Hiniram',
        };
        setProducts([...products, newProduct]);
    };

    const handleReturnProduct = (idx) => {
        setProducts(products =>
            products.map((item, i) =>
                i === idx ? { ...item, status: 'Returned' } : item
            )
        );
    };

    // Helper to truncate description text
    const truncateText = (text, maxLength = 60) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    const handleDeleteMode = () => {
        setDeleteMode(!deleteMode);
        setSelectedToDelete([]);
    };

    const handleSelectToDelete = (idx) => {
        setSelectedToDelete(selected =>
            selected.includes(idx)
                ? selected.filter(i => i !== idx)
                : [...selected, idx]
        );
    };

    const handleDeleteSelected = () => {
        setProducts(products =>
            products.filter((_, idx) => !selectedToDelete.includes(idx))
        );
        setDeleteMode(false);
        setSelectedToDelete([]);
    };

    return (
        <div className="pt-10 min-h-screen w-full pb-5 bg-neutral-50 flex flex-col items-center px-2 sm:px-6">
            <div className="w-full max-w-7xl">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-extrabold text-neutral-900 text-center tracking-tight">
                        Borrowed Equipment
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={handleDeleteMode}
                            className={`bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-6 rounded-xl font-semibold text-base border border-blue-500 hover:from-blue-500 hover:to-blue-700 transition-colors shadow ${deleteMode ? 'ring-2 ring-blue-400' : ''}`}
                        >
                            {deleteMode ? 'Cancel Delete' : '- Delete Products'}
                        </button>
                        {deleteMode && (
                            <button
                                onClick={handleDeleteSelected}
                                className="px-4 py-2 rounded-lg font-medium text-sm border border-red-600 text-white bg-red-600 hover:bg-red-700 transition-colors shadow"
                                disabled={selectedToDelete.length === 0}
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
                                className={`bg-white rounded-2xl shadow-sm flex flex-col justify-between items-center w-full min-h-[370px] p-7 relative border border-neutral-200 hover:shadow-md transition-shadow duration-200
                                    ${deleteMode && selectedToDelete.includes(idx) ? 'ring-2 ring-red-400' : ''}`}
                                style={{ position: 'relative' }}
                            >
                                {deleteMode && (
                                    <input
                                        type="checkbox"
                                        checked={selectedToDelete.includes(idx)}
                                        onChange={() => handleSelectToDelete(idx)}
                                        className="absolute top-4 left-4 w-5 h-5 accent-red-500"
                                    />
                                )}
                                <div className="w-full flex justify-center mb-4">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-28 h-28 object-contain rounded-lg bg-neutral-100"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-start w-full text-center">
                                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">{item.name}</h3>
                                    <p
                                        className="text-neutral-500 text-sm mb-4 overflow-hidden text-ellipsis whitespace-nowrap"
                                        style={{ maxWidth: '100%' }}
                                        title={item.desc}
                                    >
                                        {truncateText(item.desc, 60)}
                                    </p>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2
                                        ${item.status === 'Borrowed'
                                            ? 'bg-neutral-200 text-neutral-700'
                                            : 'bg-green-100 text-green-700'
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                                {!deleteMode && (
                                    <div className="flex flex-col gap-2 w-full mt-2">
                                        <button
                                            onClick={() => handleReturnProduct(idx)}
                                            className={`w-full bg-neutral-900 text-white py-2.5 rounded-lg font-medium text-sm border border-neutral-900 hover:bg-neutral-700 transition-colors text-center shadow mt-2
                                                ${item.status === 'Returned' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={item.status === 'Returned'}
                                        >
                                            Return Item
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                        {/* Plus button for adding a product */}
                        {!deleteMode && (
                            <button
                                onClick={handleAddProduct}
                                className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm w-full min-h-[370px] p-7 border-2 border-dashed border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
                                style={{ fontSize: '3rem', color: '#171717' }}
                                aria-label="Add Product"
                            >
                                <span className="text-6xl font-bold mb-2 text-blue-600">+</span>
                                <span className="text-base font-medium text-blue-700">Add Product</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
