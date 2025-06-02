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
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 mt-30">
            <div className="w-full max-w-6xl px-2 sm:px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {equipmentList.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-lg shadow-sm flex flex-col justify-between items-center w-full min-h-[340px] p-4 relative"
                        >
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-40 object-contain rounded mb-3 bg-gray-100"
                            />
                            <div className="flex-1 flex flex-col justify-start w-full text-center">
                                <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
                                <p className="text-gray-500 text-sm mb-2">{item.desc}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 w-full absolute left-0 bottom-4 px-4">
                                <Link
                                    to={`/borrow/${idx}`}
                                    className="flex-1 bg-blue-700 text-white py-2 rounded font-semibold text-sm hover:bg-blue-600 transition-colors border border-transparent text-center"
                                >
                                    Borrow
                                </Link>
                                <Link
                                    to={`/details/${idx}`}
                                    className="flex-1 bg-white text-blue-700 py-2 rounded font-semibold text-sm border border-blue-700 hover:bg-blue-50 transition-colors text-center"
                                >
                                    Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
