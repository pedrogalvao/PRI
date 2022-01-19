import { useState } from "react";
import Badge from 'react-bootstrap/Badge'
// import "./styles.css";

// const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

export default function FacetCheckboxList({facets,counts,getNews, params}) {


  const [checkedState, setCheckedState] = useState(
    new Array(facets.length).fill(false)
  );

  function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  function addParams(tag){
      if(params["fq"]!=null){
        params["fq"] = params["fq"] + " && tags:" + tag 
      }else{
        params["fq"] = 'tags:' + tag 
      }
      console.log(params)
  }
  function removeParams(tag){

    var params = params["fq"].split(" && ");
    console.log(1)
    console.log(params)
    var params = removeItemOnce(splitted, "tags:"+tag);
    console.log(2)
    console.log(params)
    params.join("&&");
    console.log(params)
      

    

}

  const [total, setTotal] = useState(0);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
      
    );

    console.log("OIOIOI")


  console.log(checkedState[position])
    if(!checkedState[position]){
        addParams(facets[position])
    } 
    else {
        console.log("BEM LINDO")
    }
    // else removeParams(facets[position])

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