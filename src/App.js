import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Landingpage from './Pages/Landingpage';
import Watchhistory from './Pages/Watchhistory';
import Home from './Pages/Home';


function App() {
  return (
    <div className="App">
      <Header/>

      
      <Routes>
       <Route path='/' element={<Landingpage/>}/> {/* localhost:3000 - Landing page*/}
       <Route path='/home' element={<Home/>}/>  {/* localhost:3000/home - home page*/}
       <Route path='/watch-history' element={<Watchhistory/>}/>
      </Routes>
      <Footer/>
    
    </div>
  );
}

export default App;
