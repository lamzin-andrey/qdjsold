function Camel2Snake() {
	function tpl() {
		var s = '<input id="in" rows="10" style="width:99%">\
		<input id="out" type="text" style="width:99%">\
		<p style="text-align:right">\
		<input type="button" id="run" value="ok">\
		</p>\
		';
		$('#console').html(s);
	}
	tpl();
	$('#in').focus();
	$('#in')[0].onkeydown = function() {
		setTimeout(function() {
			var a = $('#in').val(), i, r = '';
			if (isCamelCase(a)) {
				for (i = 0; i < a.length; i++) {
					var ch = a.charAt(i);
					if (ch == ch.toUpperCase()) {
						ch = ch.toLowerCase();
						if (i > 0) {
							ch = '_' + ch;
						}
					}
					r += ch;
				}
			}
			if (isSnakeCase(a)) {
				var arr = a.split('_'), i, r = '', s;
				for(i = 0; i < arr.length; i++) {
					s = $.trim(arr[i]);
					if (i > 0) {
						s = s.charAt(0).toUpperCase() + s.substring(1);
					}
					r += s;
				}
			}
			if (isEnum(a)) {
				r = namesToPhpArrayDerfinion(a);
			}
			$('#out').val(r);
		}, 100);
	}
	function isCamelCase(s) {
		if (s.indexOf('_') == -1) {
			return true;
		}
		return false;
	}
	function isSnakeCase(s) {
		return !isCamelCase(s) && !isEnum(s);
	}
	function isEnum(s) {
		if (~s.indexOf(',') || ~s.indexOf(' ')){
			return true;
		}
		return false;
	}
	function namesToPhpArrayDerfinion(s) {
		var sep, a, i, w, r = [];
		if (~s.indexOf(',')) {
			sep = ',';
		} else {
			sep = /\s+/;
		}
		a = s.split(sep);
		for (i = 0; i < a.length; i++) {
			w = $.trim(a[i]);
			if (w) {
				r.push("'" + w + "' => $" + w);
			}
		}
		return '[' + r.join(', ') + ']';
	}
}

window.onload=Camel2Snake;
