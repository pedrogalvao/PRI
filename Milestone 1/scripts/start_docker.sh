docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker build . -t meic_solr
docker run -p 8983:8983 meic_solr