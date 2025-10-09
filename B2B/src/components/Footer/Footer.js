import { useEffect, useState } from "react";
import "./Footer.css"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { publicRequest } from "../../RequestMethods";
import { Link } from "react-router-dom";

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await publicRequest.get("categories");
        setCategories(res.data);
        
        
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des catégories :", err);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

    useEffect(() => {
    const fetchThemes = async () => {
      try {
        const res = await publicRequest.get("themes");
        setThemes(res.data);
        
        
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des catégories :", err);
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);
  return (
    <div className="footer-container">
      <div className="newsletter">
        <div className="newsletter-title">
            Reste à jour à propos nos nouvelles offres
        </div>
        <div className="newsletter-inputs">
            <div className="mail-input">
                <MailOutlineIcon/>
                <input type="text" placeholder="Entrer votre adresse mail"/>
            </div>
            <div className="mail-button">
                <button>Souscrire dans le Newsletter</button>
            </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer-content">
        <div className="footer-presentation">
            <h1>GUESTSTAR</h1>
            <p>
                Parce que chaque vêtement raconte une histoire, nous créons des modèles uniques, pensés pour toi, où
                l’authenticité, le style et la qualité s’unissent pour te permettre d’affirmer ta personnalité sans limites.
            </p>
            <div className="social-medias">
                <div className="social-media"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png" alt="instagram"/></div>
                <div className="social-media"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Tiktok_icon.svg/2048px-Tiktok_icon.svg.png" alt="tiktok"/></div>
                <div className="social-media"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png" alt="facebook"/></div>
                <div className="social-media"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/1200px-LinkedIn_icon_circle.svg.png" alt="linkedin"/></div>
            </div>
        </div>

        <div className="footer-section">
        <h3>Catégories</h3>
        {
            categories.categories?.slice(0, 4).map((cat) => (
            <Link 
                key={cat._id} 
                to={`/category/${cat._id}`} 
                className="footer-link"
            >
                {cat.title}
            </Link>
            ))
        }
        </div>

        <div className="footer-section">
        <h3>Thèmes</h3>
        {
            themes.themes?.slice(0, 4).map((theme) => (
            <Link 
                key={theme._id} 
                to={`/theme/${theme._id}`} 
                className="footer-link"
            >
                {theme.title}
            </Link>
            ))
        }
        </div>

        <div className="footer-section">
        <h3>Brand</h3>
        <Link to="/about" className="footer-link">À propos de nous</Link>
        <Link to="/clients" className="footer-link">Nos Clients</Link>
        </div>

        <div className="footer-section">
        <h3>Aide</h3>
        <Link to="/support" className="footer-link">Support client</Link>
        <Link to="/delivery" className="footer-link">Service Livraison</Link>
        <Link to="/payment" className="footer-link">Paiement</Link>
        </div>
        </div>
        <hr/>
        <div className="footer-copyright">
            <p>Mezyen ©2025. All Rights Reserved</p>
            <div className="payment-services">
                <div className="payment-service"></div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
