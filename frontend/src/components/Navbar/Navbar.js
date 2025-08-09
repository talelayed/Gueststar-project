import { useEffect, useRef, useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
// import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuIcon from '@mui/icons-material/Menu';
// import { emptyUser } from "../Redux/slices/AuthSlice";
import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom";
import { MobileNavBar } from "../MobileNavBar/MobileNavBar";

const cart = {quantity: 2}

const LinkStyle = { textDecoration: "none", color: "black", margin:"auto 0 auto 0", pointer: "cursor" };

export const NavBar = () => {
  const [navbar, setNavbar] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
//   const authState = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

  const changeBackgroundColor = () => {
    if (window.scrollY >= 15) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    changeBackgroundColor();
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackgroundColor);
  });

  const handleLogout = () => {
    // const confirm = window.confirm("Do you want to logout?");
    // if(confirm)
    // dispatch(emptyUser());
  }

//   const cart = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div>
    <MobileNavBar isOpen={isOpen} setIsOpen={setIsOpen} />
    <div className={navbar ? "active container" : "container"}>
      <div className="wrapper">
        <div className="left">
          <div onClick={()=>{setIsOpen(!isOpen)}} id="menu-icon" style={LinkStyle} to="/">
            <MenuIcon sx={{fontSize: "40px", margin: "auto", textAlign: "center"}}/>
          </div>
          <Link style={LinkStyle} to="/">
            <div>
              {/* <img id="logo" src="/assets/images/Mezyen logo.png" /> */}
            </div>
          </Link>
          <Link
            style={LinkStyle}
            to="/Boutique"
          >
            <h1 className="menu-item">Boutique</h1>
          </Link>
          <Link
            style={LinkStyle}
            to="/Promotions"
          >
            <h1 className="menu-item">Promotions</h1>
          </Link>
          <Link
            style={LinkStyle}
            to="/Thèmes"
          >
            <h1 className="menu-item">Thèmes</h1>
          </Link>
        </div>
        <div className="center">
        <div classname="search"/>
            <h1 className="search-item">
              <SearchIcon sx={{marginTop: "5px", fontSize: 30 }}/>
            </h1>
            <input className="search-input" type="text" placeholder="Rechercher..."/>
        </div>
        <div className="right">
           {
          }
          <h1 className="right-item">
            <Badge badgeContent={cart.quantity} color="primary" size="large" showZero>
              <Link
                style={LinkStyle}
                to="/cart"
              >
                <ShoppingCartIcon sx={{marginTop: "5px", fontSize: 25 }}/>
              </Link>
            </Badge>
          </h1>
    <div className="profile-menu-container" ref={menuRef}>
      <div onClick={() => setOpen(!open)} className="profile-icon">
        <PersonOutlineIcon sx={{ fontSize: 30 }} />
      </div>

      {open && (
        <div className="dropdown-menu">
          <Link to="/login" className="dropdown-item">Sign In</Link>
          <Link to="/register" className="dropdown-item">Sign Up</Link>
        </div>
      )}
    </div>
        </div>
      </div>
    </div>
    </div>
  );
};
