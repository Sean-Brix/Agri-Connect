import React, { useState, useEffect } from 'react';

function Analytics() {
    const [userStats, setUserStats] = useState([]);
    const [seminarStats, setSeminarStats] = useState([]);
    const [eicStats, setEicStats] = useState([]);
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalSeminars, setTotalSeminars] = useState(0);
    const [availableEIC, setAvailableEIC] = useState(0);
    const [waitingDistributionRequests, setWaitingDistributionRequests] =
        useState(0);
    const [topClientProfile, setTopClientProfile] = useState('');
    const [clientProfileCounts, setClientProfileCounts] = useState({});
    const [topEICCategory, setTopEICCategory] = useState('');
    const [eicCategoryCounts, setEICCategoryCounts] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {

                const userRes = await fetch('/api/accounts/getCount');
                let usercount = await userRes.json();
                const semRes = await fetch('/api/seminars/getCount');
                let semcount = await semRes.json();
                const eicRes = await fetch('/api/eic/getCount');
                let eiccount = await eicRes.json();
                const waitRes = await fetch('/api/distribution/getWaitingCount');
                let waitcount = await waitRes.json();
                console.log(waitcount)

                
                // Replace with actual API call when available
                const data = {
                    payload: {
                        total_users: usercount.payload, 
                        total_seminars: semcount.payload,
                        available_eic: eiccount.payload,
                        waiting_distributions: waitcount.payload    ,
                        top_client_profile: 'Pechay Seeds',
                        client_profile_counts: {
                            'Pechay Seeds': 450,
                            'Mangroove Seeds': 300,
                            Shovel: 250,
                            'Fertilizer ': 250,
                        },
                        top_eic_category: 'Category A',
                        eic_category_counts: {
                            'Category A': 6000,
                            'Category B': 3000,
                            'Category C': 2200,
                        },
                    },
                };

                setTotalUsers(data.payload.total_users);
                setTotalSeminars(data.payload.total_seminars);
                setAvailableEIC(data.payload.available_eic);
                setWaitingDistributionRequests(
                    data.payload.waiting_distributions
                );
                setTopClientProfile(data.payload.top_client_profile || 'N/A');
                setClientProfileCounts(data.payload.client_profile_counts);
                setTopEICCategory(data.payload.top_eic_category || 'N/A');
                setEICCategoryCounts(data.payload.eic_category_counts);

                setUserStats([
                    data.payload,
                ]);
                setSeminarStats([
                    5,
                    8,
                    12,
                    15,
                    18,
                    22,
                    25,
                    28,
                    30,
                    32,
                    33,
                    data.payload.total_seminars,
                ]);
                setEicStats([
                    2,
                    1,
                    4,
                    2,
                    3,
                    2,
                    1,
                    5,
                    8,
                    2,
                    4,
                    data.payload.available_eic,
                ]);
            } catch (error) {
                console.error('Error fetching analytics data:', error);
            }
        };

        fetchData();
    }, []);
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
                                `${(i * 100) / (data.length - 1)},${
                                    40 - (v / max) * 35 - 2
                                }`
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

    const AreaChart = ({ data, color }) => {
        const max = Math.max(...data);
        const points = data
            .map(
                (v, i) =>
                    `${(i * 100) / (data.length - 1)},${
                        40 - (v / max) * 35 - 2
                    }`
            )
            .join(' ');
        const areaPoints = `0,40 ` + points + ` 100,40`;
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
        <div className="w-full mx-auto px-4 py-10 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
            <div className="relative mb-12">
                <h1 className="text-3xl md:text-4xl font-extrabold mt-10 sm:20 text-blue-800 text-center tracking-tight">
                    <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-700 bg-clip-text text-transparent">
                        Analytics Dashboard
                    </span>
                </h1>
                <p className="text-center text-blue-500 mt-2 text-base">
                    Modern insights at a glance
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:shadow-2xl transition">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                            <svg
                                className="w-6 h-6 text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m13-7a4 4 0 11-8 0 4 4 0 018 0zm-8 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </span>
                        <span className="text-sm font-medium text-blue-500">
                            Total Users
                        </span>
                    </div>
                    <span className="text-3xl font-bold text-blue-700 mb-1">
                        {totalUsers}
                    </span>
                    <span className="text-xs text-blue-500 font-semibold mb-2">
                        +
                        {userStats.length > 1
                            ? userStats[userStats.length - 1] -
                              userStats[userStats.length - 2]
                            : 0}{' '}
                        this month
                    </span>
                    <div className="w-full mt-2">
                        <LineChart data={userStats} color="#3b82f6" />
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:shadow-2xl transition">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                            <svg
                                className="w-6 h-6 text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M13 16h-1v-4h-1m4 0h-1v-4h-1m4 0h-1v-4h-1m-4 0h-1v-4h-1" />
                            </svg>
                        </span>
                        <span className="text-sm font-medium text-blue-500">
                            Total Seminars
                        </span>
                    </div>
                    <span className="text-3xl font-bold text-blue-700 mb-1">
                        {totalSeminars}
                    </span>
                    <span className="text-xs text-blue-500 font-semibold mb-2">
                        +
                        {seminarStats.length > 1
                            ? seminarStats[seminarStats.length - 1] -
                              seminarStats[seminarStats.length - 2]
                            : 0}{' '}
                        this month
                    </span>
                    <div className="w-full mt-2">
                        <AreaChart data={seminarStats} color="#3b82f6" />
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:shadow-2xl transition">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                            <svg
                                className="w-6 h-6 text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            </svg>
                        </span>
                        <span className="text-sm font-medium text-blue-500">
                            Available EIC
                        </span>
                    </div>
                    <span className="text-3xl font-bold text-blue-700 mb-1">
                        {availableEIC}
                    </span>
                    <span className="text-xs text-blue-500 font-semibold mb-2">
                        +
                        {eicStats.length > 1
                            ? eicStats[eicStats.length - 1] -
                              eicStats[eicStats.length - 2]
                            : 0}{' '}
                        this month
                    </span>
                    <div className="w-full flex justify-center mt-2">
                        <DonutChart
                            value={eicStats[eicStats.length - 1]}
                            max={23}
                            color="#3b82f6"
                        />
                    </div>
                </div>
            </div>

            {/* Modern Graphs Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-blue-100 via-white to-blue-200 rounded-2xl shadow-lg p-8">
                    <h2 className="text-lg font-semibold text-blue-700 mb-4 text-center tracking-wide">
                        Monthly User Growth
                    </h2>
                    <div className="w-full">
                        <LineChart data={userStats} color="#2563eb" />
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-blue-400 font-semibold">
                        {months.map((m, i) => (
                            <span key={i}>{m}</span>
                        ))}
                    </div>
                </div>
                <div className="bg-gradient-to-br from-blue-100 via-white to-blue-200 rounded-2xl shadow-lg p-8 flex flex-col items-center">
                    <h2 className="text-lg font-semibold text-blue-700 mb-4 text-center tracking-wide">
                        Key Metrics
                    </h2>
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                            <span className="text-blue-600 font-semibold">
                                Waiting Distribution Requests
                            </span>
                            <span className="text-xl font-bold text-blue-700 mt-1">
                                {waitingDistributionRequests}
                            </span>
                        </div>
                        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                            <span className="text-blue-600 font-semibold">
                                Top Client Profile
                            </span>
                            <span className="text-xl font-bold text-blue-700 mt-1">
                                {topClientProfile}
                            </span>
                        </div>
                        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                            <span className="text-blue-600 font-semibold">
                                Top EIC Category
                            </span>
                            <span className="text-xl font-bold text-blue-700 mt-1">
                                {topEICCategory}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-base font-semibold text-blue-700 mb-4 text-center">
                        Client Profile Distribution
                    </h2>
                    <ul className="divide-y divide-blue-100">
                        {Object.entries(clientProfileCounts)
                            .sort(([, a], [, b]) => b - a)
                            .map(([profile, count], idx) => (
                                <li
                                    key={idx}
                                    className="flex justify-between py-3 px-2"
                                >
                                    <span className="font-medium text-blue-700">
                                        {profile}
                                    </span>
                                    <span className="text-blue-500">
                                        <span className="font-semibold">
                                            {count}
                                        </span>
                                    </span>
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
                    <h2 className="text-base font-semibold text-blue-700 mb-4 text-center">
                        User Growth Rate
                    </h2>
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-extrabold text-blue-600">
                            {userStats.length > 1
                                ? (
                                      ((userStats[userStats.length - 1] -
                                          userStats[0]) /
                                          userStats[0]) *
                                      100
                                  ).toFixed(1)
                                : 0}
                            %
                        </span>
                        <span className="text-xs text-blue-400 mt-1">
                            Since {months[0]}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
