import React from 'react'
import Navbar from '../../../Components/Navigation/Navbar'
import cover from '../../../Services/Authentication/Assets/Cover.jpg'
import fits from '../Assets/fits.jpg'
import img1 from '../Assets/1.jpg'
import img2 from '../Assets/2.jpg'
import img3 from '../Assets/3.jpg' 
import img4 from '../Assets/4.jpg'
import img5 from '../Assets/rabies.jpg'

export default function Landing() {
    return (
        <Navbar>
            <main className="mt-15">
                <div className="flex flex-col bg-blue-600 text-white mt-10 w-full max-w-full mx-auto rounded-lg shadow-lg p-8">
                    <div className="flex flex-col mt-10 mb-20">
                        <img src={fits} alt="Fits Program" className="mx-auto mt-0 mb-10 w-1/2 rounded" />
                        <div className="flex flex-col justify-center">
                            <h1 className="mb-5 font-semibold text-2xl">Mission</h1>
                            <p className="text-justify mb-5">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ipsum adipisci velit voluptate vitae, ullam maiores odio facere maxime autem quis eos atque assumenda itaque voluptates blanditiis dicta soluta culpa! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, doloremque illum veritatis ad praesentium nulla, recusandae quo odio ab in error veniam temporibus nisi minus dolorem corrupti, commodi inventore iste.
                            </p>
                            <h1 className="my-5 font-semibold text-2xl">Vision</h1>
                            <p className="text-justify">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ipsum adipisci velit voluptate vitae, ullam maiores odio facere maxime autem quis eos atque assumenda itaque voluptates blanditiis dicta soluta culpa! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, doloremque illum veritatis ad praesentium nulla, recusandae quo odio ab in error veniam temporibus nisi minus dolorem corrupti, commodi inventore iste.
                            </p>
                        </div>
                        <h2 className="my-10 font-semibold text-3xl text-center">Our Programs</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-1 ">
                            <div className="flex flex-row items-center">
                                <img src={img1} alt="FITS Program" className="w-72 h-72 object-cover rounded mb-2" />
                                <span className="font-medium mx-10">FITS Program Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus molestiae officiis labore officia voluptatibus ex numquam. Dolor molestiae temporibus iusto quae dolorem non similique impedit debitis asperiores error! Architecto, nihil.</span>
                            </div>
                            
                            <div className="flex flex-row items-center">
                                <span className="font-medium mx-10">Crop Production Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non consequuntur voluptatum provident eius minus ipsam qui possimus rem tempora maxime hic laborum reprehenderit quibusdam labore, recusandae beatae excepturi rerum dolor.</span>
                                <img src={img2} alt="Crop Production" className="w-72 h-72 object-cover rounded mb-2" />
                                
                            </div>
                            <div className="flex flex-row items-center">
                                <img src={img3} alt="Fisheries Program" className="w-72 h-72 object-cover rounded mb-2" />
                                <span className="font-medium mx-10">Fisheries Program Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus modi aperiam impedit unde quod a voluptatem rerum aliquam possimus incidunt. Praesentium, excepturi blanditiis doloribus dolore dolor repellat doloremque quis officiis?</span>
                            </div>
                            <div className="flex flex-row items-center">
                                <span className="font-medium mx-10">Organic Farming Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate quod doloribus at exercitationem voluptates eaque possimus non necessitatibus ut laborum soluta vitae quia, incidunt ipsam labore suscipit recusandae fugiat quasi.</span>
                                <img src={img4} alt="Organic Farming" className="w-72 h-72 object-cover rounded mb-2" />      
                            </div>
                            <div className="flex flex-col items-center">
                                <img src={img5} alt="Rabies Control" className="w-72 h-72 object-cover rounded mb-2" />
                                <span className="font-medium my-10">Rabies Control Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime quam deserunt voluptatem assumenda possimus repellendus exercitationem expedita, molestiae itaque perspiciatis dolorum nisi dignissimos ex non sapiente veniam velit! At, dolore.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Navbar>
    )
}
