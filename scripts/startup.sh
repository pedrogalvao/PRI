#!/bin/bash

precreate-core news

# Start Solr in background mode so we can use the API to upload the schema
solr start

sleep 3

# Populate collection
bin/post -c news /data/1000_1500.csv

# Restart in foreground mode so we can access the interface
solr restart -f


# How to run
# docker build . -t news_sapo
# docker run -p 8983:8983 news_sapo

