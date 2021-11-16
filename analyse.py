import csv
import pandas
import numpy as np
import matplotlib
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties


def to_1D(series):
    return pandas.Series([x for _list in series for x in _list])


df = pandas.read_csv("datatemp.csv", delimiter=";", encoding="ISO-8859-1")


###########################
#          TAGS           #
###########################

# Transformar a string tags numa lista
df["tags"] = df["tags"].apply(eval)

# Verificar quantas vezes cada tag é mencionada
to_1D(df["tags"]).value_counts().to_csv("tags.csv")

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


###########################
#          PARTNERS       #
###########################

# Adicionar isto no clean
# Substituir NAN values por []
df['partner'] = df['partner'].replace(np.nan, "[]")

# Transformar a string tags numa lista
df["partner"] = df["partner"].apply(eval)

# Verificar quantas vezes cada tag é mencionada
to_1D(df["partner"]).value_counts().to_csv("partner.csv")

# Grafico a mostrar o plot sem contar com o covid
fig, ax3 = plt.subplots(figsize=(14, 4))
ax3.bar(to_1D(df["partner"]).value_counts()[:10].index,
        to_1D(df["partner"]).value_counts()[:10].values)
ax3.set_ylabel("Frequency", size=12)
ax3.set_title("Partners distribution", size=14)


# Mostrar gráficos
plt.show()


# Por os graficos com UTF8
# prop = FontProperties()
# prop.set_file('STIXGeneral.ttf')
# plt.xlabel(u"\u2736", fontproperties=prop)

# General description of the data
df.describe(include="all").to_csv("describe.csv")
