#! /bin/bash
cd /media/andrey/F/tmp/mamagb;
rm -f 14_Домашний-10192019-1408-out.avi;
ffmpeg -i 14_Домашний-10192019-1408.mts -c:v libx264 -threads 3 -pix_fmt yuv420p 14_Домашний-10192019-1408-out.avi 1>/home/andrey/hdata/programs/my/qdjs/jaqVideoConverter/app/14_Домашний-10192019-1408-out.avi.log 2>&1 
