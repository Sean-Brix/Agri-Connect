import React from 'react';
import Navbar from '../../Components/Navbar';
import backg from './Assets/backg.jpg';

const ITEMS_PER_PAGE = 8;

const initialItems = [
    { id: 1, type: 'Fertilizer', variety: 'Urea', quantity: '50 kg', date: '2024-06-10', status: 'Delivered' },
    { id: 2, type: 'Fertilizer', variety: 'DAP', quantity: '50 kg', date: '2024-06-10', status: 'Delivered' },
    { id: 3, type: 'Seed', variety: 'Maize', quantity: '20 kg', date: '2024-06-10', status: 'Delivered' },
    { id: 4, type: 'Seed', variety: 'Wheat', quantity: '30 kg', date: '2024-06-10', status: 'Delivered' },
    { id: 5, type: 'Fertilizer', variety: 'Urea', quantity: '60 kg', date: '2024-06-10', status: 'Delivered' },
    { id: 6, type: 'Seed', variety: 'Maize', quantity: '25 kg', date: '2024-06-10', status: 'Delivered' },
    { id: 7, type: 'Fertilizer', variety: 'NPK', quantity: '40 kg', date: '2024-06-11', status: 'Delivered' },
    { id: 8, type: 'Seed', variety: 'Rice', quantity: '15 kg', date: '2024-06-11', status: 'Delivered' },
    { id: 9, type: 'Fertilizer', variety: 'Ammonium Sulfate', quantity: '55 kg', date: '2024-06-12', status: 'Delivered' },
    { id: 10, type: 'Seed', variety: 'Barley', quantity: '18 kg', date: '2024-06-12', status: 'Delivered' },
    { id: 11, type: 'Fertilizer', variety: 'Potash', quantity: '45 kg', date: '2024-06-13', status: 'Delivered' },
    { id: 12, type: 'Seed', variety: 'Sorghum', quantity: '22 kg', date: '2024-06-13', status: 'Delivered' },
    { id: 13, type: 'Fertilizer', variety: 'Lime', quantity: '35 kg', date: '2024-06-14', status: 'Delivered' },
    { id: 14, type: 'Seed', variety: 'Soybean', quantity: '28 kg', date: '2024-06-14', status: 'Delivered' },
    { id: 15, type: 'Fertilizer', variety: 'Gypsum', quantity: '30 kg', date: '2024-06-15', status: 'Delivered' },
    { id: 16, type: 'Seed', variety: 'Millet', quantity: '12 kg', date: '2024-06-15', status: 'Delivered' }
];

