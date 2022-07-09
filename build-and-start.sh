#!/bin/bash
for i in "$@"
do
  case $i in
    -f|--force-rebuild)
      FORCE_REBUILD=true
      ;;
    *)
      ;;
  esac
done
echo FRONTEND_VERSION=`grep -Po '"version":[ "]+\K([0-9.]+)' frontend/package.json` > .env-dc
echo BACKEND_VERSION=`grep -Po '"version":[ "]+\K([0-9.]+)' backend/package.json` >> .env-dc
echo DB_URI=`docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}} {{end}}' mariadb` > .env-backend
if [[ $FORCE_REBUILD=true ]]
then
  docker compose --env-file='./.env-dc' up --detach --build --force-recreate
else
  docker compose --env-file='./.env-dc' up --detach
fi