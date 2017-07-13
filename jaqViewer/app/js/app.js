window.onload=function(){
	
	gallery.style.height = gallery.style.maxHeight = (getViewport().h - bar.offsetHeight) + 'px';
	var ls = ee('gallery', 'li'), i, j, s, q, o, tG;
	for(i = 0; i < ls.length; i++) {
		ls[i].onmouseover = function(evt) {
			tG = evt.target;
			if (tG.tagName != 'LI') {
				tG = tG.parentNode;
			}
			var ls = ee('gallery', 'li'), i;
			for(j = 0; j < ls.length; j++) {
				o = ls[j];
				if (!hasClass(o, 'active')) {
					removeClass(o, 'relative');
					s = o.innerHTML;
					o.innerHTML = s.replace(q, '');
				}
			}
			q = '<div class="activeQ absolute">&nbsp;</div>';
			s = tG.innerHTML;
			if (s.indexOf(q) == -1) {
				addClass(tG, 'relative');
				tG.innerHTML = q + s;
			}
		}
	}
	
	
window.onkeydown=function(evt) {
	if(evt.keyCode == 27) {
		Qt.quit();
	}
}


}
