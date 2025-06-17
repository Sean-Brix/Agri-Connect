import React from 'react';
import Navbar from '../../Components/Navbar';
import backg from './Assets/backg.jpg';

const ITEMS_PER_PAGE = 8;

// Sample items per farming-related category
const initialItems = [
    // Fertilizer
    { id: 1, type: 'Fertilizer', variety: 'Urea', description: 'High-nitrogen fertilizer for rapid plant growth', date: '2024-06-10', status: 'Delivered' },
    { id: 2, type: 'Fertilizer', variety: 'DAP', description: 'Di-ammonium phosphate for root development', date: '2024-06-10', status: 'Delivered' },
    { id: 3, type: 'Fertilizer', variety: 'NPK', description: 'Balanced NPK fertilizer for all crops', date: '2024-06-11', status: 'Delivered' },
    // Seed
    { id: 4, type: 'Seed', variety: 'Maize', description: 'Hybrid maize seeds for high yield', date: '2024-06-10', status: 'Delivered' },
    { id: 5, type: 'Seed', variety: 'Wheat', description: 'Premium wheat seeds for bread making', date: '2024-06-10', status: 'Delivered' },
    { id: 6, type: 'Seed', variety: 'Rice', description: 'High-yield rice seeds', date: '2024-06-11', status: 'Delivered' },
    // Equipment
    { id: 7, type: 'Equipment', variety: 'Tractor', description: '4WD tractor for plowing and tilling', date: '2024-06-12', status: 'Delivered' },
    { id: 8, type: 'Equipment', variety: 'Plough', description: 'Disc plough for soil preparation', date: '2024-06-12', status: 'Delivered' },
    // Pesticide
    { id: 9, type: 'Pesticide', variety: 'Herbicide', description: 'Weed control for maize fields', date: '2024-06-13', status: 'Delivered' },
    { id: 10, type: 'Pesticide', variety: 'Insecticide', description: 'Protects crops from insect pests', date: '2024-06-13', status: 'Delivered' },
    // Irrigation
    { id: 11, type: 'Irrigation', variety: 'Drip Kit', description: 'Drip irrigation kit for water efficiency', date: '2024-06-14', status: 'Delivered' },
    { id: 12, type: 'Irrigation', variety: 'Sprinkler', description: 'Sprinkler system for even watering', date: '2024-06-14', status: 'Delivered' },
    // Animal Feed
    { id: 13, type: 'Animal Feed', variety: 'Cattle Feed', description: 'Nutrient-rich feed for dairy cattle', date: '2024-06-15', status: 'Delivered' },
    { id: 14, type: 'Animal Feed', variety: 'Poultry Feed', description: 'Balanced feed for poultry growth', date: '2024-06-15', status: 'Delivered' },
];

