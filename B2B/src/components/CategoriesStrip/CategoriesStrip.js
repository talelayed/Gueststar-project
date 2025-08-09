import { Link } from "react-router-dom";
import "./CategoriesStrip.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const CategoriesStrip = () => {

  let category = "T-shirts"

  return (
    <div className="categories-strip-container"  to={`/boutique/${category}`}>
        <div className='categories-strip'>
        {
            [1,1].map((elt) => (
                <Link className='categories-strip-link' to={`/boutique/${category}`}>T-shirts</Link>
            ))
        }
        </div>
        <div className="categories-arrow">
            <ArrowForwardIosIcon sx={{ fontSize: 45 }}/>
        </div>
    </div>
  )
}
