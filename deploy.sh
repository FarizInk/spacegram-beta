#!/bin/sh
docker compose down &&
git pull &&
cd frontend &&
npm install &&
npm run build &&
rm -rf node_modules &&
cd ../ &&
docker compose build &&
docker compose up -d
