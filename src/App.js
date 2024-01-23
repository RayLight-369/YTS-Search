// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import SearchPage from './Pages/SearchPage/SearchPage';
import HomePage from './Pages/HomePage/HomePage';
import { AnimatePresence } from 'framer-motion';

function App () {
  return (
    <BrowserRouter>
      <AnimatePresence mode='wait'>
        <Routes>
          <Route path='/' element={ <Navbar /> }>
            <Route index path='/' element={ <HomePage /> } />
            <Route path='/movies' element={ <SearchPage /> } />
          </Route>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
