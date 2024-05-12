$(function() {
	cdgComm.init();
	cdgData.init();
	cdgDate.init();
	
	// 숫자, 숫자/단위, 숫자/알파벳, 숫자/알파벳,특수문자만 입력
	$(document).on('input keyup paste change blur focus', '.dev-number, .dev-numberAlpabat, .dev-numberAlpabatSpec, .dev-date', function() {
		var regExpObj = { regExp0 : /[^0-9]/g, regExp1 : /[^0-9a-zA-Z]/g, regExp2 : /[^0-9a-zA-Z.;\-_;\@]/g, regExp3 : /[^0-9\-]/g };			// 정규식 객체
		var regExp;																									// 정규식
		var selectorArray = ['dev-number','dev-numberAlpabat','dev-numberAlpabatSpec','dev-date'];					// 셀렉터 배열
		var $this = $(this);																						// 셀렉트된 객체
		var msg = '';																								// 알럿 메시지
		
		$.each(selectorArray, function(idx, itm) {
			if($this.hasClass(itm)) {
				regExp = regExpObj['regExp'+ idx];
				
				// 정규식에 맞는 알럿 메시지 설정
				switch(itm) {
					case selectorArray[0] : msg = '숫자'; break;
					case selectorArray[1] : msg = '숫자, 영문자'; break;
					case selectorArray[2] : msg = '숫자, 영문자, 특수문자(.;-_@)'; break;
					case selectorArray[3] : msg = '숫자'; break;
				}
				
				return false;
			}
		});
		
		if(regExp.test($this.val())) {
			alert(msg +'만 입력할 수 있습니다.');
			$this.val($this.val().replace(regExp, ''));
		}
	});

	$(document).on('input chnage', '.dev-date', function() {
		var date = $(this).val().replace(/-/gi, '');
		
		if (date.length >= 8) {
			if (cdgDate.isValidDate(date.substring(0,8))) {
				$(this).val(cdgData.dateFormatter(date.substring(0,8)));
			} else {
				$(this).val('');
			}
		}
	});
});

var cdgComm = {
	init : function() {
	}
	,
	//페이징 처리
	getPagingInfo : function(data) {
		
		if( data == null || typeof data == "undefined" ) return "";
		
		var paging = "";
		if( data.records > 0 ) {
			
			var prevNavi = Number(data.prevnavi);
			var startPage = Number(data.startpage);
			var endPage = Number(data.endpage);

			var page = Number(data.page);
			var nextNavi = Number(data.nextnavi);
			var lastPage = Number(data.lastpage);

			paging += "	 <a href='#' class='first' tabindex='1'>처음 페이지로 이동</a>";
			paging += "	 <a href='#' class='prev' tabindex='"+( prevNavi < 1 ? 1 : prevNavi)+"'>이전 10페이지로 이동</a>";
			for( var n=startPage; n<=endPage; n++) {
				if( n > lastPage ) break;
				if (n == page) {
					paging += "  <strong>"+n+"</strong>";
				} else {
					paging += "<a href='#' tabindex='"+n+"'>"+n+"</a>";
				}
			}
			paging += "	 <a href='#' class='next' tabindex='"+( nextNavi > lastPage ? lastPage : nextNavi )+"'>다음 10페이지로 이동</a>";
			paging += "	 <a href='#' class='last' tabindex='"+lastPage+"'>마지막 페이지로 이동</a>";
		}

		return paging;
	},
	/* 
	 Ajax jsp 로딩 
	 */
	loadHtml : function(url, param, id) {
		$.ajax({
			 url		: url
		   , type		: "POST"
		   , dataType   : "HTML"
		   , data       : param
		   , cache      : false
		   , success    : function(data, status, req) {
			   $('#'+id).html(data);
		   }
		   , error		: function(request, status, error) {
			   var param = {"errorCode":request.status};
			   cdgComm.loadHtml('/main/error.do', param, 'contentDiv');
		   }
		});
	},
	/* 모달 팝업 열기*/
	openModalPopup:function(tar) {
		var _tar = $("." + tar);

		$("body").append("<div class='modalBg'>");
		//$("body").css("position", "fixed");
		//$("body").css("top", "0");
		//$("body").css("overflow", "hidden");
		$(".modalBg").show();

		_tar.show();

		$(window).on("resize", function(){
			_tar.css("left", ($(window).width() - _tar.outerWidth() ) / 2 );
			_tar.css("top", ($(window).height() - _tar.outerHeight() ) / 2 );
		}).resize();
	},
	/* 모달 팝업 닫기 */
	closeModalPopup:function(){
		$(".modalBg").remove();
		//$("body").css("position", "relative");
		//$("body").css("overflow", "auto");
		$(".popWrap, .popWrapCom").hide();
	},
	/* 모달 공통 열기 */
	openModalCommon:function( tar ){
		var _tar = $("." + tar);

		$("body").append("<div class='modalBg'>");
		$("body").css("overflow", "hidden");
		$(".modalBg").show();

		_tar.show();

		$(window).on("resize", function(){
			_tar.css("left", ($(window).width() - _tar.outerWidth() ) / 2 );
			_tar.css("top", ($(window).height() - _tar.outerHeight() ) / 2 );
		}).resize();
	},
	/* 모달 공통 닫기 */
	closeModalCommon:function(callback, options){
		$(".modalBg").remove();
		$("body").css("overflow", "auto");
		$(".popWrap, .popWrapCom").hide();
		
		if (typeof callback === "function") {
			callback(options); 
		}
		else if (typeof callback === "string") {
			//new Function(callback);
			eval(callback);
		}
		else if (typeof callback === "object") {
			callback.focus();
		}
	}
};

