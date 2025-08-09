import "./FilterList.css"
import TuneIcon from '@mui/icons-material/Tune';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EuroIcon from '@mui/icons-material/Euro';
import Slider from '@mui/material/Slider';
import PaletteIcon from '@mui/icons-material/Palette';
import { useState } from "react";

export const FilterList = () => {

    function valuetext(value) {
        return `${value}€`;
    }

    const [value, setValue] = useState([0, 100]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                {
                    [1,1,1,1].map((elt)=>(
                        <div className="category-filter">
                            <div className="category">Category</div>
                            <ArrowForwardIosIcon sx={{height: "18px"}} />
                        </div>
                    ))
                }
            </div>
            <hr />
            <div className="categories-filter">
            <div className="title">
                <h2>Thèmes</h2>
            </div>
                {
                    [1,1,1,1].map((elt)=>(
                        <div className="category-filter">
                            <div className="category">Category</div>
                            <ArrowForwardIosIcon sx={{height: "18px"}} />
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
            <hr />
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
                </div>
        </div>
  )
}
