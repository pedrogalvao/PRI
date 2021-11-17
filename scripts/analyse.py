from nltk.util import pr
from numpy.core.fromnumeric import partition
import seaborn as sn
import csv
import pandas
import numpy as np
import matplotlib
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties
import sys
from datetime import date, datetime


def to_1D(series):
    return pandas.Series([x for _list in series for x in _list])


def boolean_df(item_lists, unique_items):
    # Create empty dict
    bool_dict = {}

    # Loop through all the tags
    for i, item in enumerate(unique_items):

        # Apply boolean mask
        bool_dict[item] = item_lists.apply(lambda x: item in x)

    # Return the results as a dataframe
    return pandas.DataFrame(bool_dict)


def parse_date(value):
    months = {"jan": 1, "fev": 2, "mar": 3, "abr": 4, "mai": 5, "jun": 6,
              "jul": 7, "ago": 8, "set": 9, "out": 10, "nov": 11, "dez": 12}
    value = value.split()
    value[1] = months[value[1]]
    value = ' '.join(str(e) for e in value)
    # print(date_string)
    date_time = datetime.strptime(value, '%d %m %Y')
    return date_time


def parse_datetime(value):
    months = {"jan": 1, "fev": 2, "mar": 3, "abr": 4, "mai": 5, "jun": 6,
              "jul": 7, "ago": 8, "set": 9, "out": 10, "nov": 11, "dez": 12}
    value = value.split()
    value[1] = months[value[1]]
    value = ' '.join(str(e) for e in value)
    return datetime.strptime(value, '%d %m %Y %H:%M')


def date_analysis(df):

    # df['date'] = pandas.to_datetime(df['date'])
    df['datetime'] = df['date'] + " " + df['time']
    df['datetime'] = df['datetime'].apply(parse_datetime)

    #df['date'] = df['date'].apply()
    # print(df['datetime'])
    # dates = [parse_date(date_string, months)
    #          for date_string in df['date'].tolist()]
    # print(df['date'])
    with open('statistics.txt', 'a') as f:
        f.write("\nDate  Statistics:")
        f.write("\n\tMean: ")
        f.write(str(df["datetime"].mean()))
        f.write("\n\tMedian:")
        f.write(str(df["datetime"].median()))
        f.write("\n\tMax:")
        f.write(str(df["datetime"].max()))
        f.write("\n\tMin:")
        f.write(str(df["datetime"].min()))
        f.write("\n\tMode:")
        # f.write(str(df["date"].mode()))


def text_len_statistics(df):
    df["TextLen"] = df["text"].map(len)
    ax = df["TextLen"].plot.hist(bins=50)
    ax.set_title("Text Length", size=14)
    fig = ax.get_figure()
    fig.savefig('text_length.png')
    with open('statistics.txt', 'w') as f:
        f.write("Text Length Statistics:")
        f.write("\n\tMean: ")
        f.write(str(df["TextLen"].mean()))
        f.write("\n\tMedian:")
        f.write(str(df["TextLen"].median()))
        f.write("\n\tMax:")
        f.write(str(df["TextLen"].max()))
        f.write("\n\tMin:")
        f.write(str(df["TextLen"].min()))


csv_data_file = ""

if (len(sys.argv) > 1):
    csv_data_file = sys.argv[1]
if csv_data_file == "" or csv_data_file == None:
    csv_data_file = "data_clean.csv"
df = pandas.read_csv(csv_data_file, delimiter=";", encoding="UTF-8")

text_len_statistics(df)
date_analysis(df)

###########################
#          TAGS           #
###########################

# Transformar a string tags numa lista
df["tags"] = df["tags"].apply(eval)

# Verificar quantas vezes cada tag é mencionada
tags_count = to_1D(df["tags"]).value_counts()
tags_count.to_csv("tags.csv")


# Grafico a mostrar os primeiros 10 mais comuns
fig, ax = plt.subplots(figsize=(14, 4))
ax.bar(to_1D(df["tags"]).value_counts()[:10].index,
       to_1D(df["tags"]).value_counts()[:10].values)
ax.set_ylabel("Frequency", size=12)
ax.set_title("Tags distribution", size=14)

# Grafico a mostrar o plot sem contar com o covid
fig2, ax2 = plt.subplots(figsize=(14, 4))
ax2.bar(to_1D(df["tags"]).value_counts()[1:10].index,
        to_1D(df["tags"]).value_counts()[1:10].values)
ax2.set_ylabel("Frequency", size=12)
ax2.set_title("Tags distribution", size=14)


# Advanced analysis
# Por alguma razao isto não está a dar coorelação nenhuma
advanced_analysys_tags = False

if(advanced_analysys_tags):
    tags_bool = boolean_df(df["tags"], tags_count.keys())

    # See how many times each tag was coorelated
    tags_int = tags_bool.astype(int)
    tags_freq_mat = np.dot(tags_int.T, tags_int)
    tags_freq = pandas.DataFrame(
        tags_freq_mat, columns=tags_count.keys(), index=tags_count.keys())

    fig, ax = plt.subplots(figsize=(9, 5))
    sn.heatmap(tags_freq, cmap="Blues")
    plt.xticks(rotation=50)
    plt.savefig("heatmap.png", dpi=300)

###########################
#          PARTNERS       #
###########################

# Adicionar isto no clean
# Substituir NAN values por []
df['partner'] = df['partner'].replace(np.nan, "[]")

# Transformar a string tags numa lista
df["partner"] = df["partner"].apply(eval)

# Verificar quantas vezes cada tag é mencionada
partners_count = to_1D(df["partner"]).value_counts()
partners_count.to_csv("partner.csv")

# Grafico a mostrar o plot sem contar com o covid
fig, ax3 = plt.subplots(figsize=(14, 4))
ax3.bar(to_1D(df["partner"]).value_counts()[:10].index,
        to_1D(df["partner"]).value_counts()[:10].values)
ax3.set_ylabel("Frequency", size=12)
ax3.set_title("Partners distribution", size=14)


# Advanced analysis
# Por alguma razao isto não está a dar coorelação nenhuma
advanced_analysys_partners = True

if(advanced_analysys_partners):
    partners_bool = boolean_df(df["partner"], partners_count.keys())

    # See how many times each tag was coorelated
    partners_int = partners_bool.astype(int)
    partners_freq_mat = np.dot(partners_int.T, partners_int)
    partners_freq = pandas.DataFrame(
        partners_freq_mat, columns=partners_count.keys(), index=partners_count.keys())

    fig, ax = plt.subplots(figsize=(9, 5))
    sn.heatmap(partners_freq, cmap="Blues")
    plt.xticks(rotation=50)
    plt.savefig("heatmap_partners.png", dpi=300)


# Mostrar gráficos
# plt.show()


# Por os graficos com UTF8
# prop = FontProperties()
# prop.set_file('STIXGeneral.ttf')
# plt.xlabel(u"\u2736", fontproperties=prop)

# General description of the data
df.describe(include="all", datetime_is_numeric=True).to_csv("describe.csv")
