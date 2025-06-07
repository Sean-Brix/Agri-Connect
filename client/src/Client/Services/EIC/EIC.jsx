import React from 'react';
import Navbar from '../../Components/Navbar';

import Pandilig from './Assets/pandilig.webp';
import Shovel from './Assets/shovel.webp';
import backg  from './Assets/backg.jpg';
const equipmentList = [
    {
        name: 'Tractor',
        desc: 'A powerful vehicle used for pulling farm machinery and plowing fields.',
        img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Seeder',
        desc: 'A machine that plants seeds in the ground.',
        img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Sprayer',
        desc: 'Used for spraying pesticides and fertilizers on crops.',
        img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Harvester',
        desc: 'A machine for harvesting crops efficiently.',
        img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Plow',
        desc: 'Used for initial cultivation of soil in preparation for sowing seed or planting.',
        img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Cultivator',
        desc: 'A tool or machine for loosening the soil and destroying weeds around growing plants.',
        img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Rotavator',
        desc: 'A machine with rotating blades for breaking up or tilling soil.',
        img: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Baler',
        desc: 'A piece of farm machinery used to compress a cut and raked crop into compact bales.',
        img: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Pandilig',
        desc: 'A traditional Filipino hand tool for harvesting rice.',
        img: Pandilig,
      },
      {
        name: 'Shovel',
        desc: 'A hand tool for digging, lifting, and moving bulk materials.',
        img: Shovel,
      },
      {
        name: 'Irrigation Pump',
        desc: 'Used to move water from a source to fields for crop irrigation.',
        img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Wheelbarrow',
        desc: 'A small hand-propelled vehicle, usually with just one wheel, used to carry small loads.',
        img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      },
      // Seeds
      {
        name: 'Rice Seeds',
        desc: 'High-quality rice seeds suitable for wet and dry season planting.',
        img: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Corn Seeds',
        desc: 'Hybrid corn seeds for high yield and disease resistance.',
        img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Tomato Seeds',
        desc: 'Premium tomato seeds for greenhouse and open field cultivation.',
        img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Eggplant Seeds',
        desc: 'Eggplant seeds with good germination and fruit quality.',
        img: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Carrot Seeds',
        desc: 'Carrot seeds for crisp, sweet roots and high productivity.',
        img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Cabbage Seeds',
        desc: 'Cabbage seeds for compact heads and disease resistance.',
        img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'String Bean Seeds',
        desc: 'String bean seeds for vigorous growth and high yield.',
        img: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Peanut Seeds',
        desc: 'Peanut seeds for sandy soils and warm climates.',
        img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      },
];

// Helper function to truncate description
const truncate = (str, n) => (str.length > n ? str.slice(0, n) + '...' : str);

