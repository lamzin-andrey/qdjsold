Qt.moveTo(screen.width - 260, 38);
Qt.hide();
var Exec = PHP,
	executeProc = false;

setInterval(function(){
	if (!executeProc) {
		executeProc = true;
		PHP.exec(Qt.appDir() + '/capslockstate', 'onFinish' );
	}
}, 500);

function onFinish(stdin, stdout) {
	executeProc = false;
	if (stdin == 'Caps on')	{
		Qt.show();
	} else {
		Qt.hide();
	}
}