var cdgData = {
	init : function() {
	}
	,
	/* 마스킹처리 고객명 */
	maskCustNm:function(custName, applFormSt, commReqDt) {
		
		var result = '';
		var len = 0;
		
		if (commReqDt.length >= 8) {
			commReqDt = commReqDt.substring(0,8);
		} 
		
		if (custName == null || custName == '') {
			result = '';
		//완료거나 오류면서 10일 지난 경우
		} else if (applFormSt == '07' || cdgDate.diffDaysToday(commReqDt) > 5) {
			len = custName.length;
			if (len == 1) {
				result = custName;
			} else if (len == 2) {
				result = custName.substring(0,1) + '*';
			} else {
				for (var i=1; i<len-1; i++) {
					result = result + '*';
				}
				result = custName.substring(0,1) + result + custName.substring(len-1);
			}
		} else {
			result = custName;
		}
		
		return result;
	},
	/* 마스킹처리 전화번호 */
	maskSvcNum:function(phonNum, applFormSt, commReqDt) {
	
		var phon_num = '';
		var mov_1 = '';
		var mov_2 = '';
		var mov_3 = '';
		
		if (commReqDt.length >= 8) {
			commReqDt = commReqDt.substring(0,8);
		} 
		
		if (phonNum == null || phonNum == '') {
			return '';
		}

		phonNum = phonNum.replace(/-/gi, '');
		
		if (phonNum.length == 12) { // ex>000206764832
			mov_1 = phonNum.substring(0, 4);
			mov_2 = phonNum.substring(4, 8);
			mov_3 = phonNum.substring(8, 12);

			// 국번이 4자리로 들어오므로 최초자릿수를 자른 후 세팅한다.
			if (phonNum.substring(0, 3) == '000') {
				mov_1 = mov_1.substring(2, 4);
			} else {
				mov_1 = mov_1.substring(1, 4);
			}

			// 두번째 번호가 0으로 시작 될 때는 버린다.
			if (mov_2.substring(0,1) == '0') {
				mov_2 = mov_2.substring(1);
			}
			phon_num = mov_1 + '-' + mov_2 + '-' + mov_3;
		} else if (phonNum.length == 11) {
			mov_1 = phonNum.substring(0, 3);
			mov_2 = '';
			mov_3 = '';

			if (phonNum.substring(0, 2) == '00') {
				mov_1 = phonNum.substring(1, 3);
			} else {
				mov_1 = phonNum.substring(0, 3);
			}

			if (phonNum.substring(3,4) == '0') {
				mov_2 = phonNum.substring(4, 7);
			} else {
				mov_2 = phonNum.substring(3, 7);
			}
			mov_3 = phonNum.substring(7);
			phon_num = mov_1 + '-' + mov_2 + '-' + mov_3;
		} else if (phonNum.length == 10) {
			if (phonNum.substring(0, 2) == '02') {
				mov_1 = phonNum.substring(0, 2);
				mov_2 = phonNum.substring(2, 6);
				mov_3 = phonNum.substring(6);
			} else {
				mov_1 = phonNum.substring(0, 3);
				mov_2 = phonNum.substring(3, 6);
				mov_3 = phonNum.substring(6);
			}
			phon_num = mov_1 + '-' + mov_2 + '-' + mov_3;
		} else if (phonNum.length == 9) {
			mov_1 = phonNum.substring(0, 2);
			mov_2 = phonNum.substring(2, 5);
			mov_3 = phonNum.substring(5);
			phon_num = mov_1 + '-' + mov_2 + '-' + mov_3;
		} else if (phonNum.length == 8) {
			mov_2 = phonNum.substring(0, 4);
			mov_3 = phonNum.substring(4, 8);
			phon_num = mov_2 + '-' + mov_3;
		} else {
			phon_num = phonNum;
		}
		
		if (applFormSt == '07' || cdgDate.diffDaysToday(commReqDt) > 5) {
			if (mov_2 != '' && mov_2.length > 2) {
				mov_2 = mov_2.substring(0,mov_2.length-2) + "**"; 
			}
			if (mov_3 != '' && mov_3.length > 3) {
				mov_3 = mov_3.substring(0,mov_3.length-3) + "***"; 
			}
			
			if (mov_2 != '' || mov_3 != '') {
				phon_num = mov_1 + '-' + mov_2 + '-' + mov_3;
			}
		}
		
		return phon_num;
	}
	,
	/* 마스킹처리 이메일 : eamil, 주소 : addr, 우편번호 : zip */
	maskCustInfo:function(value, applFormSt, commReqDt, info_cl) {
		var len = value.length;
		var result = '';
		var baseLen = 0;
		
		if (info_cl == 'email' || info_cl == 'addr') {
			baseLen = 4;
		} else if (info_cl == 'zip') {
			baseLen = 3;
		}
		
		if (commReqDt.length >= 8) {
			commReqDt = commReqDt.substring(0,8);
		} 
		
		if (value == null || value == '') {
			result = '';
		} else if (applFormSt == '07' || cdgDate.diffDaysToday(commReqDt) > 5) {
			if (len > baseLen) {
				result = value.substring(0,baseLen);
				for (var i=baseLen; i<len; i++) {
					result = result + '*';
				}
			} else {
				result = value;
			}
		} else {
			result = value;
		}
		
		return result;
	}
	//날짜포맷
	, dateFormatter:function(date) {
		var result = '';
		if (date == null || date == '') result = date;
		else if (date.length == 8) result = date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
		else if (date.length == 12) result = date.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1-$2-$3 $4:$5');
		else if (date.length == 14) result = date.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1-$2-$3 $4:$5:$6');
		else result = date;
		return result;
	}
	//숫자포맷
	, numberFormatter:function(value) {
		if(value==null){return false;}

		var src;
		var i;
		var factor;
		var su;
		
		var String_val = Math.floor(value).toString();
		
		factor = String_val.length % 3;
		su = (String_val.length - factor) /3;
		src = String_val.substring(0,factor);
		
		for(i=0; i<su ; i++)
		{
		   if ((factor==0)&&(i==0))
		    {
		         src += String_val.substring(factor+(3*i), factor+3+(3*i));
		    }
		    else 
		    {
		        if ( String_val.substring(factor+(3*i) - 1, factor+(3*i)) != "-" ) src +=",";
		        src += String_val.substring(factor+(3*i), factor+3+(3*i));
		    }
		}
		return src;
	}
	//NULL 처리
	, nvl:function(value) {
		if (value == null) return '';
		else return value;
	}
};

