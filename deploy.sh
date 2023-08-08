#!/bin/sh
git reset --hard &&
docker compose down &&
git pull &&
chmod +x deploy.sh &&
cd frontend &&
npm install &&
npm run build &&
rm -rf node_modules &&
cd ../ &&
docker compose build &&
docker compose up -d
