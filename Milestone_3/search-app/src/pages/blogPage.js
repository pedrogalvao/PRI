import React, { useState, useEffect } from "react";
import { BlogContent } from "../data/blogContent";
import "./blogPage.css";
import Header from "../components/header";
import Footer from "../components/footer";
import FilterMenu from "../components/filtermenu";
import axios from 'axios';






const BlogPage = () => {

  
  const [news, setNews] = useState([])


  async function getNews(text) {


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

  
  async function incrementArticleCounter(e){

    e.preventDeault();
    //post aqui
    console.log("Doing POST request...");

    let solr_url = 'http://localhost:8983/solr/news/update?commit=true';

    let data = {
      id: '942f2d551e412a685edfdb6bcdd94952',
      title: { "set": "MODIFIED DOCUMENT" },
      text: { "set": "MODIFIED DOCUMENT" },
      text_length: { "set": 1438 }
    };

    await axios.post(solr_url, data);

  }



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
            <div key={item.id} onClick={(e)=>incrementArticleCounter(e)} href={`https://24.sapo.pt${item.url}`} target='_blank' className="blog-card">
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
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