var cdgDate = {
		init : function() {}
		,
		/**
		 * 오늘 날짜를 YYYYMMDD 형태로 리턴
		 */
		getToday : function() {
			var today = new Date();
			return cdgDate.converDateString(today);
		},	

		/**
		 * 날짜를 YYYYMMDD 형태로 리턴
		 */
		converDateString : function(dt) {
			 return dt.getFullYear() + '' + cdgDate.addZero(eval(dt.getMonth()+1)) + '' + cdgDate.addZero(dt.getDate());
		},	
		
		/**
		 * 날짜계산 : 일자를 더한다.
		 */
		addDate : function(i) {
			var newDt = new Date();
			newDt.setDate(newDt.getDate() + Number(i));
			return cdgDate.converDateString(newDt);
		},
		
		/**
		 * 날짜계산 : 월을 더한다.
		 */
		addMonth : function(i) {
			var newDt = new Date();
			newDt.setMonth(newDt.getMonth() + Number(i));
			return cdgDate.converDateString(newDt);
		},
		
		/**
		 * 날짜계산 : 년을 더한다.
		 */
		addYear : function(i) {
			var newDt = new Date();
			newDt.setFullYear(newDt.getFullYear() + Number(i));
			return cdgDate.converDateString(newDt);
		}
		,
		
		/**
		 * 한자리 숫자에 '0'을 붙여서 리턴
		 * @param i
		 * @returns
		 */
		addZero : function(i) {
			 var rtn = i + 100;
			 return rtn.toString().substring(1,3);	
		}
		,
		
		/**
		 * 날짜계산 : 특정일에 일자를 더한다.
		 */
		addDateBySomeDay : function(dt, i) {
			dt = dt.replace(/-/gi, '');
			var newDt = new Date(dt.substring(0,4), dt.substring(4,6)-1, dt.substring(6,8));
			newDt.setDate(newDt.getDate() + Number(i));
			return cdgDate.converDateString(newDt);
		}
		,
		
		/**
		 * 날짜 차이
		 */
		diffDays : function(dt1, dt2) {
			dt1 = dt1.replace(/-/gi, '');
			dt2 = dt2.replace(/-/gi, '');
			var newDt1 = new Date(dt1.substring(0,4), dt1.substring(4,6)-1, dt1.substring(6,8));
			var newDt2 = new Date(dt2.substring(0,4), dt2.substring(4,6)-1, dt2.substring(6,8));
			var diff = parseInt((newDt2 - newDt1) / (1000 * 60 * 60 * 24));
			return diff;
		}
		,
		
		/**
		 * 오늘과 날짜 차이
		 */
		diffDaysToday : function(dt) {
			var today = new Date();
			dt = dt.replace(/-/gi, '');
			var newDt = new Date(dt.substring(0,4), dt.substring(4,6)-1, dt.substring(6,8));
			var diff = parseInt((today - newDt) / (1000 * 60 * 60 * 24));
			return diff;
		}
		,
		/**
		 * 날짜 유효성 체크 
		 */
		isValidDate : function(dt) {
			dt = dt.replace(/-/gi, '');
			var newDt = new Date(dt.substring(0,4), dt.substring(4,6)-1, dt.substring(6,8));
			if (newDt.getFullYear() == dt.substring(0,4) && newDt.getMonth() == dt.substring(4,6)-1 && newDt.getDate() == dt.substring(6,8)) {
				return true;
			} else {
				return false;
			}
		}
};


