import pandas as pd
import json

with open("data.json","r") as data_json:
    df = pd.read_json(data_json)
    df['popularity'] = pd.Series([0 for x in range(len(df.index))])

print(df["datetime"])

with open("pop_data.json","w+") as pop_data:
    #df["datetime"]
    df = df.transpose()
    row_list = []
    for row_idx in df:
        row = dict(df[row_idx])
        #splitted = str(row["datetime"]).split(" ")
        #row["datetime"] = "T".join(splitted).replace("+00:00",":00:00") + "Z"        
        #print(row["datetime"])
        row_list += [row]
    
    #print(row_list)
    json.dump(row_list, pop_data)
#datetime": "2021-9-9T06:10:00Z",
