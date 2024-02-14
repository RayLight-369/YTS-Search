// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import SearchPage from './Pages/SearchPage/SearchPage';
import HomePage from './Pages/HomePage/HomePage';
import AnimePage from './Pages/AnimePage/AnimePage';
import { AnimatePresence } from 'framer-motion';
import AnimeInfoPage from './Pages/AnimeInfoPage/AnimeInfoPage';

function App () {
  return (
    <BrowserRouter>
      <AnimatePresence mode='wait'>
        <Routes>
          <Route path='/' element={ <Navbar /> }>
            <Route index path='/' element={ <HomePage /> } />
            <Route path='/movies' element={ <SearchPage /> } />
            <Route path='/anime' element={ <AnimePage /> } />
            <Route path='/anime/:animeID' element={ <AnimeInfoPage /> } />

          </Route>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}


export default App;
