import json

with open("data.json","r") as data_file:
    data = json.load(data_file)
    for row in data:
        row["popularity"]=0

with open("data2.json","w+") as data_file:
    #print(data)
    json.dump(data, data_file)