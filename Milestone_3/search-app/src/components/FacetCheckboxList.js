import { useState } from "react";
// import "./styles.css";

// const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

export default function FacetCheckboxList({facets,counts}) {

  const [checkedState, setCheckedState] = useState(
    new Array(facets.length).fill(false)
  );

  const [total, setTotal] = useState(0);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
      
    );

    setCheckedState(updatedCheckedState);
    
    console.log("checkbox" + position)
    

    
  };

  return (
    <div className="FacetCheckboxList">
      <h3>Common filters for your search:</h3>
      <ul className="facets-list">
        {
          
        facets.map((data,index) => {
 
          return (
            <li key={index}>
              <div className="facets-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    value={data }
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{data + ": "+ counts[index]}</label>
                </div>
              </div>
            </li>
          );
        })}
      
      </ul>
    </div>
  );
}