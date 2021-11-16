import csv
import pandas


df = pandas.read_csv("data.csv", delimiter=";", encoding="ISO-8859-1")

df['tags'].tolist()


df.describe(include="all").to_csv("describe.csv")


# print(df['date'].value_counts())

# print(type(df["tags"][0]))
