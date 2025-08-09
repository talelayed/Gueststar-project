import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emptyUser } from "../../Redux/slices/AuthSlice";

const Sidebar = () => {
  const loginState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [selected, setSelected] = useState("");

  useEffect(() => {    
    switch (location.pathname) {
      case "/": setSelected('Dashboard')
        
        break;
      case "/orders": setSelected('Commandes')
        
        break;
      case "/products": setSelected('Produits')
        
        break;
      case "/designs": setSelected('Modèles')
        
        break;
      case "/add-product": setSelected('Nv Produit')
        
        break;
      case "/add-design": setSelected('Nv modèle')
        
        break;
      case "/add-category": setSelected('Nv Catégorie')
        
        break;
      case "/add-theme": setSelected('Nv Theme')
        
        break;
      case "/add-user": setSelected('Nv compte')
        
        break;
      case "/Analytics": setSelected('Stats')
        
        break;
      case "/login": setSelected('Login')
        
        break;
    
      default:
        break;
    }
  }, [location]);
  

  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }

  // useEffect(() => {
  //   switch (key) {
  //     case value:
        
  //       break;
    
  //     default:
  //       break;
  //   }
  // }, [])

  const handleLogOut = () => {
    dispatch(emptyUser())
  }
  
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <img src="/Guest star.png" alt="logo" />
      </div>
      <div className="menu">
        {SidebarData.map((item, index) => {          
          return (

        ((!loginState.currentUser && item.heading === "Login") ||
        (loginState.currentUser && item.heading !== "Login"))
         && (
        <Link
          className={selected === item.heading ? "menuItem active" : "menuItem"}
          key={index}
          onClick={() => setSelected(item.heading)}
          to={item.to}
        >
          <item.icon />
          <span>{item.heading}</span>
        </Link>
        )
          );
        })}
        {loginState.currentUser &&<div className="menuItem" onClick={()=>handleLogOut()}>
           <UilSignOutAlt />
        </div>}
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
