window.onload = init;
function init(){
	window.procId = 0;
	e('browse').onclick = jmp3cutOnBrowse;
	e('convert').onclick = jmp3cutOnConvertClick;
}
function jmp3cutOnConvertClick() {
	if (W.filePath && PHP.file_exists(W.filePath)) {
		var cmd = '', dir, name = '', outfile;
		cmd = '#! /bin/bash\ncd ' + jmp3cutGetDir() + ';\navconv -i ' + jmp3cutGetName() + ' -ss ' + e('start').value + ' -t ' + e('duration').value + ' ' +
			jmp3cutGetOutfile() + '\n';
		name = Qt.appDir() + '/sh.sh';
		PHP.file_put_contents(name, cmd);
		
		//cmd = 'cd ' + jmp3cutGetDir() + ';\navconv -i ' + jmp3cutGetName() + ' -ss ' + e('start').value + ' -t ' + e('duration').value + ' ' +
			jmp3cutGetOutfile();
		
		procId = PHP.exec(name, 'jmp3cutOnFinish', 'jmp3cutOnStd', 'jmp3cutOnErr');
		//TODO следить за изменением размера файла, если перестал увеличиваться, значит финиш
		setInterval(jmp3Observe, 200);
	} else {
		alert('Вам надо выбрать mp3 файл');
	}
}
function jmp3Observe() {
	if (window.observeProcIsRun) {
		return;
	}
	observeProcIsRun = 1;
	window.sysId = PHP.getSysId(procId);
	PHP.exec('ps -Ac', 'jmp3cutOnObserveFinish', 'jmp3cutOnObserveStd', 'jmp3cutOnObserveErr');
}
function jmp3cutOnObserveStd(std) {
	//alert('Live std = ' + std);
}
function jmp3cutOnObserveErr(err) {
	//alert('Live err = ' + err);
}
function jmp3cutOnObserveFinish(std, err) {
	var a = std.split('\n'), i, b, n, found;
	for (i = 0; i < a.length; i++) {
		b = a[i].split(' ');
		n = parseInt(b[0].trim(), 10);
		if (!isNaN(n)) {
			if (sysId == n) {
				found = true;
				break;
			}
		}
	}
	if (!found) {
		jmp3cutOnComplete();
	}
	window.observeProcIsRun = 0;
	
}

function jmp3cutOnStd(std) {}
function jmp3cutOnErr(err) {}
function jmp3cutOnFinish(std, err) {
	alert('Fin  std = ' + std);
	alert('Fin  err = ' + err);
}
function jmp3cutOnComplete() {
	alert('done');
}
//TODO сохранять последнюю директорию
function jmp3cutOnBrowse() {
	W.filePath = Qt.openFileDialog('Выберите mp3 файл', Qt.appDir(), '*.mp3');
}
function jmp3cutGetDir() {
	var a = W.filePath.split('/');
	a.pop();
	return a.join('/');
}
function jmp3cutGetName() {
	var a = W.filePath.split('/');
	return a.pop();
}
function jmp3cutGetOutfile() {
	var name = jmp3cutGetName(),
		a = name.split('.'),
		ext = a[sz(a) - 1],
		base;
	a.pop();
	base = a.join('.') + '-out.' + ext;
	return base;
}
