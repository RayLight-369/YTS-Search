// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import SearchPage from './Pages/SearchPage/SearchPage';
import HomePage from './Pages/HomePage/HomePage';

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Navbar /> }>
          <Route index path='/' element={ <HomePage /> } />
          <Route path='/search' element={ <SearchPage /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
