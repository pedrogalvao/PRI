import { useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import { Container } from "@mui/material";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import axios from 'axios';


export default function FacetCheckboxList({facets, counts, setNews, params}) {

  const [formats, setFormats] = useState(()=>[]);

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


    solr.get('/select', {params: params})
      .then(function (response) {
          console.log(response.data.response.numFound)
        if (response.data.response.numFound !== 0){
          console.log(params)
        //   setNews(response.data.response.docs)
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
  }
  function removeParams(tag){
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
        addParams(facets[position])
    } 
    else {
        removeParams(facets[position])
    }
    // else removeParams(facets[position])
    console.log(params)
    getNews(params);
    
  };

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <Container maxWidth="xl" className="FacetCheckboxList">
      <h3>Common filters for your search:</h3>

      <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
      aria-label="text formatting"
    >
    {facets.map((data,index) => {
 
      return (
        <ToggleButton sx={{ fontSize: 12 }} value={data} aria-label="italic">
          {data}
        </ToggleButton>
            
      );
    })}
      
      </ToggleButtonGroup>
    </Container>
  );
}

{/* <li key={index}>
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
            </li> */}