import React, { useState } from 'react';

const sampleImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", // Tractor
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80", // Fertilizer
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" // Pump
];

  const categories = [
    "All",
    "Machinery",
    "Fertilizer",
    "Irrigation",
  ];

  const getCategory = (name) => {
    if (name.toLowerCase().includes("tractor")) return "Machinery";
    if (name.toLowerCase().includes("fertilizer")) return "Fertilizer";
    if (name.toLowerCase().includes("pump")) return "Irrigation";
    return "Other";
  };

  const getImage = (name) => {
    if (name.toLowerCase().includes("tractor")) return sampleImages[0];
    if (name.toLowerCase().includes("fertilizer")) return sampleImages[1];
    if (name.toLowerCase().includes("pump")) return sampleImages[2];
    return sampleImages[0];
  };

function Content() {
  const [items, setItems] = useState([
    { id: 1, name: "Tractor", quantity: 3, description: "John Deere 5050D, 50HP", image: sampleImages[0] },
    { id: 2, name: "Fertilizer Bags", quantity: 120, description: "Urea, 50kg bags", image: sampleImages[1] },
    { id: 3, name: "Irrigation Pump", quantity: 5, description: "Submersible, 2HP", image: sampleImages[2] },
  ]);
  const [form, setForm] = useState({ name: "", quantity: "", description: "", image: "" });
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.quantity) return;
    setItems([
      ...items,
      {
        id: Date.now(),
        name: form.name,
        quantity: Number(form.quantity),
        description: form.description,
        image: form.image || getImage(form.name),
      },
    ]);
    setForm({ name: "", quantity: "", description: "", image: "" });
    setShowModal(false);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "All" || getCategory(item.name) === filter;
    return matchesSearch && matchesFilter;
  });

  // Handle file upload and convert to local URL
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: URL.createObjectURL(file) });
    }
  };

  // Helper to truncate description
  const truncate = (str, n = 40) => (str && str.length > n ? str.slice(0, n) + "..." : str);

  // Remove selected items
  const handleRemoveSelected = () => {
    setItems(items.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    setSelectAll(false);
    setShowDelete(false);
  };

  // Handle select all
  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedItems(filteredItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  // Handle single select
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
      setSelectAll(false);
    } else {
      const newSelected = [...selectedItems, id];
      setSelectedItems(newSelected);
      if (newSelected.length === filteredItems.length) setSelectAll(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[91%] w-full bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 p-2 sm:p-4 md:p-8 rounded-2xl shadow-2xl mt-[5%] transition-all">
      {/* Fixed Header Section */}
      <div className="w-full max-w-5xl z-20 sticky top-0 md:top-14 bg-white/80 backdrop-blur-md p-4 sm:p-6 md:p-10 rounded-2xl shadow-lg border-b border-blue-200">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-800 mb-4 text-center tracking-tight drop-shadow">Inventory Management</h1>
        <div className="flex flex-col md:flex-row gap-2 sm:gap-3 md:gap-4 w-full max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 border border-blue-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 shadow transition text-blue-900 placeholder:text-blue-400 text-sm sm:text-base"
          />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="border border-blue-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 shadow transition text-blue-900 text-sm sm:text-base"
          >
            {categories.map(cat => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold px-4 sm:px-6 py-2 rounded-xl hover:from-blue-600 hover:to-blue-800 transition shadow-lg flex items-center gap-2 text-sm sm:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            Add Item
          </button>
          <button
            onClick={() => setShowDelete(!showDelete)}
            className="bg-gradient-to-r from-red-400 to-red-600 text-white font-bold px-4 sm:px-6 py-2 rounded-xl hover:from-red-500 hover:to-red-700 transition shadow-lg flex items-center gap-2 text-sm sm:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            Delete
          </button>
        </div>
        {showDelete && (
          <div className="flex flex-col sm:flex-row justify-end mt-4 gap-2">
            <button
              onClick={handleRemoveSelected}
              disabled={selectedItems.length === 0}
              className={`px-4 py-2 rounded-xl font-semibold transition shadow-lg bg-red-500 text-white hover:bg-red-600 disabled:bg-red-200 disabled:cursor-not-allowed text-sm sm:text-base`}
            >
              Remove Selected
            </button>
            <button
              onClick={() => {
                setSelectAll(true);
                setSelectedItems(filteredItems.map(item => item.id));
              }}
              className="px-4 py-2 rounded-xl font-semibold transition shadow-lg bg-blue-500 text-white hover:bg-blue-600 text-sm sm:text-base"
            >
              Select All
            </button>
          </div>
        )}
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 w-[98vw] max-w-lg relative border border-blue-200 animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-2xl sm:text-3xl transition"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-blue-800 text-center tracking-tight">Add New Item</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Item Name"
                className="border border-blue-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 shadow text-sm sm:text-base"
                required
              />
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="border border-blue-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 shadow text-sm sm:text-base"
                min="1"
                required
              />
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="border border-blue-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 shadow text-sm sm:text-base"
              />
              <div>
                <label className="block text-sm font-semibold text-blue-700 mb-2">Image (choose file):</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-blue-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
                {form.image && (
                  <img
                    src={form.image}
                    alt="Preview"
                    className="mt-3 w-20 h-20 object-cover rounded-xl shadow-lg border border-blue-200"
                  />
                )}
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 rounded-xl hover:from-blue-600 hover:to-blue-800 transition shadow-lg mt-2 text-sm sm:text-base"
              >
                Add Item
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Inventory Table */}
      <div className="w-full max-w-5xl mt-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800 mb-4 text-center tracking-tight">Current Inventory</h2>
        <div className="overflow-x-auto rounded-2xl shadow-lg bg-white/80 backdrop-blur-md border border-blue-100">
          <table className="min-w-full bg-transparent rounded-2xl text-xs sm:text-sm md:text-base">
            <thead>
              <tr>
                <th className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-left text-xs md:text-sm text-blue-700 font-semibold">
                  <input
                    type="checkbox"
                    checked={selectAll && filteredItems.length > 0}
                    onChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </th>
                <th className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-left text-xs md:text-sm text-blue-700 font-semibold">Image</th>
                <th className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-left text-xs md:text-sm text-blue-700 font-semibold">Name</th>
                <th className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-left text-xs md:text-sm text-blue-700 font-semibold">Quantity</th>
                <th className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-left text-xs md:text-sm text-blue-700 font-semibold">Description</th>
                <th className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-left text-xs md:text-sm text-blue-700 font-semibold">Category</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-blue-400 font-semibold">
                    No items found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/70 transition">
                    <td className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        aria-label={`Select ${item.name}`}
                      />
                    </td>
                    <td className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b">
                      <img
                        src={item.image || getImage(item.name)}
                        alt={item.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-cover rounded-xl shadow border border-blue-100"
                      />
                    </td>
                    <td className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b font-semibold text-blue-900">{item.name}</td>
                    <td className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-blue-700">{item.quantity}</td>
                    <td className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-blue-700">
                      <span title={item.description} className="block max-w-[120px] sm:max-w-[180px] truncate">{truncate(item.description, 40)}</span>
                    </td>
                    <td className="py-2 sm:py-3 px-1 sm:px-2 md:px-4 border-b text-blue-700">{getCategory(item.name)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Content;
