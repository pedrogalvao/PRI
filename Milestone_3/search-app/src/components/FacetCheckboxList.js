import { useEffect, useState } from "react";
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
// import "./styles.css";

// const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

export default function FacetCheckboxList({facets, counts, setNews, params}) {

  function parseFq(params){
      //Nao e nesta funçao
    const queryString = window.location.search;    
    const urlParams = new URLSearchParams(queryString);

    var startDate = urlParams.get("startDate")
    var endDate = urlParams.get("endDate")
      if(params["fq"] == null){
        if (startDate !== null && endDate == null ) {
            params["fq"] = `datetime:[${startDate} TO NOW]`;
          }else if (startDate !== null && endDate != null) {
            params["fq"] = `datetime:[${startDate} TO ${endDate}]`;
          }else if (startDate == null && endDate != null) {
            params["fq"] = `datetime:[2020-01-01T00:00:00Z TO ${endDate}]`;
          }
      }else{
        if (startDate !== null && endDate == null ) {
            params["fq"] =params["fq"] + " && " + `datetime:[${startDate} TO NOW]`;
          }else if (startDate !== null && endDate != null) {
            params["fq"] = params["fq"] + " && " + `datetime:[${startDate} TO ${endDate}]`;
          }else if (startDate == null && endDate != null) {
            params["fq"] =params["fq"] + " && " + `datetime:[2020-01-01T00:00:00Z TO ${endDate}]`;
          }
      }
  }

  async function getNews(params) {

    parseFq(params)
    const solr = axios.create({
      baseURL: 'http://localhost:8983/solr/news',
      timeout: 4000
    });

    const zas = params


    solr.get('/select', {params: zas})
      .then(function (response) {
          
        if (response.data.response.numFound !== 0){
           setNews(response.data.response.docs)
        }  
        else{
          //TODO Por NOTFOUND
          console.log('error 1 novo ')
        }
      })
      .catch((err) => {
        console.log('error 2 novo')
        console.log(err.message)
      })

  }


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

  function addParams(tag){

      if(params["fq"]==null || params["fq"]==[] || params["fq"]==""){
        params["fq"] = 'tags:' + tag 
         
      }else{
        params["fq"] = params["fq"] + " && tags:" + tag 
      }
      console.log(params["fq"])
  }
  function removeParams(tag){

    if(params["fq"]==null || params["fq"]==[] || params["fq"]==""){

    }else{
        params["fq"] = params["fq"].split(" && ");
        params["fq"] = removeItemOnce(params["fq"], "tags:"+tag);
        if(params["fq"].length == 0){
            params["fq"] =""
        }else {
            params["fq"].join("&&");
        }
    }

    // if(typeof(params["fq"]) == )
}

  
   

  const handleOnChange = (position) => {
 
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item  
    );
    setCheckedState(updatedCheckedState);

   

    if(!checkedState[position]){
        addParams(facets[position])
    } 
    else {
        console.log(params)
        removeParams(facets[position])
    }
    // else removeParams(facets[position])
    getNews(params);
    
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