import { useState } from 'react'

export default function Audit({admin_navigate}) {
  return (
    <>
      <div className="relative mt-10 sm:mt-30">
          <hr className="border-black-300" />
          <span className="absolute left-1/4 md:left-1/8 -translate-x-1/4 family -top-5 bg-white rounded-lg px-4 text-2xl font-semibold text-gray-700">
              Audit Trail
          </span>
      </div>
      <AuditLogsTable admin_navigate={admin_navigate}/>
    </>
  )
}

function AuditLogsTable({ admin_navigate }) {
  const [logs] = useState([
    {
      id: 1,
      user: 'lance',
      action: 'Created new user',
      timestamp: '2024-06-10 14:23:45',
      details: 'User: johndoe, Role: Editor'
    },
    {
      id: 2,
      user: 'franz',
      action: 'Updated profile',
      timestamp: '2024-06-10 15:01:12',
      details: 'Changed email address'
    },
    {
      id: 3,
      user: 'christian',
      action: 'Deleted record',
      timestamp: '2024-06-11 09:12:30',
      details: 'Record ID: 12345'
    },
    {
      id: 4,
      user: 'george',
      action: 'Logged in',
      timestamp: '2024-06-11 10:05:00',
      details: 'IP: 192.168.1.10'
    },
    {
      id: 5,
      user: 'israel',
      action: 'Changed password',
      timestamp: '2024-06-12 08:30:00',
      details: 'Password updated successfully'
    },
    {
      id: 6,
      user: 'kc',
      action: 'Logged out',
      timestamp: '2024-06-12 09:00:00',
      details: 'Session ended'
    },
    {
      id: 7,
      user: 'kurt',
      action: 'Viewed report',
      timestamp: '2024-06-12 09:15:00',
      details: 'Report: Sales Q2'
    },
    {
      id: 8,
      user: 'admin',
      action: 'Updated settings',
      timestamp: '2024-06-12 10:00:00',
      details: 'Enabled 2FA'
    },
    {
      id: 9,
      user: 'kristoffer',
      action: 'Created new post',
      timestamp: '2024-06-12 11:00:00',
      details: 'Post ID: 67890'
    },
    {
      id: 10,
      user: 'rhenzy',
      action: 'Deleted comment',
      timestamp: '2024-06-12 12:00:00',
      details: 'Comment ID: 54321'
    }
  ]);

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterUser, setFilterUser] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  // Get unique users for filter dropdown
  const uniqueUsers = Array.from(new Set(logs.map(log => log.user)));

  // Filter and sort logs
  // (removed duplicate filteredLogs declaration)

  const handleSort = col => {
    if (sortBy === col) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortOrder('asc');
    }
  };

  // Add filterColumn state to select which column to filter
  const [filterColumn, setFilterColumn] = useState('user');

  // Get unique values for the selected filter column
  const uniqueFilterValues = Array.from(
    new Set(logs.map(log => String(log[filterColumn])))
  );

  // Add more log items to exceed 30
  const extendedLogs = [
    ...logs,
    ...Array.from({ length: 25 }, (_, i) => ({
      id: 11 + i,
      user: `user${i + 1}`,
      action: ['Created', 'Updated', 'Deleted', 'Viewed', 'Logged in', 'Logged out'][i % 6] + ' item',
      timestamp: `2024-06-${13 + Math.floor(i / 10)} ${String(8 + (i % 12)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}:00`,
      details: `Details for log ${i + 11}`
    }))
  ];

  const [page, setPage] = useState(1);
  const itemsPerPage = 30;

  // Filter and sort logs (use extendedLogs)
  const filteredLogs = extendedLogs
    .filter(
      log =>
        (filterUser === '' || String(log[filterColumn]) === filterUser) &&
        (
          log.user.toLowerCase().includes(search.toLowerCase()) ||
          log.action.toLowerCase().includes(search.toLowerCase()) ||
          log.details.toLowerCase().includes(search.toLowerCase()) ||
          log.timestamp.toLowerCase().includes(search.toLowerCase())
        )
    )
    .sort((a, b) => {
      if (sortBy === 'timestamp') {
        return sortOrder === 'asc'
          ? new Date(a.timestamp) - new Date(b.timestamp)
          : new Date(b.timestamp) - new Date(a.timestamp);
      } else if (sortBy === 'id') {
        return sortOrder === 'asc'
          ? a.id - b.id
          : b.id - a.id;
      } else {
        return sortOrder === 'asc'
          ? String(a[sortBy]).localeCompare(String(b[sortBy]))
          : String(b[sortBy]).localeCompare(String(a[sortBy]));
      }
    });

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div
      className="mt-10 p-2 sm:p-4 md:p-8"
      style={{
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2 sm:gap-4">
        <div className="text-xl sm:text-2xl font-bold text-blue-800 tracking-tight">Recent Activities</div>
        <div className="relative w-full md:w-1/3 flex items-center gap-2">
          {/* Search icon added inside the search bar */}
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search logs..."
            className="w-full pl-8 pr-2 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-xs sm:text-sm"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <button
            type="button"
            className="ml-2 px-2 py-1 rounded-lg border border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1"
            title="Filter options"
            onClick={() => setShowFilter((prev) => !prev)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a2 2 0 0 1-.553 1.382l-5.894 6.183A2 2 0 0 0 14 15.118V19a1 1 0 0 1-1.447.894l-2-1A1 1 0 0 1 10 18v-2.882a2 2 0 0 0-.553-1.382L3.553 7.382A2 2 0 0 1 3 6V4Z" />
            </svg>
            <span className="hidden sm:inline text-xs">Filter</span>
          </button>
          {showFilter && (
            <div className="absolute right-0 top-10 z-10 bg-white border border-blue-200 rounded-lg shadow-lg p-3 w-56">
              <div className="mb-2 font-semibold text-blue-800 text-xs">Filter by Column</div>
              <select
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs mb-2"
                value={filterColumn}
                onChange={e => {
                  setFilterColumn(e.target.value);
                  setFilterUser('');
                  setPage(1);
                }}
              >
                <option value="user">User</option>
                <option value="id">User ID</option>
                <option value="action">Action</option>
                <option value="timestamp">Timestamp</option>
                {/* Removed <option value="details">Details</option> */}
              </select>
              <div className="mb-2 font-semibold text-blue-800 text-xs">Filter Value</div>
              <select
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                value={filterUser}
                onChange={e => {
                  setFilterUser(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All</option>
                {Array.from(new Set(extendedLogs.map(log => String(log[filterColumn])))).map(val => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
              <button
                className="mt-2 w-full bg-blue-100 text-blue-700 rounded px-2 py-1 text-xs hover:bg-blue-200"
                onClick={() => setShowFilter(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-lg shadow border border-blue-200 bg-white p-6 ">
        <table className="min-w-full w-full text-xs sm:text-sm table-fixed">
          <thead className="bg-blue-50">
            <tr>
              <th
                className="px-2 sm:px-3 py-3 sm:py-4 text-left font-semibold text-blue-800 cursor-pointer select-none whitespace-nowrap"
                onClick={() => { handleSort('timestamp'); setPage(1); }}
                style={{ minWidth: 120 }}
              >
                Timestamp
                {sortBy === 'timestamp' && (
                  <span className="ml-1">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
              <th
                className="px-2 sm:px-3 py-3 sm:py-4 text-center font-semibold text-blue-800 cursor-pointer select-none whitespace-nowrap"
                onClick={() => { handleSort('id'); setPage(1); }}
                style={{ minWidth: 60 }}
              >
                User ID
                {sortBy === 'id' && (
                  <span className="ml-1">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
              <th
                className="px-2 sm:px-3 py-3 sm:py-4 text-left font-semibold text-blue-800 cursor-pointer select-none whitespace-nowrap"
                onClick={() => { handleSort('user'); setPage(1); }}
                style={{ minWidth: 100 }}
              >
                User
                {sortBy === 'user' && (
                  <span className="ml-1">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
              <th
                className="px-2 sm:px-3 py-3 sm:py-4 text-left font-semibold text-blue-800 cursor-pointer select-none whitespace-nowrap"
                onClick={() => { handleSort('action'); setPage(1); }}
                style={{ minWidth: 120 }}
              >
                Action
                {sortBy === 'action' && (
                  <span className="ml-1">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
              <th
                className="px-2 sm:px-3 py-3 sm:py-4 text-left font-semibold text-blue-800 whitespace-nowrap"
                style={{ minWidth: 120 }}
              >
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-500 text-xs sm:text-sm">
                  No logs found.
                </td>
              </tr>
            ) : (
              paginatedLogs.map(log => (
                <tr
                  key={log.id}
                  className="hover:bg-blue-100 transition-colors group"
                  style={{ height: '3.2rem' }}
                >
                  <td className="px-2 sm:px-3 py-3 sm:py-4 border-b border-blue-100 text-blue-900 whitespace-nowrap align-middle">{log.timestamp}</td>
                  <td className="px-2 sm:px-3 py-3 sm:py-4 border-b border-blue-100 text-blue-900 whitespace-nowrap align-middle text-center">{log.id}</td>
                  <td className="px-2 sm:px-3 py-3 sm:py-4 border-b border-blue-100 text-blue-900 whitespace-nowrap align-middle">
                    <span className="inline-flex items-center gap-2 sm:gap-2">
                      {log.user}
                    </span>
                  </td>
                  <td className="px-2 sm:px-3 py-3 sm:py-4 border-b border-blue-100 text-blue-900 whitespace-nowrap align-middle">{log.action}</td>
                  <td className="px-2 sm:px-3 py-3 sm:py-4 border-b border-blue-100 text-blue-700 align-middle">
                    <span className="block max-w-[80px] sm:max-w-[120px] truncate group-hover:whitespace-normal group-hover:truncate-none">
                      {log.details}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            className="px-2 py-1 rounded border bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-2 py-1 rounded border text-xs ${page === i + 1 ? 'bg-blue-200 text-blue-900 font-bold' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-2 py-1 rounded border bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
