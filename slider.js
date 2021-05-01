//слайдер диапозона ползунки
function Slide(elem,option=[]) {
	this.elem = elem;
	this.option = option;
	this.step = '';
	this.ballWidth = '';
	this.allElem = '';
	this.activeElem = '';
	this.widthRange = parseFloat($(this.elem).css('width'));
}



Slide.prototype.render = function () {

	var this__ = this;
	//var z = $(j);
	var position = $(this__.elem).offset();
	this__.step = this__.option[1] - this__.option[0];

	window.onresize = function () {
		position = $(this__.elem).offset();
	};

	var $amount_1 = $('<span />', {
		id: 1,
		class: 'id_1'
	});
	var $amount_2 = $('<span />', {
		id: 2,
		class: 'id_2'
	});
	$amount_1.appendTo(this__.elem);
	$amount_2.appendTo(this__.elem);

	var $range_color = $('<div />', {
			class: 'range-color',
			style:
			'width :' + this__.widthRange / 10 + 'px;height : 6px;background-color: rgb(241, 109, 127);position : absolute;z-index : 1;left : 21%;'
		}
	);
	this__.ballWidth = parseFloat($('#1').css('width'));
	$range_color.appendTo(this__.elem);

	writeValue(this__.step);

	$('#1').on('mousedown', function () {

		$('.range').off('mousedown');
		this__.allElem = $('.range span');
		this__.activeElem = $('#' + event.target.id);

		var idElem = event.target.id;
		var elem = $('#' + event.target.id);

		this__.allElem.removeClass('elactive');

		moveSlideborder(elem, idElem);
	});

	$('#2').on('mousedown', function () {

		$('.range').off('mousedown');
		this__.allElem = $('.range span');
		this__.activeElem = $('#' + event.target.id);

		var idElem = event.target.id;
		var elem = $('#' + event.target.id);

		this__.allElem.removeClass('elactive');

		moveSlideborder(elem, idElem);

	});

	$('.range').on('mousedown', function () {
		clickPosition(event);
		writeValue(this__.step);
	});

	function checkRight(pX, elem) {

		var wid;

		var a = (this__.widthRange - this__.ballWidth);
		wid = this__.widthRange + position.left - (this__.ballWidth / 2);
		if (pX > wid) {
			$(elem).css('left', a + 'px');
		}
	}

	function checkLeft(pX, elem) {


		var wid = position.left + (this__.ballWidth / 2);
		if (pX < wid) {
			$(elem).css('left', '0');
		}
	}

	function moveSlideborder(elem, idElem) {

		elem.on('dragstart', function () {
			return false;
		});

		$(document).on('mousemove', function () {

			elem.css('left', ((event.pageX - position.left - (this__.ballWidth / 2 - 2))) * 100 / this__.widthRange + '%');

			superPosition(elem, idElem);
			if (idElem == 1) {
				checkLeft(event.pageX, elem);
			}

			if (idElem == 2) {
				checkRight(event.pageX, elem);
			}

			rangeColorwidth(elem);
			writeValue(this__.step);

		});

		$(document).on('mouseup', function () {

			$('.range').on('mousedown', function () {
				clickPosition(event);
				writeValue(this__.step);
			});
			this__.activeElem.addClass('elactive');

			$(document).off('mousemove');
			$(document).off('mouseup');
		})
	}

	function rangeColorwidth(elem) {

		var el_1 = parseFloat($('#1').css('left'));
		var el_2 = parseFloat($('#2').css('left'));
		$('.range-color').css({
			'width': el_2 - el_1,
			'left': el_1 + this__.ballWidth / 2

		});

	}

	function superPosition(elem, idElem) {

		var el_1 = parseFloat($('#1').css('left'));
		var el_2 = parseFloat($('#2').css('left'));
		if ((el_2 - el_1) < 1 && idElem == 1) {
			elem.css('left', el_2 + 'px');
		}
		if ((el_2 - el_1) < 1 && idElem == 2) {
			elem.css('left', el_1 + 'px');
		}
	}

	function writeValue(step) {

		var val_1;
		var val_2;
		var wid_1 = parseFloat($('#1').css('left'));

		var wid_2 = parseFloat($('#2').css('left'));

		var c = this__.widthRange - this__.ballWidth;

		var n = c / step;
		n = +n.toFixed(3);
		val_1 = Math.floor(wid_1 / n) + this__.option[0];
		val_2 = Math.floor(wid_2 / n) + this__.option[0];
		$('#count_1').val(val_1);
		$('#count_2').val(val_2);
		$('#count_1, #count_2').trigger('change');
	}

	function clickPosition(e) {
		var offsetBlock = parseFloat($('.range-color').css('left'));
		var left = parseFloat($('#1').css('left'));
		var widthRangecolor = parseFloat($('.range-color').css('width'));
		var right = parseFloat($('#2').css('left'));
		var b = e.pageX - position.left;
		var c = widthRangecolor / 2;
		var d = e.pageX - position.left - offsetBlock;
		var newOffset = e.pageX - position.left;
		var t = e.target;
		var is = t.classList.contains('range-color');
		if (is) {
			if (c >= d) {
				$('#1').css('left', newOffset);
			} else {
				$('#2').css('left', newOffset - this__.ballWidth);
			}
		} else {
			if (b < left) {
				$('#1').css('left', newOffset);
			}
			if (b > right) {
				$('#2').css('left', newOffset - this__.ballWidth - 1);
			}

		}
		rangeColorwidth();
	}
}
