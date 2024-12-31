# SHELL := /bin/bash

#source /home/khallal/Desktop/container_chat/volumes/env/bin/activate
all :
	@docker compose  up --build 

down :
	@docker compose down

rmi :
	@docker rmi $$(docker image ls -q)

rmv :
	@docker volume rm -f $$(docker volume ls -q)