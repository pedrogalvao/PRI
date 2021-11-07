from requests import get
import bs4
import requests

base_url = "https://24.sapo.pt"
url_atualidade = base_url + "/atualidade"

print(url_atualidade)

response = requests.get(url_atualidade)


html_soup = bs4.BeautifulSoup(response.text, 'html.parser')
articles = html_soup.find_all('article')


for article in articles:
    link = article.find_all("a")[0]
    print(link["href"])
    article_url = base_url + link["href"]
    
    print(article_url)
    
    response = requests.get(article_url)
    print(response)
    html_article_soup = bs4.BeautifulSoup(response.text, 'html.parser')
    
    title = html_article_soup.find(id='article-title').text

    #a = html_article_soup.find_all("div", class_="article-body-ctn")
    
    break

