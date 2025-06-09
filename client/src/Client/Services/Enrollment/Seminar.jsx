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

  React.useEffect(() => {
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

  return (
    <>
      <Navbar />
      <div
        className="flex min-h-screen bg-gray-100"
        style={{
          backgroundImage: `linear-gradient(rgba(20,30,40,0.85),rgba(20,30,40,0.85)), url(${backg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <main className="flex-1 w-full relative z-10 mt-30">
          <section className="w-full px-4 flex flex-col items-center pt-16">
            <header className="flex flex-col items-center mb-10">
              <span className="uppercase tracking-widest text-blue-300 text-xs font-medium mb-1">
                Welcome to
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-green-200 drop-shadow-lg text-center">
                Seminar Enrollment
              </h1>
              <div className="mt-3 w-20 h-1 rounded-full bg-gradient-to-r from-blue-400 via-green-400 to-blue-400 opacity-80 animate-pulse"></div>
            </header>
            {/* Modern Search Bar & Filter Side by Side */}
            <div className="flex flex-row items-center w-full max-w-3xl mt-4 mb-8 gap-3">
              <div className="flex flex-none min-w-1/2 max-w-xs gap-2 bg-white/90 rounded-2xl shadow-lg px-4 py-1 items-center border border-blue-100 h-12">
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </span>
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-transparent transition placeholder:text-gray-400"
                    placeholder={`Search by ${filterBy.toLowerCase()}...`}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </div>
              {/* Simple Filter Button with Modern Dropdown */}
              <div className="relative h-12 flex items-center">
                <button
                  className="flex items-center gap-2 px-4 sm:px-5 py-2 h-12 rounded-xl bg-white text-blue-700 font-semibold border border-blue-200 shadow transition-all duration-200 hover:bg-blue-50 focus:outline-none text-base sm:text-lg"
                  onClick={() => setShowFilter(f => !f)}
                  type="button"
                  aria-label="Show filter options"
                  style={{ minHeight: '3rem' }}
                >
                  <i className="fa-solid fa-filter text-blue-400 text-base sm:text-lg"></i>
                  <span className="hidden sm:inline">{filterBy}</span>
                  <i className={`fa-solid fa-chevron-${showFilter ? 'up' : 'down'} ml-2 text-blue-300`}></i>
                </button>
                {showFilter && (
                  <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white rounded-2xl shadow-2xl border border-blue-100 z-20 animate-fade-in py-2 px-2">
                    {filterOptions.map(opt => (
                      <button
                        key={opt.value}
                        className={`flex items-center gap-3 w-full text-left px-3 sm:px-4 py-2 rounded-xl font-semibold transition text-sm sm:text-base ${
                          filterBy === opt.value
                            ? 'bg-blue-600 text-white'
                            : 'text-blue-700 hover:bg-blue-50'
                        }`}
                        onClick={() => {
                          setFilterBy(opt.value);
                          setShowFilter(false);
                        }}
                      >
                        <i
                          className={
                            opt.value === 'Title'
                              ? 'fa-solid fa-heading'
                              : opt.value === 'Speaker'
                              ? 'fa-solid fa-user'
                              : 'fa-solid fa-location-dot'
                          }
                        ></i>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-8 w-full max-w-3xl mt-6">
              {paginatedPrograms.length === 0 ? (
                <div className="text-blue-300 text-center py-12 text-base">No programs found.</div>
              ) : (
                paginatedPrograms.map(program => (
                  <article
                    key={program.id}
                    className="relative flex flex-col md:flex-row gap-6 bg-white/95 rounded-3xl shadow-2xl p-0 border border-blue-100 overflow-hidden group transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105"
                    style={{ transition: '0.3s' }}
                  >
                    {/* Image with border and outline */}
                    <div className="flex-shrink-0 flex items-center justify-center w-full md:w-56 h-56">
                      <div className="w-52 h-52 sm:w-44 sm:h-44 md:w-40 md:h-40 rounded-2xl bg-white shadow-lg flex items-center justify-center overflow-hidden border-4 border-blue-400 outline outline-4 outline-blue-200 transition-all duration-300 ease-in-out">
                        <img
                          src="https://via.placeholder.com/96x96.png?text=Sample"
                          alt="Sample"
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>
                    </div>
                    {/* Content */}
                    <div className="flex flex-col justify-between flex-1 px-6 py-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-200 to-green-200 text-blue-700 text-lg shadow">
                            <i className={faIcons[program.category] || faIcons.All}></i>
                          </span>
                          <span className="font-bold text-2xl text-gray-900 tracking-tight truncate" title={program.name}>
                            {program.name}
                          </span>
                        </div>
                        <div className="text-gray-600 text-base mb-4 line-clamp-2 truncate" title={program.description}>
                          {truncate(program.description, 80)}
                        </div>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <span className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-100 px-3 py-1 rounded-lg font-semibold border border-blue-200 shadow-sm truncate" title={program.category}>
                            <i className={faIcons[program.category] || faIcons.All}></i>
                            {program.category}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-100 px-3 py-1 rounded-lg font-semibold border border-green-200 shadow-sm truncate" title={program.location}>
                            <i className="fa-solid fa-location-dot"></i>
                            {program.location}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-purple-700 bg-purple-100 px-3 py-1 rounded-lg font-semibold border border-purple-200 shadow-sm truncate" title={program.speaker}>
                            <i className="fa-solid fa-user"></i>
                            {program.speaker}
                          </span>
                        </div>
                      </div>
                      {/* Buttons */}
                      <div className="flex gap-3 w-full justify-end mt-6">
                        <button className="flex items-center gap-2 px-8 py-2 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition text-base focus:outline-none focus:ring-2 focus:ring-blue-400">
                          <i className="fa-solid fa-paper-plane"></i>
                          Apply
                        </button>
                        <button className="flex items-center gap-2 px-8 py-2 rounded-xl border-2 border-blue-600 text-blue-700 bg-white font-bold shadow-lg hover:bg-blue-50 transition text-base focus:outline-none focus:ring-2 focus:ring-blue-400">
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
              <nav className="flex justify-center mt-10 space-x-2 mb-6" aria-label="Pagination">
                <button
                  className="px-4 py-1.5 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 disabled:opacity-50 transition "
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
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
                        ? 'bg-blue-700 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                    aria-current={currentPage === i + 1 ? 'page' : undefined}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-4 py-1.5 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 disabled:opacity-50 transition"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
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
    </>
  );
}