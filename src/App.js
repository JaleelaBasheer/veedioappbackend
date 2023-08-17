import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage';
import { Route, Routes } from 'react-router-dom';
import  Home  from './pages/Home'
import Watchhistory from './pages/Watchhistory';



function App() {
  return (
    <>
    <Header/>
    <div className="container m-5">
     <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/home' element={<Home/>} /> 
      <Route path='/watchhistory' element={<Watchhistory/>} />    
   
     </Routes>    
    </div>
    <Footer/>
    </>
  );
}

export default App;