export default function Distribution() {
    const [filter, setFilter] = React.useState('All');
    const [search, setSearch] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);

    // Categories for filter
    const categories = ['All', ...Array.from(new Set(initialItems.map(i => i.type)))];

    // Filtering logic (by category/type)
    const filteredItems = initialItems.filter(i =>
        (filter === 'All' || i.type === filter) &&
        (
            i.variety.toLowerCase().includes(search.toLowerCase()) ||
            i.type.toLowerCase().includes(search.toLowerCase()) ||
            i.status.toLowerCase().includes(search.toLowerCase()) ||
            i.description.toLowerCase().includes(search.toLowerCase())
        )
    );

    React.useEffect(() => {
        setCurrentPage(1);
    }, [filter, search]);

    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // State for modern filter button
    const [showFilter, setShowFilter] = React.useState(false);

    // For this context, filterBy is the selected category
    const filterBy = filter;
    const filterOptions = categories.map(v => ({
        value: v,
        label: v,
    }));

    // Close dropdown on outside click
    React.useEffect(() => {
        if (!showFilter) return;
        const handler = e => {
            const dropdown = document.getElementById('modernFilterDropdown');
            const button = document.getElementById('modernFilterButton');
            if (
                dropdown &&
                !dropdown.contains(e.target) &&
                button &&
                !button.contains(e.target)
            ) {
                setShowFilter(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [showFilter]);

    // Helper for filter icons
    function typeIcon(type) {
        switch (type) {
            case 'Fertilizer':
                return <i className="fa-solid fa-flask text-green-700"></i>;
            case 'Seed':
                return <i className="fa-solid fa-seedling text-green-500"></i>;
            case 'Equipment':
                return <i className="fa-solid fa-tractor text-gray-700"></i>;
            case 'Pesticide':
                return <i className="fa-solid fa-bug text-red-500"></i>;
            case 'Irrigation':
                return <i className="fa-solid fa-water text-blue-400"></i>;
            case 'Animal Feed':
                return <i className="fa-solid fa-cow text-yellow-600"></i>;
            case 'All':
                return <i className="fa-solid fa-leaf text-green-400"></i>;
            default:
                return <i className="fa-solid fa-leaf text-gray-400"></i>;
        }
    }

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
                            <h1 className="text-4xl xs:text-2xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-green-900 text-center">
                                Distribution Overview
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
                                        placeholder="Search by variety, type, status, description..."
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        style={{ boxShadow: 'none' }}
                                    />
                                </div>
                            </div>
                            {/* Modern Filter Button with Dropdown */}
                            <div className="relative h-12 flex items-center">
                                <button
                                    id="modernFilterButton"
                                    className="flex items-center gap-2 px-4 sm:px-5 py-2 h-12 rounded-xl bg-white text-green-900 font-semibold border border-gray-200 shadow transition-all duration-200 hover:bg-gray-50 focus:outline-none text-base sm:text-lg"
                                    onClick={() => setShowFilter(f => !f)}
                                    type="button"
                                    aria-label="Show filter options"
                                    style={{ minHeight: '3rem' }}
                                >
                                    <i className="fa-solid fa-filter text-green-900 text-base sm:text-lg"></i>
                                    <span className="hidden sm:inline">{filterBy}</span>
                                    <i className={`fa-solid fa-chevron-${showFilter ? 'up' : 'down'} ml-2 text-green-900`}></i>
                                </button>
                                {showFilter && (
                                    <div
                                        id="modernFilterDropdown"
                                        className="absolute left-0 top-full mt-2 w-44 sm:w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 z-20 animate-fade-in py-2 px-2"
                                        style={{ minWidth: '100%' }}
                                    >
                                        {filterOptions.map(opt => (
                                            <button
                                                key={opt.value}
                                                className={`flex items-center gap-3 w-full text-left px-3 sm:px-4 py-2 rounded-xl font-semibold transition text-sm sm:text-base ${
                                                    filterBy === opt.value
                                                        ? 'bg-gray-800 text-white'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                                onClick={() => {
                                                    setFilter(opt.value);
                                                    setShowFilter(false);
                                                }}
                                            >
                                                {typeIcon(opt.value)}
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {/* Mobile: Icon button triggers native select */}
                                <div className="sm:hidden absolute left-0 top-0 w-full h-full pointer-events-none">
                                    <select
                                        className="opacity-0 absolute w-full h-full pointer-events-auto"
                                        value={filter}
                                        onChange={e => setFilter(e.target.value)}
                                        aria-label="Filter by category"
                                    >
                                        {categories.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* Cards */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
                            {paginatedItems.map((item, idx) => (
                                <div
                                    key={item.id}
                                    className="max-w-full max-h-[370px] rounded-xl overflow-hidden shadow-2xl hover:shadow-[0_8px_32px_0_rgba(60,60,60,0.25)] bg-green-900 m-4 border-2 border-green-800 transition duration-200 hover:border-green-700 hover:scale-[1.025] backdrop-blur-lg"
                                    style={{
                                        boxShadow: '0 8px 32px 0 rgba(60,60,60,0.18), 0 1.5px 8px 0 rgba(80,80,80,0.10)',
                                        background: '#14532d',
                                    }}
                                >
                                    <div className="relative">
                                        {/* IMAGE */}
                                        <img
                                            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                            src={`https://source.unsplash.com/400x200/?${item.type},${item.variety},agriculture,${idx}`}
                                            alt={item.variety}
                                        />
                                        {/* CATEGORY */}
                                        <span
                                            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm
                                            ${
                                                item.type === 'Fertilizer'
                                                    ? 'bg-green-700'
                                                    : item.type === 'Seed'
                                                    ? 'bg-green-500'
                                                    : item.type === 'Equipment'
                                                    ? 'bg-gray-900'
                                                    : item.type === 'Pesticide'
                                                    ? 'bg-red-700'
                                                    : item.type === 'Irrigation'
                                                    ? 'bg-blue-700'
                                                    : item.type === 'Animal Feed'
                                                    ? 'bg-yellow-700'
                                                    : 'bg-gray-400'
                                            } text-white`}
                                            style={{
                                                boxShadow: '0 2px 8px 0 rgba(60,60,60,0.12)',
                                            }}
                                        >
                                            {item.type}
                                        </span>
                                    </div>
                                    {/* DETAILS */}
                                    <div className="p-5 flex flex-col h-[170px]">
                                        {/* ITEM NAME */}
                                        <h3 className="text-xl font-bold mb-1 truncate text-white flex items-center gap-2">
                                            {item.variety}
                                            {typeIcon(item.type)}
                                        </h3>
                                        {/* DESCRIPTION */}
                                        <p className="text-gray-200 text-sm mb-4 truncate" title={item.description}>
                                            {item.description}
                                        </p>
                                        {/* FOOTER */}
                                        <div className="flex items-center justify-between mt-auto">
                                            {/* STATUS */}
                                            <span className="text-xs text-gray-200 flex items-center gap-1">
                                                <span
                                                    className={`inline-block w-2 h-2 rounded-full mr-1 ${
                                                        item.status === 'Delivered'
                                                            ? 'bg-green-400'
                                                            : 'bg-gray-400'
                                                    }`}
                                                ></span>
                                                {item.status}
                                            </span>
                                            {/* CONTROLS */}
                                            <div className="flex gap-2">
                                                <button
                                                    className="bg-white hover:bg-green-700 text-green-900 hover:text-white font-bold py-2 px-5 rounded-2xl text-base border-2 border-green-700 transition-colors shadow-lg"
                                                >
                                                    Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {filteredItems.length === 0 && (
                            <div className="text-center text-gray-400 py-10 sm:py-16 text-base sm:text-lg font-medium">
                                No items found for this category.
                            </div>
                        )}
                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex flex-wrap justify-center mt-10 gap-2 items-center mb-6">
                                <button
                                    className="px-3 py-1.5 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 disabled:opacity-50 transition"
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    aria-label="Previous page"
                                >
                                    <i className="fa-solid fa-chevron-left"></i>
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        className={`px-4 py-2 rounded-lg font-semibold ${
                                            currentPage === i + 1
                                                ? 'bg-gray-900 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    className="px-3 py-1.5 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 disabled:opacity-50 transition"
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    aria-label="Next page"
                                >
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                        )}
                    </section>
                </main>
            </div>
            <style>{`
                .letter-spacing-wide {
                    letter-spacing: 0.15em;
                }
                .eic-title {
                    color: #14532d !important;
                }
                @media (max-width: 640px) {
                    .text-4xl, .md\\:text-5xl { font-size: 1.7rem !important; }
                    .text-2xl, .sm\\:text-2xl { font-size: 1.2rem !important; }
                    .text-3xl, .sm\\:text-3xl { font-size: 1.5rem !important; }
                }
                .animate-fade-in {
                    animation: fadeIn 0.2s;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                html, body, #root {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                html::-webkit-scrollbar, body::-webkit-scrollbar, #root::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
            {/* FontAwesome CDN for icons */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
        </>
    );
}
