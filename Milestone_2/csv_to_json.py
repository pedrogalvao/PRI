import pandas as pd
from datetime import datetime


csv_file = pd.DataFrame(pd.read_csv(
    "data_clean_1-608.csv", sep=";", header=0, index_col=False, encoding="UTF-8"))


def parse_datetime(value):
    months = {"jan": 1, "fev": 2, "mar": 3, "abr": 4, "mai": 5, "jun": 6,
              "jul": 7, "ago": 8, "set": 9, "out": 10, "nov": 11, "dez": 12}
    value = value.split()
    value[1] = months[value[1]]
    time = str(value[3]).split(':')
    value = "{Y}-{m}-{d}T{H}:{min}:00Z".format(
        Y=value[2], m=value[1], d=value[0], H=time[0], min=time[1])
    return value


def to_list(x):
    return x[2:-2].split("', '")


csv_file['datetime'] = csv_file['date'] + " " + csv_file['time']
csv_file['datetime'] = csv_file['datetime'].apply(parse_datetime)
csv_file['text_length'] = csv_file['text'].str.len()
csv_file = csv_file.drop('date', axis=1)
csv_file = csv_file.drop('time', axis=1)
csv_file["partner"] = csv_file["partner"].apply(to_list)
csv_file["tags"] = csv_file["tags"].apply(to_list)

csv_file.to_json("data.json", orient="records", force_ascii=True)
