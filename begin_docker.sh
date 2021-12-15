docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker build . -t news
docker run -p 8983:8983 news