import pandas as pd
import numpy as np
import regex as re
import matplotlib.pyplot as plt
from collections import Counter
from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
import nltk
from textblob import TextBlob


df = pd.read_csv("data_clean.csv", delimiter=";", encoding="UTF-8")

# Clean tet
df['text'] = df['text'].str.lower()
df['text'] = df['text'].str.replace(',', '', regex=True)
df['text'] = df['text'].str.replace('.', '', regex=True)
df['text'] = df['text'].str.strip()
df['words'] = [len(x.split()) for x in df['text'].tolist()]

# Put every word in a set
words = []
for text in df["text"]:
    words += text.split()
# words = [x.split() for x in df['text'].tolist()]
wd = pd.DataFrame(Counter(words).most_common(200),
                  columns=['word', 'frequency'])

# Convert the dataframe to a dictionary
data = dict(zip(wd['word'].tolist(), wd['frequency'].tolist()))

# Faz download das palavras que não interessam como pronomes
stopwords = nltk.corpus.stopwords.words('portuguese')
stop_words = set(stopwords)

# Getting rid of the stopwords
# This is just because including stopwords in the wordcloud argument was not working
clean_text = [word for word in text.split() if word not in stop_words]

# Define a function which can be applied to calculate the score for the whole dataset

# Sentimental analysis?
# def senti(x):
#     return TextBlob(x).sentiment

# df['senti_score'] = df["title"].apply(senti)
# df.senti_score.head()

# Converting the list to string
text = ' '.join([str(elem) for elem in clean_text])
wc = WordCloud(background_color='black',
               max_words=200).generate(text)
# wc = WordCloud(background_color='white',
#                stopwords=stopwords,
#                max_words=200).generate_from_frequencies(data)
plt.imshow(wc, interpolation='bilinear')
plt.show()
df.to_csv("parsed_text.csv", sep=";", index=False)
