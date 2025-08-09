import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import './MobileNavBar.css';

export const MobileNavBar = ({isOpen, setIsOpen}) => {

  return (
    <>
      {/* BACKDROP */}
      {isOpen && (
        <div className="mobile-menu-backdrop" onClick={() => setIsOpen(false)} />
      )}

      {/* MENU PANEL */}
      <div className={`mobile-menu-panel ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <h2>Menu</h2>
          <button className="mobile-menu-close" onClick={() => setIsOpen(false)}>
            <CloseIcon sx={{color: "black"}}/>
          </button>
        </div>
        <div className="mobile-menu-links">
          <Link to="/Boutique" onClick={() => setIsOpen(false)} className="mobile-menu-link">Boutique</Link>
          <Link to="/Promotions" onClick={() => setIsOpen(false)} className="mobile-menu-link">Promotions</Link>
          <Link to="/Thèmes" onClick={() => setIsOpen(false)} className="mobile-menu-link">Thèmes</Link>
        </div>
      </div>
    </>
  );
};

