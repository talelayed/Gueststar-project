import React from "react";
import "./FilterCard.css";
import "react-circular-progressbar/dist/styles.css";

// parent Card

const FilterCard = (props) => {    
  return (<div className="card-container" 
  style={{background: props.color.backGround}}
  onClick={props.onClick}
  >
    <span>{props.title}</span>
  </div>
  );
};

export default FilterCard;