export default function Distribution() {
    const [filter, setFilter] = React.useState('All');
    const [search, setSearch] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);

    const varieties = ['All', ...Array.from(new Set(initialItems.map(i => i.variety)))];

    // Filtering logic
    const filteredItems = initialItems.filter(i =>
        (filter === 'All' || i.variety === filter) &&
        (
            i.variety.toLowerCase().includes(search.toLowerCase()) ||
            i.type.toLowerCase().includes(search.toLowerCase()) ||
            i.status.toLowerCase().includes(search.toLowerCase())
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

    return (
        <>
            <Navbar />
            <div
                className="flex min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-green-800 relative"
                style={{
                    backgroundImage: `linear-gradient(rgba(20,30,40,0.85),rgba(20,30,40,0.85)), url(${backg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    overflow: 'hidden', // Hide scrollbars for the main container
                }}
            >
                <main className="flex-1 w-full relative z-10 mt-30">
                    <section className="w-full px-2 sm:px-4 flex flex-col items-center pt-16 ">
                        <header className="flex flex-col items-center mb-10">
                            <span className="uppercase tracking-widest text-blue-300 text-xs font-medium mb-1 letter-spacing-wide">
                                Welcome to
                            </span>
                            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-green-200 drop-shadow-lg text-center">
                                Distribution Overview
                            </h1>
                            <div className="mt-3 w-16 sm:w-24 h-2 rounded-full bg-gradient-to-r from-blue-400 via-green-400 to-blue-400 opacity-80 animate-pulse"></div>
                        </header>
                        {/* Search and Filter */}
                        <div className="flex flex-row items-center w-full max-w-3xl mt-4 mb-8 gap-3">
                            {/* Search Bar */}
                            <div className="flex flex-none min-w-1/2 max-w-xs gap-2 bg-white/90 rounded-2xl shadow-lg px-4 py-1 items-center border border-blue-100 h-12">
                                <div className="relative w-full">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-transparent transition placeholder:text-gray-400"
                                        placeholder="Search by variety, type, status..."
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* Filter Dropdown */}
                            <div className="relative h-12 flex items-center">
                                <select
                                    className="flex items-center gap-2 px-4 sm:px-5 py-2 h-12 rounded-xl bg-white text-blue-700 font-semibold border border-blue-200 shadow transition-all duration-200 focus:outline-none text-base sm:text-lg"
                                    value={filter}
                                    onChange={e => setFilter(e.target.value)}
                                    aria-label="Filter by variety"
                                >
                                    {varieties.map(v => (
                                        <option key={v} value={v}>{v}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* Cards */}
                        <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 w-full  max-w-6xl">
                            {paginatedItems.map((item, idx) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-3xl shadow border border-gray-200 flex flex-col hover:scale-[1.025] hover:shadow-lg transition-transform duration-300"
                                >
                                    <div className="p-4 sm:p-7 flex-1 flex flex-col">
                                        <div className="flex items-center mb-4 sm:mb-5">
                                            <div className="relative">
                                                <img
                                                    src={`https://source.unsplash.com/160x160/?${item.type},${item.variety},agriculture,${idx}`}
                                                    alt={`Item ${item.id}`}
                                                    className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-2xl shadow border-4 border-white outline outline-2 outline-blue-400"
                                                />
                                                <span className="absolute -bottom-2 -right-2 bg-gray-200 text-gray-700 text-[10px] sm:text-xs px-2 py-1 rounded-full shadow font-bold">
                                                    {item.type}
                                                </span>
                                            </div>
                                            <div className="ml-4 sm:ml-6">
                                                <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1">
                                                    {item.variety}
                                                </h2>
                                                <span className="text-[10px] sm:text-xs text-gray-400 font-mono tracking-wider">#ID-00{item.id}</span>
                                            </div>
                                        </div>
                                        <dl className="mb-5 sm:mb-7 grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-xs sm:text-base text-gray-700">
                                            <div>
                                                <dt className="font-semibold text-gray-500">Quantity</dt>
                                                <dd className="text-gray-900">{item.quantity}</dd>
                                            </div>
                                            <div>
                                                <dt className="font-semibold text-gray-500">Date</dt>
                                                <dd className="text-gray-900">{item.date}</dd>
                                            </div>
                                            <div>
                                                <dt className="font-semibold text-gray-500">Status</dt>
                                                <dd>
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-[10px] sm:text-xs font-semibold shadow">
                                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <circle cx="10" cy="10" r="10" />
                                                        </svg>
                                                        {item.status}
                                                    </span>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                    <div className="px-4 sm:px-7 pb-4 sm:pb-7 flex gap-2">
                                        <button className="flex-1 bg-blue-700 text-white text-xs sm:text-base px-3 sm:px-5 py-2 sm:py-3 rounded-xl font-bold shadow hover:bg-blue-800 transition-all duration-200 hover:scale-105">
                                            Acquire
                                        </button>
                                        <button className="flex-1 bg-gray-200 text-blue-700 text-xs sm:text-base px-3 sm:px-5 py-2 sm:py-3 rounded-xl font-bold shadow hover:bg-blue-100 transition-all duration-200 hover:scale-105">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {filteredItems.length === 0 && (
                            <div className="text-center text-blue-300 py-10 sm:py-16 text-base sm:text-lg font-medium">
                                No items found for this variety.
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
                                                ? 'bg-blue-700 text-white'
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
                @media (max-width: 640px) {
                    .text-4xl, .md\\:text-5xl { font-size: 1.7rem !important; }
                    .text-2xl, .sm\\:text-2xl { font-size: 1.2rem !important; }
                }
                .animate-fade-in {
                    animation: fadeIn 0.2s;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                /* Hide scrollbar for all browsers */
                html, body, #root {
                    scrollbar-width: none; /* Firefox */
                    -ms-overflow-style: none;  /* IE and Edge */
                }
                html::-webkit-scrollbar, body::-webkit-scrollbar, #root::-webkit-scrollbar {
                    display: none; /* Chrome, Safari, Opera */
                }
            `}</style>
            {/* FontAwesome CDN for icons */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
        </>
    );
}
