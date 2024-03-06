 
 //############################################################################################################## 2013.12.05 T-Gate 고도화 Song In Soon

// Grid Multiselect 사용시 필요 
var chkList = '', popType, scrbClData = '', scrbMvnoData = '', feeType = '', b2cType = '';

 /**
  * 브라우져 확인
  */
 function browser() {
	 var brw;
	 if($.browser.msie) {
		 brw = 'ie';
	 } else if ($.browser.safari) {
		 brw = 'safari';
	 } else if ($.browser.opera) {
		 brw = 'opera';
	 } else if ($.browser.mozilla) {
		 brw = 'firefox';
	 } else if ($.browser.chrome) {
		 brw = 'chrome';
	 }
	 return brw;
 }

 /**
  * 입력값의 숫자여부
  * @param arg
  */
 function onlyNum(event){
	// 모바일 크롬에서 오동작으로 조건 추가
	if(!(mobile && $.browser.chrome)) {
		var keycode = (event.keyCode) ? event.keyCode : event.which;
	 	if ((keycode<48)||(keycode>57)){
		    if (keycode < 96 || keycode > 105){
			    if ((keycode != 9 && keycode != 8 && keycode != 229 && keycode != 190 
		    	&& keycode != 46 && keycode != 13 && keycode != 16 
		        && keycode != 37 && keycode != 39)){
			        alert("숫자만 입력 가능합니다.");
		        	return false;
			    }
		    }
	 	}
	}
    return true;
 }
 
 /**
  * 날짜계산 : 일자 (기준일자 today)
  */
 function addDate(i){
	 var newDt = new Date();
	 newDt.setDate( newDt.getDate() + i );
	 return converDateString(newDt);
 }

 /**
  * 날짜를 YYYYMMDD 형태로 리턴
  */
 function converDateString(dt, dlm){
	 var delim = (dlm == undefined) ? '' : dlm;
	 return dt.getFullYear() + delim + addZero(eval(dt.getMonth()+1)) + delim + addZero(dt.getDate());
 }

 /**
  * 날짜를 YYYY-MM-DD HH:MI 형태로 리턴
  */
 function converDateTimeString(dt, ddlm, tdlm){
	 var ddelim = (ddlm == undefined) ? '' : ddlm;
	 var tdelim = (tdlm == undefined) ? '' : tdlm;
	 var year  = dt.substr( 0, 4);
	 var month = dt.substr( 4, 2);
	 var day   = dt.substr( 6, 2);
	 var hour  = dt.substr( 8, 2);
	 var minut = dt.substr(10, 2);	 
	 
	 return year + ddelim + month + ddelim + day + ' ' + hour + tdelim + minut;
 }
	 
 /**
  * 한자리 숫자에 '0'을 붙여서 리턴
  * @param i
  * @returns
  */
 function addZero(i){
	 var rtn = i + 100;
	 return rtn.toString().substring(1,3);
 }

 /**
  * 문자 Null, undefined 체크
  * @param str
  * @returns
  */
 function strNull(str, id) {
	 var val = (id == 'userNum' && isNaN(str)) ? '' : str;
	 if(str == null || str == undefined) {
		 val = '';
	 }
	 return val;
 }
 

 /**
  * 값이 비었는지 확인
  */
 function isEmpty( val ) {
 	 if(val == null || val == undefined) {
 		 val = "";
 	 }
     return ( ! trim( val ) );
 }
 
 function trim( val ) {
		
    var len = val.length;

    if ( len == 0 ) {
        return val;
    }

    var str = "", chr = "";
    for ( i = 0; i < len; i++ ) {
        chr = val.charAt( i );
        if ( chr != " " ) {
            str += chr;
        }
    }

    return str;
}

 // New Window Open
 var win;
 function windowOpen(pageUrl, pageName, width, height, scroll){
	 var LeftPosition = (screen.width ) ? (screen.width - width  )/2 : 0;
	 var TopPosition  = (screen.height) ? (screen.height - height)/2 : 0;
	 var settings     = 'height='+height+',width='+width+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable';
	 win = window.open(pageUrl, pageName, settings);
 }

 // 년 콤보 생성 : 활성기간 팝업
 function yearCombo(val) {
	 var year = new Date().getFullYear();
	 var yy = '<option value="">년</option>';
	 for(var i = year-3; i <= year+3; i++) {
		 var selected = (val == i) ? 'selected' : '';
		 yy += '<option value="'+i+'" '+selected+'>'+i+'</option><br/>';
	 }
	 return yy;
 }
 
 // 월 콤보 생성 : 활성기간 팝업
 function monthCombo(val) {
	 var mm = '<option value="">월</option>';
	 for(var i = 1; i <= 12; i++) {
		 var selected = (val == addZero(i)) ? 'selected' : '';
		 mm += '<option value="'+addZero(i)+'" '+selected+'>'+i+'</option><br/>';
	 }
	 return mm;
 }
 
 // 일 콤보 생성 : 활성기간 팝업
 function dayCombo(val,year,month) {
	 var dd = '<option value="">일</option>';
	 var dayCount;
	 if(year%4==0 && year%100!=0 || year%400==0){
	 	dayCount = new Array("1","31","29","31","30","31","30","31","31","30","31","30","31");
	 }else{
	 	dayCount = new Array("1","31","28","31","30","31","30","31","31","30","31","30","31");
	 }
	 for(var i = 1; i <= dayCount[parseInt(month,10)]; i++) {
		 var selected = (parseInt(val,10) == addZero(i)) ? 'selected' : '';
		 dd += '<option value="'+addZero(i)+'" '+selected+'>'+addZero(i)+'</option><br/>';
	 }
	 return dd;
 }
 
 // 시 콤보 생성
 function timeCombo(val) {
	 var tt = '<option value="">시</option>';
	 for(var i = 0; i <= 23; i++) {
		 var selected = (val == addZero(i)) ? 'selected' : '';
		 tt += '<option value="'+addZero(i)+'" '+selected+'>'+addZero(i)+'</option><br/>';
	 }
	 return tt;
 }
 
 // 분 콤보 생성 : 활성기간 팝업
 function minuteCombo(val) {
	 var mi = '<option value="">분</option>';
	 for(var i = 0; i < 60;) {
		// [변경] IT서비스개발2팀(00001448) 금이도 / 정인용 / CHG610000061746 / 무선상품관리 활성기간 시작일시 분 / 20180614 배포
		 var selected00 = (typeof val == 'number' && val >= 0 && val < 30) ? 'selected' : '';
		 var selected30 = (typeof val == 'number' && val >= 30) ? 'selected' : '';
		 mi += '<option value="'+addZero(i)+'" '+((i == 0) ? selected00 : selected30)+'>'+addZero(i)+'</option><br/>';
		 i=i+30;
	 }
	 return mi;
	 
 }
 
 /**
  * Popup Multi Select Event (단말기, 판매사이트, 요금제, 부가요금제(음성), 부가요금제(DATA), 부가서비스)
  * @param gridObj
  * @param rowId
  * @param status
  */
 function selectedRows(gridObj, cellNm, rowId, status, idCellNm, e, flag) {

	 var rowData = gridObj.getRowData(rowId);
	 var chk     = chkList.split(',');
	 var cellNms = cellNm.split(',');
	 var cellVal = '';
	 for(var i = 0; i < cellNms.length; i++) {
		 cellVal += rowData[cellNms[i]];
		 if(i < cellNms.length - 1) {
			 cellVal += '|';
		 }
	 }
	 
	 if(status) {
		 chkList += ',' + rowData[idCellNm];

		 if(popType == 'single') {
			 var lichk = '<li id="li_'+rowData[idCellNm]+'" name="'+cellVal+'"><label class="check-label"><input type="checkbox" id="'+rowData[idCellNm]+'" checked/> '+rowData[cellNms[0]]+'</label></li>';
			 $('#itemList').find('ul').append(lichk);
			 $('#confirmBtn').trigger('click');
		 } else {
			 var cnt = 0;
			 for(var i = 0; i < chk.length; i++) {
				 if(rowData[idCellNm] == chk[i]) {
					 alert(rowData[cellNms[0]]+' 은 이미 등록되었습니다.');
					 if(!flag) {
						 return;
					 } else {
						 cnt++;
						 chkList = chkList.replace(',' + rowData[idCellNm], '');
						 break;
					 }
				 }
			 }
			 if(cnt == 0) {
				 var lichk = '<li id="li_'+rowData[idCellNm]+'" name="'+cellVal+'"><label class="check-label"><input type="checkbox" id="'+rowData[idCellNm]+'" checked/> '+rowData[cellNms[0]]+'</label></li>';
				 $('#itemList').find('ul').append(lichk);
				 $('#itemList').find('ul > li').find('input[id='+rowData[idCellNm]+']:checkbox').click( function() {
					 if(!$(this).is(':checked')) {
						 unselectedRows(gridObj, idCellNm, $(this).attr('id'), e);
					 }
				 });
			 }
		 }
 	
	 } else {
		 for(var i = 0; i < chk.length; i++) {
			 if(rowData[idCellNm] == chk[i]) {
				 chkList = chkList.replace(',' + rowData[idCellNm], '');
			 }
		 }
 		
		 $('#li_'+rowData[idCellNm]).remove();
	 }
 }
 
 /**
  * Popup Multi unSelect Event (단말기, 판매사이트, 요금제, 부가요금제(음성), 부가요금제(DATA), 부가서비스)
  * @param gridObj
  * @param cellNm
  * @param id
  * @param e
  */
 function unselectedRows(gridObj, cellNm, id, e) {

	 var rowIds = gridObj.getDataIDs();			
	 var chk    = chkList.split(','), cnt = 0;	
	 for(var r = 0; r < rowIds.length; r++){
		 var rowData = gridObj.getRowData(rowIds[r]);	
		 if(rowData[cellNm] == id) {
			 cnt++;
			 gridObj.jqGrid("setSelection", rowIds[r], false, e);
			 break;
		 }	
	 }
	 
	 if(cnt == 0) { 
		 chkList = chkList.replace(',' + id, '');
		 $('#li_'+id).remove();
	 }
 }
 
 /**
  * Popup Select Event (가입유형)
  * @param obj
  */
 function selectedChk(obj) {
		
	 var id = obj.attr('id');
	 var nm = obj.attr('name');
		
	 if(obj.is(':checked')) {
		 chkList += ',' + obj.attr('id');
		 var lichk = '<li id="li_'+id+'" name="'+nm+'"><label class="check-label"><input type="checkbox" id="'+id+'" checked/> '+nm+'</label></li>';
		 $('#selList').append(lichk);
		 $('#selList').find('li').find('input[id='+id+']:checkbox').click( function(e) {
			 if(!$(this).is(':checked')) {				 
				 chkList = chkList.replace(',' + $(this).attr('id'), '');
				 $('#scrb_cl').find('li').find('input[id='+$(this).attr('id')+']:checkbox').attr('checked', false);
				 $('#scrb_mvno').find('li').find('input[id='+$(this).attr('id')+']:checkbox').attr('checked', false);
				 $('#selList').find('li[id=li_'+$(this).attr('id')+']').remove();
			 }
		 });
	 } else {
		 var chk = chkList.split(',');
		 for(var i = 0; i < chk.length; i++) {
			 if(obj.attr('id') == chk[i]) {
				 chkList = chkList.replace(',' + obj.attr('id'), '');
			 }
		 }
 		
		 $('#selList').find('li[id=li_'+id+']').remove();
	 }
 }

 