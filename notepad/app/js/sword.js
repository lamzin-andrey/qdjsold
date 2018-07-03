/**
 * @description api метод для вызова окна поиска. Определи вместо этого onCtrlF эсли что-то не устираивает
*/
function showSearchWordApplet() {
	if (!window.oSearchWordDialog) {
		window.oSearchWordDialog = new searchWordDialog();
	}
	oSearchWordDialog.show();
}
/**
 * @class
*/
function searchWordDialog() {
	/** @property PADDING - величина, на которую смещается вниз блок с полем ввода ( и с номерами линий и прочими штуками ( tabeditor.js::getEditoprBlock() ) ) */
	this.PADDING = '84px';
	this.view = this.createView();
	if (!window.SiEd.modalDialogs) {
		window.SiEd.modalDialogs = [];
	}
	window.SiEd.modalDialogs.push(this);//чтобы редактор мог делать тебя неактивным при потере фокуса
}
/**
 * @description Делаем серым при потере фокуса
*/
searchWordDialog.prototype.setInactive = function() {
	this.hFindDlg.addClass('inactive');
}
/**
 * @description Делаем ярким при получении фокуса
*/
searchWordDialog.prototype.setActive = function() {
	this.hFindDlg.removeClass('inactive');
}
/**
 * @description Добавляет на страницу окно поиска, инициализует все его контролы
*/
searchWordDialog.prototype.createView = function() {
	var bd = $(document.getElementsByTagName('body')[0]);
	bd.append($(this.getWndTpl()));
	this.iFindWord = $('#iFindWord');
	this.bFindWord = $('#bFindWord');
	this.bCancel   = $('#bCancel');
	this.hFindDlg  = $('#inputdlgarea');
	
	this.iFindWord.bind('keydown', this.onKeyDown);	//закрывать по Escape
	this.bFindWord.bind('keydown', this.onKeyDown);
	this.hFindDlg.bind('keydown', this.onKeyDown);
	var o = this;
	this.hFindDlg.click(function(e){o.iFindWord.focus(); o.setActive();});
	this.bFindWord.click(this.onFindClick);
	this.bCancel.click(this.onCancelClick);
}
/**
 * @description Обработка нажатия клавиши Find
*/
searchWordDialog.prototype.onFindClick = function(e){
	e.preventDefault();
	//это базовая функция определена в tabeditor.js
	setCaretOnFoundWord(window.oSearchWordDialog.iFindWord.val());
	return false;
}
/**
 * @description Обработка нажатия клавиши отмена
*/
searchWordDialog.prototype.onCancelClick = function(e) {
	//console.log('sword.js onKeyDown:: code = ' + e.keyCode);
	var o = window.oSearchWordDialog;
	o.hide();
}
/**
 * @description Обработка нажатия клавиш на диалоге
*/
searchWordDialog.prototype.onKeyDown = function(e) {
	//console.log('sword.js onKeyDown:: code = ' + e.keyCode);
	var o = window.oSearchWordDialog;
	if (e.keyCode == 27) {
		o.hide();
	}
	if (e.keyCode == 13) {
		e.preventDefault();
		setCaretOnFoundWord(window.oSearchWordDialog.iFindWord.val());
		return false;
	}
}
/**
 * @description Скрываем диалог
*/
searchWordDialog.prototype.hide = function() {
	var o = this;
	o.hFindDlg.animate({'top': '-86px', easing:'linear'});
	getEditorBlock().animate({'margin-top': 0, 'height':o.sourceEditorHeight,easing:'linear'}, {
		complete:function() {
			getEditorBlock()[0].style.marginTop = null;
			getEditorBlock().focus();
		}
	});
}
/**
 * @description ПОказываем диалог
*/
searchWordDialog.prototype.show = function() {
	//this.hFindDlg.css('top', '0px');
	var nTop = parseInt( this.hFindDlg.css('top') );
	this.hFindDlg.animate({'top': '0px', easing:'linear'});
	if (nTop < 0) {
		var edBlock = getEditorBlock(),
			sH = edBlock.height(),
			tH = sH - parseInt(this.PADDING, 10);
		this.sourceEditorHeight = sH + 'px';
		edBlock.animate({'margin-top': this.PADDING, 'height': (tH + 'px'), easing:'linear'});
	}
	this.iFindWord.focus();
	this.setActive();
	//TODO сдвигать textarea вниз
	//TODO анимация если хочется
}
/**
 * @description Шаблон формы поиска подстроки
*/
searchWordDialog.prototype.getWndTpl = function() {
	var tpl = '<div id="inputdlgarea">\
		<div>\
			<input type="text" id="iFindWord">\
			<div class="bWrapRight">\
				<input type="button" id="bFindWord" value="Find">\
				<input type="button" id="bCancel" value="Cancel">\
			</div>\
		</div>\
	\
	</div>';
	return tpl;
}
