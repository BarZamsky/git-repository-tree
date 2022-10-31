docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)
docker build -t git-repository-tree .
docker run -d -p 8080:8080 git-repository-tree
