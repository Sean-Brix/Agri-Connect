import React, { useState } from 'react'

function Analytics() {

  // Minimalist, responsive analytics dashboard with different graphs

  const [userStats] = useState([100, 200, 400, 800, 1234]);
  const [sessionStats] = useState([10, 30, 50, 70, 87]);
  const [revenueStats] = useState([1000, 3000, 7000, 10000, 12345]);
  const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun'];

  // Minimalist line chart
  const LineChart = ({ data, color }) => {
    const max = Math.max(...data);
    return (
      <svg viewBox="0 0 100 40" className="w-full h-24">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={data
            .map(
              (v, i) =>
                `${(i * 100) / (data.length - 1)},${40 - (v / max) * 35 - 2}`
            )
            .join(' ')}
        />
        {data.map((v, i) => (
          <circle
            key={i}
            cx={(i * 100) / (data.length - 1)}
            cy={40 - (v / max) * 35 - 2}
            r="1.8"
            fill={color}
          />
        ))}
      </svg>
    );
  };

  // Minimalist area chart
  const AreaChart = ({ data, color }) => {
    const max = Math.max(...data);
    const points = data
      .map(
        (v, i) =>
          `${(i * 100) / (data.length - 1)},${40 - (v / max) * 35 - 2}`
      )
      .join(' ');
    const areaPoints =
      `0,40 ` +
      points +
      ` 100,40`;

    return (
      <svg viewBox="0 0 100 40" className="w-full h-24">
        <polygon fill={color + '33'} points={areaPoints} />
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
        />
      </svg>
    );
  };

  // Minimalist donut chart
  const DonutChart = ({ value, max, color }) => {
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const percent = value / max;
    return (
      <svg width="48" height="48" className="mb-2">
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="6"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - percent)}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s' }}
        />
        <text
          x="24"
          y="28"
          textAnchor="middle"
          fontSize="12"
          fill="#374151"
          fontWeight="bold"
        >
          {Math.round(percent * 100)}%
        </text>
      </svg>
    );
  };

  return (
    <div className="w-full mx-auto px-2 py-8 bg-white min-h-screen">
     <div className="relative mt-5 sm:mt-30 mb-15">
                <hr className="border-black-300" />
                <span className="absolute left-1/4 md:left-1/8 -translate-x-1/4 family -top-5 bg-white rounded-lg px-4 text-2xl font-semibold text-gray-700">
                    Analytics Dashboard
                </span>
            </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-white border-2 border-blue-200 rounded-2xl p-6 flex flex-col items-center shadow-lg hover:scale-105 transition-transform duration-200">
          <span className="text-xs text-blue-600 mb-1 font-medium">Total Users</span>
          <span className="text-2xl font-bold mb-2 text-blue-800 drop-shadow">{userStats[userStats.length - 1]}</span>
          <LineChart data={userStats} color="#3b82f6" />
          <span className="text-xs text-green-600 mt-2 font-semibold">
            +{userStats[userStats.length - 1] - userStats[userStats.length - 2]} this month
          </span>
        </div>
        <div className="bg-gradient-to-br from-green-100 via-green-50 to-white border-2 border-green-200 rounded-2xl p-6 flex flex-col items-center shadow-lg hover:scale-105 transition-transform duration-200">
          <span className="text-xs text-green-700 mb-1 font-medium">Active Sessions</span>
          <span className="text-2xl font-bold mb-2 text-green-800 drop-shadow">{sessionStats[sessionStats.length - 1]}</span>
          <AreaChart data={sessionStats} color="#10b981" />
          <span className="text-xs text-green-700 mt-2 font-semibold">
            +{sessionStats[sessionStats.length - 1] - sessionStats[sessionStats.length - 2]} this month
          </span>
        </div>
        <div className="bg-gradient-to-br from-purple-100 via-purple-50 to-white border-2 border-purple-200 rounded-2xl p-6 flex flex-col items-center shadow-lg hover:scale-105 transition-transform duration-200">
          <span className="text-xs text-purple-700 mb-1 font-medium">Revenue</span>
          <span className="text-2xl font-bold mb-2 text-purple-800 drop-shadow">${revenueStats[revenueStats.length - 1]}</span>
          <DonutChart value={revenueStats[revenueStats.length - 1]} max={15000} color="#a78bfa" />
          <span className="text-xs text-green-700 mt-2 font-semibold">
            +${revenueStats[revenueStats.length - 1] - revenueStats[revenueStats.length - 2]} this month
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
        <div className="bg-gradient-to-br from-indigo-100 via-white to-blue-50 border-2 border-indigo-200 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-indigo-700 mb-3 text-center tracking-wide">Monthly Growth</h2>
          <LineChart data={userStats} color="#6366f1" />
          <div className="flex justify-between mt-3 text-xs text-indigo-400 font-semibold">
            {months.map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-pink-100 via-white to-purple-50 border-2 border-pink-200 rounded-2xl p-6 shadow-lg flex flex-col items-center">
          <h2 className="text-lg font-semibold text-pink-700 mb-3 text-center tracking-wide">Key Metrics</h2>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex justify-between text-base">
              <span className="text-pink-600">Conversion Rate</span>
              <span className="font-bold text-pink-700">12%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Bounce Rate</span>
              <span className="font-semibold text-gray-700">38%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Avg. Session Duration</span>
              <span className="font-semibold text-gray-700">3m 12s</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">New Users</span>
              <span className="font-semibold text-gray-700">+87</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h2 className="text-base font-medium text-gray-700 mb-2 text-center">Top Performing Months</h2>
          <ul className="text-sm text-gray-600">
            {months
              .map((m, i) => ({
                month: m,
                users: userStats[i],
                revenue: revenueStats[i],
              }))
              .sort((a, b) => b.revenue - a.revenue)
              .slice(0, 3)
              .map((item, idx) => (
                <li key={idx} className="flex justify-between py-1">
                  <span>{item.month}</span>
                  <span>Users: {item.users}, Revenue: ${item.revenue}</span>
                </li>
              ))}
          </ul>
        </div>
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h2 className="text-base font-medium text-gray-700 mb-2 text-center">User Growth Rate</h2>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-green-600">
              {(
                ((userStats[userStats.length - 1] - userStats[0]) /
                  userStats[0]) *
                100
              ).toFixed(1)}
              %
            </span>
            <span className="text-xs text-gray-500 mt-1">
              Since {months[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
