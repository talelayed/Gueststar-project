import "./FilterList.css"
import TuneIcon from '@mui/icons-material/Tune';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EuroIcon from '@mui/icons-material/Euro';
import Slider from '@mui/material/Slider';
import PaletteIcon from '@mui/icons-material/Palette';
import { useEffect, useState } from "react";
import axios from "axios";
import { publicRequest } from "../../RequestMethods";

export const FilterList = () => {

    function valuetext(value) {
        return `${value}€`;
    }

    const [value, setValue] = useState([0, 100]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    if (openCategory === categoryId) {
      setOpenCategory(null); // ferme si déjà ouvert
    } else {
      setOpenCategory(categoryId); // ouvre la catégorie cliquée
    }
  };

  return (
        <div className="filters">
            <div className="title">
                <h2>Filtres</h2>
                <TuneIcon />
            </div>
            <hr />
            <div className="categories-filter">
            <div className="title">
                <h2>Categories</h2>
            </div>
            {categories.categories?.map((category) => (
                <div key={category._id} className="category-filter">
                <div
                    className="category"
                    onClick={() => toggleCategory(category._id)}
                    style={{ display: "flex", justifyContent:"space-between", cursor: "pointer" }}
                >
                    {category.title}
                    <ArrowForwardIosIcon
                    sx={{
                        height: "18px",
                        marginLeft: "8px",
                        transform: openCategory === category._id ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                    }}
                    />
                </div>

                {openCategory === category._id && (
                    <div className="subcategories" style={{ marginLeft: "16px", marginTop: "4px" }}>
                    {category.subcategories?.map((sub) => (
                        <div key={sub._id} className="subcategory">
                        {sub}
                        </div>
                    ))}
                    </div>
                )}
                </div>
            ))}
            </div>
            <hr />
            <div className="categories-filter">
            <div className="title">
                <h2>Thèmes</h2>
            </div>
                {
                    themes.themes?.map((theme)=>(
                        <div className="themes-filter">
                            <div className="category">{theme.title}</div>
                            <ArrowForwardIosIcon sx={{height: "18px", cursor: "pointer"}} />
                        </div>
                    ))
                }
            </div>
            <hr />
            <div className="filters-price">
                <div className="title">
                    <h2>Prix</h2>
                    <EuroIcon />
                </div>
                <Slider
                getAriaLabel={() => 'prix'}
                value={value}
                onChange={handleChange}
                getAriaValueText={valuetext}
                valueLabelDisplay="on"
                valueLabelFormat={(v) => `${v} €`}
                step={1}
                sx={{
                    width: "90%",
                    margin: "auto auto 20px auto",
                    color: 'black',
                    '& .MuiSlider-valueLabel': {
                    backgroundColor: 'transparent',
                    color: 'black',
                    fontSize: '14px',
                    padding: '4px 8px',
                    top: 50,
                    '&:before': {
                        display: 'none',
                    },
                    }
                }}
                />
            </div>
            {/* <hr />
            <div className="filters-colors">
                <div className="title">
                    <h2>Couleurs</h2>
                    <PaletteIcon/>
                </div>
                <div className="colors-filter">
                    {
                        [1,1,1,1,1,1,1,1,1].map(()=>(
                            <div className="color-filter"></div>
                        ))
                    }
                </div>
            </div>
            <hr />
            <div className="title">
                <h2>Tailles</h2>
            </div>
                <div className="sizes-filter">
                    {
                        [1,1,1,1,1,1].map(()=>(
                            <div className="size-filter">S</div>
                        ))
                    }
                </div> */}
        </div>
  )
}
