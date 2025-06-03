import Shovel from './Assets/Shovel.webp'
import Pandilig from './Assets/pandilig.webp'  
import { Link } from 'react-router-dom';

const equipmentList = [
    {
        name: 'Item',
        desc: 'Used for turning over soil to prepare for planting.',
        img: 'plow-image-url',
    },
    {
        name: 'Pandilig',
        desc: 'njwdwsdwdwd. ',
        img: Pandilig,
    },
    {
        name: 'Plows',
        desc: 'Pang hukay ng bangkay to boss',
        img: Shovel,
    },
    {
        name: 'Plows',
        desc: 'Used for turning over soil to prepare for planting.',
        img: 'plow-image-url',
    },
    {
        name: 'Plows',
        desc: 'Used for turning over soil to prepare for planting.',
        img: 'plow-image-url',
    },
    {
        name: 'Plows',
        desc: 'Used for turning over soil to prepare for planting.',
        img: 'plow-image-url',
    },
    {
        name: 'Plows',
        desc: 'Used for turning over soil to prepare for planting.',
        img: 'plow-image-url',
    },
    {
        name: 'Plows',
        desc: 'Used for turning over soil to prepare for planting.',
        img: 'plow-image-url',
    },
]

export default function Items() {
    return (
         <div className="pt-10 min-h-screen w-full pb-5 bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center px-2 sm:px-6">
                    <div className="w-full max-w-7xl">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center tracking-tight">
                           Items List
                        </h2>
                        <div
                            className="overflow-y-auto pr-2"
                            style={{
                                maxHeight: '600px',
                            }}
                        >
                            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                                {equipmentList.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white rounded-2xl shadow-lg flex flex-col justify-between items-center w-full min-h-[370px] p-6 relative hover:shadow-2xl transition-shadow duration-300"
                                    >
                                        <div className="w-full flex justify-center mb-4">
                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                className="w-32 h-32 object-contain rounded-xl bg-gray-100 shadow-sm"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-start w-full text-center">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                                            <p className="text-gray-500 text-base mb-4">{item.desc}</p>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full mt-2">
                                            <Link
                                                to={`/borrow/${idx}`}
                                                className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-2.5 rounded-lg font-semibold text-base hover:from-blue-700 hover:to-green-600 transition-colors border border-transparent text-center shadow"
                                            >
                                                Borrow
                                            </Link>
                                            <Link
                                                to={`/details/${idx}`}
                                                className="w-full bg-white text-blue-700 py-2.5 rounded-lg font-semibold text-base border border-blue-600 hover:bg-blue-50 transition-colors text-center shadow"
                                            >
                                                Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
    )
}
