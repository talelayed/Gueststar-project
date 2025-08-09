import "./Boutique.css"
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { FilterList } from "../../components/FilterList/FilterList";
import { useEffect, useState } from "react";import axios from "axios";
import { publicRequest } from "../../RequestMethods";

const Boutique = () => {

    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const res = await publicRequest.get("designs");
        setDesigns(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des produits :", err);
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

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
                    designs.designs?.map((design) => (
                        <ProductCard {...design}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Boutique
