import './App.css';
import { Announcement } from './components/Announcement/Announcement';
import Footer from './components/Footer/Footer';
import { NavBar } from './components/Navbar/Navbar';
import Boutique from './pages/Boutique/Boutique';
import { Cart } from './pages/Cart/Cart';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Product } from './pages/Product/Product';
import { Register } from './pages/Register/Register';
import { Login } from './pages/Login/Login';
import { Order } from './pages/Order/Order';

function App() {
  return (
    <Router>
      <div className="App">
        <Announcement/>
        <NavBar/>
      <div style={{marginTop:"90px"}}></div>
      <Routes>
        <Route path="/:category?" element={<Boutique/>} />
        <Route path="/products/:id" element={<Product/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Footer/>
      </div>
    </Router>
  );
}

export default App;
