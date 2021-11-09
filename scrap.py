from requests import get
import bs4
import requests
import csv




def scrap_date(html_article_soup):
    date_html = html_article_soup.find(class_='date')
    
    day = date_html.find(class_='day').text
    month = date_html.find(class_='month').text
    year = date_html.find(class_='year').text
    time = date_html.find(class_='time').text

    datetime = '{} {} {} {}'.format(day, month, year, time)
    return datetime

def scrap_partner(html_article_soup):
    try:
        partner = html_article_soup.find(class_='partner-name').text
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
            tag_text = tag_html.text
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
    article_list.append(article_dict["title"])
    article_list.append(article_dict["datetime"])
    article_list.append(article_dict["partner"])
    article_list.append(article_dict["excerpt"])
    article_list.append(article_dict["text"])
    article_list.append(article_dict["tags"])
    article_list.append(article_dict["url"])
    return article_list


# SAPO 24 URLS FOR SCRAPING
base_url = "https://24.sapo.pt"
url_atualidade = base_url + "/atualidade"



def scrap_main_page(url_atualidade):
    response = requests.get(url_atualidade)
    html_soup = bs4.BeautifulSoup(response.text, 'html.parser')
    articles_html = html_soup.find_all('article')
    i=0
    for article_html in articles_html:
        i+=1
        print('scraping... ' + str(i))
        article = {}

        link = article_html.find_all("a")[0]
        article_url = base_url + link["href"]
        
        response = requests.get(article_url)
        html_article_soup = bs4.BeautifulSoup(response.text, 'html.parser')

        article['url'] = article_url
        article['title'] = html_article_soup.find(id='article-title').text        
        article['datetime'] = scrap_date(html_article_soup)
        article['partner'] = scrap_partner(html_article_soup)
        article['excerpt'] = scrap_excerpt(html_article_soup)
        article['tags'] = scrap_tags(html_article_soup)
        article['text'] = scrap_text(html_article_soup)

        row = article_dict_to_list(article)
        filewriter.writerow(row)


with open("data.csv","w+") as file:
    filewriter = csv.writer(file, delimiter=';')
    filewriter.writerow(["title", "datetime", "partner", "excerpt", "text", "tags", "url"])
    articles = []
    scrap_main_page(url_atualidade)
