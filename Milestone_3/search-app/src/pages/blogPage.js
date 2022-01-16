import React, { useState, useEffect } from "react";
import { BlogContent } from "../data/blogContent";
import "./blogPage.css";
import Header from "../components/header";
import Footer from "../components/footer";
import FilterMenu from "../components/filtermenu";
import axios from 'axios';






const BlogPage = ({ results }) => {

 

  const [news, setNews] = useState([])


  async function getNews() {


  const params = {
    "q": `title:Marcelo`,
    "indent": "true",
  };

  const solr = axios.create({
    baseURL: 'http://localhost:8983/solr/news',
    timeout: 4000
  });

  solr.get('/select', {params: params})
    .then(function (response) {
      if (response.data.response.numFound !== 0)
      {
    
        setNews(response.data.response.docs)
      
      }  
      else{
        console.log('error 1 ')
      }
    })
    .catch(() => {
      console.log('error 2')
    })
}


  useEffect(async () => {
    getNews()
  }, [])

  



  return (
    <div className="main">
      <Header />
      <FilterMenu />
      <div className="all-results-container blogpage-container">
        <p className="result-count">
          About {news.length} results (0.84 seconds)
        </p>
        <div className="blog-content">
          {news.map((item) => (
            <a href={`https://24.sapo.pt${item.url}`} target='_blank' className="blog-card">
              <div className="blog-text-container">
                <div className="category">
                  {/* <img src={require('./images/sapo24.png')} className="blog-icon"/> */}
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

export default BlogPage;
