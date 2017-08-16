//TODO вместо того чтобы каждый раз рисовать рамки синие, нарисуй их один раз и скрывай.
window.onload = init;
window.onkeydown=function(evt) {
	if(evt.keyCode == 27) {
		Qt.quit();
	}
}
function init(){
	W.T = 1000;
	W.data = data = getFolderImages();
	buildPreviews(data);
	setThumbBehavior();
	W.onresize = onResizeWindow;
	bNextFile.onclick = onNextClick;
	bPrevFile.onclick = onPrevClick;
	W.playInterval = 5;
	bPlay.onclick = onPlayClick;
	bZoomIn.onclick = onZoomIn;
	setCurrentImage(data[0]);
	W.currentImgN = 0;
	setActiveThumb();
}
function onZoomIn() {
	W.percent = W.percent || '0';
	W.percent = +W.percent;
	W.percent += 20;
	setCurrentImage(W.currentOnfoObj);
}
function onPlayClick() {
	if (!W.playProc) {
		W.playProc = 1;
		bPlay.src = './img/a/media-playback-stop.png';
		W.playIval = setInterval(onNextClick, W.playInterval * W.T);
	} else {
		bPlay.src = './img/a/media-playback-start.png';
		clearInterval(W.playIval);
	}
}
function getInactiveImage() {
	if (bigView1.style.opacity == 0) {
		return bigView1;
	}
	return bigView2;
}
function getActiveImage() {
	if (bigView1.style.opacity == 1) {
		return bigView1;
	}
	return bigView2;
}
function buildPreviews(data) {
	var t = '<div class="activeQ absolute">&nbsp;</div><img src="[SRC]">', i, li;
	e('gallery').innerHTML = '';
	for (i = 0; i < data.length; i++) {
		s = t.replace('[SRC]', data[i].src);
		li = appendChild('gallery', 'li', s, {}, {id:i});
		addClass(li, 'relative');
	}
}
function setCurrentImage(infoObj) {
	if (infoObj) {
		W.currentOnfoObj = infoObj;
		var i = getInactiveImage(),//TODO отдает то, которое на данный момент скрыто
			wV = getViewport(),
			j = getActiveImage();
		wV.w -= (e('thumb').offsetWidth + 20);
		wV.h -= (bar.offsetHeight + 20);
		gallery.style.height = gallery.style.maxHeight = (getViewport().h - bar.offsetHeight - 20) + 'px';
		viewContainer.style.height = wV.h + 'px';
		viewContainer.style.width  = wV.w + 'px';
		i.src = infoObj.src;
		i.style.height = i.style.width = null;
		j.style.height = j.style.width = null;
		var pW = i.offsetWidth / 100,
				pH = i.offsetHeight / 100,
				pWJ = j.offsetWidth / 100,
				pHJ = j.offsetHeight / 100;
		if (i.width > wV.w) {
			i.style.width = wV.w + 'px';
		} else if (i.height > wV.h){
			i.style.height = wV.h + 'px';
		}
		if (i.width > wV.w) {
			i.style.width = wV.w + 'px';
		}
		if (i.height > wV.h){
			i.style.height = wV.h + 'px';
		}
		i.style.width = i.style.width ? i.style.width : i.offsetWidth + 'px';
		i.style.height = i.style.height ? i.style.height : i.offsetHeight + 'px';
		j.style.width = j.style.width ? j.style.width : j.offsetWidth + 'px';
		j.style.height = j.style.height ? j.style.height : j.offsetHeight + 'px';
		if (W.percent) {
			if (i.style.width) {
				i.style.width = (parseInt(i.style.width) + pW*W.percent) + 'px';
			}
			if (i.style.height) {
				var t = parseInt(i.style.height, 10);
				var kk = pH*W.percent;
				i.style.height = (t + kk) + 'px';
			}
			pW = pWJ,
			pH = pHJ;
			if (j.style.width) {
				j.style.width = (parseInt(j.style.width) + pW*W.percent) + 'px';
			}
			if (j.style.height) {
				j.style.height = (parseInt(j.style.height) + pH*W.percent) + 'px';
			}
		}
		i.style.left = ((wV.w - +i.offsetWidth) / 2) + 'px';
		i.style.top =  ((wV.h - +i.offsetHeight) / 2) + 'px';
		j.style.left = ( (wV.w - +j.offsetWidth) / 2) + 'px';
		j.style.top =  ((wV.h - +j.offsetHeight) / 2) + 'px';
		
		j.style.opacity = 0.0;
				i.style.opacity = 1.0;
		/*W.procAnim = 1;
		var inter = setInterval(function(){
			i.style.opacity += 0.15;
			j.style.opacity -= 0.15;
			if (i.style.opacity > 1.0 || j.style.opacity < 0.0) {
				j.style.opacity = 0.0;
				i.style.opacity = 1.0;
				clearInterval(inter);
				W.procAnim = 0;
			}
		},(1000/24)
		);*/
	}
}
function setThumbBehavior() {
	var ls = ee('gallery', 'div'), i, j, s, q, o, tG;
	for(i = 0; i < ls.length; i++) {
		//onClick
		ls[i].onclick = onClickThumb;
	}
}

function onClickThumb(evt) {
	var tG = evt.target, id, j;
	if (tG.tagName != 'LI') {
		tG = tG.parentNode;
	}
	id = attr(tG, 'data-id');
	var ls = ee('gallery', 'li'), i;
	for(j = 0; j < ls.length; j++) {
		o = ls[j];
		removeClass(o, 'active');
	}
	s = tG.innerHTML;
	addClass(tG, 'active');
	if (attr(tG, 'data-id') && !W.procAnim) {
		W.currentImgN = id;
		setCurrentImage(data[id]);
	}
		
}
function onResizeWindow() {
	if(W.currentOnfoObj) {
		setCurrentImage(W.currentOnfoObj);
	}
}
function onNextClick() {
	var n = ++W.currentImgN;
	if (n >= W.data.length) {
		n = 0;
	}
	W.currentImgN = n;
	setCurrentImage(W.data[n]);
	setActiveThumb();
}
function onPrevClick() {
	var n = --W.currentImgN;
	if (n < 0) {
		n = W.data.length - 1;
	}
	W.currentImgN = n;
	setCurrentImage(W.data[n]);
	setActiveThumb();
}
function setActiveThumb() {
	var ls = ee('gallery', 'li'), i, j;
	for(j = 0; j < ls.length; j++) {
		o = ls[j];
		removeClass(o, 'active');
		if (j == W.currentImgN) {
			i = ls[j];
		}
	}
	addClass(i, 'active');
}
function getFolderImages() {
	return [
		{src:'./img/data/000.png'},
		{src:'./img/data/39.5.jpg'},
		{src:'./img/data/blueEye.png'},
		{src:'./img/data/olenGit.png'},
		{src:'./img/data/patch.png'},
		{src:'./img/data/patch-b.png'}
	];
}
