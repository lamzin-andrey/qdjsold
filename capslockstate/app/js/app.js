Qt.moveTo(screen.width - 260, 38);
Qt.hide();
var Exec = PHP,
	executeProc = false;

/*setInterval(function(){
	if (!executeProc) {
		executeProc = true;
		PHP.exec(Qt.appDir() + '/capslockstate', 'onFinish' );
	}
}, 1000);*/

function onFinish(stdin, stdout) {
	executeProc = false;
	if (stdin == 'Caps on')	{
		Qt.show();
	} else {
		Qt.hide();
	}
}

var w = new Worker('./js/wkr.js');
w.addEventListener('message', onMessage);
function onMessage(e) {
	if (!executeProc) {
		executeProc = true;
		PHP.exec(Qt.appDir() + '/capslockstate', 'onFinish' );
		//document.body.innerHTML = e.data;
	}
}
