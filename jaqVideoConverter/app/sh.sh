#! /bin/bash
cd /home/andrey;
rm -f 2f59feee7fcf295f60dd2552f5e00d29-out.avi;
ffmpeg -i 2f59feee7fcf295f60dd2552f5e00d29.mp4 -c:v libx264 -threads 3 -pix_fmt yuv420p 2f59feee7fcf295f60dd2552f5e00d29-out.avi 1>/home/andrey/hdata/programs/my/qdjs/jaqVideoConverter/app/2f59feee7fcf295f60dd2552f5e00d29-out.avi.log 2>&1 
