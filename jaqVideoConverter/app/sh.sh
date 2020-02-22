#! /bin/bash
cd '/media/andrey/D/storage/blackAMD/win/D/tv/2019/Легенды мирового кино/Юрий Яковлев';
rm -f 06_РОССИЯ-К-12052019-0838-out.avi;
ffmpeg -i 06_РОССИЯ-К-12052019-0838.mts -c:v libx264 -threads 3 -pix_fmt yuv420p 06_РОССИЯ-К-12052019-0838-out.avi 1>/home/andrey/hdata/programs/my/qdjs/jaqVideoConverter/app/06_РОССИЯ-К-12052019-0838-out.avi.log 2>&1 
