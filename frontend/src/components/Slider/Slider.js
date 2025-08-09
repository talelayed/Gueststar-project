import { Link } from "react-router-dom"
import "./Slider.css"

export const Slider = () => {
  return (
    <div className='slider'>
        <div className="presentation">
            <div className='slogan'>
                <b>L'authenticité<br/>en édition<br/>illimité</b>
            </div>
            <div className="description">
                Parce que chaque vêtement raconte une histoire, nous créons des modèles uniques, pensés pour toi, où <br/>l’authenticité,
                le style et la qualité s’unissent pour te permettre d’affirmer ta personnalité sans limites.
                <Link to="/boutique" className="acheter">
                    Acheter
                </Link>
            </div>
        <div className="stat">
            <div className="stat-item">
                <h1>400+</h1>
                <p>Produits</p>
            </div>
            <div className="hr"></div>
            <div className="stat-item">
                <h1>2,000+</h1>
                <p>Commandes</p>
            </div>
            <div className="hr"></div>
            <div className="stat-item">
                <h1>700+</h1>
                <p>Comptes</p>
            </div>
        </div>
        </div>
        <div className="slider-image"></div>
    </div>
  )
}