import React from 'react';
import './App.scss';
import { Home } from './pages/Home';
import { Routes, Route } from 'react-router';
import { store } from './store/store.js';
import { Provider } from 'react-redux';
import { MoviesIndex } from './pages/MoviesIndex';
import { MovieDetails } from './cmps/MovieDetails';
import { MovieTrailer } from './cmps/MovieTrailer.jsx';
import { Search } from './pages/Search.jsx';
import { LoginSignup } from './pages/LoginPage.jsx';
import { WatchList } from './pages/WatchList.jsx';
import { Series } from './pages/Series.jsx';
function App() {
  return (
    <main className='min-h-full'>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="studio/:studioId" element={<MoviesIndex />} />
            <Route path='/movie/:movieId' element={<MovieDetails />} />
            <Route path='/search' element={<Search />} />
            <Route path='watchlist' element={<WatchList />} />
            <Route path='/series' element={<Series />} />
          </Route>
          <Route path='/trailer/:movieName' element={<MovieTrailer />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
      </Provider>
    </main>
  );
}

export default App;
