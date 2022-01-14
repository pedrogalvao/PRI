import  MyNavbar  from './components/MyNavbar'
import NewsList from './components/NewsList'
import axios from 'axios';
import {useState, useEffect} from 'react';

function App() {

  const [articles, setArticles] = useState([

    {
      title: 'Ministério Público manda constituir arguido ex-ministro Eduardo Cabrita',
      tags: ['política', 'governo'],
      text: 'O ex-ministro Eduardo Cabrita e o “responsável pela segurança da comitiva” vão ser constituídos arguido no processo do atropelamento mortal na A6, segundo o despacho do diretor do DIAP de Évora que reabriu o inquérito.'
    },
    {
      title: 'Ministério Público manda constituir arguido ex-ministro Eduardo Cabrita',
      tags: ['política', 'governo'],
      text: 'O ex-ministro Eduardo Cabrita e o “responsável pela segurança da comitiva” vão ser constituídos arguido no processo do atropelamento mortal na A6, segundo o despacho do diretor do DIAP de Évora que reabriu o inquérito.'
    },
    {
      title: 'Ministério Público manda constituir arguido ex-ministro Eduardo Cabrita',
      tags: ['política', 'governo'],
      text: 'O ex-ministro Eduardo Cabrita e o “responsável pela segurança da comitiva” vão ser constituídos arguido no processo do atropelamento mortal na A6, segundo o despacho do diretor do DIAP de Évora que reabriu o inquérito.'
    },

  ])

  useEffect(() => {
    fetchArticles()
  }, [])

  return (
    <div className="App">
      <MyNavbar/>
      <NewsList news={articles}/>
    </div>
  );

  async function fetchArticles(){
    axios(
      {
        url:'http://127.0.0.1:8983/solr/news/select?indent=true&q.op=OR&q=*%3A*',
        method:"GET",
        mode: 'no-cors',
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": '*',

        }
    }

      )
  .then(response => {
    console.log(response.data);
  }, error => {
    console.log(error);
  });
  }
}

export default App;
