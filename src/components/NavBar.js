import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const favoritesCount = useSelector((state) => state.movies.favorites.length);

  const handleNavigate = () => {
    navigate('/favorites');
  };

  return (
    <nav className="bg-blue-600 text-white fixed w-full top-0 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span onClick={()=> navigate('/')} className="cursor-pointer font-bold text-xl">Movies App</span>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleNavigate}
              className="relative bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            >
              Favorites
              {favoritesCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
