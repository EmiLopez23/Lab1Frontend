import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Inventory from './pages/Inventory/Inventory';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/inventory" element={<Inventory/>} />
      </Routes>
    </Router>
  );
}

export default App;
