import React from 'react'
import Navbar from '../../Components/Navbar'

export default function Seminar() {
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState('All');


  
  const allPrograms = [
    { id: 1, name: 'Organic Farming', category: 'Farming' },
    { id: 6, name: 'Rice Farming Techniques', category: 'Farming' },
    { id: 7, name: 'Vegetable Planting Basics', category: 'Planting' },
    { id: 8, name: 'Sustainable Fishing Practices', category: 'Fishing' },
    { id: 9, name: 'Livestock Management', category: 'Livestock' },
    { id: 10, name: 'Fruit Orchard Care', category: 'Planting' },
    { id: 11, name: 'Aquaculture Introduction', category: 'Fishing' },
    { id: 12, name: 'Organic Fertilizer Making', category: 'Farming' },
    { id: 13, name: 'Poultry Farming', category: 'Livestock' },
    { id: 14, name: 'Crop Rotation Methods', category: 'Farming' },
    { id: 15, name: 'Agroforestry Practices', category: 'Farming' },
  ];

  const categories = ['All', ...Array.from(new Set(allPrograms.map(p => p.category)))];

  const filteredPrograms = allPrograms.filter(
    program =>
      (filter === 'All' || program.category === filter) &&
      program.name.toLowerCase().includes(search.toLowerCase())
  );

  // Category filter state for dropdown
  const [showFilter, setShowFilter] = React.useState(false);
  const [category, setCategory] = React.useState('All');

  // Icon mapping for categories
  const faIcons = {
    All: "fa-solid fa-layer-group",
    Farming: "fa-solid fa-wheat-awn",
    Planting: "fa-solid fa-seedling",
    Fishing: "fa-solid fa-water",
    Livestock: "fa-solid fa-drumstick-bite",
  };

  // Update filter when category changes
  React.useEffect(() => {
    setFilter(category);
  }, [category]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-green-100">
        <div className="w-full  px-4 flex justify-center items-center z-0 relative">
          <h1 className="text-4xl font-extrabold text-green-700 tracking-tight drop-shadow-lg">
            Seminar Enrollment
          </h1>
        </div>
        <div className="w-full bg-gradient-to-r from-blue-600 to-green-400 py-5 mt-30 px-4 flex justify-center items-center z-0 relative">
          <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Available Programs
          </h1>
        </div>
        <div className="max-w-4xl mx-auto mt-10 p-4 sm:p-8 bg-white rounded-3xl shadow-2xl border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">
            <h2 className="text-2xl font-bold text-gray-900">Programs</h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto relative">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search programs..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gradient-to-r from-blue-50 via-white to-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 shadow transition placeholder-gray-400"
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
                  className="appearance-none w-full px-5 py-3 pr-12 rounded-xl border border-gray-200 bg-gradient-to-r from-blue-50 via-white to-blue-50 text-gray-900 font-semibold shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition cursor-pointer flex items-center justify-between"
                  onClick={() => setShowFilter(v => !v)}
                >
                  <span className="flex items-center gap-2">
                    <i className={faIcons[category]}></i>
                    {category === 'All' ? 'All Categories' : category}
                  </span>
                  <span className="pointer-events-none text-blue-400 ml-2">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                      <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
                {showFilter && (
                  <div className="absolute top-14 right-0 z-20 bg-white border border-gray-100 rounded-2xl shadow-2xl w-56 p-5 animate-fade-in flex flex-col gap-2">
                    <h2 className="text-base font-bold mb-2 text-gray-700 tracking-wide">Filter by Category</h2>
                    <ul className="space-y-2">
                      {categories.map(cat => (
                        <li key={cat}>
                          <button
                            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition text-sm ${
                              category === cat
                                ? 'bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold shadow'
                                : 'bg-gray-50 text-gray-700 hover:bg-blue-50'
                            }`}
                            onClick={() => { setCategory(cat); setShowFilter(false); }}
                          >
                            <i className={faIcons[cat] || "fa-solid fa-layer-group"}></i>
                            {cat === 'All' ? 'All' : cat}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {filteredPrograms.length === 0 ? (
              <div className="text-blue-300 text-center py-12 text-base">No programs found.</div>
            ) : (
              filteredPrograms.map(program => (
                <div
                  key={program.id}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 sm:p-8 rounded-2xl shadow bg-gradient-to-br from-white via-blue-50 to-white border border-blue-100 hover:shadow-xl transition group"
                >
                  <div>
                    <div className="font-extrabold text-lg sm:text-xl text-gray-900 flex items-center gap-3">
                      <i className={faIcons[program.category] || "fa-solid fa-layer-group"}></i>
                      {program.name}
                    </div>
                    <div className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-100 px-3 py-1 rounded-lg mt-3 font-semibold border border-blue-200">
                      {program.category}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5 md:mt-0 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 py-2.5 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">
                      Apply
                    </button>
                    <button className="flex-1 md:flex-none px-6 py-2.5 rounded-lg border border-blue-600 text-blue-700 bg-white font-semibold shadow hover:bg-blue-50 transition">
                      Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
