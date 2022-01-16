FROM solr:8.10

COPY /Milestone_3/data.json /data/data.json

COPY /Milestone_3/simple_schema.json /data/simple_schema.json

COPY /Milestone_3/synonyms.txt /example/files/conf/synonyms.txt

COPY ./startup.sh ./startup.sh

COPY enable_cors.xml /opt/solr-8.10.1/server/solr-webapp/webapp/WEB-INF/web.xml

ENTRYPOINT ["./startup.sh"]

#docker build . -t news_sapo
#docker run -p 8983:8983 news_sapo
