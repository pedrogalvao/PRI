#!/bin/bash

precreate-core news

# Start Solr in background mode so we can use the API to upload the schema
solr start

sleep 3

# cp /Milestone_2/synonyms.txt /var/solr/data/news/conf
cp /Milestone_2/synonyms.txt /example/files/conf

# Schema definition via API
curl -X POST -H 'Content-type:application/json' \
    --data-binary @/data/simple_schema.json \
    http://localhost:8983/solr/news/schema 

# Populate collection
bin/post -c news /data/data.json

# Restart in foreground mode so we can access the interface
solr restart -f


# How to run
# docker build . -t news_sapo
# docker run -p 8983:8983 news_sapo

