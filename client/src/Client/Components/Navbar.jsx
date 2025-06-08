import React, { useState } from 'react';
import { Router } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    // Dummy user data (replace with real user data as needed)
    const user = {
        name: 'John Doe',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=1e40af&color=fff',
    };
    const [infoOpen, setInfoOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    // Simulate authentication state (replace with real auth logic)
    const isLoggedIn = !!user; // true if user object exists

    // Helper to determine if we are in the "mid" screen size (750px - 1050px)
    const [isMidScreen, setIsMidScreen] = useState(false);

    React.useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            setIsMidScreen(width >= 750 && width <= 1050);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav className="bg-white shadow-lg fixed w-full z-30 top-0 left-0">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-2 md:px-8 py-6">
                {/* Logo */}
                <svg
                    className="w-8 h-8 text-green-600 ml-4"
                    viewBox="0 0 32 32"
                    fill="none"
                    aria-hidden="true"
                >
                    <circle
                        cx="16"
                        cy="16"
                        r="15"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="#bbf7d0"
                    />
                    <path
                        d="M10 20c0-4 6-10 6-10s6 6 6 10a6 6 0 01-12 0z"
                        fill="#22c55e"
                        stroke="#166534"
                        strokeWidth="1.5"
                    />
                    <ellipse cx="16" cy="20" rx="4" ry="2" fill="#a3e635" />
                    <path
                        d="M16 10v4"
                        stroke="#166534"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
                <Link
                    to="/"
                    className="flex items-center gap-2 font-extrabold text-2xl px-2  text-blue-700 md:text-2xl"
                >
                    FITS -Tanza
                </Link>
                {/* Desktop Menu */}
                <div className="flex-1 flex justify-center">
                    <ul className="hidden md:flex items-center gap-2 lg:gap-6">
                        <li>
                            <Link
                                to="/"
                                className="flex items-center gap-2 text-blue-700 hover:bg-blue-50 px-4 py-3 rounded-lg font-semibold transition"
                            >
                                <svg
                                    className="w-5 h-5 text-blue-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                {!isMidScreen && 'Home'}
                            </Link>
                        </li>
                        {/* Info List Item */}
                        <li className="relative group">
                            <button
                                type="button"
                                onClick={() => setInfoOpen(!infoOpen)}
                                onBlur={() =>
                                    setTimeout(() => setInfoOpen(false), 150)
                                }
                                className="flex items-center gap-2 text-blue-700 hover:bg-blue-50 px-4 py-3 rounded-lg font-semibold transition focus:outline-none"
                            >
                                <svg
                                    className="w-5 h-5 text-blue-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M8 12l2 2 4-4"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                {!isMidScreen && 'Info'}
                                <svg
                                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                                        infoOpen ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M19 9l-7 7-7-7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            {/* Dropdown */}
                            <ul
                                className={`absolute left-0 mt-2 w-44 bg-white rounded-xl shadow-lg py-2 z-40 border border-blue-100 transition-all duration-200 ${
                                    infoOpen
                                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                                        : 'opacity-0 -translate-y-2 pointer-events-none'
                                }`}
                            >
                                <li>
                                    <Link
                                        to="/about"
                                        className="flex items-center gap-2 px-6 py-3 text-blue-700 hover:bg-blue-50 rounded-lg transition font-medium"
                                    >
                                        <svg
                                            className="w-5 h-5 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M13 16h-1v-4h-1m1-4h.01"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            />
                                        </svg>
                                        {'About'}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/contact"
                                        className="flex items-center gap-2 px-6 py-3 text-blue-700 hover:bg-blue-50 rounded-lg transition font-medium"
                                    >
                                        <svg
                                            className="w-5 h-5 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M21 10.5V6a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h5.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M21 10.5l-9 6.5-9-6.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        {'Contact'}
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        {/* Services List Item */}
                        <li className="relative group">
                            <button
                                type="button"
                                onClick={() => setServicesOpen(!servicesOpen)}
                                onBlur={() =>
                                    setTimeout(
                                        () => setServicesOpen(false),
                                        150
                                    )
                                }
                                className="flex items-center gap-2 text-blue-700 hover:bg-blue-50 px-4 py-3 rounded-lg font-semibold transition focus:outline-none"
                            >
                                <svg
                                    className="w-5 h-5 text-blue-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M4 6h16M4 12h16M4 18h16"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                {!isMidScreen && 'Services'}
                                <svg
                                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                                        servicesOpen ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M19 9l-7 7-7-7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            {/* Dropdown */}
                            <ul
                                className={`absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-4 z-40 border border-blue-100 transition-all duration-200 ${
                                    servicesOpen
                                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                                        : 'opacity-0 -translate-y-2 pointer-events-none'
                                }`}
                            >
                                <li>
                                    <Link
                                        to="/seminar"
                                        className="flex items-center gap-3 px-6 py-3 text-blue-700 hover:bg-blue-50 rounded-lg transition font-medium"
                                    >
                                        <svg
                                            className="w-5 h-5 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M8 17l4 4 4-4m-4-5v9"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M20 12a8 8 0 10-16 0 8 8 0 0016 0z"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        {'Seminar Programs'}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/eic"
                                        className="flex items-center gap-3 px-6 py-3 text-blue-700 hover:bg-blue-50 rounded-lg transition font-medium"
                                    >
                                        <svg
                                            className="w-5 h-5 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <rect
                                                x="4"
                                                y="4"
                                                width="16"
                                                height="16"
                                                rx="4"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            />
                                            <path
                                                d="M8 12h8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        {'EIC'}
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        {/* Settings List Item */}
                        <li className="relative group">
                            <button
                                type="button"
                                onClick={() => setSettingsOpen(!settingsOpen)}
                                onBlur={() =>
                                    setTimeout(
                                        () => setSettingsOpen(false),
                                        150
                                    )
                                }
                                className="flex items-center gap-2 text-blue-700 hover:bg-blue-50 px-4 py-3 rounded-lg font-semibold transition focus:outline-none"
                            >
                                <svg
                                    className="w-5 h-5 text-blue-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="12" cy="12" r="3" />
                                    <path
                                        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                {!isMidScreen && 'Settings'}
                                <svg
                                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                                        settingsOpen ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M19 9l-7 7-7-7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            {/* Dropdown */}
                            <ul
                                className={`absolute left-0 mt-2 w-44 bg-white rounded-xl shadow-lg py-2 z-40 border border-blue-100 transition-all duration-200 ${
                                    settingsOpen
                                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                                        : 'opacity-0 -translate-y-2 pointer-events-none'
                                }`}
                            >
                                <li>
                                    <Link
                                        to="/settings/profile"
                                        className="flex items-center gap-2 px-6 py-3 text-blue-700 hover:bg-blue-50 rounded-lg transition font-medium"
                                    >
                                        <svg
                                            className="w-5 h-5 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle cx="12" cy="7" r="4" />
                                            <path d="M5.5 21a8.38 8.38 0 0113 0" />
                                        </svg>
                                        {'Profile Settings'}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/settings/account"
                                        className="flex items-center gap-2 px-6 py-3 text-blue-700 hover:bg-blue-50 rounded-lg transition font-medium"
                                    >
                                        <svg
                                            className="w-5 h-5 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <rect
                                                x="3"
                                                y="7"
                                                width="18"
                                                height="13"
                                                rx="2"
                                            />
                                            <path d="M16 3v4M8 3v4" />
                                        </svg>
                                        {'Account Settings'}
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                {/* Minimalist Login/Profile & Hamburger */}
                <div className="flex items-center gap-2">
                    {/* Profile/Login Icon - hidden on small screens */}
                    <div className="relative hidden md:block">
                        <button
                            onClick={() => setOpen((open) => !open)}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-blue-700 to-green-400 hover:from-blue-800 hover:to-green-500 transition-all duration-200 focus:outline-none shadow-lg border border-blue-100"
                            aria-haspopup="true"
                            aria-expanded={open}
                        >
                            {isLoggedIn ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
                                />
                            ) : (
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="12" cy="7" r="4" />
                                    <path d="M5.5 21a8.38 8.38 0 0113 0" />
                                </svg>
                            )}
                        </button>
                        {/* Dropdown */}
                        {open && (
                            <ul
                                className="absolute right-0 mt-3 w-44 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl py-2 z-50 border border-blue-100 animate-fade-in"
                                onMouseLeave={() => setOpen(false)}
                            >
                                {isLoggedIn ? (
                                    <li>
                                        <button
                                            className="w-full text-left flex items-center gap-2 px-5 py-3 text-blue-700 hover:bg-blue-50 rounded-lg transition font-medium"
                                            onClick={() => {
                                                alert('Logged out!');
                                                setOpen(false);
                                            }}
                                        >
                                            <svg
                                                className="w-5 h-5 text-blue-500"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    d="M17 16l4-4m0 0l-4-4m4 4H7"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M3 12a9 9 0 0118 0"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            Logout
                                        </button>
                                    </li>
                                ) : (
                                    <li>
                                        <Link
                                            to="/login"
                                            className="flex items-center gap-2 px-5 py-3 text-blue-700 hover:bg-blue-50 rounded-lg transition font-medium"
                                            onClick={() => setOpen(false)}
                                        >
                                            <svg
                                                className="w-5 h-5 text-blue-500"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    d="M5 12h14M12 5l7 7-7 7"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>
                    {/* Hamburger */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden text-blue-700 focus:outline-none transition-transform hover:scale-110 z-50 ml-2 rounded-full p-1 bg-white/80 shadow border border-blue-100"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d={
                                    open
                                        ? 'M6 18L18 6M6 6l12 12'
                                        : 'M4 8h16M4 16h16'
                                }
                            />
                        </svg>
                    </button>
                </div>
                </div>

                {/* Mobile Sidebar */}
           <div
                className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-40 transform transition-transform duration-300 ${
                    open ? 'translate-x-0' : '-translate-x-full'
                } md:hidden`}
                style={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE 10+
                }}
            >
                <style>
                    {`
                        .hide-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                    `}
                </style>
                <div className="hide-scrollbar flex flex-col h-full">
                <div className="flex items-center justify-between px-6 py-8 border-b border-blue-100">
                    <svg
                        className="w-8 h-8 text-green-600 "
                        viewBox="0 0 32 32"
                        fill="none"
                        aria-hidden="true"
                    >
                        <circle
                            cx="16"
                            cy="16"
                            r="15"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="#bbf7d0"
                        />
                        <path
                            d="M10 20c0-4 6-10 6-10s6 6 6 10a6 6 0 01-12 0z"
                            fill="#22c55e"
                            stroke="#166534"
                            strokeWidth="1.5"
                        />
                        <ellipse cx="16" cy="20" rx="4" ry="2" fill="#a3e635" />
                        <path
                            d="M16 10v4"
                            stroke="#166534"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                    <Link
                        to="/"
                        className="flex items-center font-extrabold text-2xl px-2 mr-10  text-blue-700 md:text-2xl"
                    >
                        FITS -Tanza
                    </Link>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-blue-700 focus:outline-none"
                        aria-label="Close menu"
                    >
                        <svg
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                {/* Sidebar Profile/Login */}
                <div className="flex flex-col items-center gap-4 py-10 border-b border-blue-100 bg-gradient-to-b from-blue-50 to-white">
                    {isLoggedIn ? (
                        <>
                            <div className="relative">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-20 h-20 rounded-full border-4 border-blue-700 shadow-lg object-cover"
                                />
                                <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></span>
                            </div>
                            <span className="font-semibold text-blue-800 text-lg">
                                {user.name}
                            </span>
                            <Link
                                to="/settings/profile"
                                className="flex items-center gap-2 px-8 py-2 mt-2 text-blue-700 bg-white border border-blue-100 hover:bg-blue-50 rounded-full transition font-medium shadow"
                                onClick={() => setOpen(false)}
                            >
                                <svg
                                    className="w-5 h-5 text-blue-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="12" cy="7" r="4" />
                                    <path d="M5.5 21a8.38 8.38 0 0113 0" />
                                </svg>
                                View Profile
                            </Link>
                            <button
                                className="mt-2 flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-200"
                                onClick={() => {
                                    // Add logout logic here
                                    alert('Logged out!');
                                    setOpen(false);
                                }}
                            >
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M17 16l4-4m0 0l-4-4m4 4H7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M3 12a9 9 0 0118 0"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="flex items-center gap-2 px-8 py-3 bg-blue-700 text-white hover:bg-blue-800 font-bold rounded-full shadow-lg transition"
                            onClick={() => setOpen(false)}
                        >
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M5 12h14M12 5l7 7-7 7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Login
                        </Link>
                    )}
                </div>
                <ul className="flex flex-col gap-2 px-8 py-8">
                    <li>
                        <Link
                            to="/"
                            className="flex items-center gap-2 px-6 py-6 text-blue-700 hover:bg-blue-50 font-semibold rounded-lg transition"
                        >
                            <svg
                                className="w-5 h-5 text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Home
                        </Link>
                    </li>
                    {/* Info for mobile */}
                    <li>
                        <details className="group">
                            <summary className="flex items-center gap-2 px-6 py-6 text-blue-700 hover:bg-blue-50 font-semibold rounded-lg cursor-pointer transition focus:outline-none">
                                <svg
                                    className="w-5 h-5 text-blue-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M8 12l2 2 4-4"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Info
                                <svg
                                    className="w-4 h-4 ml-1 transition-transform duration-200 group-open:rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M19 9l-7 7-7-7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </summary>
                            <ul className="bg-white rounded-xl shadow-lg py-2 mt-2 border border-blue-100">
                                <li>
                                    <Link
                                        to="/about"
                                        className="flex items-center gap-2 px-8 py-3 text-blue-700 hover:bg-blue-50 rounded-lg transition font-medium"
                                    >
                                        <svg
                                            className="w-5 h-5 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M13 16h-1v-4h-1m1-4h.01"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            />
                                        </svg>
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/contact"
                                        className="flex items-center gap-2 px-8 py-3 text-blue-700 hover:bg-blue-50 rounded-lg transition font-medium"
                                    >
                                        <svg
                                            className="w-5 h-5 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M21 10.5V6a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h5.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M21 10.5l-9 6.5-9-6.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    {/* Services for mobile */}
                    <li>
                        <details className="group">
                            <summary className="flex items-center gap-2 px-6 py-6 text-blue-700 hover:bg-blue-50 font-semibold rounded-lg cursor-pointer transition focus:outline-none">
                                <svg
                                    className="w-5 h-5 text-blue-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M4 6h16M4 12h16M4 18h16"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Services
                                <svg
                                    className="w-4 h-4 ml-1 transition-transform duration-200 group-open:rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M19 9l-7 7-7-7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </summary>
                            <ul className="bg-white rounded-xl shadow-lg py-4 mt-2 border border-blue-100">
                                <li>
                                    <Link
                                        to="/seminar"
                                        className="flex items-center gap-3 px-8 py-4 text-blue-700 hover:bg-blue-50 rounded-lg transition font-medium"
                                    >
                                        <svg
                                            className="w-5 h-5 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M8 17l4 4 4-4m-4-5v9"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M20 12a8 8 0 10-16 0 8 8 0 0016 0z"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Seminar Programs
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/eic"
                                        className="flex items-center gap-3 px-8 py-4 text-blue-700 hover:bg-blue-50 rounded-lg transition font-medium"
                                    >
                                        <svg
                                            className="w-5 h-5 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <rect
                                                x="4"
                                                y="4"
                                                width="16"
                                                height="16"
                                                rx="4"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            />
                                            <path
                                                d="M8 12h8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        EIC
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    {/* Settings for mobile */}
                    <li>
                        <details className="group">
                            <summary className="flex items-center gap-2 px-6 py-6 text-blue-700 hover:bg-blue-50 font-semibold rounded-lg cursor-pointer transition focus:outline-none">
                                <svg
                                    className="w-5 h-5 text-blue-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="12" cy="12" r="3" />
                                    <path
                                        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Settings
                                <svg
                                    className="w-4 h-4 ml-1 transition-transform duration-200 group-open:rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M19 9l-7 7-7-7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </summary>
                            <ul className="bg-white rounded-xl shadow-lg py-2 mt-2 border border-blue-100">
                                <li>
                                    <Link
                                        to="/settings/profile"
                                        className="flex items-center gap-2 px-8 py-3 text-blue-700 hover:bg-blue-50 rounded-lg transition font-medium"
                                    >
                                        <svg
                                            className="w-5 h-5 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle cx="12" cy="7" r="4" />
                                            <path d="M5.5 21a8.38 8.38 0 0113 0" />
                                        </svg>
                                        Profile Settings
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/settings/account"
                                        className="flex items-center gap-2 px-8 py-3 text-blue-700 hover:bg-blue-50 rounded-lg transition font-medium"
                                    >
                                        <svg
                                            className="w-5 h-5 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <rect
                                                x="3"
                                                y="7"
                                                width="18"
                                                height="13"
                                                rx="2"
                                            />
                                            <path d="M16 3v4M8 3v4" />
                                        </svg>
                                        Account Settings
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            </div>

            {open && (
                <div
                    className="fixed inset-0 bg-gray-500 opacity-60 backdrop-blur-2xl z-30 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}
        </nav>
    );
}