/**
 * 최대문자열값 초과시 나머지 문자열 잘라낸 후 반환
 * @param str
 * @param maxLength
 * @returns
 */
function cutLengthString(str, maxLength) {
	var len = 0;
	
	for (i=0; i < str.length; i++) {
		var oneChar = str.charAt(i);
		if (escape(oneChar).length ==  4) {
			len++;
		} 
		len++;
	}
	
	if(Number(len) > Number(maxLength)) {
		// 초과 값 삭제
		str = str.substr(0, maxLength);
	}
	
	return str;
}

/**
 * 문자열의 길이를 반환
 * @param str
 * @returns
 */
function txtLength(str) {
	var len = 0;
	
	for (i=0; i < str.length; i++) {
		var oneChar = str.charAt(i);
		if (escape(oneChar).length ==  4) {
			len++;
		} 
		len++;
	}
	
	return len;
}
/**
 * 문자열의 바이트수를 반환 
 * @param str
 * @returns
 */
function isStrByte(str) {
	var hanByte = 2;							// 한글 바이트수
	// 바이트수 계산
	var cbyte = 0;
	var liLeng = 0;
	for (i=0; i < str.length; i++) {
		var oneChar = str.charAt(i);
		if (escape(oneChar).length > 4) {
			cbyte += hanByte;					// 한글일 경우
		} else {
			cbyte++;							// 한글이 아닐 경우
		}
	}
	
	return Number(cbyte)
}

/**
 * 문자열을 바이트수로 자른 후 반환
 */
function cutString(str, maxByte) {
	var hanByte = 2;							// 한글 바이트수
	
	// 바이트수 계산
	var cbyte = 0;
	var liLeng = 0;
	for (i=0; i < str.length; i++) {
		var oneChar = str.charAt(i);
		if (escape(oneChar).length > 4) {
			cbyte += hanByte;					// 한글일 경우
		} else {
			cbyte++;							// 한글이 아닐 경우
		}
		
		if(maxByte) {
			if (cbyte <= maxByte) {
				liLeng = i + 1;
			}
		}
	}
	
	// 문자열이 최대 바이트수를 초과하는지를 체크
	if(Number(cbyte) > Number(maxByte)) {
		// 초과 값 삭제
		str = str.substr(0, liLeng);
	}
	
	return str;
};
