import React from 'react'

export default function sidebar({setPage, details, logging, elements}) {

return (
    <>

    {/* Desktop Sidebar */}
    <aside className="w-64 gradient-bg text shadow-md hidden md:flex flex-col fixed left-0 top-0 z-30 h-screen max-h-screen">
            <div className="flex flex-col h-full max-h-screen">

                    <div className="p-4 border-b border-blue-500">
                            <h1 className="text-xl font-semibold ml-7 family">Dashboard</h1>
                    </div>

                    <div className="flex min-h-0 overflow-y-auto minimalist-scrollbar ">

                            <nav className="mt-2">
                                    <ul className="space-y-2 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent">
                                    {/* Home */}
                                    <li className="p-5 text-lg hover:bg-blue-700 rounded-lg transition cursor-pointer" onClick={()=>window.location.href = "/"}>
                                            <div className="flex items-center space-x-4">
                                            <span>
                                                    <i className="fas fa-home h-6 w-6"></i>
                                            </span>
                                            <span>Home</span>
                                            </div>
                                    </li>
                                    {/* Analytics */}
                                    <li className="p-5 text-lg hover:bg-blue-700 rounded-lg transition cursor-pointer" onClick={()=>setPage(elements.current["analytics"])}>
                                            <div className="flex items-center space-x-4">
                                            <span>
                                                    <i className="fas fa-cog h-6 w-6"></i>
                                            </span>
                                            <span>Analytics</span>
                                            </div>
                                    </li>
                                    {/* Profile */}
                                    <li className="p-5 text-lg hover:bg-blue-700 rounded-lg transition cursor-pointer" onClick={()=>setPage(elements.current["profiles"])}>
                                            <div className="flex items-center space-x-4">
                                            <span>
                                                    <i className="fas fa-user-circle h-6 w-6"></i>
                                            </span>
                                            <span>User Profiles</span>
                                            </div>
                                    </li>
                                    {/* Enrollment */}
                                    <li className="p-5 text-lg hover:bg-blue-700 rounded-lg transition cursor-pointer" onClick={()=>setPage(elements.current["enrollment"])}>
                                            <div className="flex items-center space-x-4">
                                            <span>
                                                    <i className="fas fa-user-plus h-6 w-6"></i>
                                            </span>
                                            <span>Seminar Programs</span>
                                            </div>
                                    </li>
                                    {/* EIC */}
                                    <li className="p-5 text-lg hover:bg-blue-700 rounded-lg transition cursor-pointer" onClick={()=>setPage(elements.current["eic"])}>
                                            <div className="flex items-center space-x-4">
                                            <span>
                                                    <i className="fas fa-id-card h-6 w-6"></i>
                                            </span>
                                            <span>EIC - Item Panel</span>
                                            </div>
                                    </li>
                                    {/* Inventory */}
                                    <li className="p-5 text-lg hover:bg-blue-700 rounded-lg transition cursor-pointer" onClick={()=>setPage(elements.current["content"])}>
                                            <div className="flex items-center space-x-4">
                                            <span>
                                                    <i className="fas fa-home h-6 w-6"></i>
                                            </span>
                                            <span>Inventory</span>
                                            </div>
                                    </li>
                                    {/* Distribution */}
                                    <li className="p-5 text-lg hover:bg-blue-700 rounded-lg transition cursor-pointer" onClick={()=>setPage(elements.current["content"])}>
                                            <div className="flex items-center space-x-4">
                                            <span>
                                                    <i className="fas fa-home h-6 w-6"></i>
                                            </span>
                                            <span>Distribution</span>
                                            </div>
                                    </li>
                                    {/* Audit */}
                                    <li className="p-5 text-lg hover:bg-blue-700 rounded-lg transition cursor-pointer" onClick={()=>setPage(elements.current["audit"])}>
                                            <div className="flex items-center space-x-4">
                                            <span>
                                                    <i className="fas fa-id-card h-6 w-6"></i>
                                            </span>
                                            <span>Logs / Audit Trail</span>
                                            </div>
                                    </li>
                                    {/* Survey */}
                                    <li className="p-5 text-lg hover:bg-blue-700 rounded-lg transition cursor-pointer" onClick={()=>setPage(elements.current["survey"])}>
                                            <div className="flex items-center space-x-4">
                                            <span>
                                                    <i className="fas fa-home h-6 w-6"></i>
                                            </span>
                                            <span>Survey Forms</span>
                                            </div>
                                    </li>
                                    {/* Settings */}
                                    <li className="p-5 text-lg hover:bg-blue-700 rounded-lg transition cursor-pointer" onClick={()=>setPage(elements.current["settings"])}>
                                            <div className="flex items-center space-x-4">
                                            <span>
                                                    <i className="fas fa-cog h-6 w-6"></i>
                                            </span>
                                            <span>Settings</span>
                                            </div>
                                    </li>
                                    </ul>
                            </nav>

                    </div>

                    <div className="p-4 border-t flex flex-col items-center mt-auto bg-gradient-to-t from-blue-900/80 via-blue-900/60 to-transparent">
                            <div 
                            className="flex items-start mb-4 w-full justify-evenly cursor-pointer hover:font-bold hover:italic neon-profile-hover"
                            onClick={()=>setPage(elements.current["account"])}
                            >

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


                            {/* Logout button (desktop sidebar, bottom) */}
                            <button
                                    onClick={logging}
                                    className="flex items-center justify-center space-x-2 px-4 py-2 element hover:element rounded-lg transition text w-full border"
                            >
                                    <span className="flex items-center py-2k">
                                            <i className="fas fa-sign-out-alt h-5 w-5 translate-y-1"></i>
                                    </span>
                                    
                                    <span className="font-bold">Logout</span>

                            </button>
                    </div>
            </div>
    </aside>
    </>
)

}

