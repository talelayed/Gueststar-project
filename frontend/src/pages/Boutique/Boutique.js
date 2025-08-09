import "./Boutique.css"
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { FilterList } from "../../components/FilterList/FilterList";

const Boutique = () => {

  return (
    <div className="boutique-container">
        <FilterList/>
        <div className="boutique-products">
            <div className="products-header">
                <h1>T-shirts</h1>
                <div className="sort">
                    <p>1-10 de 100 produits</p>
                    <select type="select">
                        <option value="moins cher">Moins cher</option>
                        <option value="plus cher">Plus cher</option>
                        <option value="nouvauté">Nouvauté</option>
                    </select>
                </div>
            </div>
            <div className="boutique-products-list">
                {
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1].map(() => (
                        <ProductCard/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Boutique
