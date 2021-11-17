import pandas as pd
import numpy as np
import regex as re
import matplotlib.pyplot as plt
from collections import Counter
from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
import nltk
from textblob import TextBlob


df = pd.read_csv("data_clean.csv", delimiter=";", encoding="UTF-8")

# Clean text
df['text'] = df['text'].str.lower()
df['text'] = df['text'].str.replace(',', '', regex=True)
df['text'] = df['text'].str.replace('.', '', regex=True)
df['text'] = df['text'].str.strip()
df['words'] = [len(x.split()) for x in df['text'].tolist()]


df['words'].describe().to_csv("describe_word_count.csv")

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
stopwords1 = nltk.corpus.stopwords.words(
    'portuguese') + ['â', 'ainda', 'o', 'ââ â', 'â', 'â o', 'â não', 'â um']
stop_words = set(stopwords1)


# Getting rid of the stopwords
# This is just because including stopwords in the wordcloud argument was not working
clean_text = [word for word in words if word not in stop_words]

# print(clean_text)

# Converting the list to string
text = ' '.join([str(elem) for elem in clean_text])

# print(text)
wc = WordCloud(background_color='black',
               max_words=200).generate(text)

with open('wwords.txt', 'a') as f:
    f.write(str(wc.words_))

# print(wc)
# wc = WordCloud(background_color='white',
#                stopwords=stopwords1,
#                max_words=200).generate_from_frequencies(data)
plt.imshow(wc, interpolation='bilinear')
plt.show()
df.to_csv("parsed_text.csv", sep=";", index=False)


# Define a function which can be applied to calculate the score for the whole dataset

# Sentimental analysis?
# def senti(x):
#     return TextBlob(x).sentiment

# df['senti_score'] = df["title"].apply(senti)
# df.senti_score.head()
