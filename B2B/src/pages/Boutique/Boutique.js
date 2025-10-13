import "./Boutique.css";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { FilterList } from "../../components/FilterList/FilterList";
import { useEffect, useState } from "react";
import { publicRequest } from "../../RequestMethods";
import { useParams } from "react-router-dom";

const Boutique = () => {
  const [designs, setDesigns] = useState([]);
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const [sortedDesigns, setSortedDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("nouveauté");
  const { category, subcategory } = useParams();
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 300]);

  // 🧩 Fetch all designs once
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const res = await publicRequest.get("designs");
        setDesigns(res.data.designs || res.data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des produits :", err);
        setLoading(false);
      }
    };
    fetchDesigns();
  }, []);
  const [products, setProducts] = useState([]);
  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await publicRequest.get("products");
        setProducts(res.data); // suppose res.data = { products: [...] }
      } catch (err) {
        console.error("Erreur lors du chargement des produits :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter based on category/subcategory (inside linkedProduct)
  useEffect(() => {
    if (!designs.length) return;

    let filtered = [...designs];
    
    if (category) {
      filtered = filtered.filter(
        (d) =>
          products.products?.find(elt => elt._id === d.linkedProduct)?.category?.toLowerCase() ===
          category.toLowerCase()
      );
    }

    if (subcategory) {
      filtered = filtered.filter(
        (d) =>
          products.products?.find(elt => elt._id === d.linkedProduct)?.subcategory?.toLowerCase() ===
          subcategory.toLowerCase()
      );
    }
    
    if (selectedTheme) {
      filtered = filtered.filter(      
        (d) => d.theme?.toLowerCase() === selectedTheme.toLowerCase()
      );
    }    
    
    filtered = filtered.filter(d => d.price - d.discount >= priceRange[0] && d.price - d.discount <= priceRange[1]);

    setFilteredDesigns(filtered);
  }, [category, subcategory, designs, products, selectedTheme, priceRange]);

  // Apply sorting to filtered list
  useEffect(() => {
    let sorted = [...filteredDesigns];

    if (sortOption === "moins cher") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "plus cher") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === "nouvauté") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setSortedDesigns(sorted);
  }, [sortOption, filteredDesigns]);

  const handleSortChange = (e) => setSortOption(e.target.value);

  const handleThemeSelect = (themeTitle) => {
    setSelectedTheme((prev) => (prev === themeTitle ? null : themeTitle)); // toggle
    
  };
  if (loading)
    return (
      <p style={{ marginTop: "100px", textAlign: "center" }}>Chargement...</p>
    );

  return (
    <div className="boutique-container">
      <FilterList onThemeSelect={handleThemeSelect} selectedTheme={selectedTheme} onPriceChange={setPriceRange} />
      <div className="boutique-products">
        <div className="products-header">
          <h1>
            {subcategory
              ? subcategory
              : category
              ? category
              : "Tous les produits"}
          </h1>
          <div className="sort">
            <p>{sortedDesigns.length} produits -</p>
            <select value={sortOption} onChange={handleSortChange}>
              <option value="moins cher">Moins cher</option>
              <option value="plus cher">Plus cher</option>
              <option value="nouvauté">Nouvauté</option>
            </select>
          </div>
        </div>

        <div className="boutique-products-list">
          {sortedDesigns.map((design) => (
            <ProductCard key={design._id} {...design} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Boutique;
