import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../store/moviesSlice';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

function FavoriteList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector(state => state.movies.favorites);

  const handleUnfavorite = (movie) => {
    dispatch(removeFavorite(movie));
  };

  const getAbsoluteImageUrl = (url) => {
    const absoluteUrl = url.startsWith('http') ? url : `${process.env.REACT_APP_BASE_URL}/${url}`;
    console.log('Image URL:', absoluteUrl);
    return absoluteUrl;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <h2 className="text-2xl font-bold mb-6">My Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {favorites.map(movie => (
          <div key={movie.id} className="card bg-white p-4 rounded-lg shadow flex flex-col">
            <img src={getAbsoluteImageUrl(movie.image)} alt={movie.image} className="w-full h-48 object-cover" />
            <div className="flex-grow mt-2">
              <h3 className="text-lg font-bold">{movie.movie}</h3>
              <p>Rating: {movie.rating}</p>
            </div>
            <div className="mt-auto pt-2 flex justify-between items-center">
              <a href={movie.imdb_url} target="_blank" rel="noopener noreferrer" className="block px-2 py-1 bg-yellow-400 text-black rounded">
                View on IMDb
              </a>
              <button
                onClick={() => handleUnfavorite(movie)}
                className="text-xl focus:outline-none"
              >
                <FaHeart
                  className="transition-colors duration-300 text-red-500"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/')}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full"
      >
        Back to Movies
      </button>
    </div>
  );
}

export default FavoriteList;
