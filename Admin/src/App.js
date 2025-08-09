import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from './Pages/Home/Home';
import Orders from './Pages/Orders/Orders';
import Sidebar from './Components/Sidebar/Sidebar';
import Products from './Pages/Products/Products';
import Analytics from './Pages/Analytics/Analytics';
import { AddProduct } from './Pages/AddProduct/AddProduct';
import { AddDesign } from './Pages/AddDesign/AddDesign';
import { AddCategory } from './Pages/AddCategory.js/AddCategory';
import { AddTheme } from './Pages/AddTheme/AddTheme';
import { Login } from './Pages/Login/Login';
import { Designs } from './Pages/Designs/Designs';
import Unauthorized from './Pages/Unauthorized/Unauthorized';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { AddWorker } from './Pages/AddWorker/AddWorker';
import { Profile } from './Pages/Profile/Profile';
import { EditProduct } from './Pages/EditProduct/EditProduct';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="AppGlass">
          <Sidebar/>
            <Routes>
              <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
              <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
              <Route path="/products/" element={<ProtectedRoute><Products/></ProtectedRoute>}/>
              <Route path="/products/:product_id" element={<ProtectedRoute><EditProduct/></ProtectedRoute>}/>
              <Route path="/designs" element={<ProtectedRoute><Designs/></ProtectedRoute>}/>
              <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>

              <Route path="/analytics" element={<ProtectedRoute adminOnly={true}><Analytics/></ProtectedRoute>}/>
              <Route path="/add-product" element={<ProtectedRoute adminOnly={true}><AddProduct/></ProtectedRoute>}/>
              <Route path="/add-design/:product_id?" element={<ProtectedRoute adminOnly={true}><AddDesign/></ProtectedRoute>}/>
              <Route path="/add-category" element={<ProtectedRoute adminOnly={true}><AddCategory/></ProtectedRoute>}/>
              <Route path="/add-theme" element={<ProtectedRoute adminOnly={true}><AddTheme/></ProtectedRoute>}/>
              <Route path="/add-user" element={<ProtectedRoute adminOnly={true}><AddWorker/></ProtectedRoute>}/>

              <Route path="/login" element={<Login/>}/>
              <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
