import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./notFound.css";
import AllResultsCard from "../components/allResultsCard";
import Header from "../components/header";
import Footer from "../components/footer";
import FilterMenu from "../components/filtermenu";
import axios from 'axios';

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



  async function makeGetRequest() {
    console.log("1B")

    var config = {
      method: 'get',
      url: 'http://localhost:8983/solr/news/',
      headers: { 
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 
        // 'Access-Control-Allow-Headers': 'append,delete,entries,foreach,get,has,keys,set,values,Authorization', 
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 
        'Access-Control-Allow-Credentials': true, 
        // 'Origin': 'http://localhost:8983/solr/news/', 
        // 'app_id': '<app_id>', 
        // 'app_key': '<app_key>'
      }
    };
    
    axios(config)
    .then(function (response) {
      console.log("2B")
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });

    let payload = { 
      id: '942f2d551e412a685edfdb6bcdd94952',
      title: "Popularidade de António Costa cai em maio. Marcelo com 70% de avaliações positivas",
      partner:["MadreMedia"],
      excerpt: "De acordo com o barómetro da Aximage para o JN, DN e TSF, o primeiro-ministro sofre uma baixa acentuada de popularidade, ainda que mantenha um saldo positivo. O presidente da República não foi afetado. ",
      text: "De abril para maio, António Costa desce nove pontos percentuais nas avaliações positivas e fica com 50%, o seu pior resultado desde julho do ano passado.  Ao contrário, as avaliações negativas sobem oito pontos, para os 27%.Apenas 7% das pessoas responderam que a atuação de António Costa é “Muito Boa”, uma queda de cinco pontos face ao mês anterior, enquanto 43% responde que é “Boa”, menos quatro pontos.A polémica dos migrantes de Odemira, os festejos do título do Sporting, em Lisboa, e a final da Liga dos Campeões, no Porto, podem explicar este resultado.De acordo com o barómetro da Aximage para o JN, DN e TSF, hoje divulgado, aumentou a diferença de popularidade entre António Costa e Marcelo Rebelo de Sousa. O Presidente da República tem 70% de avaliações positivas (uma descida de apenas 1 ponto percentual) e 10% de avaliações negativas.António Costa perdeu popularidade sobretudo entre os cidadãos mais velhos (uma queda de 23 pontos nos cidadãos com mais de 65 anos) e na Área Metropolitana do Porto (onde desceu 19 pontos).Sobre a \"exigência do Presidente da República sobre o governo\", os resultados sofrem poucas alterações. 68% dos inquiridos (menos um ponto) diz que Marcelo deveria ser \"mais exigente\" com o executivo de Costa.Rui Rio continua a ser a principal figura da oposição ao Governo, com 32%. Relativamente ao último barómetro, apenas Catarina Martins (BE) e João Cotrim de Figueiredo sobem nas avaliações.",
      url: "/atualidade/artigos/popularidade-de-antonio-costa-cai-em-maio-marcelo-com-70-de-avaliacoes-positivas",
      datetime: "2021-06-05T10:17:00Z",
      text_length:{"set":1438},
     };

     console.log("1C")
    

    // let res = await axios.post('http://localhost:8983/solr/news/update', payload);
    // console.log("1D")

    // let data = res.data;
    // console.log("ZAAAAAAAAAAAAS");
    // console.log(data);
    // console.log("1E")

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
        "bf":"recip(ms(NOW,datetime),1,1,1)^1e11",
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

export default SearchResult;