export default function Eic() {
    const [search, setSearch] = React.useState('');
    const [category, setCategory] = React.useState('all');
    const [showFilter, setShowFilter] = React.useState(false);

    // Categorize items
    const categorize = (item) => {
        const seeds = [
            'Rice Seeds', 'Corn Seeds', 'Tomato Seeds', 'Eggplant Seeds',
            'Carrot Seeds', 'Cabbage Seeds', 'String Bean Seeds', 'Peanut Seeds'
        ];
        const equipment = [
            'Tractor', 'Seeder', 'Sprayer', 'Harvester', 'Plow', 'Cultivator',
            'Rotavator', 'Baler', 'Irrigation Pump'
        ];
        const tools = [
            'Pandilig', 'Shovel', 'Wheelbarrow'
        ];
        if (seeds.includes(item.name)) return 'seeds';
        if (equipment.includes(item.name)) return 'equipment';
        if (tools.includes(item.name)) return 'tools';
        return 'others';
    };

    const allEquipment = equipmentList;

    const filteredEquipment = allEquipment.filter(
        (item) => {
            const matchesSearch =
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.desc.toLowerCase().includes(search.toLowerCase());
            const matchesCategory =
                category === 'all' || categorize(item) === category;
            return matchesSearch && matchesCategory;
        }
    );

    // Font Awesome icon mapping
    const faIcons = {
        equipment: "fa-solid fa-tractor",
        tools: "fa-solid fa-tools",
        seeds: "fa-solid fa-seedling",
        others: "fa-solid fa-ellipsis-h",
        all: "fa-solid fa-th-large"
    };

    // Pagination logic
    const ITEMS_PER_PAGE = 12;
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pageTransition, setPageTransition] = React.useState(false);

    // Reset to first page when filter/search changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [search, category]);

    const totalPages = Math.ceil(filteredEquipment.length / ITEMS_PER_PAGE);

    // Smooth transition effect when switching pages
    React.useEffect(() => {
        setPageTransition(true);
        const timeout = setTimeout(() => setPageTransition(false), 250);
        return () => clearTimeout(timeout);
    }, [currentPage]);

    const paginatedEquipment = filteredEquipment.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    return (
        <>
            <Navbar />
            <div
                className="flex"
                style={{
                    backgroundImage: `url(${backg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    position: 'relative',
                }}
            >
                {/* Softer, less dark overlay */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        background: 'rgba(30,35,50,0.65)',
                        mixBlendMode: 'multiply',
                    }}
                ></div>
                <div
                    className="flex-1 w-full bg-gradient-to-br from-gray-900/80 to-gray-800/80 relative z-10"
                    style={{
                        height: '100vh',
                        overflowY: 'auto',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    <div className="relative flex flex-col items-center mt-40 mb-10">
                        <span className="uppercase tracking-widest text-blue-300 text-sm font-semibold mb-2 letter-spacing-wide">
                            Welcome to
                        </span>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-green-200 drop-shadow-lg text-center ">
                            Equipment & Inventory <br /> Center
                        </h1>
                        <div className="mt-3 w-24 h-2 rounded-full bg-gradient-to-r from-blue-400 via-green-400 to-blue-400 opacity-80 animate-pulse"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6">
                            <div className="flex w-full max-w-xl gap-3">
                                {/* Modern Search Bar */}
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search equipment..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-14 pr-4 py-4 rounded-2xl border border-gray-200 bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 transition placeholder-gray-400 shadow-lg focus:shadow-xl text-base"
                                        style={{
                                            boxShadow: '0 2px 16px 0 rgba(34,197,94,0.08)',
                                            transition: 'box-shadow 0.2s',
                                        }}
                                    />
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                                        <svg
                                            className="w-6 h-6 text-blue-400"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle cx="11" cy="11" r="8" />
                                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                        </svg>
                                    </span>
                                    {search && (
                                        <button
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition"
                                            onClick={() => setSearch('')}
                                            aria-label="Clear search"
                                            tabIndex={0}
                                            type="button"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <line x1="18" y1="6" x2="6" y2="18" />
                                                <line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <div className="relative flex-shrink-0">
                                    <button
                                        className="flex items-center gap-2 pl-4 pr-6 py-1 rounded-full border border-gray-200 bg-white/80 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-900 text-blue-700 shadow transition-all duration-200 h-14 font-semibold text-base"
                                        onClick={() => setShowFilter((prev) => !prev)}
                                        title="Filter"
                                        type="button"
                                        style={{
                                            background: '#f8fafc',
                                            color: '#2563eb',
                                            boxShadow: '0 4px 14px 0 rgba(34,197,94,0.08)'
                                        }}
                                    >
                                        <i className="fa-solid fa-filter text-blue-400 text-lg"></i>
                                        <span className="hidden sm:inline">Filter</span>
                                        <svg
                                            className={`ml-2 w-4 h-4 transition-transform duration-200 ${showFilter ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {showFilter && (
                                        <div className="absolute top-16 right-0 z-20 bg-white border border-gray-200 rounded-2xl shadow-2xl w-56 p-5 animate-fade-in flex flex-col gap-2">
                                            <h2 className="text-base font-bold mb-2 text-gray-700 tracking-wide">Filter by Category</h2>
                                            <ul className="space-y-2">
                                                <li>
                                                    <button
                                                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition text-sm ${
                                                            category === 'all'
                                                                ? 'bg-blue-100 text-blue-900 font-semibold shadow'
                                                                : 'bg-white text-gray-700 hover:bg-blue-50'
                                                        }`}
                                                        onClick={() => { setCategory('all'); setShowFilter(false); }}
                                                    >
                                                        <i className={faIcons.all}></i> All
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition text-sm ${
                                                            category === 'equipment'
                                                                ? 'bg-blue-100 text-blue-900 font-semibold shadow'
                                                                : 'bg-white text-gray-700 hover:bg-blue-50'
                                                        }`}
                                                        onClick={() => { setCategory('equipment'); setShowFilter(false); }}
                                                    >
                                                        <i className={faIcons.equipment}></i> Equipment
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition text-sm ${
                                                            category === 'tools'
                                                                ? 'bg-blue-100 text-blue-900 font-semibold shadow'
                                                                : 'bg-white text-gray-700 hover:bg-blue-50'
                                                        }`}
                                                        onClick={() => { setCategory('tools'); setShowFilter(false); }}
                                                    >
                                                        <i className={faIcons.tools}></i> Tools
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition text-sm ${
                                                            category === 'seeds'
                                                                ? 'bg-blue-100 text-blue-900 font-semibold shadow'
                                                                : 'bg-white text-gray-700 hover:bg-blue-50'
                                                        }`}
                                                        onClick={() => { setCategory('seeds'); setShowFilter(false); }}
                                                    >
                                                        <i className={faIcons.seeds}></i> Seeds
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition text-sm ${
                                                            category === 'others'
                                                                ? 'bg-blue-100 text-blue-900 font-semibold shadow'
                                                                : 'bg-white text-gray-700 hover:bg-blue-50'
                                                        }`}
                                                        onClick={() => { setCategory('others'); setShowFilter(false); }}
                                                    >
                                                        <i className={faIcons.others}></i> Others
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div
                            className={`grid gap-8 grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 transition-all duration-300 ${
                                pageTransition ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                            }`}
                        >
                            {paginatedEquipment.map((item, idx) => {
                                const cat = categorize(item);
                                let iconClass = faIcons[cat] || faIcons.others;
                                return (
                                    <div
                                        key={idx}
                                        className="bg-white/90 border border-gray-200  shadow-lg hover:shadow-2xl transition-shadow duration-200 flex flex-col p-0 group relative overflow-hidden w-full max-w-xs mx-auto sm:max-w-sm md:max-w-none"
                                        style={{
                                            width: '100%',
                                            maxWidth: '20rem',
                                            backdropFilter: 'blur(2px)',
                                        }}
                                    >
                                        <div
                                            className="relative w-full bg-gradient-to-br from-blue-100 via-green-50 to-white flex items-center justify-center overflow-hidden rounded-t-3xl"
                                            style={{
                                                height: '12rem',
                                            }}
                                        >
                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                className="object-contain w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 drop-shadow " 
                                                style={{
                                                    filter: 'drop-shadow(0 4px 12px rgba(34,197,94,0.10))'
                                                }}
                                            />
                                            <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/80 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold capitalize shadow-sm border border-blue-100">
                                                <i className={iconClass}></i>
                                                {item.name}
                                            </span>
                                        </div>
                                        <div className="flex-1 flex flex-col px-4 py-4 sm:px-6 sm:py-5">
                                            <p className="text-blue-900 text-base font-semibold mb-2 text-center flex items-center justify-center gap-2">
                                                <i className={iconClass}></i>
                                                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                            </p>
                                            <p
                                                className="text-gray-600 text-sm mb-6 text-center overflow-hidden text-ellipsis whitespace-nowrap"
                                                title={item.desc}
                                            >
                                                {truncate(item.desc, 60)}
                                            </p>
                                            <div className="flex gap-2 mt-auto w-full justify-center">
                                                <button className="bg-blue-500 text-white px-5 py-4 rounded-xl hover:bg-blue-600 text-xs font-semibold shadow transition-colors">
                                                    Borrow
                                                </button>
                                                <button className="bg-gray-100 border border-gray-300 px-5 py-4 rounded-xl hover:bg-gray-200 text-xs font-semibold text-blue-700 transition-colors">
                                                    Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {filteredEquipment.length === 0 && (
                            <div className="text-center text-gray-500 mt-16 text-lg flex flex-col items-center justify-center gap-2">
                                <i className="fa-regular fa-face-frown text-5xl text-gray-700 mb-2"></i>
                                No equipment found.
                            </div>
                        )}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-10">
                                <nav className="inline-flex items-center gap-1 rounded-xl shadow bg-white/90 px-2 py-2 border border-gray-200">
                                    <button
                                        className="px-3 py-2 rounded-l-lg bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        aria-label="Previous"
                                    >
                                        <i className="fa-solid fa-chevron-left"></i>
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => {
                                        if (
                                            i === 0 ||
                                            i === totalPages - 1 ||
                                            Math.abs(i + 1 - currentPage) <= 1
                                        ) {
                                            return (
                                                <button
                                                    key={i}
                                                    className={`px-3 py-2 rounded-lg font-semibold transition ${
                                                        currentPage === i + 1
                                                            ? 'bg-blue-500 text-white shadow'
                                                            : 'bg-white text-blue-700 hover:bg-blue-50'
                                                    }`}
                                                    onClick={() => setCurrentPage(i + 1)}
                                                >
                                                    {i + 1}
                                                </button>
                                            );
                                        }
                                        if (
                                            (i === 1 && currentPage > 3) ||
                                            (i === totalPages - 2 && currentPage < totalPages - 2)
                                        ) {
                                            return (
                                                <span key={i} className="px-2 text-gray-400 select-none">
                                                    ...
                                                </span>
                                            );
                                        }
                                        return null;
                                    })}
                                    <button
                                        className="px-3 py-2 rounded-r-lg bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        aria-label="Next"
                                    >
                                        <i className="fa-solid fa-chevron-right"></i>
                                    </button>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
