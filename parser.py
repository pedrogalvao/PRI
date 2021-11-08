
import csv



with open("data.csv","w+") as file:
    filewriter = csv.writer(file, delimiter=';')
    filewriter.writerow(["title", "datetime", "partner", "excerpt", "text"])

    row = []
    row.append(article["uuid"])
    row.append(article["title"])
    row.append(article["datetime"])
    row.append(article["partner"])
    row.append(article["excerpt"])
    row.append(article["text"])
    

