import json
from math import log
import math
from typing import IO
import csv
import pandas


with open("dataset.csv","w+") as file:
    filewriter = csv.writer(file, delimiter=';')
    filewriter.writerow(
        ["uuid","author","country", "site",
        "site_type", "published", "language", "url",
        "text", "facebook_rating",
        "related_persons", "related_locations", "related_organizations"])

    for i in range(1, 10000):
        str_i = str(i)
        with open("714_webhose-2017-03_20170904122636/news_"+"0"*(7-len(str_i)) + str_i+".json") as file:
            j = json.load(file)
            j_str = json.dumps(j)
            
            row = []
            row.append(j["uuid"])
            row.append(j["author"])
            row.append(j["thread"]["country"])
            row.append(j["thread"]["site"])
            row.append(j["thread"]["site_type"])
            row.append(j["published"])
            row.append(j["language"])
            row.append(j["url"])
            row.append(j["text"])
            row.append(j["thread"]["social"]["facebook"]["likes"])
           
            for e in ["persons", "locations", "organizations"]:
                if j["entities"][e] != []:
                    entities_list = []
                    for entity in j["entities"][e]:
                        entities_list.append(entity["name"])
                    row.append(entities_list)
                else:
                    row.append("")

            filewriter.writerow(row)
        print(str(i)+'/'+ str(10000))

"""
{
    "organizations": [], 
    "uuid": "c276d16aedb91cbad1306227ab8dcdd02d433a2a", 
    "thread": {
        "social": {
            "gplus": {"shares": 0}, 
            "pinterest": {"shares": 1}, 
            "vk": {"shares": 0},
             "linkedin": {"shares": 0}, 
             "facebook": {"likes": 628, "shares": 628, "comments": 0}, 
             "stumbledupon": {"shares": 0}
        }, 
        "site_full": "www.bollywoodlife.com", 
        "main_image": "http://www.bollywoodlife.com/wp-content/uploads/2017/03/vote-now.jpg", 
        "site_section": "http://www.bollywoodlife.com/feed/", 
        "section_title": "", 
        "url": "http://www.bollywoodlife.com/news-gossip/allu-arjuns-duvvada-jagannadham-vs-pawan-kalyans-katamarayudu-whose-teaser-impressed-you/", 
        "country": "IN",
        "domain_rank": 4987, 
        "title": "Allu Arjun\u2019s DJ vs Pawan Kalyan\u2019s Katamarayudu: Which teaser impressed you?",
        "performance_score": 6,
        "site": "bollywoodlife.com",
        "participants_count": 1, 
        "title_full": "Allu Arjun\u2019s DJ vs Pawan Kalyan\u2019s Katamarayudu: Which teaser impressed you?", 
        "spam_score": 0.0, 
        "site_type": "news",
        "published": "2017-03-02T19:53:00.000+02:00",
        "replies_count": 0, 
        "uuid": "c276d16aedb91cbad1306227ab8dcdd02d433a2a"
        }, 
    "author": "karthika raveendran", 
    "url": "http://www.bollywoodlife.com/news-gossip/allu-arjuns-duvvada-jagannadham-vs-pawan-kalyans-katamarayudu-whose-teaser-impressed-you/", 
    "ord_in_thread": 0, 
    "title": "Allu Arjun\u2019s DJ vs Pawan Kalyan\u2019s Katamarayudu: Which teaser impressed you?", 
    "locations": [], 
    "entities": { "persons": [], "locations": [], "organizations": []},
    "highlightText": "", 
    "language": "english", 
    "persons": [], 
    "text": "58th Filmfare Awards 2011 (South) pics \nWe saw two epic teasers in the last two months \u2013 Pawan Kalyan \u2018s Katamarayudu and Allu Arjun\u2019s DJ. While Pawan Kalyan\u2019s mass avatar impressed us, Allu Arjun \u2018s traditional Brahmin avatar pleasantly surprised us. There\u2019s a buzz that the fans of both stars are at war, so much so Allu Arjun\u2019s teaser has clocked in a record 100K dislikes. This is reportedly because Pawan Kalyan fans haven\u2019t forgotten Allu Arjun\u2019s attack on them at Sarranodu\u2019s pre-release function, a year ago. Keeping all that aside, we want to know \u2013 which teaser impressed you more? You can VOTE and tell us too? \nKatamarayudu teaser \u2013 After a few disappointing pre-buzz posters, Pawan Kalyan came out with a powerful teaser that had fans roaring. His mannerisms, his style and screen presence in the teaser had us whistling and clapping till we were sore. Pawan Kalyan has aped Ajith Kumar\u2019s style and stunts in his own way and it\u2019s just as impressive. It\u2019s going to be a thara mass film and we are excited! For those who don\u2019t know, it\u2019s a remake of Ajith Kumar\u2019s Veeram. This movie stars Shruti Haasan, while Tamannaah Bhatia starred in the Tamil version. Shruti and Pawan Kalyan are coming together again after Gabbar Singh. Their last film was a hit, can we expect a repeat of that again with Katamarayudu? At this point, the success of Katamarayudu is important for Power star since his last movie \u2013 Gabbar is back was a debacle. The movie is all set for a release this Ugadi on March 29th. \nDuvvada Jagannadham teaser \u2013 On Feb 24th, Bunny fans were in for a treat when the teaser of his much awaited film \u2013 DJ was released. After seeing the Sarranodu star in stylish avatars, we were taken up when he donned a tradional Brahmin avatar. Right from the ash on the forehead to his prayer rituals to his mannerisms, he plays a Brhamin caterer to perfection. The scene where he\u2019s riding on a scooter with vegetable bags around him, is striking. Just when we getting used to Allu Arjun \u2018Saadhu\u2019 avatar, enters sexy, seductive Pooja Hegde. They may be pairing for the first time but their chemistry is already a hit. \nSo that we have given you details of both teasers, which one has created a better impression? You can VOTE and tell us too! Published: March 2, 2017 6:23 pm Topics:", 
    "external_links": [], 
    "published": "2017-03-02T19:53:00.000+02:00", 
    "crawled": "2017-03-02T15:08:39.462+02:00", 
    "highlightTitle": ""}"""