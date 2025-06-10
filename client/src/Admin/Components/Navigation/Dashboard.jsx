import React, { useEffect, useState, useRef } from 'react';
import logo from '../../../Assets/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import default_picture from '../../../Assets/default_picture.png';

// SERVICES
import Analytics from '../../Services/Analytics/Analytics';
import Profiles from '../../Services/Profiles/Profiles.jsx';
import Seminar from '../../Services/Seminar/Seminar.jsx';
import EIC from '../../Services/EIC/EIC.jsx';
import Content from '../../Services/Content/Content.jsx';
import Audit from '../../Services/Logs/Audit.jsx';
import Survey from '../../Services/Survey/Survey.jsx';

// GLOBAL
import Settings from '../../../Components/settings/Setting.jsx';
import AccountProfile from '../../../Components/settings/AccountProfile/AccountProfile.jsx';
import Edit_Profile from '../../../Components/settings/AccountProfile/Edit_Profile.jsx';

// SUB COMPONENT
import Sidebar from './sub/Sidebar.jsx';

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();


  // User Account Details
  const [details, setDetails] = useState({
    username: "Guest Account", 
    position: "User Admin",
    picture: default_picture
  });

  
  // Content State
  const elements = useRef({

    // SERVICES
    analytics: ()=>Analytics,
    profiles: ()=>Profiles,
    enrollment: ()=>Seminar,
    eic: ()=> EIC,
    content: ()=> Content,
    audit: ()=> Audit,
    survey: ()=> Survey,

    // GLOBAL
    settings: ()=> Settings,
    account: ()=> AccountProfile,
    edit_profile: ()=> Edit_Profile,
  });

  const [Page, setPage] = useState(elements.current.analytics); // [ analytics, enrollment, profiles, eic, settings, audit, survey, content ]
  const admin_navigate = (page)=>{
    setPage(elements.current[page]);
  }

  //Initial Request on Mount
  useEffect(()=>{

    (async()=>{

        try{
          // Get Account Details
          const response = await fetch("/api/accounts/details");
          const data = (await response.json()).payload;

          if(!response.ok){
            throw new error(data.error);
          }

          // Get Profile Picture
          const profile = await fetch("/api/accounts/getProfile");
          let image_url;
          
          if (profile.ok && profile.headers.get('content-type').includes('image')) {

            const blob = await profile.blob();
            image_url = URL.createObjectURL(blob);

          } 
          else {

            image_url = default_picture

          }

          // Render State
          setDetails({
              username: data.username, 
              position: data.position,
              picture: image_url,
              setProfile: setDetails
          });

        }
        catch(err){

          console.log(err);
          alert("Hahaha kala mo pede ka dito, d ka naman admin");
          navigate('/login');
          return;

        }

    })()


  }, []);


  // Switch Between Logout and Login
  const logging = async()=>{

    
    if(confirm("Are you sure you want to logout?")) {
      
      await fetch('/api/authentication/logout');
      return navigate('/login');
    }

  }

  return (
    <>
      <div className="flex min-h-screen h-screen">
        {/* DESKTOP SIDEBAR */}
        <Sidebar
          logging={logging}
          details={details}
          setPage={setPage}
          elements={elements}
          iconOnlyClass="sidebar-icon-only"
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen h-screen ml-0 md:ml-64 transition-all">
          <header className="gradient-bg shadow-md drop-shadow-lg p-3 flex justify-evenly md:justify-center md:px-8 items-center w-full fixed top-0 left-0 z-20 md:left-64 md:w-[calc(100%-16rem)] ">
            <div className="flex items-center space-x-4 justify-center">
              {/* Logo */}
              <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
              <h1 className="text-lg font-semibold text text-center items-center family">
                FITS Tanza - Municipal Agriculture Office
              </h1>
            </div>
            {/* Mobile menu toggle button */}
            <button
              className="md:hidden text mt-2 md:mt-0 translate-y-[-4px] ml-4"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </header>
          {/* Render children below the header */}
          <main className="flex-1 p-2 sm:p-4 overflow-auto pt-20 h-0 min-h-0 minimalist-scrollbar">
            <Page admin_navigate={admin_navigate} details={details} />
          </main>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-grey bg-opacity-10 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu overlay"
        />
      )}
      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 gradient-bg text-white drop-shadow-lg shadow-lg w-64 z-50 transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden flex flex-col h-screen max-h-screen`}
        id="mobile-menu"
      >
        <div className="flex flex-col h-full max-h-screen">
          <div className="p-4 border-b border-blue-500 flex justify-between items-center">
            <h1 className="text-2xl font-bold family">Dashboard</h1>
            <button
              className="text-white"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 min-h-0 flex flex-col">
            <nav className="mt-2 flex-1 overflow-y-auto minimalist-scrollbar">
              <ul className="space-y-2 px-2 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent">
                {/* Analytics */}
                <li className="p-5 text-lg hover:bg-blue-700 rounded-lg transition cursor-pointer" onClick={() => { setPage(elements.current["analytics"]); setMobileMenuOpen(false); }}>
                  <div className="flex items-center space-x-4">
                    <span>
                      <i className="fas fa-cog h-6 w-6"></i>
                    </span>
                    <span>Analytics</span>
                  </div>
                </li>
                {/* User Profiles */}
                <li className="p-5 text-lg hover:bg-blue-700 rounded-lg transition cursor-pointer" onClick={() => { setPage(elements.current["profiles"]); setMobileMenuOpen(false); }}>
                  <div className="flex items-center space-x-4">
                    <span>
                      <i className="fas fa-user-circle h-6 w-6"></i>
                    </span>
                    <span>User Profiles</span>
                  </div>
                </li>
                {/* Seminar Programs */}
                <li className="p-5 text-lg hover:bg-blue-700 rounded-lg transition cursor-pointer" onClick={() => { setPage(elements.current["enrollment"]); setMobileMenuOpen(false); }}>
                  <div className="flex items-center space-x-4">
                    <span>
                      <i className="fas fa-user-plus h-6 w-6"></i>
                    </span>
                    <span>Seminar Programs</span>
                  </div>
                </li>
                {/* EIC */}
                <li className="p-5 text-lg hover:bg-blue-700 rounded-lg transition cursor-pointer" onClick={() => { setPage(elements.current["eic"]); setMobileMenuOpen(false); }}>
                  <div className="flex items-center space-x-4">
                    <span>
                      <i className="fas fa-id-card h-6 w-6"></i>
                    </span>
                    <span>EIC - Item Panel</span>
                  </div>
                </li>
                {/* Content Management */}
                <li className="p-5 text-lg hover:bg-blue-700 rounded-lg transition cursor-pointer" onClick={() => { setPage(elements.current["content"]); setMobileMenuOpen(false); }}>
                  <div className="flex items-center space-x-4">
                    <span>
                      <i className="fas fa-home h-6 w-6"></i>
                    </span>
                    <span>Content Management</span>
                  </div>
                </li>
                {/* Audit */}
                <li className="p-5 text-lg hover:bg-blue-700 rounded-lg transition cursor-pointer" onClick={() => { setPage(elements.current["audit"]); setMobileMenuOpen(false); }}>
                  <div className="flex items-center space-x-4">
                    <span>
                      <i className="fas fa-id-card h-6 w-6"></i>
                    </span>
                    <span>Logs / Audit Trail</span>
                  </div>
                </li>
                {/* Survey */}
                <li className="p-5 text-lg hover:bg-blue-700 rounded-lg transition cursor-pointer" onClick={() => { setPage(elements.current["survey"]); setMobileMenuOpen(false); }}>
                  <div className="flex items-center space-x-4">
                    <span>
                      <i className="fas fa-home h-6 w-6"></i>
                    </span>
                    <span>Survey Forms</span>
                  </div>
                </li>
                {/* Settings */}
                <li className="p-5 text-lg hover:bg-blue-700 rounded-lg transition cursor-pointer" onClick={() => { setPage(elements.current["settings"]); setMobileMenuOpen(false); }}>
                  <div className="flex items-center space-x-4">
                    <span>
                      <i className="fas fa-cog h-6 w-6"></i>
                    </span>
                    <span>Settings</span>
                  </div>
                </li>
              </ul>
            </nav>
            {/* Profile and Logout at the bottom, styled like desktop */}
            <div className="p-4 border-t logout flex flex-col items-center mt-auto bg-gradient-to-t from-blue-900/80 via-blue-900/60 to-transparent">
              <div className="flex items-start mb-4 w-full justify-evenly neon-profile-hover">
                <div className="relative rounded-full border-3 border-blue-800 neon-avatar">
                  <img 
                    src={details.picture} 
                    alt="Profile" 
                    className="h-10 w-10 rounded-full border-2 border-white object-cover" 
                  />
                  <span className="neon-border"></span>
                </div>
                <div className="flex-col flex flex-start">
                  <span className="font-bold">{ details.username }</span>
                  <span className="text-sm text-gray-300">{ details.position }</span>
                </div>
              </div>
              {/* Logout button (mobile sidebar, bottom) */}
              <button 
                className="flex items-center justify-center space-x-2 px-4 py-2 element hover:element rounded-lg transition text w-full border"
                onClick={logging}
              >
                <span className="flex items-center py-2k">
                  <i className="fas fa-sign-out-alt h-5 w-5 translate-y-1"></i>
                </span>
                <span className="font-bold">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Minimalist scrollbar utility, neon profile effect, and sidebar icon-only mode */}
      <style>{`
        .minimalist-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: transparent;
        }
        .minimalist-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .minimalist-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
        html, body, #root {
          height: 100%;
        }
        .neon-profile-hover .neon-avatar {
          transition: box-shadow 0.3s;
        }
        .neon-avatar {
          display: inline-block;
          position: relative;
        }
        .neon-avatar .neon-border {
          content: '';
          position: absolute;
          top: -8px;
          left: -8px;
          width: 54px;
          height: 54px;
          border-radius: 22px;
          pointer-events: none;
          opacity: 0;
          z-index: 1;
          border: 3px solid transparent;
        }
        .neon-profile-hover:hover .neon-avatar .neon-border,
        .neon-profile-hover:focus .neon-avatar .neon-border {
          opacity: 1;
          border-image: linear-gradient(270deg, #00fff0, #00f0ff, #00ffea, #00ffb7, #00fff0) 1;
          animation: neon-rotate 1.0s linear infinite;
          box-shadow: 0 0 8px 2px #00fff0, 0 0 14px 4px #00f0ff;
        }
        @keyframes neon-rotate {
          0% {
            border-image-source: linear-gradient(0deg, #00fff0, #00f0ff, #00ffea, #00ffb7, #00fff0);
            transform: rotate(0deg);
          }
          100% {
            border-image-source: linear-gradient(360deg, #00fff0, #00f0ff, #00ffea, #00ffb7, #00fff0);
            transform: rotate(360deg);
          }
        }
        /* Sidebar icon-only mode for 1000px-1300px */
        @media (max-width: 1300px) and (min-width: 1000px) {
          .sidebar-icon-only {
            width: 5rem !important;
            min-width: 5rem !important;
            max-width: 5rem !important;
          }
          .sidebar-icon-only .sidebar-label,
          .sidebar-icon-only .sidebar-username,
          .sidebar-icon-only .sidebar-position,
          .sidebar-icon-only .sidebar-logout-text {
            display: none !important;
          }
          .sidebar-icon-only .sidebar-icon {
            justify-content: center !important;
          }
        }
      `}</style>
    </>
  );
}
