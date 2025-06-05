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

    // Slider state
    const programs = [
        {
            img: img1,
            title: "FITS Program",
            desc: "The Farmers' Information and Technology Services (FITS) Program delivers timely agricultural information and technology to empower farmers and stakeholders.",
        },
        {
            img: img2,
            title: "Crop Production",
            desc: "Supporting sustainable crop production through modern techniques, research, and farmer education for increased yield and food security.",
        },
         {
            img: img5,
            title: "Rabies Control",
            desc: "Implementing comprehensive rabies prevention and control initiatives to safeguard public health and animal welfare.",
        },
        {
            img: img3,
            title: "Fisheries Program",
            desc: "Promoting responsible fisheries management and aquaculture to ensure sustainable livelihoods and healthy aquatic ecosystems.",
        },
        {
            img: img4,
            title: "Organic Farming",
            desc: "Advancing organic farming practices for healthier produce, environmental stewardship, and improved farmer well-being.",
        },
        {
            img: img5,
            title: "Rabies Control",
            desc: "Implementing comprehensive rabies prevention and control initiatives to safeguard public health and animal welfare.",
        },
    ];

    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? programs.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === programs.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            <Navbar />
            <main className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen pt-16">
                <section className="max-w-6xl mx-auto px-4 py-14">
                    {/* Hero Section */}
                    <div
                        className="
                            w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]
                            flex flex-col md:flex-row items-center justify-center gap-6
                            bg-white/80 backdrop-blur rounded-3xl shadow-2xl p-10 mb-20 border border-green-100
                        "
                        style={{ flexWrap: 'wrap' }}
                    >
                        {/* Text and Buttons */}
                        <div className="flex-1 min-w-[260px] flex flex-col items-center justify-center">
                            <h1 className="text-5xl font-extrabold mb-6 text-green-900 leading-tight tracking-tight text-center">
                                Empowering Agriculture,<br />Enriching Lives
                            </h1>
                            <p className="text-xl text-gray-700 mb-8 text-center">
                                Advancing sustainable agriculture and community well-being through innovation and dedicated support.
                            </p>
                            <div className="flex gap-4 flex-wrap mb-8 justify-center">
                                <a href="#programs" className="bg-gradient-to-r from-green-600 to-green-800 text-white px-8 py-3 rounded-2xl font-semibold shadow hover:scale-105 transition-transform">
                                    Our Programs
                                </a>
                                <a href="#about" className="border-2 border-green-700 text-green-800 px-8 py-3 rounded-2xl font-semibold hover:bg-green-50 transition">
                                    Learn More
                                </a>
                            </div>
                        </div>
                        {/* Image: side on desktop, under on wrap */}
                        <div className="flex-1 flex justify-center items-center">
                            <img
                                src={fits}
                                alt="Fits Program"
                                className="
                                    w-full max-w-2xl rounded-3xl shadow-2xl object-cover min-w-[260px] self-center
                                    md:ml-8
                                    md:mt-0
                                    mt-8
                                    order-2
                                    md:order-none
                                "
                                style={{
                                    display: 'block',
                                    height: '380px',
                                    maxHeight: '420px',
                                }}
                            />
                        </div>
                    </div>
                    {/* Modern About Section - Redesigned & Larger */}
                    <div id="about" className="mb-28">
                        <div className="flex flex-col md:flex-row gap-10 items-stretch">
                            {/* Mission Card */}
                            <div className="flex-1 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl shadow-md border border-green-200 flex flex-col justify-between p-12 hover:shadow-2xl transition group">
                                <div>
                                    <div className="flex items-center gap-5 mb-6">
                                        <span className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-green-200 text-green-700 group-hover:bg-green-300 transition shadow-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                                            </svg>
                                        </span>
                                        <h2 className="text-3xl font-bold text-green-900">Mission</h2>
                                    </div>
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        To drive sustainable agricultural growth and improve community livelihoods through innovative solutions, education, and collaborative partnerships.
                                    </p>
                                </div>
                            </div>
                            {/* Divider for desktop */}
                            <div className="hidden md:flex flex-col justify-center">
                                <div className="w-1 h-32 bg-green-200 rounded-full mx-auto"></div>
                            </div>
                            {/* Vision Card */}
                            <div className="flex-1 bg-white/95 rounded-3xl shadow-lg border border-green-200 flex flex-col justify-between p-12 hover:shadow-2xl transition group">
                                <div>
                                    <div className="flex items-center gap-5 mb-6">
                                        <span className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-green-200 text-green-700 group-hover:bg-green-300 transition shadow-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 5-4.03 9-9 9s-9-4-9-9 4.03-9 9-9 9 4 9 9z" />
                                            </svg>
                                        </span>
                                        <h2 className="text-3xl font-bold text-green-900">Vision</h2>
                                    </div>
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        To be a leading force in transforming agriculture, fostering innovation, and building resilient, thriving communities for generations to come.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="programs" className="mb-20">
                        <h2 className="text-3xl font-extrabold text-green-900 mb-12 text-center tracking-tight">
                            Our Programs
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
                            {programs.map((program, idx) => (
                                <div
                                    key={idx}
                                    className="
                                        bg-gradient-to-br from-white via-green-50 to-green-100 rounded-3xl shadow-lg border border-green-100
                                        flex flex-col items-center p-8 relative overflow-hidden group transition-all duration-300
                                        hover:shadow-2xl hover:-translate-y-1
                                    "
                                >
                                    {/* Decorative floating icon */}
                                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-200 opacity-20 rounded-full z-0 group-hover:scale-110 transition-transform"></div>
                                    {/* Image */}
                                    <div className="relative z-10 w-24 h-24 rounded-2xl overflow-hidden shadow-lg mb-6 border-4 border-green-50 group-hover:border-green-300 transition-all duration-300">
                                        <img
                                            src={program.img}
                                            alt={program.title}
                                            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    {/* Title */}
                                    <h3 className="relative z-10 text-xl font-bold text-green-800 mb-2 text-center group-hover:text-green-900 transition">
                                        {program.title}
                                    </h3>
                                    {/* Description */}
                                    <p className="relative z-10 text-gray-600 text-base text-center mb-6">
                                        {program.desc}
                                    </p>
                                    {/* Call to Action */}
                                    <button
                                        className="
                                            mt-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold shadow
                                            hover:bg-green-800 hover:from-green-700 hover:to-green-800 transition
                                            relative z-10
                                        "
                                    >
                                        Learn More
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                            {/* Why Choose Us Section as Responsive Grid */}
                            <div className="mb-24">
                                <h2 className="text-3xl font-extrabold text-green-900 mb-10 text-center tracking-tight">
                                    Why Choose Us?
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                    {/* Card 1 */}
                            <div className="flex-1 bg-gradient-to-br from-green-50 to-green-100 rounded-3xl shadow-xl border border-green-200 flex flex-col items-center p-10 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                                <div className="bg-green-100 rounded-full p-4 mb-5 shadow">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 10c-4.418 0-8-3.582-8-8 0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.418-3.582 8-8 8z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-xl text-green-800 mb-2 text-center">Expert Support</h3>
                                <p className="text-gray-700 text-center text-base">
                                    Our team provides expert guidance and support to help you succeed in agriculture.
                                </p>
                            </div>
                            {/* Card 2 */}
                            <div className="flex-1 bg-gradient-to-br from-green-50 to-green-100 rounded-3xl shadow-xl border border-green-200 flex flex-col items-center p-10 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                                <div className="bg-green-100 rounded-full p-4 mb-5 shadow">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2m-4-6a4 4 0 100-8 4 4 0 000 8z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-xl text-green-800 mb-2 text-center">Community Focus</h3>
                                <p className="text-gray-700 text-center text-base">
                                    We are dedicated to uplifting communities and fostering sustainable growth.
                                </p>
                            </div>
                            {/* Card 3 */}
                            <div className="flex-1 bg-gradient-to-br from-green-50 to-green-100 rounded-3xl shadow-xl border border-green-200 flex flex-col items-center p-10 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                                <div className="bg-green-100 rounded-full p-4 mb-5 shadow">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-xl text-green-800 mb-2 text-center">Trusted & Secure</h3>
                                <p className="text-gray-700 text-center text-base">
                                    We ensure your data and interactions are safe and handled with integrity.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {/* Footer */}
            <footer className="bg-green-950 text-green-50 pt-12 pb-8">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row md:items-start md:justify-between gap-10">
                    {/* Brand & Description */}
                    <div className="flex-1 mb-8 md:mb-0">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="bg-green-800 rounded-full p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10C22 6.477 17.523 2 12 2z" />
                                </svg>
                            </span>
                            <span className="text-2xl font-extrabold tracking-tight">FITS-Tanza</span>
                        </div>
                        <p className="text-green-200 text-sm max-w-xs">
                            Advancing sustainable agriculture and community well-being through innovation and dedicated support.
                        </p>
                    </div>
                    {/* Quick Links */}
                    <div className="flex-1 mb-8 md:mb-0">
                        <h4 className="font-semibold text-green-100 mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-green-200 text-sm">
                            <li>
                                <a href="#about" className="hover:text-green-400 transition">About Us</a>
                            </li>
                            <li>
                                <a href="#programs" className="hover:text-green-400 transition">Programs</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-green-400 transition">Contact</a>
                            </li>
                        </ul>
                    </div>
                    {/* Social Media */}
                    <div className="flex-1">
                        <h4 className="font-semibold text-green-100 mb-3">Connect with us</h4>
                        <div className="flex gap-5 mb-4">
                            <a
                                href="https://facebook.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="bg-green-800 hover:bg-green-700 rounded-full p-2 transition"
                            >
                                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-green-100">
                                    <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
                                </svg>
                            </a>
                            <a
                                href="https://twitter.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                                className="bg-green-800 hover:bg-green-700 rounded-full p-2 transition"
                            >
                                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-green-100">
                                    <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 00-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.058 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.015-.634A9.936 9.936 0 0024 4.557z"/>
                                </svg>
                            </a>
                            <a
                                href="https://instagram.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="bg-green-800 hover:bg-green-700 rounded-full p-2 transition"
                            >
                                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-green-100">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.974.975 1.244 2.242 1.306 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.306 3.608-.975.974-2.242 1.244-3.608 1.306-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.306-.974-.975-1.244-2.242-1.306-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.332-2.633 1.306-3.608C4.513 2.565 5.78 2.295 7.146 2.233 8.412 2.175 8.792 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.127 4.659.392 3.678 1.373c-.98.98-1.245 2.092-1.302 3.373C2.012 5.668 2 6.077 2 12c0 5.923.012 6.332.07 7.613.057 1.281.322 2.393 1.302 3.373.98.98 2.092 1.245 3.373 1.302C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.281-.057 2.393-.322 3.373-1.302.98-.98 1.245-2.092 1.302-3.373.058-1.281.07-1.69.07-7.613 0-5.923-.012-6.332-.07-7.613-.057-1.281-.322-2.393-1.302-3.373-.98-.98-2.092-1.245-3.373-1.302C15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                                </svg>
                            </a>
                        </div>
                        <p className="text-green-300 text-xs">&copy; {new Date().getFullYear()} FITS-Tanza. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}
