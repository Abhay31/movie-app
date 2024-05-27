import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  movies: [],
  favorites: [],
  status: 'idle',
  error: null,
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  await delay(1000);
  const response = await axios.get(process.env.REACT_APP_MOVIES_API_URL);
  return response.data.sort((a, b) => b.rating - a.rating);
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(movie => movie.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addFavorite, removeFavorite } = moviesSlice.actions;
export default moviesSlice.reducer;
