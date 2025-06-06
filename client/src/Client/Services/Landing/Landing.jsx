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
import img6 from './Assets/bg.jpg'

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

    // Animation on scroll
    useEffect(() => {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        const handleScroll = () => {
            revealElements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight - 80) {
                    el.classList.add('opacity-100', 'translate-y-0');
                }
            });
        };
        // Initial check
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Navbar />
            <main className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen pt-16">
                <section className="max-w-6xl mx-auto px-4 py-14">
                    
                    <div
                        className="
                            w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]
                            flex flex-col items-center justify-center gap-6
                            bg-black/80 backdrop-blur  shadow-2xl p-20 mb-20 border border-green-900
                            overflow-hidden
                            reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700
                        "
                    >
                        {/* Background image overlay */}
                        <img
                            src={img6}
                            alt="Background"
                            className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
                        />
                        {/* Text and Buttons */}
                        <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center">
                            <h1 className="text-5xl font-extrabold mb-6 text-white leading-tight tracking-tight drop-shadow-2xl" style={{ textShadow: '0 4px 24px rgba(0,0,0,0.95), 0 1px 0 #fff' }}>
                                Empowering Agriculture,<br />Enriching Lives
                            </h1>
                            <p className="text-xl text-white mb-8 drop-shadow-2xl font-semibold" style={{ textShadow: '0 4px 24px rgba(0,0,0,0.95), 0 1px 0 #fff' }}>
                                Advancing sustainable agriculture and community well-being through innovation and dedicated support.
                            </p>
                            <div className="flex gap-4 flex-wrap mb-8 justify-center">
                                <a href="#programs" className="bg-gradient-to-r from-green-600 to-green-800 text-white px-8 py-3 rounded-2xl font-semibold shadow hover:scale-105 transition-transform">
                                    Our Programs
                                </a>
                                <a href="#about" className="border-2 border-green-100 text-green-50 px-8 py-3 rounded-2xl font-semibold hover:bg-green-900/30 transition">
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div id="about" className="mb-28">
                        <div className="flex flex-col md:flex-row gap-10 items-stretch">
                            {/* Mission Card */}
                             <div className="flex-1 bg-gradient-to-br from-green-200 via-green-50 to-green-100 rounded-3xl shadow-lg border border-green-200 flex flex-col justify-between p-12 hover:shadow-2xl  group reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
                                <div>
                                    <div className="flex items-center gap-5 mb-6">
                                        <span className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-green-200 text-green-700 group-hover:bg-green-300 transition shadow-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                                            </svg>
                                        </span>
                                        <h2 className="text-3xl font-bold text-green-900">Mission</h2>
                                    </div>
                                    <p className="text-gray-800 text-lg leading-relaxed font-semibold">
                                        To drive sustainable agricultural growth and improve community livelihoods through innovative solutions, education, and collaborative partnerships.
                                    </p>
                                </div>
                            </div>
                            {/* Divider for desktop */}
                            <div className="hidden md:flex flex-col justify-center">
                                <div className="w-1 h-32 bg-green-200 rounded-full mx-auto"></div>
                            </div>
                        {/* Vision Card */}
                        <div className="flex-1 bg-gradient-to-br from-green-200 via-green-50 to-green-100 rounded-3xl shadow-lg border border-green-200 flex flex-col justify-between p-12 hover:shadow-2xl  group reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
                            <div>
                                <div className="flex items-center gap-5 mb-6">
                                    <span className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-green-300 text-green-800 group-hover:bg-green-400 transition shadow-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 5-4.03 9-9 9s-9-4-9-9 4.03-9 9-9 9 4 9 9z" />
                                        </svg>
                                    </span>
                                    <h2 className="text-3xl font-bold text-green-900">Vision</h2>
                                </div>
                                <p className="text-gray-800 text-lg leading-relaxed font-semibold">
                                    To be a leading force in transforming agriculture, fostering innovation, and building resilient, thriving communities for generations to come.
                                </p>
                            </div>
                        </div>
                        </div>
                        </div>
                        <div id="programs" className="mb-20">
                            <h2 className="text-3xl font-extrabold text-green-900 mb-12 text-center tracking-tight reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
                                Our Programs
                            </h2>
                            <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
                                {programs.map((program, idx) => (
                                    <div
                                        key={idx}
                                        className="
                                            bg-gradient-to-br from-green-900 via-green-800 to-green-700 rounded-3xl shadow-2xl border border-green-900
                                            flex flex-col items-center p-8 relative overflow-hidden group transition-all duration-700
                                            hover:shadow-3xl hover:-translate-y-1
                                            w-full sm:w-[340px] md:w-[320px] lg:w-[300px]
                                            reveal-on-scroll opacity-0 translate-y-10 
                                        "
                                        style={{ transitionDelay: `${100 + idx * 80}ms` }}
                                    >
                                        {/* Decorative floating icon */}
                                        <div className="absolute -top-8 -right-8 w-28 h-28 bg-green-600 opacity-10 rounded-full z-0 group-hover:scale-110 transition-transform"></div>
                                        {/* Image */}
                                        <div className="relative z-10 w-24 h-24 rounded-2xl overflow-hidden shadow-lg mb-6 border-4 border-green-800 group-hover:border-green-600 transition-all duration-300 bg-green-950">
                                            <img
                                                src={program.img}
                                                alt={program.title}
                                                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        {/* Title */}
                                        <h3 className="relative z-10 text-xl font-bold text-green-50 mb-2 text-center group-hover:text-green-200 transition">
                                            {program.title}
                                        </h3>
                                        {/* Description */}
                                        <p className="relative z-10 text-green-100 text-base text-center mb-6 font-medium">
                                            {program.desc}
                                        </p>
                                        {/* Call to Action */}
                                        <button
                                            className="
                                                mt-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-300 to-green-400 text-green-900 font-semibold shadow
                                                hover:bg-green-200 hover:from-green-200 hover:to-green-300 transition
                                                relative z-10 border border-green-200
                                            "
                                        >
                                            Learn More
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                       
                        <section className="max-w-6xl mx-auto px-4 py-14 mb-20">
                            <h2 className="text-3xl font-extrabold text-green-900 mb-10 text-center tracking-tight reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
                                Latest News & Updates
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* News Card 1 */}
                                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-green-100 p-8 flex flex-col hover:shadow-2xl  group reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
                                    <div className="relative mb-5">
                                        <img src={fits} alt="FITS Center" className="w-full h-40 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300" />
                                        <span className="absolute top-3 right-3 bg-green-700 text-green-50 text-xs px-3 py-1 rounded-full font-bold shadow">New</span>
                                    </div>
                                    <h3 className="font-bold text-lg text-green-900 mb-2">FITS Center Launches New Farmer Training</h3>
                                    <p className="text-gray-800 text-base mb-4 font-semibold">
                                        The FITS Center recently conducted a hands-on training session for local farmers, focusing on sustainable crop management and modern agricultural techniques.
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-green-700 text-sm font-semibold">June 2024</span>
                                        <a href="#" className="text-green-700 font-bold hover:underline flex items-center gap-1 transition">
                                            Read More
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                {/* News Card 2 */}
                                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-green-100 p-8 flex flex-col hover:shadow-2xl  group reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
                                    <div className="relative mb-5">
                                        <img src={img4} alt="Organic Farming" className="w-full h-40 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300" />
                                        <span className="absolute top-3 right-3 bg-green-600 text-green-50 text-xs px-3 py-1 rounded-full font-bold shadow">Update</span>
                                    </div>
                                    <h3 className="font-bold text-lg text-green-900 mb-2">Organic Farming Initiative Expands</h3>
                                    <p className="text-gray-800 text-base mb-4 font-semibold">
                                        Our organic farming program has expanded to include more barangays, promoting healthier produce and eco-friendly practices across the region.
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-green-700 text-sm font-semibold">May 2024</span>
                                        <a href="#" className="text-green-700 font-bold hover:underline flex items-center gap-1 transition">
                                            Read More
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                {/* News Card 3 */}
                                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-green-100 p-8 flex flex-col hover:shadow-2xl  group reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300">
                                    <div className="relative mb-5">
                                        <img src={img5} alt="Rabies Control" className="w-full h-40 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300" />
                                        <span className="absolute top-3 right-3 bg-green-500 text-green-50 text-xs px-3 py-1 rounded-full font-bold shadow">Event</span>
                                    </div>
                                    <h3 className="font-bold text-lg text-green-900 mb-2">Rabies Awareness Campaign</h3>
                                    <p className="text-gray-800 text-base mb-4 font-semibold">
                                        The Rabies Control team held a successful awareness drive, educating pet owners and distributing free vaccines to ensure community safety.
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-green-700 text-sm font-semibold">April 2024</span>
                                        <a href="#" className="text-green-700 font-bold hover:underline flex items-center gap-1 transition">
                                            Read More
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* Swapped: Why Choose Us comes after Latest News & Updates */}
                        <div className="mb-24">
                            <h2 className="text-3xl font-extrabold text-green-900 mb-10 text-center tracking-tight reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
                                Why Choose Us?
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                {/* Card 1 */}
                                <div className="flex-1 bg-gradient-to-br from-green-900 via-green-800 to-green-700 rounded-3xl shadow-xl border border-green-900 flex flex-col items-center p-10 hover:scale-105 hover:shadow-2xl transition-all duration-300 reveal-on-scroll opacity-0 translate-y-10  delay-100">
                                    <div className="bg-green-800 rounded-full p-4 mb-5 shadow">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 10c-4.418 0-8-3.582-8-8 0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.418-3.582 8-8 8z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-xl text-green-50 mb-2 text-center">Expert Support</h3>
                                    <p className="text-green-100 text-center text-base font-semibold">
                                        Our team provides expert guidance and support to help you succeed in agriculture.
                                    </p>
                                </div>
                                {/* Card 2 */}
                                <div className="flex-1 bg-gradient-to-br from-green-900 via-green-800 to-green-700 rounded-3xl shadow-xl border border-green-900 flex flex-col items-center p-10 hover:scale-105 hover:shadow-2xl transition-all duration-700 reveal-on-scroll opacity-0 translate-y-10  delay-200">
                                    <div className="bg-green-800 rounded-full p-4 mb-5 shadow">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2m-4-6a4 4 0 100-8 4 4 0 000 8z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-xl text-green-50 mb-2 text-center">Community Focus</h3>
                                    <p className="text-green-100 text-center text-base font-semibold">
                                        We are dedicated to uplifting communities and fostering sustainable growth.
                                    </p>
                                </div>
                                {/* Card 3 */}
                                <div className="flex-1 bg-gradient-to-br from-green-900 via-green-800 to-green-700 rounded-3xl shadow-xl border border-green-900 flex flex-col items-center p-10 hover:scale-105 hover:shadow-2xl  reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300">
                                    <div className="bg-green-800 rounded-full p-4 mb-5 shadow">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-xl text-green-50 mb-2 text-center">Trusted & Secure</h3>
                                    <p className="text-green-100 text-center text-base font-semibold">
                                        We ensure your data and interactions are safe and handled with integrity.
                                    </p>
                                </div>
                            </div>
                        </div>
                        </section>
                        </main>
                        
                        <section className="max-w-5xl mx-auto mb-20 px-4 mt-10 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
                            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950  shadow-2xl border border-gray-700 p-10 md:p-16 relative overflow-hidden">
                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent"></div>
                                </div>
                                <header className="mb-10 border-b border-gray-700 pb-6 flex flex-col md:flex-row md:items-end md:justify-between">
                                    <div>
                                        <h2 className="text-4xl font-extrabold text-green-100 tracking-widest uppercase mb-2" style={{ fontFamily: 'serif', letterSpacing: '0.12em' }}>
                                            Agri-Connect Gazette
                                        </h2>
                                        <p className="text-green-300 text-lg font-semibold tracking-wide">Your Weekly Source for Agricultural News</p>
                                    </div>
                                    <span className="text-green-400 font-mono text-sm mt-4 md:mt-0">Edition: {new Date().toLocaleDateString()}</span>
                                </header>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                    {/* Lead Story */}
                                    <article className="md:col-span-2 bg-gray-950/80 rounded-2xl p-8 shadow-lg border border-gray-800 flex flex-col">
                                        <h3 className="text-2xl font-bold text-green-100 mb-3 font-serif">Farmers Embrace Smart Tech for Bumper Harvest</h3>
                                        <p className="text-green-200 text-base mb-4 font-medium">
                                            Local farmers are adopting smart sensors and data-driven irrigation, resulting in record-breaking yields this season. “We can now monitor soil moisture and weather in real-time,” says farmer Ana Cruz. The FITS Center continues to provide training and support for integrating technology into traditional farming.
                                        </p>
                                        <div className="flex items-center gap-4 mt-auto">
                                            <span className="text-green-400 text-xs font-semibold">By J. Dela Cruz</span>
                                            <span className="text-green-700 text-xs">Front Page</span>
                                        </div>
                                    </article>
                                    {/* Sidebar Stories */}
                                    <div className="flex flex-col gap-8">
                                        <article className="bg-gray-950/80 rounded-2xl p-6 shadow border border-gray-800">
                                            <h4 className="text-lg font-bold text-green-200 mb-2 font-serif">Organic Market Opens Downtown</h4>
                                            <p className="text-green-300 text-sm mb-2">
                                                The new organic market offers fresh, locally grown produce every Saturday. Vendors highlight the benefits of chemical-free farming.
                                            </p>
                                            <span className="text-green-500 text-xs">Community</span>
                                        </article>
                                        <article className="bg-gray-950/80 rounded-2xl p-6 shadow border border-gray-800">
                                            <h4 className="text-lg font-bold text-green-200 mb-2 font-serif">Youth Join Agri Bootcamp</h4>
                                            <p className="text-green-300 text-sm mb-2">
                                                Over 50 students participated in the Agri Bootcamp, learning about sustainable practices and agri-entrepreneurship.
                                            </p>
                                            <span className="text-green-500 text-xs">Education</span>
                                        </article>
                                    </div>
                                </div>
                                {/* Bottom Row: Columns */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                                    <div className="bg-gray-950/70 rounded-xl p-6 border border-gray-800">
                                        <h5 className="text-green-100 font-bold mb-2 font-serif">Weather Watch</h5>
                                        <p className="text-green-300 text-sm">
                                            Expect scattered showers this week. Farmers are advised to adjust irrigation schedules accordingly.
                                        </p>
                                    </div>
                                    <div className="bg-gray-950/70 rounded-xl p-6 border border-gray-800">
                                        <h5 className="text-green-100 font-bold mb-2 font-serif">Market Prices</h5>
                                        <ul className="text-green-300 text-sm space-y-1">
                                            <li>Rice: <span className="text-green-400 font-semibold">₱42/kg</span></li>
                                            <li>Corn: <span className="text-green-400 font-semibold">₱18/kg</span></li>
                                            <li>Eggplant: <span className="text-green-400 font-semibold">₱35/kg</span></li>
                                        </ul>
                                    </div>
                                    <div className="bg-gray-950/70 rounded-xl p-6 border border-gray-800">
                                        <h5 className="text-green-100 font-bold mb-2 font-serif">Upcoming Events</h5>
                                        <ul className="text-green-300 text-sm space-y-1">
                                            <li>June 20: <span className="text-green-400">Agri Fair</span></li>
                                            <li>June 25: <span className="text-green-400">Organic Workshop</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <footer className="mt-10 border-t border-gray-700 pt-6 text-green-500 text-xs text-center font-mono">
                                    For more stories, visit our <span className="underline text-green-300">Newsroom</span> or follow us on social media.
                                </footer>
                            </div>
                        </section>

                        
                        
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
                        <p className="text-green-100 text-base max-w-xs font-semibold">
                            Advancing sustainable agriculture and community well-being through innovation and dedicated support.
                        </p>
                    </div>
                    {/* Quick Links */}
                    <div className="flex-1 mb-8 md:mb-0">
                        <h4 className="font-semibold text-green-100 mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-green-100 text-base font-semibold">
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
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.974.975 1.244 2.242 1.306 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.306 3.608-.975.974-2.242 1.244-3.608 1.306-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.306-.974-.975-1.244-2.242-1.306-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.332-2.633 1.306-3.608C4.513 2.565 5.78 2.295 7.146 2.233 8.412 2.17 8.792 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.127 4.659.392 3.678 1.373c-.98.98-1.245 2.092-1.302 3.373C2.012 5.668 2 6.077 2 12c0 5.923.012 6.332.07 7.613.057 1.281.322 2.393 1.302 3.373.98.98 2.092 1.245 3.373 1.302C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.281-.057 2.393-.322 3.373-1.302.98-.98 1.245-2.092 1.302-3.373.058-1.281.07-1.69.07-7.613 0-5.923-.012-6.332-.07-7.613-.057-1.281-.322-2.393-1.302-3.373-.98-.98-2.092-1.245-3.373-1.302C15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                                </svg>
                            </a>
                        </div>
                        <p className="text-green-200 text-xs">&copy; {new Date().getFullYear()} FITS-Tanza. All rights reserved.</p>
                    </div>
                </div>
            </footer>
            <style>{`
        html, body, #root {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar, #root::-webkit-scrollbar {
          display: none;
        }
        .letter-spacing-wide {
          letter-spacing: 0.15em;
        }
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(40px);
        }
        .reveal-on-scroll.opacity-100 {
          opacity: 1 !important;
        }
        .reveal-on-scroll.translate-y-0 {
          transform: translateY(0) !important;
        }
      `}</style>
    </>
    )
}
