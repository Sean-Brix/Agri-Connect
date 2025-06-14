// UTILS
import { useEffect, useState, useRef } from 'react';

// ASSETS
import default_seminar_pic from '../../../Assets/default_seminar_pic.jpg';

// SUB-COMPONENT
import Edit_Seminar from './Edit_Seminar';
import Participants from './Participants';
import Add_Program from './Add_Program';

export default function Seminar({ admin_navigate }) {
    const [programList, setProgramList] = useState([]);

    // Initial Render
    useEffect(() => {
        (async () => {
            // Data
            const response = await fetch(`/api/Seminars/getSeminars`);
            const data = await response.json();

            // Fetch and set image URLs for each seminar
            const updatedProgramList = await fetchAndSetImageUrls(
                data.payload.seminars
            );
            setProgramList(updatedProgramList);
        })();
    }, []);

    // Helper function to fetch and set image URLs
    const fetchAndSetImageUrls = async (seminars) => {
        return Promise.all(
            seminars.map(async (item) => {
                try {
                    const imageFetch = await fetch(
                        `/api/seminars/getPhoto?id=${item.id}`
                    );

                    if (imageFetch.status == 204) {
                        // Don't log errors for missing images
                        return { ...item, photo: default_seminar_pic };
                    } else {
                        const blob = await imageFetch.blob();
                        const picture = URL.createObjectURL(blob);
                        return { ...item, photo: picture };
                    }
                } catch (error) {
                    console.error(
                        `Error fetching image for seminar ${item.id}:`,
                        error
                    );
                    return { ...item, photo: default_seminar_pic }; // Fallback in case of error
                }
            })
        );
    };

    // Adding New Seminar
    const [showAdd, setShowAdd] = useState(false);
    
    // Edit Function
    const [showEdit, setShowEdit] = useState(false);
    const editData = useRef([]);
    const edit_seminar = async (e, seminar) => {
        e.preventDefault();
        editData.current = seminar;

        setShowEdit(true);
    };

    // Search Function
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchFilter, setSearchFilter] = useState('all');

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            try {
                const response = await fetch(
                    `/api/Seminars/searchSeminar?find=${search}&filter=${searchFilter}&status=${statusFilter}`
                );
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const updatedProgramList = await fetchAndSetImageUrls(data);
                setProgramList(updatedProgramList);
            } catch (error) {
                console.error('Could not fetch seminars:', error);
            }
        }, 500); // Delay of 500 milliseconds

        return () => clearTimeout(delayDebounceFn);
    }, [search, searchFilter, statusFilter]);

    // State for selection mode and selected items
    const [selectMode, setSelectMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    // Toggle selection mode
    const handleToggleSelectMode = () => {
        setSelectMode(!selectMode);
        setSelectedItems([]);
    };

    // Handle selecting/deselecting an item
    const handleSelectItem = (idx) => {
        setSelectedItems((selected) =>
            selected.includes(idx)
                ? selected.filter((i) => i !== idx)
                : [...selected, idx]
        );
    };

    // Delete selected items
    const handleDeleteSelected = async () => {
        if (!confirm('Are You Sure?')) return;

        selectedItems.map(async (idx) => {
            const response = await fetch(
                `/api/Seminars/deleteSeminar?delete=${programList[idx].id}`
            );
            const data = await response.json();
            console.log(data);
        });

        const updatedProgramList = programList.filter(
            (_, index) => !selectedItems.includes(index)
        );

        const updatedProgramPicture = await fetchAndSetImageUrls(
            updatedProgramList
        );
        setProgramList(updatedProgramPicture);

        setSelectedItems([]);
        setSelectMode(false);
    };

    // Edit Participants
    const [showParticipants, setShowParticipants] = useState(false);
    const participantsData = useRef([]);
    const edit_participants = async (e, seminar) => {
        e.preventDefault();
        participantsData.current = seminar;

        setShowParticipants(true);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-50 py-10 px-2 md:px-8">
           {/* Header */}
                        <div className="relative mt-20 mb-10 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
                            <span className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                                {/* Changed icon to a graduation cap */}
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M12 3L2 9l10 6 10-6-10-6zm0 13v5m-7-7v2a2 2 0 002 2h10a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Seminars & Programs
                            </span>
                            {/* Modern, compact button group */}
                                <div className="flex gap-2 flex-wrap w-full md:w-auto justify-center md:justify-end">
                                    {selectMode && (
                                        <button
                                            className={`flex items-center justify-center px-4 py-1.5 rounded-lg text-sm font-medium shadow bg-blue-100 hover:bg-blue-200 text-blue-700 transition-all`}
                                            onClick={() => {
                                                if (selectedItems.length === programList.length) {
                                                    setSelectedItems([]);
                                                } else {
                                                    setSelectedItems(programList.map((_, idx) => idx));
                                                }
                                            }}
                                        >
                                            {selectedItems.length === programList.length ? 'Unselect All' : 'Select All'}
                                        </button>
                                    )}
                                    <button
                                        className={`flex items-center justify-center px-4 py-1.5 rounded-lg text-sm font-medium shadow transition-all
                                            ${selectMode
                                                ? 'bg-red-700 hover:bg-red-800 text-white'
                                                : 'bg-red-300 hover:bg-red-400 text-red-700'
                                            }
                                            ${selectMode && selectedItems.length === 0 ? 'opacity-60 cursor-not-allowed' : ''}
                                        `}
                                        onClick={
                                            selectMode
                                                ? handleDeleteSelected
                                                : handleToggleSelectMode
                                        }
                                        disabled={selectMode && selectedItems.length === 0}
                                    >
                                        {selectMode
                                            ? selectedItems.length > 0
                                                ? `Delete (${selectedItems.length})`
                                                : 'Delete'
                                            : 'Delete'}
                                    </button>
                                    <button
                                        className="flex items-center justify-center px-4 py-1.5 rounded-lg text-sm font-medium shadow bg-green-500 hover:bg-green-600 text-white transition-all"
                                        onClick={() => setShowAdd(true)}
                                    >
                                        <span className="mr-1 text-lg font-bold">+</span> Add Program
                                    </button>
                                    {selectMode && (
                                        <button
                                            className="flex items-center justify-center px-4 py-1.5 rounded-lg text-sm font-medium shadow bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
                                            onClick={handleToggleSelectMode}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between items-center mb-10 max-w-7xl mx-auto gap-4">
                                <div className="flex-1 flex flex-col md:flex-row gap-4 w-full">
                                    <div className="relative w-full max-w-lg">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg
                                                className="w-5 h-5 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle cx="11" cy="11" r="8" />
                                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                            </svg>
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="Search programs..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-black bg-white shadow"
                                        />
                                    </div>
                                    <select
                                        onChange={(e) => setSearchFilter(e.target.value)}
                                        className="w-full md:w-44 border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 shadow"
                                    >
                                        <option value="all">All</option>
                                        <option value="title">Title</option>
                                        <option value="speaker">Speaker</option>
                                        <option value="location">Location</option>
                                    </select>
                                    <select
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="w-full md:w-44 border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 shadow"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            Status
                                        </option>
                                        <option value="all">All</option>
                                        <option value="Ongoing">Ongoing</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                        <option value="Upcoming">Upcoming</option>
                                    </select>
                                </div>
                            </div>

                            {/* Add Program Modal */}
            {showAdd && (
                <Add_Program 
                    programList = {programList} 
                    setProgramList = {setProgramList} 
                    fetchAndSetImageUrls = {fetchAndSetImageUrls}
                    setShowAdd = {setShowAdd}
                />
            )}

            {/* Edit Modal */}
            {showEdit && (
                <Edit_Seminar
                    data={editData.current}
                    setProgramList={setProgramList}
                    toggleOff={() => {
                        setShowEdit(false);
                        editData.current = null;
                    }}
                />
            )}

            {/* Participants Modal */}
            {showParticipants && (
                <Participants
                    data={participantsData.current}
                    toggleOff={() => {
                        setShowParticipants(false);
                        participantsData.current = null
                    }}
                />
            )}

            {/* Responsive Grid for Programs */}
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {programList.map((item, idx) => {
                    const isSelected = selectedItems.includes(idx);

                    // Truncate description to 100 chars
                    const truncatedDescription =
                        item.description && item.description.length > 100
                            ? item.description.slice(0, 100) + '...'
                            : item.description;

                    return (
                        <div
                            key={idx}
                            className={`relative flex flex-col bg-white border border-gray-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group ${
                                selectMode && 'cursor-pointer'
                            } ${
                                selectMode && isSelected
                                    ? 'ring-2 ring-red-400'
                                    : ''
                            }`}
                            onClick={
                                selectMode
                                    ? () => handleSelectItem(idx)
                                    : undefined
                            }
                        >
                            {selectMode && (
                                <div className="absolute top-4 left-4 z-10">
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => handleSelectItem(idx)}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-5 h-5 accent-red-500"
                                    />
                                </div>
                            )}
                            <div className="relative">
                                <img
                                    src={item.photo}
                                    alt={item.title}
                                    className="w-full h-48 sm:h-56 object-cover transition-all duration-300 group-hover:scale-105"
                                />
                                <span className={`absolute top-4 right-4 px-4 py-1 rounded-full text-xs font-bold shadow ${
                                    item.status === 'Ongoing'
                                        ? 'bg-green-100 text-green-700'
                                        : item.status === 'Completed'
                                        ? 'bg-gray-200 text-gray-600'
                                        : item.status === 'Cancelled'
                                        ? 'bg-red-100 text-red-600'
                                        : 'bg-blue-100 text-blue-700'
                                }`}>
                                    {item.status}
                                </span>
                            </div>
                            <div className="flex-1 flex flex-col p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-base mb-3 flex-1 cursor-default line-clamp-3">
                                    {truncatedDescription}
                                </p>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mb-2">
                                    <span>
                                        <span className="font-semibold text-gray-700">Speaker:</span> {item.speaker}
                                    </span>
                                    <span>
                                        <span className="font-semibold text-gray-700">Location:</span> {item.location}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2 mt-auto md:flex-row">
                                    <button
                                        onClick={(e) => {
                                            edit_seminar(e, item);
                                        }}
                                        className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white cursor-pointer px-4 py-2 rounded-xl hover:from-blue-600 hover:to-blue-700 text-base font-semibold transition-all shadow"
                                    >
                                        Edit Program
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            edit_participants(e, item);
                                        }}
                                        className="w-full md:w-auto bg-gradient-to-r from-green-500 to-green-600 text-white cursor-pointer px-4 py-2 rounded-xl hover:from-green-600 hover:to-green-700 text-base font-semibold transition-all shadow"
                                    >
                                        Participants
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {programList.length === 0 && (
                    <div className="col-span-full text-center text-gray-400 py-16 text-lg font-medium">
                        No programs found.
                    </div>
                )}
            </div>
            {/* Custom responsive styles for 1300px to 750px */}
            <style>
                {`
                @media (max-width: 1300px) and (min-width: 701px) {
                    .max-w-7xl {
                        max-width: 98vw !important;
                    }
                    .grid-cols-3 {
                        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                    }
                    .flex-wrap {
                        flex-direction: column !important;
                        gap: 8px !important;
                    }
                    .flex-wrap > button, .flex-wrap > .bg-gray-100 {
                        width: 100% !important;
                        min-width: 0 !important;
                        margin-bottom: 0 !important;
                    }
                }
                @media (max-width: 900px) {
                    .grid-cols-3 {
                        grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
                    }
                }
                `}
            </style>
        </div>
    );
}
