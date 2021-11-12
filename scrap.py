from requests import get
import bs4
import requests
import csv
from hashlib import md5

column_names = ["id", "title", "date", "time", "partner", "excerpt", "text", "tags", "url"]
article_counter = 0

def scrap_date(html_article_soup):
    date_html = html_article_soup.find(class_='date')
    
    day = date_html.find(class_='day').text
    month = date_html.find(class_='month').text
    year = date_html.find(class_='year').text
    time = date_html.find(class_='time').text

    date = '{} {} {}'.format(day, month, year)
    return date, time

def scrap_partner(html_article_soup):
    try:
        partner = html_article_soup.find(class_='partner-name').text
        partner = partner.split(" / ")
        return partner
    except AttributeError:
        print("no partner")
        return ""

def scrap_text(html_article_soup):
    paragraphs = html_article_soup.find(class_='article-body-ctn').find(class_='content').find_all('p')
    text=''
    for p in paragraphs:
        text+=p.text
    return text

def scrap_tags(html_article_soup):
    tags = []
    tag_list_html = html_article_soup.find(class_='tag-list')

    if(tag_list_html != None):
        tag_list_html = tag_list_html.find_all('a')

    if(tag_list_html != None):
        for tag_html in tag_list_html:
            if(tag_html.text != ''):
                tags.append(tag_html.text)
    return tags

def scrap_excerpt(html_article_soup):
    excerpt = ''
    excerpt = html_article_soup.find(class_='article-excerpt')
    if(excerpt != None):
        excerpt = excerpt.text 
    return excerpt

def article_dict_to_list(article_dict):
    article_list = []
    for column_name in column_names:
        article_list.append(article_dict[column_name])
    return article_list

def scrap_main_page(url_atualidade):
    global article_counter
    response = requests.get(url_atualidade)
    html_soup = bs4.BeautifulSoup(response.text, 'html.parser')
    articles_html = html_soup.find_all('article')
    for article_html in articles_html:
        article_counter += 1
        print('scraping... ' + str(article_counter))
        article = {}

        link = article_html.find_all("a")[0]
        article_url = base_url + link["href"]
        
        response = requests.get(article_url)
        html_article_soup = bs4.BeautifulSoup(response.text, 'html.parser')

        article['id'] = md5(article_url.encode()).hexdigest()
        article['url'] = link["href"]
        article['title'] = html_article_soup.find(id='article-title').text
        article['date'], article['time'] = scrap_date(html_article_soup)
        article['partner'] = scrap_partner(html_article_soup)
        article['excerpt'] = scrap_excerpt(html_article_soup)
        article['tags'] = scrap_tags(html_article_soup)
        article['text'] = scrap_text(html_article_soup)

        row = article_dict_to_list(article)
        filewriter.writerow(row)





# SAPO 24 URLS FOR SCRAPING
base_url = "https://24.sapo.pt"
url_atualidade = base_url + "/atualidade"

with open("data.csv","w+") as file:
    filewriter = csv.writer(file, delimiter=';')
    filewriter.writerow(column_names)
    for page_number in range(1, 10):
        print("Page", page_number)
        page_str = "?pagina=" + str(page_number)
        scrap_main_page(url_atualidade + page_str)
