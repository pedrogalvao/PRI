import { useEffect, useState } from "react";
import Badge from 'react-bootstrap/Badge'
// import "./styles.css";

// const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

export default function FacetCheckboxList({facets,counts,getNews, params}) {


  const [checkedState, setCheckedState] = useState(
    [false,false,false,false,false,false,false,false,false,false]
  );

  function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  function addParams(tag,params){
      if(params["fq"]!=null){
        params["fq"] = params["fq"] + " && tags:" + tag 
      }else{
        params["fq"] = 'tags:' + tag 
      }
  }
  function removeParams(tag,params){

    params["fq"] = params["fq"].split(" && ");
    params["fq"] = removeItemOnce(params["fq"], "tags:"+tag);
    params["fq"].join("&&");
}

  
   

  const handleOnChange = (position) => {
 
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item  
    );
    setCheckedState(updatedCheckedState);

    if(!checkedState[position]){
        addParams(facets[position],params)
    } 
    else {
        removeParams(facets[position],params)
    }
    // else removeParams(facets[position])

    
    console.log(params)
    
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
                  {<label htmlFor={`custom-checkbox-${index}`}>{data}</label>}
                </div>
              </div>
            </li>
          );
        })}
      
      </ul>
    </div>
  );
}