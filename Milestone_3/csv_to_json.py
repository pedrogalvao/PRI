import pandas as pd

csv_file = pd.DataFrame(pd.read_csv("data.csv", sep=";", header=0, index_col=False, encoding="UTF-8"))



def to_list(x):
    return x[2:-2].split("', '")

csv_file["partner"] = csv_file["partner"].apply(to_list)
csv_file["tags"] = csv_file["tags"].apply(to_list)
csv_file["popularity"] = 0

csv_file.to_json("popularity_data.json", orient="records", force_ascii=True)


