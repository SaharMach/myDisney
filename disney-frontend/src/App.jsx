import React from 'react';
import './App.scss';
import { Home } from './pages/Home';
import { Routes, Route } from 'react-router';
import { store } from './store/store.js';
import { Provider } from 'react-redux';
import { MoviesIndex } from './pages/MoviesIndex';
import { MovieDetails } from './cmps/MovieDetails';
function App() {
  return (
    <main className='min-h-full'>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="studio/:studioId" element={<MoviesIndex />} />
            <Route path='/movie/:movieId' element={<MovieDetails />} />
          </Route>
        </Routes>
      </Provider>
    </main>
  );
}

export default App;
