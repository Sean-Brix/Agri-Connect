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

import default_seminar_pic from '../../../Assets/default_seminar_pic.svg'

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

    // Fix image blinking: set a default placeholder if no image, and avoid onError loop
    const handleImgError = e => {
        if (e.target.src !== 'https://via.placeholder.com/400x200?text=No+Image') {
            e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
        }
    };

    // State for selection mode and selected items
    const [selectMode, setSelectMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    // Toggle selection mode
    const handleToggleSelectMode = () => {
        setSelectMode(!selectMode);
        setSelectedItems([]);
    };

    // Handle selecting/deselecting an item
    const handleSelectItem = idx => {
        setSelectedItems(selected =>
            selected.includes(idx)
                ? selected.filter(i => i !== idx)
                : [...selected, idx]
        );
    };

    // Delete selected items
    const handleDeleteSelected = () => {
        setProgramList(list =>
            list.filter((_, idx) => !selectedItems.includes(idx))
        );
        setSelectedItems([]);
        setSelectMode(false);
    };

    return (
        <div className="min-h-screen bg-white py-6 px-2 md:px-8">
            {/* Header */}
            <div className="relative mt-20 mb-10">
                <hr className="border-black-300" />
                <span className="absolute left-1/8 -translate-x-1/4 -top-5 bg-white rounded-lg px-4 text-2xl md:text-3xl font-semibold text-black-700">
                    Account Settings
                </span>
            </div>
            {/* Search Bar and Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-8 max-w-6xl mx-auto gap-4">
                <div className="flex-1 flex flex-col sm:flex-row gap-4">
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
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button
                        className={`bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${selectMode ? 'hover:bg-red-600' : 'hover:bg-red-500/80'} ${selectMode ? '' : 'opacity-80'}`}
                        onClick={selectMode ? handleDeleteSelected : handleToggleSelectMode}
                        disabled={selectMode && selectedItems.length === 0}
                    >
                        {selectMode ? (selectedItems.length > 0 ? `Delete (${selectedItems.length})` : 'Delete') : 'Delete'}
                    </button>
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-semibold transition-colors"
                        onClick={() => setShowAdd(true)}
                    >
                        + Add Program
                    </button>
                    {selectMode && (
                        <button
                            className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-xs font-semibold ml-2 hover:bg-gray-300"
                            onClick={handleToggleSelectMode}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
            {/* Add Program Modal */}
            {showAdd && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <form
                        className="bg-white rounded-2xl shadow-2xl p-0 w-full max-w-sm relative border border-gray-100"
                        onSubmit={handleAddProgram}
                        style={{ minWidth: 280 }}
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
                                <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
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
                                <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                    value={newProgram.name}
                                    onChange={e => setNewProgram({ ...newProgram, name: e.target.value })}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Start Date</label>
                                    <input
                                        type="datetime-local"
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                        value={newProgram.startDate || ''}
                                        onChange={e => setNewProgram({ ...newProgram, startDate: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">End Date</label>
                                    <input
                                        type="datetime-local"
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                        value={newProgram.endDate || ''}
                                        onChange={e => setNewProgram({ ...newProgram, endDate: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Opening Time</label>
                                    <input
                                        type="time"
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                        value={newProgram.openTime || ''}
                                        onChange={e => setNewProgram({ ...newProgram, openTime: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Closing Time</label>
                                    <input
                                        type="time"
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                        value={newProgram.closeTime || ''}
                                        onChange={e => setNewProgram({ ...newProgram, closeTime: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Maximum Participants</label>
                                <input
                                    type="number"
                                    min="1"
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                    value={newProgram.maxParticipants || ''}
                                    onChange={e => setNewProgram({ ...newProgram, maxParticipants: e.target.value })}
                                    required
                                    placeholder="Enter maximum number of participants"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Speaker Name</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                    value={newProgram.speaker || ''}
                                    onChange={e => setNewProgram({ ...newProgram, speaker: e.target.value })}
                                    required
                                    placeholder="Enter speaker name"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Registration Deadline</label>
                                <input
                                    type="datetime-local"
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                    value={newProgram.registrationDeadline || ''}
                                    onChange={e => setNewProgram({ ...newProgram, registrationDeadline: e.target.value })}
                                    required
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
                                    type="file"
                                    accept="image/*"
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                    value={newProgram.img}
                                    onChange={e => setNewProgram({ ...newProgram, img: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg py-2 transition-colors shadow-none focus:ring-2 focus:ring-green-200 focus:outline-none w-full"
                            >
                                Add Program
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {/* Responsive Grid for Programs */}
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 [@media(min-width:1150px)]:grid-cols-3 gap-6 md:gap-8">
                {filteredList.map((item, idx) => {
                    // Find the index in the main programList for selection
                    const realIdx = programList.indexOf(item);
                    const isSelected = selectedItems.includes(realIdx);
                    return (
                        <div
                            key={idx}
                            className={`bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col relative ${selectMode && 'cursor-pointer'} ${selectMode && isSelected ? 'ring-2 ring-red-400' : ''}`}
                            onClick={selectMode ? () => handleSelectItem(realIdx) : undefined}
                        >
                            {selectMode && (
                                <div className="absolute top-3 left-3 z-10">
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => handleSelectItem(realIdx)}
                                        onClick={e => e.stopPropagation()}
                                        className="w-5 h-5 accent-red-500"
                                    />
                                </div>
                            )}
                            <img
                                src={default_seminar_pic}
                                alt={item.name}
                                className="w-full h-40 sm:h-48 object-cover rounded-t-xl bg-gray-100 transition-none"
                                onError={handleImgError}
                                loading="lazy"
                            />
                            <div className="flex-1 flex flex-col p-4 md:p-5">
                                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                                <p className="text-gray-600 text-sm mb-4 flex-1">{item.desc}</p>
                                <div className="flex flex-col gap-2 mt-auto md:flex-row">
                                    <button className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-semibold transition-colors">
                                        Edit Program
                                    </button>
                                    <button className="w-full md:w-auto bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200 text-sm font-semibold transition-colors">
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {filteredList.length === 0 && (
                    <div className="col-span-full text-center text-gray-400 py-10">
                        No programs found.
                    </div>
                )}
            </div>
        </div>
    );
}
