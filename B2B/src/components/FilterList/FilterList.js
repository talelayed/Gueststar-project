import "./FilterList.css";
import TuneIcon from '@mui/icons-material/Tune';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EuroIcon from '@mui/icons-material/Euro';
import Slider from '@mui/material/Slider';
import PaletteIcon from '@mui/icons-material/Palette';
import { useEffect, useState } from "react";
import { publicRequest } from "../../RequestMethods";
import { useNavigate } from "react-router-dom";

export const FilterList = ({ onThemeSelect, selectedTheme, onPriceChange }) => {
  const navigate = useNavigate();

  const [value, setValue] = useState([0, 100]);
  const [categories, setCategories] = useState([]);
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCategory, setOpenCategory] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onPriceChange(newValue); 
  };

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
        console.error("Erreur lors du chargement des thèmes :", err);
        setLoading(false);
      }
    };
    fetchThemes();
  }, []);

  const toggleCategory = (categoryId) => {
    setOpenCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const [filtersVisible, setFiltersVisible] = useState(true);
  const toggleFilters = () => {
    if (window.innerWidth <= 1024)
    {
        setFiltersVisible(prev => !prev);
    }
  }

  return (
    <div className="filters">
      <div className="filter-title">
        <h2>Filtres</h2>
        <TuneIcon style={{cursor:"pointer"}} onClick={()=>toggleFilters()}/>
      </div>
    {
        filtersVisible && <>
      
      <hr />

      {/* Categories */}
      <div className="categories-filter">
        <div className="filter-title">
          <h2>Catégories</h2>
        </div>
        {categories.categories?.map((category) => (
          <div key={category._id} className="category-filter">
            <div
              className="category"
              style={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <div onClick={() => navigate(`/${category.title}`)}>
                {category.title}
              </div>
              <ArrowForwardIosIcon
                onClick={() => toggleCategory(category._id)}
                sx={{
                  height: "18px",
                  marginLeft: "8px",
                  transform:
                    openCategory === category._id
                      ? "rotate(90deg)"
                      : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            </div>

            {openCategory === category._id && (
              <div
                className="subcategories"
                style={{ marginLeft: "16px", marginTop: "4px" }}
              >
                {category.subcategories?.map((sub) => (
                  <div
                    key={sub._id}
                    className="subcategory"
                    onClick={() => navigate(`/${category.title}/${sub}`)}
                  >
                    {sub}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <hr />

      {/* Themes */}
      <div className="categories-filter">
        <div className="filter-title">
          <h2>Thèmes</h2>
        </div>
        {themes.themes?.map((theme) => (
          <div
            key={theme._id}
            className="themes-filter"
            style={{
              cursor: "pointer",
              backgroundColor:
              selectedTheme === theme.title ? "#dfdfdfff" : "transparent",
              borderRadius: "10px",
              padding: "4px 8px",
            }}
            onClick={() => onThemeSelect(theme.title)}
          >
            <div className="category">{theme.title}</div>
          </div>
        ))}
      </div>

      <hr />
      {/* Price Filter */}
      <div className="filters-price">
        <div className="filter-title">
          <h2>Prix</h2>
          <EuroIcon />
        </div>
        <Slider
          getAriaLabel={() => "prix"}
          value={value}
          onChange={handleChange}
          getAriaValueText={(v) => `${v}€`}
          valueLabelDisplay="on"
          valueLabelFormat={(v) => `${v} €`}
          step={1}
          sx={{
            width: "90%",
            margin: "auto auto 20px auto",
            color: "black",
            "& .MuiSlider-valueLabel": {
              backgroundColor: "transparent",
              color: "black",
              fontSize: "14px",
              padding: "4px 8px",
              top: 50,
              "&:before": {
                display: "none",
              },
            },
          }}
        />
      </div>
        </>
    }
    </div>
  );
};
