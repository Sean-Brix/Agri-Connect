import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'

import Navbar from '../../Components/Navbar';

// ASSETS
import default_seminar_pic from './Assets/default_seminar_pic.jpg';

export default function Seminar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filterBy, setFilterBy] = useState('Title');
    const [showFilter, setShowFilter] = useState(false);

    // Programs data
    const [allPrograms, setAllPrograms] = useState([]);
    const [filteredPrograms, setFilteredPrograms] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch('/api/seminars/getSeminars');
            const data = await response.json();

            const temp = data.payload.seminars;

            const final = await Promise.all(
                temp.map(async (item) => {
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

            setAllPrograms(final);
        })();
    }, []);

    useEffect(() => {
        const filtered = allPrograms.filter((program) => {
            const searchLower = search.toLowerCase();
            if (filterBy === 'title') {
                return program.title.toLowerCase().includes(searchLower);
            }
            if (filterBy === 'speaker') {
                return program.speaker.toLowerCase().includes(searchLower);
            }
            if (filterBy === 'location') {
                return program.location.toLowerCase().includes(searchLower);
            }
            return true;
        });
        setFilteredPrograms(filtered);
    }, [allPrograms, search, filterBy]);

    const apply_user = async(seminarId)=>{

        const check = await fetch('/api/authentication/gotToken');
        if(!check.ok){
            alert('Login First');
            navigate('/login');
            return
        }
        const access = await check.json();
        if(access.payload.access != "User"){
            alert("Admin cannot apply");
            return;
        }

        try {
            const response = await fetch('/api/seminars/participants/user_apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: seminarId }),
            });

            const data = await response.text();
            console.log(data);
        
            if (response.ok) {
                alert('Successfully applied!');
            } 
            else {
                alert('Already Applied.');
            }
        } 
        catch (error) {
            console.error('Error applying for seminar:', error);
            alert('Error applying for seminar.');
        }

    }

    const filterOptions = [
        { label: 'Title', value: 'Title' },
        { label: 'Speaker', value: 'Speaker' },
        { label: 'Location', value: 'Location' },
    ];

    const faIcons = {
        All: 'fa-solid fa-layer-group',
        Farming: 'fa-solid fa-wheat-awn',
        Planting: 'fa-solid fa-seedling',
        Fishing: 'fa-solid fa-water',
        Livestock: 'fa-solid fa-drumstick-bite',
    };

    // Pagination logic
    const ITEMS_PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1); // Reset to first page when filter/search changes
    }, [search, filterBy]);

    const totalPages = Math.ceil(filteredPrograms.length / ITEMS_PER_PAGE);
    const paginatedPrograms = filteredPrograms.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Helper to truncate description
    function truncate(str, n) {
        return str.length > n ? str.slice(0, n - 1) + '…' : str;
    }

    useEffect(() => {
        // Hide scrollbar for the whole page
        const style = document.createElement('style');
        style.innerHTML = `
      /* Hide scrollbar for Chrome, Safari and Opera */
      ::-webkit-scrollbar {
        display: none;
      }
      /* Hide scrollbar for IE, Edge and Firefox */
      html, body {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;     /* Firefox */
      }
    `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // Modal state and handlers
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [newData, setNewData] = useState({});
    const [image, setImage] = useState(default_seminar_pic);

    // Open modal and populate data
    const openModal = (program) => {
        setModalData(program);
        setNewData({
            status: program.status || "Ongoing",
            title: program.title || "",
            location: program.location || "",
            start_date: program.start_date || "",
            end_date: program.end_date || "",
            start_time: program.start_time || "",
            end_time: program.end_time || "",
            capacity: program.capacity || "",
            speaker: program.speaker || "",
            registration_deadline: program.registration_deadline || "",
            description: program.description || "",
        });
        setImage(program.photo || default_seminar_pic);
        setShowModal(true);
    };

    // Close modal
    const toggleOff = () => setShowModal(false);

    // Handle image change
    const changeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    // Dummy save handler
    const saveSeminar = (e) => {
        e.preventDefault();
        // You can add your save logic here
        setShowModal(false);
    };

    return (
        <>
            <Navbar />
            <div
                className="flex min-h-screen bg-white relative"
                style={{
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                }}
            >
                <main className="flex-1 w-full relative z-10 mt-30">
                    <section className="w-full px-2 sm:px-4 flex flex-col items-center pt-16 ">
                        <header className="flex flex-col items-center mb-10">
                            <span className="uppercase tracking-widest text-gray-400 text-xs font-medium mb-1 letter-spacing-wide">
                                Welcome to
                            </span>
                            <h1 className="text-4xl xs:text-2xl sm:text-4xl md:text-5xl font-extrabold text-center eic-title"
                                style={{ color: '#14532d' }}
                            >
                                Seminar Enrollment
                            </h1>
                            <div className="mt-3 w-16 sm:w-24 h-2 rounded-full bg-gray-200 opacity-80"></div>
                        </header>
                        {/* Search and Modern Filter */}
                        <div className="flex flex-row items-center w-full max-w-3xl mt-4 mb-8 gap-3 justify-center">
                            {/* Search Bar */}
                            <div className="flex flex-none min-w-1/2 max-w-xs gap-2 bg-white rounded-2xl shadow-lg px-4 py-1 items-center border border-gray-200 h-12">
                                <div className="relative w-full">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-transparent focus:outline-none focus:ring-0 text-gray-900 bg-transparent transition placeholder:text-gray-400"
                                        placeholder={`Search by ${filterBy.toLowerCase()}...`}
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        style={{ boxShadow: 'none' }}
                                        readOnly
                                    />
                                </div>
                            </div>
                            {/* Modern Filter Button with Dropdown */}
                            <div className="relative h-12 flex items-center">
                                <button
                                    id="modernFilterButton"
                                    className="flex items-center gap-2 px-4 sm:px-5 py-2 h-12 rounded-xl bg-white text-green-700 font-semibold border border-gray-200 shadow transition-all duration-200 hover:bg-blue-50 focus:outline-none text-base sm:text-lg w-full"
                                    type="button"
                                    aria-label="Show filter options"
                                    style={{ minHeight: '3rem' }}
                                    disabled
                                >
                                    <i className="fa-solid fa-filter text-green-700 text-base sm:text-lg"></i>
                                    <span className="  sm:inline">
                                        {filterBy}
                                    </span>
                                    <i
                                        className={`fa-solid fa-chevron-${
                                            showFilter ? 'up' : 'down'
                                        } ml-2 text-green-700`}
                                    ></i>
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-8 w-full max-w-3xl mt-6">
                            {paginatedPrograms.length === 0 ? (
                                <div className="text-blue-300 text-center py-12 text-base">
                                    No programs found.
                                </div>
                            ) : (
                                paginatedPrograms.map((program) => (
                                    <article
                                        key={program.id}
                                        className="relative flex flex-col md:flex-row gap-6 bg-green-800 rounded-xl shadow-2xl p-0 border border-green-800 overflow-hidden group transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1) hover:scale-105"
                                        style={{ transition: '0.3s' }}
                                    >
                                        {/* Image with border and outline */}
                                        <div className="flex-shrink-0 flex items-center justify-center w-full md:w-56 h-56">
                                            <div className="w-52 h-52 sm:w-44 sm:h-44 md:w-40 md:h-40 rounded-2xl bg-white shadow-lg flex items-center justify-center overflow-hidden border-4 border-green-500 outline outline-green-200 transition-all duration-300 ease-in-out">
                                                <img
                                                    src={
                                                        program.photo ||
                                                        default_seminar_pic
                                                    }
                                                    alt="Sample"
                                                    className="w-full h-full object-contain rounded-xl"
                                                />
                                            </div>
                                        </div>
                                        {/* Content */}
                                        <div className="flex flex-col justify-between flex-1 px-6 py-6">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-green-200 to-green-400 text-green-900 text-lg shadow">
                                                        <i
                                                            className={
                                                                faIcons.All
                                                            }
                                                        ></i>
                                                    </span>
                                                    <span
                                                        className="font-bold text-2xl text-white tracking-tight truncate"
                                                        title={program.title}
                                                    >
                                                        {program.title}
                                                    </span>
                                                </div>
                                                <div
                                                    className="text-white text-base mb-4 line-clamp-2 truncate"
                                                    title={program.description}
                                                >
                                                    {truncate(
                                                        program.description,
                                                        80
                                                    )}
                                                </div>
                                                <div className="flex flex-wrap gap-3 mt-2">
                                                    <span
                                                        className="inline-flex items-center gap-1 text-xs text-green-900 bg-green-200 px-3 py-1 rounded-lg font-semibold border border-green-300 shadow-sm truncate"
                                                        title={program.category}
                                                    >
                                                        <i
                                                            className={
                                                                faIcons[
                                                                    program
                                                                        .category
                                                                ] || faIcons.All
                                                            }
                                                        ></i>
                                                        {program.category}
                                                    </span>
                                                    <span
                                                        className="inline-flex items-center gap-1 text-xs text-green-900 bg-green-200 px-3 py-1 rounded-lg font-semibold border border-green-300 shadow-sm truncate"
                                                        title={program.location}
                                                    >
                                                        <i className="fa-solid fa-location-dot"></i>
                                                        {program.location}
                                                    </span>
                                                    <span
                                                        className="inline-flex items-center gap-1 text-xs text-green-900 bg-green-200 px-3 py-1 rounded-lg font-semibold border border-green-300 shadow-sm truncate"
                                                        title={program.speaker}
                                                    >
                                                        <i className="fa-solid fa-user"></i>
                                                        {program.speaker}
                                                    </span>
                                                </div>
                                            </div>
                                            {/* Buttons */}
                                            <div className="flex gap-3 w-full justify-end mt-6">
                                                <button
                                                    onClick={()=>apply_user(program.id)}
                                                    className="flex items-center gap-2 px-8 py-2 rounded-xl bg-white text-green-900 font-bold shadow-lg hover:bg-green-100 transition text-base focus:outline-none focus:ring-2 focus:ring-green-400">
                                                    <i className="fa-solid fa-paper-plane"></i>
                                                    Apply
                                                </button>
                                                <button
                                                    className="flex items-center gap-2 px-8 py-2 rounded-xl border-2 border-white text-white bg-green-900 font-bold shadow-lg hover:bg-green-800 transition text-base focus:outline-none focus:ring-2 focus:ring-green-400"
                                                    onClick={() => openModal(program)}
                                                    type="button"
                                                >
                                                    <i className="fa-solid fa-circle-info"></i>
                                                    Details
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))
                            )}
                        </div>
                        {totalPages > 1 && (
                            <nav
                                className="flex justify-center mt-10 space-x-2 mb-6"
                                aria-label="Pagination"
                            >
                                <button
                                    className="px-4 py-1.5 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 disabled:opacity-50 transition "
                                    onClick={() =>
                                        setCurrentPage((p) =>
                                            Math.max(1, p - 1)
                                        )
                                    }
                                    disabled={currentPage === 1}
                                    aria-label="Previous page"
                                >
                                    <i className="fa-solid fa-chevron-left"></i>
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        className={`px-4 py-1.5 rounded-xl font-semibold transition ${
                                            currentPage === i + 1
                                                ? 'bg-black text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                        onClick={() => setCurrentPage(i + 1)}
                                        aria-current={
                                            currentPage === i + 1
                                                ? 'page'
                                                : undefined
                                        }
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    className="px-4 py-1.5 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 disabled:opacity-50 transition"
                                    onClick={() =>
                                        setCurrentPage((p) =>
                                            Math.min(totalPages, p + 1)
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                    aria-label="Next page"
                                >
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>
                            </nav>
                        )}
                    </section>
                </main>
            </div>
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div
                        className="bg-white rounded-3xl shadow-2xl p-0 w-full max-w-2xl max-h-[95vh] relative border border-blue-200 flex flex-col"
                        style={{ minWidth: 320 }}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center border-b border-blue-100 px-8 py-5 bg-green-900 rounded-t-3xl">
                            <h2 className="text-xl font-bold text-white tracking-tight">
                                Seminar Details
                            </h2>
                            <button
                                type="button"
                                className="text-green-400 hover:text-green-600 text-3xl leading-none transition"
                                onClick={toggleOff}
                                aria-label="Close"
                            >
                                &times;
                            </button>
                        </div>
                        {/* Content */}
                        <div className="flex flex-col md:flex-row gap-10 px-8 py-8 overflow-y-auto">
                            {/* Left: Form Fields */}
                            <div className="flex-1 flex flex-col gap-5">
                                <div>
                                    <label className="block text-xs font-semibold text-green-800 mb-1">
                                        Status
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-blue-200 rounded-xl px-3 py-2 bg-white text-gray-700 shadow-sm"
                                        value={newData.status}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-green-800 mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-blue-100 rounded-xl px-3 py-2 bg-blue-50 text-gray-700"
                                        value={newData.title}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-green-800 mb-1">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-blue-100 rounded-xl px-3 py-2 bg-blue-50 text-gray-700"
                                        value={newData.location}
                                        readOnly
                                    />
                                </div>
                                <div className="flex gap-3 flex-col sm:flex-row">
                                    <div className="flex-1">
                                        <label className="block text-xs font-semibold text-green-800 mb-1">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full border border-blue-100 rounded-xl px-3 py-2 bg-blue-50 text-gray-700"
                                            value={newData.start_date}
                                            readOnly
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-xs font-semibold text-green-800 mb-1">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full border border-blue-100 rounded-xl px-3 py-2 bg-blue-50 text-gray-700"
                                            value={newData.end_date}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-3 flex-col sm:flex-row">
                                    <div className="flex-1">
                                        <label className="block text-xs font-semibold text-green-800 mb-1">
                                            Opening Time
                                        </label>
                                        <input
                                            type="time"
                                            className="w-full border border-blue-100 rounded-xl px-3 py-2 bg-blue-50 text-gray-700"
                                            value={newData.start_time}
                                            readOnly
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-xs font-semibold text-green-800 mb-1">
                                            Closing Time
                                        </label>
                                        <input
                                            type="time"
                                            className="w-full border border-blue-100 rounded-xl px-3 py-2 bg-blue-50 text-gray-700"
                                            value={newData.end_time}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-green-800 mb-1">
                                        Maximum Participants
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full border border-blue-100 rounded-xl px-3 py-2 bg-blue-50 text-gray-700"
                                        value={newData.capacity}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-green-800 mb-1">
                                        Speaker Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-blue-100 rounded-xl px-3 py-2 bg-blue-50 text-gray-700"
                                        value={newData.speaker}
                                        readOnly
                                        placeholder="Enter speaker name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-green-800 mb-1">
                                        Registration Deadline
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full border border-blue-100 rounded-xl px-3 py-2 bg-blue-50 text-gray-700"
                                        value={newData.registration_deadline}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-green-800 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        className="w-full border border-blue-100 rounded-xl px-3 py-2 bg-blue-50 text-gray-700 resize-none"
                                        value={newData.description}
                                        readOnly
                                        rows={3}
                                    />
                                </div>
                            </div>
                            {/* Right: Image Upload */}
                            <div className="flex flex-col items-center gap-4 w-full md:w-64">
                                <label className="block text-xs font-semibold text-green-800 mb-1 self-start">
                                    Seminar Image
                                </label>
                                <div className="w-full flex justify-center">
                                    <img
                                        src={image}
                                        alt="Seminar"
                                        className="w-full max-w-[200px] max-h-[200px] bg-blue-50 object-cover mt-2 rounded-xl border border-blue-200 shadow"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Footer */}
                        <div className="px-8 py-5 border-t border-blue-100 bg-green-900 rounded-b-3xl flex justify-end">
                            {/* No actions in preview mode */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
