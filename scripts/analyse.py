import seaborn as sn
import csv
import pandas
import numpy as np
import matplotlib
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties
import sys

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

def text_len_statistics(df):
    df["TextLen"] = df["text"].map(len)
    print(df)
    ax = df["TextLen"].plot.hist(bins=50)
    ax.set_title("Text Length", size=14)
    fig = ax.get_figure()
    fig.savefig('text_length.png')
    print("Mean:")
    print(df["TextLen"].mean())
    print("Median:")
    print(df["TextLen"].median())
    print("Max:")
    print(df["TextLen"].max())
    print("Min:")
    print(df["TextLen"].min())


csv_data_file = sys.argv[1]
if csv_data_file == "" or csv_data_file == None:
    csv_data_file = "data_clean.csv"
df = pandas.read_csv(csv_data_file, delimiter=";", encoding="UTF-8")

text_len_statistics(df)

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
plt.show()


# Por os graficos com UTF8
# prop = FontProperties()
# prop.set_file('STIXGeneral.ttf')
# plt.xlabel(u"\u2736", fontproperties=prop)

# General description of the data
df.describe(include="all").to_csv("describe.csv")
