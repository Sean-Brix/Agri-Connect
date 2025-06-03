import { useState } from 'react';

const initialProgramList = [
    {
        name: 'Plows Seminar',
        desc: 'Learn how to use plows for soil preparation.',
        img: 'plow-image-url',
    },
    {
        name: 'Pandilig Workshop',
        desc: 'Master the art of irrigation with Pandilig.',
        img: 'pandilig-image-url',
    },
    {
        name: 'Shovel Training',
        desc: 'Proper shovel techniques for efficient farming.',
        img: 'shovel-image-url',
    },
    {
        name: 'Tractor Maintenance',
        desc: 'Keep your tractor running smoothly with expert tips.',
        img: 'tractor-image-url',
    },
    {
        name: 'Seed Selection Seminar',
        desc: 'Choose the best seeds for your crops.',
        img: 'seed-image-url',
    },
    {
        name: 'Organic Farming Basics',
        desc: 'Introduction to organic farming methods.',
        img: 'organic-image-url',
    },
];

export default function Seminar() {
    const [search, setSearch] = useState('');
    const [programList, setProgramList] = useState(initialProgramList);
    const [showAdd, setShowAdd] = useState(false);
    const [newProgram, setNewProgram] = useState({ name: '', desc: '', img: '' });

    const filteredList = programList.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.desc.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = idx => {
        setProgramList(list => list.filter((_, i) => i !== idx));
    };

    const handleAddProgram = e => {
        e.preventDefault();
        if (!newProgram.name.trim() || !newProgram.desc.trim()) return;
        setProgramList(list => [
            ...list,
            {
                name: newProgram.name,
                desc: newProgram.desc,
                img: newProgram.img || 'https://via.placeholder.com/400x200?text=No+Image',
            },
        ]);
        setNewProgram({ name: '', desc: '', img: '' });
        setShowAdd(false);
    };

    return (
        <div className="min-h-screen bg-white py-10 px-2 md:px-8">
            {/* Header */}
            <div className="relative mt-30 mb-20">
                <hr className="border-black-300" />
                <span className="absolute left-1/8 -translate-x-1/4 -top-5 bg-white rounded-lg px-4 text-3xl font-semibold text-black-700">
                    Account Settings
                </span>
            </div>
            {/* Search Bar and Add Button */}
            <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
                <div className="relative w-full max-w-lg">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search programs..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black bg-white shadow-sm"
                    />
                </div>
                <button
                    className="ml-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-semibold transition-colors"
                    onClick={() => setShowAdd(true)}
                >
                    + Add Program
                </button>
            </div>
            {/* Add Program Modal */}
            {showAdd && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <form
                        className="bg-white rounded-2xl shadow-2xl p-0 w-full max-w-sm relative border border-gray-100"
                        onSubmit={handleAddProgram}
                        style={{ minWidth: 340 }}
                    >
                        <div className="flex justify-between items-center border-b border-gray-100 px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">Add Program</h2>
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-700 text-2xl leading-none"
                                onClick={() => setShowAdd(false)}
                                aria-label="Close"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="px-6 py-6 flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                    value={newProgram.name}
                                    onChange={e => setNewProgram({ ...newProgram, name: e.target.value })}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                                <textarea
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition resize-none"
                                    value={newProgram.desc}
                                    onChange={e => setNewProgram({ ...newProgram, desc: e.target.value })}
                                    required
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Image URL <span className="text-gray-300">(optional)</span></label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                    value={newProgram.img}
                                    onChange={e => setNewProgram({ ...newProgram, img: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg py-2 transition-colors shadow-none focus:ring-2 focus:ring-green-200 focus:outline-none"
                            >
                                Add Program
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {/* Responsive Grid for Programs */}
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredList.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col"
                    >
                        <img
                            src={item.img}
                            alt={item.name}
                            className="w-full h-48 object-cover rounded-t-xl bg-gray-100"
                            onError={e => { e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'; }}
                        />
                        <div className="flex-1 flex flex-col p-5">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                            <p className="text-gray-600 text-sm mb-4 flex-1">{item.desc}</p>
                            <div className="flex gap-2 mt-auto">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-semibold transition-colors flex-1">
                                    Edit Program
                                </button>
                                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200 text-sm font-semibold transition-colors flex-1">
                                    Details
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm font-semibold transition-colors flex-1"
                                    onClick={() => handleDelete(programList.indexOf(item))}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {filteredList.length === 0 && (
                    <div className="col-span-full text-center text-gray-400 py-10">
                        No programs found.
                    </div>
                )}
            </div>
        </div>
    );
}
