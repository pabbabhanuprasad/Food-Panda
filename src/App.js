import './App.css';
import Header from './Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom';
import CardsDetails from './Components/CardsDetails';
import Cards from './Components/Cards';
import Register from './Components/Register';
import LogIn from './Components/LogIn';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Cards/>} />
        <Route path="/cart/:id" element={<CardsDetails/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<LogIn/>} />
      </Routes>
    
    </div>
    
  );
}

export default App;
