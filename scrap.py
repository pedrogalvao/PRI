from requests import get
import bs4
import requests
import csv

# SAPO 24 URLS FOR SCRAPING
base_url = "https://24.sapo.pt"
url_atualidade = base_url + "/atualidade"

response = requests.get(url_atualidade)


html_soup = bs4.BeautifulSoup(response.text, 'html.parser')
articles_html = html_soup.find_all('article')


with open("data.csv","w+") as file:
    filewriter = csv.writer(file, delimiter=';')
    filewriter.writerow(["title", "datetime", "partner", "excerpt", "text", "tags", "url"])
    articles = []

    i=0
    for article_html in articles_html:
        i+=1
        print('scraping... ' + str(i))
        article = {}

        link = article_html.find_all("a")[0]
        article_url = base_url + link["href"]
        
        response = requests.get(article_url)
        html_article_soup = bs4.BeautifulSoup(response.text, 'html.parser')

        #adding url
        article['url'] = article_url

        #scraping article title
        title = html_article_soup.find(id='article-title').text
        article['title'] = title
        
        #scraping article data
        date_html = html_article_soup.find(class_='date')
        
        day = date_html.find(class_='day').text
        month = date_html.find(class_='month').text
        year = date_html.find(class_='year').text
        time = date_html.find(class_='time').text

        datetime = '{} {} {} {}'.format(day, month, year, time)
        article['datetime'] = datetime

        #scraping article partner
        partner = html_article_soup.find(class_='partner-name').text 
        article['partner'] = partner

        #scraping article excerpt
        excerpt = ''
        excerpt = html_article_soup.find(class_='article-excerpt')
        if(excerpt != None):
            excerpt = excerpt.text 
        article['excerpt'] = excerpt

        #scraping article tags
        tags = []
        tag_list_html = html_article_soup.find(class_='tag-list')

        if(tag_list_html != None):
            tag_list_html = tag_list_html.find_all('a')

        if(tag_list_html != None):
            for tag_html in tag_list_html:
                tag_text = tag_html.text
                if(tag_html.text != ''):
                    tags.append(tag_html.text)
        
        article['tags'] = tags 



        #scraping text
        paragraphs = html_article_soup.find(class_='article-body-ctn').find(class_='content').find_all('p') 

        text=''
        for p in paragraphs:
            text+=p.text

        article['text'] = text

        row = []
        row.append(article["title"])
        row.append(article["datetime"])
        row.append(article["partner"])
        row.append(article["excerpt"])
        row.append(article["text"])
        row.append(article["tags"])
        row.append(article["url"])
        filewriter.writerow(row)









    
    
