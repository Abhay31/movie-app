import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, addFavorite, removeFavorite } from '../store/moviesSlice';
import { FaHeart, FaArrowUp } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HashLoader from 'react-spinners/HashLoader';

function MovieList() {
  const dispatch = useDispatch();
  const { movies, favorites, status, error } = useSelector(state => state.movies);
  const [sortOption, setSortOption] = useState('none');

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleFavorite = (movie) => {
    if (favorites.find(fav => fav.id === movie.id)) {
      dispatch(removeFavorite(movie));
    } else {
      dispatch(addFavorite(movie));
      toast.success('Added to favorites');
    }
  };

  const getAbsoluteImageUrl = (url) => {
    const absoluteUrl = url.startsWith('http') ? url : `${process.env.REACT_APP_BASE_URL}/${url}`;
    return absoluteUrl;
  };

  const handleCardClick = (url) => {
    window.open(url, '_blank');
  };

  const sortMovies = (movies, option) => {
    if (option === 'low-to-high') {
      return [...movies].sort((a, b) => a.rating - b.rating);
    } else if (option === 'high-to-low') {
      return [...movies].sort((a, b) => b.rating - a.rating);
    } else {
      return movies;
    }
  };

  const sortedMovies = sortMovies(movies, sortOption);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader size={60} color="#4fa94d" />
      </div>
    );
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="mt-18">
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2">Sort by Rating:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="none">None</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sortedMovies.map(movie => (
          <div key={movie.id} className="card bg-white p-4 rounded-lg shadow flex flex-col cursor-pointer">
            <img src={getAbsoluteImageUrl(movie.image)} alt={movie.image} className="w-full h-48 object-cover" onClick={() => handleCardClick(movie.imdb_url)} />
            <div className="flex-grow mt-2">
              <h3 className="text-lg font-bold" onClick={() => handleCardClick(movie.imdb_url)}>{movie.movie}</h3>
              <div className="mt-2 flex justify-between items-center">
                <p className="mr-2">Rating: {movie.rating}</p>
                <button
                  onClick={() => handleFavorite(movie)}
                  className="text-xl focus:outline-none"
                >
                  <FaHeart className={`transition-colors duration-300 ${favorites.find(fav => fav.id === movie.id) ? 'text-red-500' : 'text-gray-500'}`} />
                </button>
              </div>
            </div>
          </div>
        ))}
        <ToastContainer />
      </div>
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 left-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 z-50"
      >
        <FaArrowUp className="text-2xl" />
      </button>
    </div>
  );
}

export default MovieList;
