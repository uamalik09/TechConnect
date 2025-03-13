import { useNavigate } from 'react-router-dom';

const IetSig = () => {
    const navigate = useNavigate();

    // Array of club data
    const clubs = [
        { name: 'Cipher', path: '/getcipherdetails' },
        { name: 'ROVISP', path: '/getrovispdetails' },
        { name: 'Venture', path: '/getventuredetails' },
        { name: 'Torsion', path: '/gettorsiondetails' },
        { name: 'Inkheart', path: '/getinkheartdetails' },
        { name: 'Media', path: '/getmediadetails' }
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {clubs.map((club, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-2xl shadow-lg text-center cursor-pointer hover:bg-blue-500 hover:text-white transition duration-300"
                        onClick={() => navigate(club.path)}
                    >
                        <h2 className="text-xl font-bold">{club.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IetSig;
