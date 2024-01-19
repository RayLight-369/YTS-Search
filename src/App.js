// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import MainPage from './Pages/MainPage/MainPage';

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Navbar /> }>
          <Route index path='/' element={ <MainPage /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
