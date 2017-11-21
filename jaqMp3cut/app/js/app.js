window.onload = init;
function init(){
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
		
		PHP.exec(name, 'jmp3cutOnFinish', 'jmp3cutOnStd', 'jmp3cutOnErr');
		//TODO следить за изменением размера файла, если перестал увеличиваться, значит финиш
	} else {
		alert('Вам надо выбрать mp3 файл');
	}
}
function jmp3cutOnStd(std) {
	//alert('Live std = ' + std);
}
function jmp3cutOnErr(err) {
	//alert('Live err = ' + err);
}
function jmp3cutOnFinish(std, err) {
	alert('Fin std = ' + std);
	alert('Fin err = ' + err);
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
