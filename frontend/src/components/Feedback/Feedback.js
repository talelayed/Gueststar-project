import ReactStars from "react-stars";
import "./Feedback.css"

export const Feedback = () => {
  return (
    <div className="feedback">
        <div className="stars">
          <ReactStars
           classNames="stars"
            count={5}
            onChange={()=>{}}
            size={28}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
        </div>
        <div className="name">Alex K.</div>
        <div className="feedback-text">
            "J'ai vraiment adoré la qualité, le design, la coupe et les couleurs des produit. Je trouve que c'est la meilleure marque en France."
        </div>
    </div>
  )
}
