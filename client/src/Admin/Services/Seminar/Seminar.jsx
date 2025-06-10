// UTILS
import { useEffect, useState, useRef } from 'react';

// ASSETS
import default_seminar_pic from '../../../Assets/default_seminar_pic.jpg';

// SUB-COMPONENT
import Edit_Seminar from './Edit_Seminar';
import Participants from './Participants';

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
    const [newProgram, setNewProgram] = useState({
        title: '',
        description: '',
        location: '',
        startDate: '',
        endDate: '',
        openTime: '',
        closeTime: '',
        maxParticipants: '',
        speaker: '',
        registrationDeadline: '',
        photo: '',
    });
    const [newImage, setNewImage] = useState(default_seminar_pic);

    const handleAddProgram = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/seminars/addSeminar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: newProgram.title,
                    description: newProgram.description,
                    location: newProgram.location,
                    start_date: newProgram.startDate,
                    end_date: newProgram.endDate,
                    start_time: newProgram.openTime,
                    end_time: newProgram.closeTime,
                    capacity: newProgram.capacity,
                    speaker: newProgram.speaker,
                    registration_deadline: newProgram.registrationDeadline,
                }),
            });
            const data = await response.json();

            // Create Body
            const formData = new FormData();
            // If newImage is a base64 string, convert it to a Blob
            let imageFile;
            if (
                typeof newImage === 'string' &&
                newImage.startsWith('data:image')
            ){
                const response = await fetch(newImage);
                const blob = await response.blob();
                imageFile = new File([blob], 'image.png', { type: blob.type }); // You can adjust the filename and type
            } 
            else {
                imageFile = newImage; // Use the File object directly if it's already a File
            }
            formData.append('image', imageFile);
            formData.append('id', data.payload.id);
            const setImage = await fetch('/api/seminars/setPhoto', {
                method: 'POST',
                body: formData,
            });

            // If Fails
            if (!setImage.ok) {
                const data = await setImage.json();
                console.log(data.payload.error);
                alert('Failed to upload image');
                return;
            }

            if (response.ok) {
                // Program added successfully, update the program list
                const updatedList = await fetchAndSetImageUrls([
                    data.payload,
                    ...programList,
                ]);
                setProgramList(updatedList);
                setShowAdd(false); // Close the modal
                setNewProgram({
                    title: '',
                    description: '',
                    location: '',
                    start_date: '',
                    end_date: '',
                    start_time: '',
                    end_time: '',
                    capacity: '',
                    speaker: '',
                    registrationDeadline: '',
                    photo: '',
                });

                return;
            }

            // Handle error response
            console.error('Failed to add program:', data.payload.Error);
        } catch (error) {
            console.error('Error adding program:', error);
        }
    };

    // upload image
    const changeImage = (event) => {
        event.preventDefault();

        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewImage(reader.result);
            };
            reader.readAsDataURL(file);

            setNewImage(file);
        } else {
            // Revert to default if no file selected
            setNewImage(default_picture);
        }
    };

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
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 20V10M12 10L8 14M12 10l4 4" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="10" />
                    </svg>
                    Seminars & Programs
                </span>
                <div className="flex gap-2 flex-wrap">
                    <button
                        className={`bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-xl text-base font-semibold shadow-md transition-all ${
                            selectMode
                                ? 'hover:from-red-600 hover:to-red-700'
                                : 'hover:opacity-90'
                        } ${selectMode ? '' : 'opacity-80'}`}
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
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-xl hover:from-green-600 hover:to-green-700 text-base font-semibold shadow-md transition-all"
                        onClick={() => setShowAdd(true)}
                    >
                        <span className="mr-1 text-xl font-bold">+</span> Add Program
                    </button>
                    {selectMode && (
                        <button
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold ml-2 hover:bg-gray-200 border border-gray-200 shadow"
                            onClick={handleToggleSelectMode}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            {/* Search Bar and Filters */}
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
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <form
                        className="bg-white rounded-2xl shadow-2xl p-0 w-full max-w-md relative border border-gray-100 animate-fade-in"
                        onSubmit={() => setShowAdd(true)}
                        style={{ minWidth: 320 }}
                    >
                        <div className="flex justify-between items-center border-b border-gray-100 px-7 py-5">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Add Program
                            </h2>
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-700 text-2xl leading-none"
                                onClick={() => setShowAdd(false)}
                                aria-label="Close"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="px-7 py-7 flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                    value={newProgram.title}
                                    onChange={(e) =>
                                        setNewProgram({
                                            ...newProgram,
                                            title: e.target.value,
                                        })
                                    }
                                    required
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                    value={newProgram.location}
                                    onChange={(e) =>
                                        setNewProgram({
                                            ...newProgram,
                                            location: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                        value={newProgram.startDate}
                                        onChange={(e) =>
                                            setNewProgram({
                                                ...newProgram,
                                                startDate: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                        value={newProgram.endDate || ''}
                                        onChange={(e) =>
                                            setNewProgram({
                                                ...newProgram,
                                                endDate: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">
                                        Opening Time
                                    </label>
                                    <input
                                        type="time"
                                        className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                        value={newProgram.openTime || ''}
                                        onChange={(e) =>
                                            setNewProgram({
                                                ...newProgram,
                                                openTime: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">
                                        Closing Time
                                    </label>
                                    <input
                                        type="time"
                                        className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                        value={newProgram.closeTime || ''}
                                        onChange={(e) =>
                                            setNewProgram({
                                                ...newProgram,
                                                closeTime: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">
                                    Maximum Participants
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                    value={newProgram.capacity}
                                    onChange={(e) =>
                                        setNewProgram({
                                            ...newProgram,
                                            capacity: e.target.value,
                                        })
                                    }
                                    required
                                    placeholder="Enter maximum number of participants"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">
                                    Speaker Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                    value={newProgram.speaker || ''}
                                    onChange={(e) =>
                                        setNewProgram({
                                            ...newProgram,
                                            speaker: e.target.value,
                                        })
                                    }
                                    required
                                    placeholder="Enter speaker name"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">
                                    Registration Deadline
                                </label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                    value={
                                        newProgram.registrationDeadline || ''
                                    }
                                    onChange={(e) =>
                                        setNewProgram({
                                            ...newProgram,
                                            registrationDeadline:
                                                e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">
                                    Description
                                </label>
                                <textarea
                                    className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition resize-none"
                                    value={newProgram.description}
                                    onChange={(e) =>
                                        setNewProgram({
                                            ...newProgram,
                                            description: e.target.value,
                                        })
                                    }
                                    required
                                    rows={3}
                                />
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <label className="block text-xs font-medium text-gray-500 mb-1">
                                    Upload Image{' '}
                                    <span className="text-gray-300">
                                        (optional)
                                    </span>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full border border-gray-200 mt-2 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                                    onChange={changeImage}
                                />
                                <img
                                    src={newImage}
                                    alt="Seminar"
                                    className="w-full max-w-[300px] max-h-[200px] bg-amber-50 object-cover mt-2 rounded-lg border-2"
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl py-2 transition-all shadow focus:ring-2 focus:ring-green-200 focus:outline-none w-full"
                                onClick={handleAddProgram}
                            >
                                Add Program
                            </button>
                        </div>
                    </form>
                </div>
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
        </div>
    );
}
