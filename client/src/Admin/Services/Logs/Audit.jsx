import React, { useState } from 'react'

function Audit() {
  return (
    <>
     <div className="relative mt-10 sm:mt-30">
                <hr className="border-black-300" />
                <span className="absolute left-1/4 md:left-1/8 -translate-x-1/4 family -top-5 bg-white rounded-lg px-4 text-2xl font-semibold text-gray-700">
                    Audit Logs
                </span>
            </div>
      <AuditLogsTable />
    </>
  )
}

function AuditLogsTable() {
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

  // Filter and sort logs
  const filteredLogs = logs
    .filter(
      log =>
        log.user.toLowerCase().includes(search.toLowerCase()) ||
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        log.details.toLowerCase().includes(search.toLowerCase()) ||
        log.timestamp.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'timestamp') {
        return sortOrder === 'asc'
          ? new Date(a.timestamp) - new Date(b.timestamp)
          : new Date(b.timestamp) - new Date(a.timestamp);
      } else {
        return sortOrder === 'asc'
          ? a[sortBy].localeCompare(b[sortBy])
          : b[sortBy].localeCompare(a[sortBy]);
      }
    });

  const handleSort = col => {
    if (sortBy === col) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortOrder('asc');
    }
  };

  return (
    <div className="mt-10 p-2 sm:p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2 sm:gap-4">
        <div className="text-xl sm:text-2xl font-bold text-blue-800 tracking-tight">Recent Activities</div>
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search logs..."
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs sm:text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
          />
          <span className="absolute right-2 top-2 text-gray-400">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="m21 21-4.35-4.35m2.02-5.17a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
          </span>
        </div>
      </div>
      <div
        className="rounded-lg shadow border border-blue-200 bg-white"
        style={{
          maxHeight: '32rem', // Increased table height
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        <table className="min-w-full w-full text-xs sm:text-sm table-fixed">
          <thead className="bg-blue-50">
            <tr>
              <th
                className="px-2 sm:px-3 py-3 sm:py-4 text-left font-semibold text-blue-800 cursor-pointer select-none whitespace-nowrap"
                onClick={() => handleSort('timestamp')}
                style={{ minWidth: 120 }}
              >
                Timestamp
                {sortBy === 'timestamp' && (
                  <span className="ml-1">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
              <th
                className="px-2 sm:px-3 py-3 sm:py-4 text-left font-semibold text-blue-800 cursor-pointer select-none whitespace-nowrap"
                onClick={() => handleSort('user')}
                style={{ minWidth: 80 }}
              >
                User
                {sortBy === 'user' && (
                  <span className="ml-1">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
              <th
                className="px-2 sm:px-3 py-3 sm:py-4 text-left font-semibold text-blue-800 cursor-pointer select-none whitespace-nowrap"
                onClick={() => handleSort('action')}
                style={{ minWidth: 120 }}
              >
                Action
                {sortBy === 'action' && (
                  <span className="ml-1">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
              <th className="px-2 sm:px-3 py-3 sm:py-4 text-left font-semibold text-blue-800 whitespace-nowrap" style={{ minWidth: 140 }}>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-gray-500 text-xs sm:text-sm">
                  No logs found.
                </td>
              </tr>
            ) : (
              filteredLogs.map(log => (
                <tr
                  key={log.id}
                  className="hover:bg-blue-100 transition-colors group"
                  style={{ height: '3.2rem' }} // Slightly bigger row
                >
                  <td className="px-2 sm:px-3 py-3 sm:py-4 border-b border-blue-100 text-blue-900 whitespace-nowrap align-middle">
                    <span className="inline-flex items-center gap-2 sm:gap-2">
                      <svg className="w-4 h-4 sm:w-4 sm:h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" /></svg>
                      <span className="hidden xs:inline">{log.timestamp}</span>
                      <span className="inline xs:hidden">{log.timestamp.slice(5, 16)}</span>
                    </span>
                  </td>
                  <td className="px-2 sm:px-3 py-3 sm:py-4 border-b border-blue-100 text-blue-900 font-medium whitespace-nowrap align-middle">
                    <span className="inline-flex items-center gap-2 sm:gap-2">
                      <svg className="w-4 h-4 sm:w-4 sm:h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0" /></svg>
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
    </div>
  );
}

export default Audit;
