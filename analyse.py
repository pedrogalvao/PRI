import csv
import pandas
import matplotlib
import matplotlib.pyplot as plt


def to_1D(series):
    return pandas.Series([x for _list in series for x in _list])


df = pandas.read_csv("datatemp.csv", delimiter=";", encoding="ISO-8859-1")

# Transformar a string tags numa lista
df["tags"] = df["tags"].apply(eval)
to_1D(df["tags"]).value_counts().to_csv("tags.csv")


# df.describe(include="all").to_csv("describe.csv")
# df.plot()
# df.groupby('tags')['tags'].count().plot.pie(
#    autopct='%.2f', figsize=(5, 5))
# plt.show()
# print(df['date'].value_counts())

# print(type(df["tags"][0]))
