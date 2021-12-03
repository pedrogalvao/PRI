FROM solr:8.10

COPY /data/1000_1500.csv /data/1000_1500.csv

#COPY simple_schema.json /data/simple_schema.json

COPY /scripts/startup.sh /scripts/startup.sh

ENTRYPOINT ["/scripts/startup.sh"]

#docker build . -t news_sapo
#docker run -p 8983:8983 news_sapo
