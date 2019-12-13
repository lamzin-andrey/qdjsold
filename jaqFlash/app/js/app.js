var d = document;
function e(i){return d.getElementById(i);}
function log(s) {
	e('log').innerHTML += '<div style="color:blue;">' + s + '</div>';
}
function testGetSwfSize() {
	//getSwfSize(example);
	e('bSelectSwf').onclick = onClickSelectSwfFile;
}

function _toFullByte(n) {
	var n = Number(n).toString(2);
	while (n.length < 8) {
		n = '0' + n;
	}
	return n;
}

/**
 * @description Биты в структуре RECT считать справа налево, отступив 5 бит. Первые 5 бит (которые отступили) содержад длину одного uint числа в битах
 * @return {Object} {w:Number,h:Number}- - размеры кадра swf ролика
*/
function getSwfSize(data) {
	var numRByte = 8, a = data.split(','),
		szByte = a[numRByte], s, n, i, k, aB = [], j, aR = [], q = '', szSide, nBytes, nBits, 
		wTwips, hTwips, w, h, r = {};
		
	//Тут пытаемся работать с сжатой
	
	/*decompressSwc(a);
	return;/**/
	
	//Ниже код для декомпресс- версии
	s = _toFullByte(szByte);
	log(s);
	//get side length
	s = s.substring(0, 5);
	//s = s.substring(3);
	log('size in unsigned bits:' + s);
	n = parseInt(s, 2);
	log('size in dec:' + n);
	szSide = n;
	//calculate num bits
	n = n*4 + 5;
	nBits = n;
	log('bits in rect structure:' + n);
	n = Math.ceil(n / 8);
	nBytes = n;
	log('bytes in rect structure:' + n);
	//get binary str
	s = '';
	for (i = numRByte; i < numRByte + nBytes + 1; i++) {
		n = Number(a[i]);
		if (String(n) == 'undefined') {
			alert('ATAS');
		}
		s += _toFullByte(n);
	}
	log('rect:' + s);
	log('strlen(rect):' + s.length);
	log('szSide:' + szSide);
	for (j = 0, i = 5; i < nBits; i++, j++) {
		aB.push(s.charAt(i));
		if (j + 1 == szSide) {
			aR.push( aB.join('') );
			j = -1;
			aB = [];
		}
	}
	/*debug for (i = 0; i < aR.length; i++) {
		log('side ' + i + ' = "' + aR[i] + '", dec = ' + parseInt(aR[i], 2));
	}/**/
	wTwips = parseInt(aR[1], 2);
	hTwips = parseInt(aR[3], 2);
	log('wTwips:' + wTwips);
	log('hTwips:' + hTwips);
	w = Math.round(wTwips / 20);
	h = Math.round(hTwips / 20);
	log('w:' + w);
	log('h:' + h);
	r.w = w;
	r.h = h;
	return r;
}
/**
 * @description ПОка просто считываем байты в текстовое поле
*/
function onClickSelectSwfFile()
{
	//TODO считывать нулевой байт, если он C тогда все это.
	//Иначе 
	// buf = a.join(',') + ',' + Qt.readFileAsBinaryString(s, 0, 32),
	// и сразу getSwfSize(buf)
	var s = Qt.openFileDialog('Select swf file', Qt.appDir(), '*.swf'),
		sDir = getFolder(s), shell;
	//копировать в файл с именем 0.swf.gz - надо что-то придумать побыстрее
	// а именно dd if=src of=dest skip=1 ibs=1
	Qt.copyFile(s, sDir + '/0.swf.gz', 8, -1);
	//запустить testungz.php
	var shell = sDir + '/rununpack.sh';
	window.sDir = sDir;
	PHP.file_put_contents(shell, '#! /bin/bash\nphp ' + sDir + '/testungz.php\n');
	PHP.exec(shell, 'onUnpackFin', 'Z', 'Z');
	
}
function onUnpackFin(stdout, stderr){
	log('unpack...');
	//из распакованного (1.php.swf) получить 32 байта , перед ними написать 8 нулей и отдать getSwfSize
	var a = new Array(8), 
		buf = a.join(',') + ',' + Qt.readFileAsBinaryString(sDir + '/1.php.swf', 0, 32),
		oSize;
	e('iFiledata').value = buf;
	oSize = getSwfSize(buf);
}
function Z(s){
	//alert('o = ');
}

function getFolder(s){
	var a = s.split('/'), i, b = [];
	for (i = 0; i < a.length - 1; i++) {
		b.push(a[i]);
	}
	return b.join('/');
}
/**
 * Это пляски с бубном, к которым хочется потом вернуться
 * @param {Array} Array of Number data
*/
function decompressSwc(data) {
	//var data:ByteArray = File.readByteArray(file);
	//У нас уже есть как аргумент
	
	//data.endian = "littleEndian";
	//TODO пока непонятно, как с этим быть

	//var version:uint = data.readUnsignedInt();
	//Считывает из потока байтов 32-разрядное целое без знака.
	//32-разрядное целое
	var version = readUnsignedInt(data, 4);
	log('version = ' + version);
	var dbg = 90|87<<8|83<<16;
	log('dbg = ' + dbg);
	log('version & 0xffffffff = ' + (version & 0xffffffff));
	switch (version & 0xffffffff) {
		// SWZ = lzma compressed
		//TODO это проверить в первую очередь, остальное можно потом
		case 90|87<<8|83<<16: 
			log('Aga!');
			break;
		default:
			log('Fail');
	}
	
	/*if (doDecompressOnly)    System.exit(0);
		 udata=new ByteArray;
		 udata.endian = "littleEndian";
		 var ptr;*/

	// put lzma properties in 0-4 for (ptr=0;ptr<5;ptr++) {     udata[ptr]=data[12+ptr] } // calculate uncompressed length, subtract 8 (remove header bytes) var scriptlen:uint=data[4]+(data[5]<<8)+(data[6]<<16)+(data[7]<<24)-8; // write lzma properties bytes: 0-4 for (ptr=0;ptr<4;ptr++) {     udata[5+ptr]=data[8+ptr] }

	// write the uncompressed length: 5-8  udata[5]=scriptlen&0xFF; udata[6]=(scriptlen>>8) & 0xFF; udata[7]=(scriptlen>>16) & 0xFF; udata[8]=(scriptlen>>24) & 0xFF;// add 4 extra 0 to compressed length: 9-12 for (ptr=0;ptr<4;ptr++) {     udata[9+ptr]=0 }

	//data.position = 17 data.readBytes(udata,13,data.length-data.position) udata.position=0 csize = udata.length udata.uncompress(CompressionAlgorithm.LZMA) infoPrint("decompressed swf "+csize+" -> "+udata.length) /*var swf:Swf =*/ new Swf(udata) break
}
/**
 *
 * @param {Array} Array of Number (even from 0 to 255) aData
*/
function readUnsignedInt(aData, offset) {
	var s = '', i, a = [];
	for (i = offset; i < offset + 4; i++) {
		//s += _toFullByte(aData[i]);
		a.push( _toFullByte(aData[i]) );
	}
	s = a.reverse().join('');
	return parseInt(s, 2);
}

window.onload=testGetSwfSize;
