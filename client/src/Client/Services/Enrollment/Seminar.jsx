import React from 'react'
import Navbar from '../../Components/Navbar'
import backg from './Assets/backg.jpg'

export default function Seminar() {
  const [search, setSearch] = React.useState('');
  const [filterBy, setFilterBy] = React.useState('Title');
  const [showFilter, setShowFilter] = React.useState(false);

  // Programs data
  const allPrograms = [
    {
      id: 1,
      name: 'Organic Farming',
      category: 'Farming',
      description: 'Learn sustainable organic farming methods for better yields.',
      location: 'Conference Hall A',
      speaker: 'Dr. Jane Smith',
    },
    {
      id: 6,
      name: 'Rice Farming Techniques',
      category: 'Farming',
      description: 'Master modern rice farming techniques for higher productivity.',
      location: 'Conference Hall B',
      speaker: 'Mr. John Doe',
    },
    {
      id: 7,
      name: 'Vegetable Planting Basics',
      category: 'Planting',
      description: 'A beginner-friendly guide to planting and caring for vegetables.',
      location: 'Room 101',
      speaker: 'Ms. Anna Lee',
    },
    {
      id: 8,
      name: 'Sustainable Fishing Practices',
      category: 'Fishing',
      description: 'Explore eco-friendly fishing practices for long-term success.',
      location: 'Lakeview Center',
      speaker: 'Mr. Carlos Rivera',
    },
    {
      id: 9,
      name: 'Livestock Management',
      category: 'Livestock',
      description: 'Best practices in managing livestock for health and profit.',
      location: 'Barn Hall',
      speaker: 'Dr. Emily Clark',
    },
    {
      id: 10,
      name: 'Fruit Orchard Care',
      category: 'Planting',
      description: 'Tips and tricks for maintaining a healthy fruit orchard.',
      location: 'Orchard Pavilion',
      speaker: 'Mr. Samuel Green',
    },
    {
      id: 11,
      name: 'Aquaculture Introduction',
      category: 'Fishing',
      description: 'An introduction to aquaculture and fish farming essentials.',
      location: 'Aquatic Center',
      speaker: 'Ms. Linda Tran',
    },
    {
      id: 12,
      name: 'Organic Fertilizer Making',
      category: 'Farming',
      description: 'How to make and use organic fertilizers effectively.',
      location: 'Workshop Room 2',
      speaker: 'Dr. Peter Wong',
    },
    {
      id: 13,
      name: 'Poultry Farming',
      category: 'Livestock',
      description: 'Comprehensive guide to raising poultry for beginners.',
      location: 'Poultry House',
      speaker: 'Ms. Grace Kim',
    },
    {
      id: 14,
      name: 'Crop Rotation Methods',
      category: 'Farming',
      description: 'Learn about crop rotation for soil health and productivity.',
      location: 'Field Lab',
      speaker: 'Mr. David Lee',
    },
    {
      id: 15,
      name: 'Agroforestry Practices',
      category: 'Farming',
      description: 'Integrate trees and crops for sustainable land use.',
      location: 'Greenhouse',
      speaker: 'Dr. Maria Santos',
    },
  ];

  const filterOptions = [
    { label: 'Title', value: 'Title' },
    { label: 'Speaker', value: 'Speaker' },
    { label: 'Location', value: 'Location' },
  ];

  // Filtering logic
  const filteredPrograms = allPrograms.filter(program => {
    const searchLower = search.toLowerCase();
    if (filterBy === 'Title') {
      return program.name.toLowerCase().includes(searchLower);
    }
    if (filterBy === 'Speaker') {
      return program.speaker.toLowerCase().includes(searchLower);
    }
    if (filterBy === 'Location') {
      return program.location.toLowerCase().includes(searchLower);
    }
    return true;
  });

  const faIcons = {
    All: "fa-solid fa-layer-group",
    Farming: "fa-solid fa-wheat-awn",
    Planting: "fa-solid fa-seedling",
    Fishing: "fa-solid fa-water",
    Livestock: "fa-solid fa-drumstick-bite",
  };

  // Pagination logic
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
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

  return (
    <>
      <Navbar />
      <div
        className="flex min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-green-800 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(20,30,40,0.85),rgba(20,30,40,0.85)), url(${backg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex-1 w-full relative z-10">
          <div className="w-full px-4 flex justify-center items-center pt-12">
            <div className="relative flex flex-col items-center mt-30">
              <span className="uppercase tracking-widest text-blue-300 text-sm font-semibold mb-2 letter-spacing-wide">
                Welcome to
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-green-200 drop-shadow-lg text-center">
                Seminar Enrollment
              </h1>
              <div className="mt-3 w-24 h-2 rounded-full bg-gradient-to-r from-blue-400 via-green-400 to-blue-400 opacity-80 animate-pulse"></div>
            </div>
          </div>
         
          <div
            className="max-w-5xl mx-auto mt-12 p-4 sm:p-8 bg-white/90 rounded-3xl shadow-2xl border border-gray-200 w-[95vw] sm:w-[90vw] md:w-auto backdrop-blur"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 p-2 gap-6">
              <h2 className="text-2xl font-bold text-gray-900">Programs</h2>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto relative">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder={`Search by ${filterBy.toLowerCase()}...`}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gradient-to-r from-blue-100 via-white to-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 shadow transition placeholder-gray-400"
                  />
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 pointer-events-none">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                      <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                </div>
                <div className="relative min-w-[150px]">
                  <button
                    type="button"
                    className="appearance-none w-full px-5 py-3 pr-12 rounded-xl border border-gray-200 bg-gradient-to-r from-white via-blue-100 to-green-200 hover:from-blue-200 hover:to-green-300 text-gray-900 font-semibold shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition cursor-pointer flex items-center justify-between"
                    onClick={() => setShowFilter(v => !v)}
                  >
                    <span className="flex items-center gap-2">
                      <i className="fa-solid fa-filter"></i>
                      {filterBy}
                    </span>
                    <span className="pointer-events-none text-blue-400 ml-2">
                      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                  {showFilter && (
                    <div className="absolute top-14 right-0 z-20 bg-white border border-gray-100 rounded-2xl shadow-2xl w-56 p-5 animate-fade-in flex flex-col gap-2"
                      style={{ overflow: 'hidden' }}
                    >
                      <h2 className="text-base font-bold mb-2 text-gray-700 tracking-wide">Filter By</h2>
                      <ul className="space-y-2">
                        {filterOptions.map(opt => (
                          <li key={opt.value}>
                            <button
                              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition text-sm ${
                                filterBy === opt.value
                                  ? 'bg-gradient-to-r from-blue-700 to-green-600 text-white font-semibold shadow'
                                  : 'bg-gray-50 text-gray-700 hover:bg-blue-100'
                              }`}
                              onClick={() => { setFilterBy(opt.value); setShowFilter(false); }}
                            >
                              <i className="fa-solid fa-filter"></i>
                              {opt.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              {paginatedPrograms.length === 0 ? (
                <div className="text-blue-300 text-center py-12 text-base">No programs found.</div>
              ) : (
                paginatedPrograms.map(program => (
                  <div
                    key={program.id}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 rounded-2xl shadow-lg bg-gradient-to-br from-white via-blue-100 to-green-100 border border-blue-200 hover:shadow-2xl transition group"
                  >
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-200 to-green-200 flex items-center justify-center text-3xl text-blue-700 shadow">
                          <i className={faIcons[program.category] || "fa-solid fa-layer-group"}></i>
                        </div>
                        <div>
                          <div className="font-extrabold text-2xl text-gray-900 flex items-center gap-2">
                            {program.name}
                          </div>
                          <div className="text-gray-600 text-sm mt-1 mb-2">
                            {truncate(program.description, 60)}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-100 px-3 py-1 rounded-lg font-semibold border border-blue-200">
                              {program.category}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-100 px-3 py-1 rounded-lg font-semibold border border-green-200">
                              <i className="fa-solid fa-location-dot"></i>
                              {program.location}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-purple-700 bg-purple-100 px-3 py-1 rounded-lg font-semibold border border-purple-200">
                              <i className="fa-solid fa-user"></i>
                              {program.speaker}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6 md:mt-0 w-full md:w-auto">
                      <button className="flex-1 md:flex-none px-8 py-3 rounded-lg bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition text-base">
                        Apply
                      </button>
                      <button className="flex-1 md:flex-none px-8 py-3 rounded-lg border border-blue-700 text-blue-800 bg-white font-semibold shadow hover:bg-blue-100 transition text-base">
                        Details
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  className="px-3 py-1 rounded-lg border border-blue-300 bg-blue-900 text-blue-100 font-semibold disabled:opacity-50"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`px-3 py-1 rounded-lg border font-semibold ${
                      currentPage === i + 1
                        ? 'bg-blue-700 text-white border-blue-700'
                        : 'bg-blue-900 text-blue-100 border-blue-300'
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-1 rounded-lg border border-blue-300 bg-blue-900 text-blue-100 font-semibold disabled:opacity-50"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        html, body, #root {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar, #root::-webkit-scrollbar {
          display: none;
        }
        .letter-spacing-wide {
          letter-spacing: 0.15em;
        }
      `}</style>
    </>
  );
}
