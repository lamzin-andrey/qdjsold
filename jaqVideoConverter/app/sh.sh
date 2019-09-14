#! /bin/bash
cd /home/andrey/hdata/programs/my/qdjs/jaqVideoConverter/app;
rm -f maski-out.avi;
ffmpeg -i maski.mp4 -c:v libx264 -threads 3 -pix_fmt yuv420p maski-out.avi 1>/home/andrey/hdata/programs/my/qdjs/jaqVideoConverter/app/maski-out.avi.log 2>&1 
