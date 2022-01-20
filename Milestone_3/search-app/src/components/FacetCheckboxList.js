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

  function buildFq(newFormats){

      var fq = '';
      if(newFormats.length==1){
          fq='tags:"' + newFormats[0]+ '"';
      }else if(newFormats.length>1){
        fq='tags:"' + newFormats[0]+ '"';
          for (let index = 1; index < newFormats.length; index++) {
              fq = fq + ' && tags:' + '"' + newFormats[index] + '"';
              
          }
      }
      return fq;
      
  }

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
    let fq = buildFq(newFormats)
    params["fq"] = fq;
    getNews(params);

  };

  

  let count = 0;
  return (
    <Container maxWidth="xl" sx={{
      marginBottom: 2
    }}>
      <h3>Common filters for your search:</h3>

      <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
      aria-label="text formatting"
    >
    {facets.map((data,index) => {
      count++;
 
      return (
        <ToggleButton key={"tog"+count} sx={{ fontSize: 12 }} value={data} aria-label="italic">
          {data}
        </ToggleButton>
            
      );
    })}
      
      </ToggleButtonGroup>
    </Container>
  );
}
