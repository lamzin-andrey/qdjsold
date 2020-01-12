#! /bin/bash
cd /media/andrey/D/storage/blackAMD/win/D/users/Мама/films/СтарыеПесниоГлавном/04;
rm -f 01_ПЕРВЫЙ_КАНАЛ-01062020-0110-out.avi;
ffmpeg -i 01_ПЕРВЫЙ_КАНАЛ-01062020-0110.mts -c:v libx264 -threads 3 -pix_fmt yuv420p 01_ПЕРВЫЙ_КАНАЛ-01062020-0110-out.avi 1>/home/andrey/hdata/programs/my/qdjs/jaqVideoConverter/app/01_ПЕРВЫЙ_КАНАЛ-01062020-0110-out.avi.log 2>&1 
