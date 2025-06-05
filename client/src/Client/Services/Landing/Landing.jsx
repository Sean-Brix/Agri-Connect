// UTILS
import React, { useEffect, useRef, useState } from 'react'

// NAVBAR
import Navbar from '../../Components/Navbar'

// IMAGES
import fits from './Assets/fits.jpg'
import img1 from './Assets/1.jpg'
import img2 from './Assets/2.jpg'
import img3 from './Assets/3.jpg' 
import img4 from './Assets/4.jpg'
import img5 from './Assets/rabies.jpg'

export default function Landing() {

    return (
        <>
            <Navbar />
            <main className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen pt-20">
                <section className="max-w-7xl mx-auto px-6 py-16">
                    {/* Hero Section */}
                    <div
                        className="
                            flex flex-col md:flex-row items-center gap-12
                            bg-white/80 backdrop-blur rounded-3xl shadow-2xl p-12 mb-20 border border-green-100
                        "
                        style={{ flexWrap: 'wrap' }}
                    >
                        {/* Text and Buttons */}
                        <div className="flex-1 min-w-[320px] flex flex-col items-start">
                            <h1 className="text-5xl font-extrabold mb-6 text-green-900 leading-tight tracking-tight">
                                Empowering Agriculture,<br />Enriching Lives
                            </h1>
                            <p className="text-xl text-gray-700 mb-8">
                                Advancing sustainable agriculture and community well-being through innovation and dedicated support.
                            </p>
                            <div className="flex gap-4 flex-wrap mb-8">
                                <a href="#programs" className="bg-gradient-to-r from-green-600 to-green-800 text-white px-8 py-3 rounded-xl font-semibold shadow hover:scale-105 transition-transform">
                                    Our Programs
                                </a>
                                <a href="#about" className="border-2 border-green-700 text-green-800 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition">
                                    Learn More
                                </a>
                            </div>
                        </div>
                        {/* Image: side on desktop, under on wrap */}
                        <img
                            src={fits}
                            alt="Fits Program"
                            className="
                                w-full max-w-md rounded-2xl shadow-xl object-cover min-w-[320px] self-center
                                md:ml-8
                                md:mt-0
                                mt-8
                                order-2
                                md:order-none
                            "
                            style={{
                                // On md and up: side, on wrap (below 900px): under buttons
                                display: 'block',
                            }}
                        />
                    </div>
                    <style>
                        {`
                        @media (min-width: 900px) {
                            .hero-img-responsive {
                                margin-top: 0 !important;
                                margin-left: 2rem !important;
                                order: 0 !important;
                            }
                        }
                        @media (max-width: 900px) {
                            .hero-img-responsive {
                                margin-top: 2rem !important;
                                margin-left: 0 !important;
                                order: 2 !important;
                            }
                        }
                        `}
                    </style>
                    <div id="about" className="grid md:grid-cols-2 gap-10 mb-24">
                        <div className="bg-white/95 rounded-2xl shadow-xl p-10 flex flex-col items-start border border-green-100 hover:shadow-2xl transition">
                            <div className="flex items-center gap-4 mb-4">
                                {/* Mission Icon */}
                                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 shadow text-green-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                                    </svg>
                                </span>
                                <h2 className="text-2xl font-bold text-green-900 tracking-tight">Mission</h2>
                            </div>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                To drive sustainable agricultural growth and improve community livelihoods through innovative solutions, education, and collaborative partnerships.
                            </p>
                        </div>
                        <div className="bg-white/95 rounded-2xl shadow-xl p-10 flex flex-col items-start border border-green-100 hover:shadow-2xl transition">
                            <div className="flex items-center gap-4 mb-4">
                                {/* Vision Icon */}
                                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 shadow text-green-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 5-4.03 9-9 9s-9-4-9-9 4.03-9 9-9 9 4 9 9z" />
                                    </svg>
                                </span>
                                <h2 className="text-2xl font-bold text-green-900 tracking-tight">Vision</h2>
                            </div>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                To be a leading force in transforming agriculture, fostering innovation, and building resilient, thriving communities for generations to come.
                            </p>
                        </div>
                    </div>

                    {/* Programs Section */}
                    <div id="programs" className="mb-10">
                        <h2 className="text-4xl font-extrabold text-green-900 mb-12 text-center tracking-tight">Our Programs</h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            {/* FITS Program */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center border border-green-100 hover:shadow-2xl transition min-w-[320px]">
                                <img src={img1} alt="FITS Program" className="w-44 h-44 object-cover rounded-xl shadow" />
                                <div>
                                    <h3 className="text-2xl font-bold mb-3 text-green-700">FITS Program</h3>
                                    <p className="text-gray-700 text-lg">
                                        The Farmers' Information and Technology Services (FITS) Program delivers timely agricultural information and technology to empower farmers and stakeholders.
                                    </p>
                                </div>
                            </div>
                            {/* Crop Production */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center border border-green-100 hover:shadow-2xl transition min-w-[320px]">
                                <img src={img2} alt="Crop Production" className="w-44 h-44 object-cover rounded-xl shadow" />
                                <div>
                                    <h3 className="text-2xl font-bold mb-3 text-green-700">Crop Production</h3>
                                    <p className="text-gray-700 text-lg">
                                        Supporting sustainable crop production through modern techniques, research, and farmer education for increased yield and food security.
                                    </p>
                                </div>
                            </div>
                            {/* Fisheries Program */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center border border-green-100 hover:shadow-2xl transition min-w-[320px]">
                                <img src={img3} alt="Fisheries Program" className="w-44 h-44 object-cover rounded-xl shadow" />
                                <div>
                                    <h3 className="text-2xl font-bold mb-3 text-green-700">Fisheries Program</h3>
                                    <p className="text-gray-700 text-lg">
                                        Promoting responsible fisheries management and aquaculture to ensure sustainable livelihoods and healthy aquatic ecosystems.
                                    </p>
                                </div>
                            </div>
                            {/* Organic Farming */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center border border-green-100 hover:shadow-2xl transition min-w-[320px]">
                                <img src={img4} alt="Organic Farming" className="w-44 h-44 object-cover rounded-xl shadow" />
                                <div>
                                    <h3 className="text-2xl font-bold mb-3 text-green-700">Organic Farming</h3>
                                    <p className="text-gray-700 text-lg">
                                        Advancing organic farming practices for healthier produce, environmental stewardship, and improved farmer well-being.
                                    </p>
                                </div>
                            </div>
                            {/* Rabies Control */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center md:col-span-2 border border-green-100 hover:shadow-2xl transition min-w-[320px]">
                                <img src={img5} alt="Rabies Control" className="w-44 h-44 object-cover rounded-xl shadow" />
                                <div>
                                    <h3 className="text-2xl font-bold mb-3 text-green-700">Rabies Control</h3>
                                    <p className="text-gray-700 text-lg">
                                        Implementing comprehensive rabies prevention and control initiatives to safeguard public health and animal welfare.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </section>
            </main>
        </>
    )
}
