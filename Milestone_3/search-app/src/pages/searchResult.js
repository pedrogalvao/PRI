import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./notFound.css";
import AllResultsCard from "../components/allResultsCard";
import Header from "../components/header";
import Footer from "../components/footer";
import FilterMenu from "../components/filtermenu";
import axios from 'axios';
import sapo24logo from '../images/sapo24.png';

function SearchResult() {
  // Get url pathname to use as search value
  const urlPathname = window.location.pathname;
  var rx = /[^/](.*)/g;
  var arr = rx.exec(urlPathname);
  let val = " ";
  if (arr) {
    val = arr[0];
  }
  val = decodeURI(val)

  const [news, setNews] = useState([])

  
async function incrementArticleCounter(e, item){

  console.log("Doing POST request...");
  //e.preventDeault();
  //post aqui
  console.log(item);

  let solr_url = 'http://localhost:8983/solr/news/update?commit=true';

  let data = [{
    id: item.id,
    popularity: { "set": item.popularity+1 }
  }];

  await axios.post(solr_url, data);

}


  async function getNews(text) {
    /*console.log("text")
    console.log(text)*/
    const queryString = window.location.search;    
    const urlParams = new URLSearchParams(queryString);
    var startDate = urlParams.get("startDate")
    var endDate = urlParams.get("endDate")
    console.log(startDate)
    var params = {
        "q": `${val}`,
        "defType": 'edismax',
        "wt": 'json',
        "q.op": 'AND',
        "qf": "title^4 tags^3 excerpt^2 text",
        "bf":"mul(log(sum(1,popularity)),recip(ms(NOW,datetime),1,1,1))^1e11",
        "indent": "true",
        "rows": 10000000
      };
    if (startDate !== null && endDate == null ) {
      params["fq"] = `datetime:[${startDate} TO NOW]`;
    }else if (startDate !== null && endDate != null) {
      params["fq"] = `datetime:[${startDate} TO ${endDate}]`;
    }else if (startDate == null && endDate != null) {
      params["fq"] = `datetime:[2020-01-01T00:00:00Z TO ${endDate}]`;
    }
    else {
      console.log("ELSE")
    }
    const solr = axios.create({
      baseURL: 'http://localhost:8983/solr/news',
      timeout: 4000
    });

    solr.get('/select', {params: params})
      .then(function (response) {
        if (response.data.response.numFound !== 0){
          setNews(response.data.response.docs)
        }  
        else{
          //TODO Por NOTFOUND
          console.log('error 1 ')
        }
      })
      .catch(() => {
        console.log('error 2')
      })
  }


  useEffect(async () => {
    getNews()
    console.log("1A")
    //makeGetRequest();
  }, [])

  


  
  

  return (
    <div className="main">
      <Header />
      <FilterMenu />
      <div className="all-results-container blogpage-container">
        <p className="result-count">
          About {news.length} results (0.84 seconds)
          {val}
        </p>
        <div className="blog-content">
          {news.map((item) => (
            <a href={`https://24.sapo.pt${item.url}`}  onClick={(e)=>incrementArticleCounter(e, item)} target='_blank' className="blog-card">
              <div className="blog-text-container">
                <div className="category">
                  <img src={sapo24logo} className="blog-icon"/> 
                  <p> {`SAPO Atualidade`} </p>
                </div>
                <h3>{`${item.title}`}</h3>
                <p className="blog-excerpt">{`${item.excerpt}`}</p>
                <p className="blog-date">{`${item.datetime}`}</p>
              </div>
              {/* <div className="blog-img-container">
                <img src={item.img} alt={item.name} />
              </div> */}
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResult;
