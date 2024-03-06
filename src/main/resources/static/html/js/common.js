function addClass(element,value) {
	if (!element.className) {
		element.className = value;
	} else {
		newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}

function roundConer(classname) {
	var divEl = document.getElementsByTagName("div");
	for (i=0; i<divEl.length; i++) {
		if(divEl[i].className.indexOf(classname) != -1) {
			var wrap = divEl[i];
			wrap.style.position = "relative";
			var tar = wrap.getElementsByTagName("span")[0];	
			wrap.style.width = tar.offsetWidth + "px"
			wrap.style.height = tar.offsetHeight + "px"
			
			var TopLeft = document.createElement("div");
			var TopRight = document.createElement("div");
			var BottomLeft = document.createElement("div");
			var BottomRight = document.createElement("div");
			TopLeft.className = "tl";
			TopRight.className = "tr";
			BottomLeft.className = "bl";
			BottomRight.className = "br";

			wrap.appendChild(TopLeft);
			wrap.appendChild(TopRight);
			wrap.appendChild(BottomLeft);
			wrap.appendChild(BottomRight);

			if (tar.offsetWidth % 2 == 1) {		 
				addClass(TopRight,"right_for6");
				addClass(BottomRight,"right_for6");
			}
			if (tar.offsetHeight % 2 == 1) {
				addClass(BottomLeft,"bottom_for6");
				addClass(BottomRight,"bottom_for6");
			}
		}
	}
}

var win = null;
function openNewWindow(pop,popname,w,h,scroll){
    LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
    TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
    settings = 'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable' 
    win = window.open(pop,popname,settings)
}


function getExt(src) {
	var url = src.split('/');
	var img = url[url.length-1];
	return img.split('.')[1];	
}

function imageOver(imgEl) {
	var ext = getExt(imgEl.src);
	imgEl.src = imgEl.src.replace("."+ext, "_on."+ext);
}
function imageOut(imgEl) {
	var ext = getExt(imgEl.src);
	imgEl.src = imgEl.src.replace("_on."+ext, "."+ext);
}

// GNB 
var status = "none";
function GnbMenu(index) {
    for (i=1; i<=5; i++)
    if (index == i) {
		var thisMenu = document.getElementById('gnbSub' + index).style ;
		thisMenu.display = "block";
    } 
    else {					
    	otherMenu = document.getElementById('gnbSub' + i).style ;
    	otherMenu.display = "none"; 
    }
  }
	
 function GnbClose(index){
 	document.getElementById('gnbSub' + index).style.display = "none";
 }
 

// 마우스 오른쪽버튼 제한
function click() {
	if ((event.button==2) || (event.button==2)) {
		alert('오른쪽 마우스 버튼은 사용하실 수 없습니다');
	}
}

function processKey(){
	if ((event.ctrlKey == true && (event.keyCode == 78 || event.keyCode == 82)) || (event.keyCode >= 112 && event.keyCode <= 123))
	{
		event.keyCode = 0;
		event.cancelBubble = true;
		event.returnValue = false;
	}
	if(event.altKey == true) alert("Alt 키를  사용할수 없습니다");
	//if(event.shiftKey == true) alert("shift 키를 사용할수 없습니다");
}

function fnCheckNumMsg(name){
 var SsnNum="0123456789";
 var returnValue = true;
 //alert(name.value);
 var tmpName = name.value; 
 
 for (var i=0;i< tmpName.length;i++)
  if (-1 == SsnNum.indexOf( tmpName.charAt(i)))
   returnValue = false;
 if (!returnValue) {
  name.value ="";
  alert("숫자만 가능합니다   ");
  return false;
 }
   return returnValue;
}

/**
 * 브라우저 Object return
 * @param movieName
 * @return
 */
function thisMovie(movieName)
{
	if(navigator.appName.indexOf("Microsoft") != -1)
		return window[movieName];
    else
        return document[movieName];
}


/*
document.onkeydown = processKey;
document.onmousedown = click;
document.oncontextmenu = new Function('return false'); 
document.ondragstart = new Function('return false'); 
document.onselectstart = new Function('return false');
*/

/*################################################################################################## 2013.10.24 T-Gate 고도화 : Song In Soon*/

//Prototype 선언
if(typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, ''); 
	}
}

if(typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function(str) {
		return this.indexOf(str) == 0;
	};
}

// 모바일 체크
var ua = window.navigator.userAgent;
var mobile = ua.indexOf('Android') > 0 || ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0;
var iPad   = ua.indexOf('iPad') > 0;

// Constant List : 공통코드 LCL_CD 목록
var WIRE_WLESS_COMB_TYP  = 'WIRE_WLESS_COMB_TYP';
var SAV_MOD_TYPE         = 'SAV_MOD_TYPE';
var APRV_ST_TYPE         = 'APRV_ST_TYPE';
var SUM_TOTAL_GUBUN      = 'SUM_TOTAL_CL';
var ORG_TYPE             = 'ORG_TYPE';
var AUCT_CL              = 'AUCT_CL';
var SPMALL_ST_CD         = 'SPMALL_ST_CD';
var USIM_CARD_BUY_YN     = 'USIM_CARD_BUY_YN'; // 03,02
var USIM_PAY_MTHD        = 'USIM_PAY_MTHD';  // 02,03,04
var T_ALLOT_SUPRT        = 'T_ALLOT_SUPRT';
var SCRB_FEE_PAY_MTHD    = 'SCRB_FEE_PAY_MTHD';
var YN_TYPE              = 'YN_TYPE';
var PAFPAY_CNVT_MOV_DISP = 'PAFPAY_CNVT_MOV_DISP';
var DIS_RATE             = 'DIS_RATE';
var B2B_ONLINE_CL        = 'B2B_ONLINE_CL';
var TG_SCRB_CL           = 'TG_SCRB_CL';
var TG_SCRB_CL_MVNO      = 'TG_SCRB_CL_MVNO';
var WIRE_PROD            = 'WIRE_PROD';
var TG_SCRB_CL_MAX_CNT = 'TG_SCRB_CL_MAX_CNT';
var PROD_ID_CL_MAX_CNT = 'PROD_ID_CL_MAX_CNT';


var STR_SEL = [['', '선택'], ['00', '선택']];
var STR_ALL = [['', '전체'], ['99', '전체']];

// 공통코드 JSON DATA -> value:text; 형식으로 저장 (마지막 ; 없음)
var jsonData = { usimCardBuyYn:'', usimPayMthd:'', tAllotSuprt:'', tAgrmtDc:'', scrbFeePayMthd:'', ynType:'', pafpayCnvtMovDisp:'', disRate:'', b2bOnlineCl:''
			   , tgScrbCl:'', tgScrbMvno:'', wireProd:'',tgScrbClMaxCnt:'',prodIdClMaxCnt:''
			   };

// Popup Return Value
var popupData = { cd:'', nm:'', sale_chnl:'', chnl_cd:'', org_id:'', eqp_mdl_cd:'', scrb_cl_cd:'', scrb_cl_nm:'', spmall_url:'', spmall_cl:'', spmall_abbr:''
				, wire_wless_comb_typ:'', prod_nm_cl_cd:'', from:'', to:'', wire:'', prod_seq:'', b2cType:'', user_id:'', rowId:'', tab_mgmt_seq:'', count:''
				, prod_grp_seq:'', spmall_all:false, sender_num:'',mktg_org_lvl_cd:'',mkt_div_org_id:'',cntr_org_id:'', eqp_2g3g_cl:'', prod_sale_prd_from:''
				, prod_sale_prd_to:'', sale_sta_tm:'', sale_end_tm:'',parent_row_id:''
				 ,fee_prod_cnt:'',status_datas:'', prod_seq_datas:'',fee_prod_cd_nm_datas:'', fee_prod_cd_datas:'', out_amt_datas:''
			     ,skt_bas_suprt_amt_datas:'',skt_add_suprt_amt_datas:'',mfact_suprt_amt_datas:'', agn_suprt_amt_datas:'',selr_suprt_amt_datas:''
			     ,agrmt_suprt_amt_datas:'',allot_prd_datas:'', allot_prn_datas:'',rten_pen_strd_amt_datas:'',scrb_fee_pay_mthd_datas:''
			     ,pafpay_cnvt_mov_disp_datas:'', disrate_datas:'',add_prcpln_voice_datas:'', add_prcpln_voice_nm_datas:'',add_prcpln_data_datas:'' , add_prcpln_data_nm_datas:''
				 ,supl_svc_nm_datas:'',supl_svc_datas:'',fee_update_status:'',t_allot_suprt_datas:'',t_agrmt_dc_datas:'',agrmt_allot_cl_datas:''
				 
				// ---------------------------------
				// 2017 테이크 추가
				// ---------------------------------	 
				 ,rental_allot_mth_cnt_datas:'', eqprent_plan_id_datas:''	 
				};

// 유선상품 Data -> saveRow 사용시 추가 parameter
var wireData = [];

// jqGrid -> saveRow 사용시 추가 parameter
var extraparam = { org_id:'', user_id:'', co_cl_cd:'', wire_wless_comb_typ:'', tab_mgmt_seq:'', tab_mst_seq:'', sale_chnl:'', selr_suprt_amt:'' };

// 수정이벤트 발생시 데이터 저장 -> 일괄수정버튼 클릭시 사용될 데이터
var allModify = [];

// 요금제 수정 이벤트 발생 데이터 저장 -> 요금제 일괄수정버튼 클릭시 사용될 데이터
var prodModify = [];

// popupData reset
function resetPopupData(key) {
	switch(key) {
	case 'eqpSearch' :
		popupData.cd = '';
		popupData.nm = '';
		popupData.eqp_2g3g_cl = '';
		break;
	case 'saleSiteSearchF' : 
		popupData.cd = '';
		popupData.nm = '';
		popupData.eqp_mdl_cd = '';
		break;
	case 'scrbClSelect' : 
		popupData.scrb_cl_cd = '';
		popupData.scrb_cl_nm = '';
		popupData.eqp_mdl_cd = '';
		popupData.wire_wless_comb_type = '';
		break;
	case 'feeProdSearch' : 
		popupData.cd = '';
		popupData.nm = '';
		popupData.prod_nm_cl_cd = '';
		break;
	case 'combiSearchF' : 
		popupData.wire = '';
		popupData.prod_seq = '';
		break;
	case 'pcdRgstSearch' :
		popupData.kait_acept_sale_br_cd = '';
		break;
	case 'feeProdOrderSearch' :	// 요금제(OneUrl) 2016.06.20 이종길
		popupData.prod_nm_cl_cd = '';
	}
}

// 공통 팝업 호출 텍스트 windowOpen(pageUrl, pageName, width, height, scroll, 사파리일 경우 팝업 사이즈 조절을 위한 값)
var eqpSearch       = 'javascript:windowOpen(\"/common/eqpSrchList.do?popType=single\", \"EqpSearch\", \"660\", \"650\", \"no\", \"eqpSearch\");';					// 단말기 찾기 팝업
var eqpSearchF      = 'javascript:windowOpen(\"/common/eqpSrchList.do?popType=multi\", \"EqpSearch\", \"660\", \"750\", \"no\", \"eqpSearch\");';					// 단말기 찾기 팝업
var clearCol        = 'javascript:clearColumn($iRow$, $iCol$);';																									// 선택된 cell clear 함수
var saleSiteSearch  = 'javascript:windowOpen(\'/common/saleSiteSrchList.do?popType=single\', \'SaleSiteSearch\', \'660\', \'650\', \'no\', \'saleSiteSearch\');';	// 판매사이트 찾기 팝업
var saleSiteSearchF = 'javascript:windowOpen(\'/common/saleSiteSrchList.do?popType=multi\', \'SaleSiteSearch\', \'660\', \'750\', \'no\', \'saleSiteSearch\');';	// 판매사이트 찾기 팝업
var scrbClSelect    = 'javascript:windowOpen(\"/common/scrbClSelect.do\", \"ScrbClSelect\", \"660\", \"755\", \"yes\", \"scrbClSelect\");';							// 가입유형 선택 팝업
var feeProdSearch   = 'javascript:windowOpen(\"/common/prcplnSrchList.do?popType=single\", \"PrcplnSrchList\", \"660\", \"650\", \"no\", \"feeProdSearch\");';		// 요금제, 부가요금제(음성, DATA), 부가서비스 찾기 팝업
var feeProdSearchF  = 'javascript:windowOpen(\'/common/prcplnSrchList.do?popType=multi\', \'PrcplnSrchList\', \'660\', \'750\', \'no\', \'feeProdSearch\');';		// 요금제, 부가요금제(음성, DATA), 부가서비스 찾기 팝업
var periodSelect    = 'javascript:windowOpen(\"/common/periodSelect.do\", \"PeriodSelect\", \"470\", \"340\", \"no\", \"periodSelect\");';							// 활성기간 선택 팝업
var combiSearchF    = 'javascript:windowOpen(\'/common/combiSrchList.do\', \'CombiSrchList\', \'660\', \'690\', \'no\', \'combiSearch\');';							// 결합상품 선택 팝업
var prodMoveUrl     = '/common/prodMove.do';																														// 상품이동 팝업
var saleSiteContF   = 'windowOpen(\'/prod/saleSiteCont.do\', \'SaleSiteCont\', \'640\', \'395\', \'no\', \'saleSiteCont\');';										// 판매사이트 설정 팝업
//var smsF            = 'windowOpen(\'/common/cmnAdminPopup.do?vw=comm_SMS\', \'SMS\', \'920\', \'700\', \'no\', \'sms\');';											// SMS 팝업 (공지사항)
var applDistribute    = 'javascript:windowOpen(\'/common/applDistribute.do\', \'ApplDistribute\', \'500\', \'500\', \'no\', \'applDistribute\');';					// TWSP 신청서 분배 팝업
//var pcdRgstSearch  = 'javascript:windowOpen(\'/common/PcbRgstSrchList.do?popType=single\', \'PcbRgstSearch\', \'660\', \'750\', \'no\', \'PcbRgstSearch\');';		// 판매점등록 팝업
var pcdRgstSearch       = 'javascript:windowOpen(\"/common/PcbRgstSrchList.do?popType=single\", \"PcbRgstSearch\", \"660\", \"650\", \"no\", \"PcbRgstSearch\");';
// Grid Multiselect 사용시 필요 : 그리드 row 선택 또는 선택해제시 데이터를 ',값' 형태로 붙인다 (중요:*****)

/** 2016.06.13 **/
var feeProdOrderSearch   = 'javascript:windowOpen(\"/common/feeProdOrderSearch.do\",\"feeProdOrderSearch\", \"800\", \"550\", \"yes\", \"feeProdOrderSearch\");';		// 요금제 임시 이종길
var chkList = '';

// 마지막 선택된 RowId
var lastSelRow, lastICol;

// Grid Row Text
var rowNum  = 10;
var rowList = [10,20,30];
var rowText = '개씩 보기';

// Title Buttons
var insertBtn, deleteBtn, saveBtn, excelBtn, newAddBtn, prodMtBtn;

// Toolbar Buttons
var toolbarFrozen,toolbarMateAdd, toolbarAdd, toolbarMod, toolbarCopy, toolbarMove, toolbarAuthStop, toolbarAppHold, toolbarAppRej, toolbarApp, toolbarNewReg, toolbarColOpen, toolbarColClose;

// Column Button Images
var searchimg, clearimg, modifyimg, calendarimg;

// Column Buttons
var colSearch, colClear, colCalendar, colAdd, colMod;

// Column Edittype
var colDiv, input4, textsearchclear, buttonlink;

// Grid Buttons Create
function createGridButtons(img_path) {

	// Title Buttons
	insertBtn = '<button type="button" class="btn btn-red  pull-right" id="insertBtn" ><img src="'+img_path+'/common/bul/add.png"   title="등록"         /> 등록</button>';
	deleteBtn = '<button type="button" class="btn btn-gray pull-right" id="deleteBtn" ><img src="'+img_path+'/common/bul/cross.png" title="삭제"         /> 삭제</button>';
	saveBtn   = '<button type="button" class="btn btn-red  pull-right" id="saveBtn"   ><img src="'+img_path+'/common/bul/save.png"  title="저장"         /> 저장</button>';
	excelBtn  = '<button type="button" class="btn btn-gray pull-right" id="excelBtn"  ><img src="'+img_path+'/common/bul/exel.png"  title="엑셀다운로드" /> 엑셀 다운로드</button>';
	newAddBtn = '<button type="button" class="btn btn-red  pull-right" id="newAddBtn" ><img src="'+img_path+'/common/bul/check.png" title="신규등록" 	 /> 신규등록</button>';
	allConfirmBtn   = '<button type="button" class="btn btn-red  pull-right" id="allConfirmBtn"   ><img src="'+img_path+'/common/bul/save.png"  title="일괄승인"         /> 일괄승인</button>';
	prodMtBtn = '<button class="btn btn-red" id="prodMtBtn" ><img src="'+img_path+'/common/bul/pen.png" alt=""> 상품관리</button>';
	
	// Toolbar Buttons
	toolbarFrozen   = '<select class="select01" name="frozenCol" style="width:120px">';
	toolbarFrozen  += '<option value="1">고정컬럼수 : 1</option>';
	toolbarFrozen  += '<option value="2">고정컬럼수 : 2</option>';
	toolbarFrozen  += '<option value="3">고정컬럼수 : 3</option>';
	toolbarFrozen  += '<option value="4">고정컬럼수 : 4</option>';
	toolbarFrozen  += '</select>';
	toolbarMateAdd  = '<button type="button" class="btn btn-gray" style="cursor:pointer;vertical-align:middle;" id="addMateProdBtn" data-mateyn="Y"><img src="'+img_path+'/common/bul/add.png"  title="상품추가"     /> T렌탈상품추가</button>';
	toolbarAdd      = '<button type="button" class="btn btn-gray" style="cursor:pointer;vertical-align:middle;" id="addProdBtn" data-mateyn="N"><img src="'+img_path+'/common/bul/add.png"  title="상품추가"     /> 상품추가</button>';
	toolbarMod      = '<button type="button" class="btn btn-gray" style="cursor:pointer;vertical-align:middle;" id="modProdBtn" ><img src="'+img_path+'/common/bul/pen.png"  title="상품일괄수정" /> 상품일괄수정</button>';
	toolbarCopy     = '<button type="button" class="btn btn-gray" style="cursor:pointer;vertical-align:middle;" id="copyProdBtn"><img src="'+img_path+'/common/bul/copy.png" title="복사"         /> 복사</button>';
	toolbarFeeProdAdd      = '<button type="button" class="btn btn-gray" style="cursor:pointer;vertical-align:middle;" id="addProdBtn" ><img src="'+img_path+'/common/bul/add.png"  title="요금제추가"     /> 요금제추가</button>';
	toolbarFeeProdMod      = '<button type="button" class="btn btn-gray" style="cursor:pointer;vertical-align:middle;" id="modProdBtn" ><img src="'+img_path+'/common/bul/pen.png"  title="요금제일괄수정" /> 요금제일괄수정</button>';
	toolbarFeeProdCopy     = '<button type="button" class="btn btn-gray" style="cursor:pointer;vertical-align:middle;" id="copyProdBtn"><img src="'+img_path+'/common/bul/copy.png" title="요금제복사"         /> 요금제복사</button>';
	toolbarMove     = '<button type="button" class="btn btn-gray" style="cursor:pointer;vertical-align:middle;" id="movProdBtn" > 이동 </span>';
	toolbarAuthStop = '<img src="'+img_path+'/btn/btnY_auth_stop.gif"       title="권한정지"     onmouseover="imageOver(this)" onmouseout="imageOut(this)" id="moveProdBtn" style="cursor:pointer;"/>';
	toolbarAppHold  = '<img src="'+img_path+'/btn/btnY_approval_hold.gif"   title="승인보류"     onmouseover="imageOver(this)" onmouseout="imageOut(this)" id="moveProdBtn" style="cursor:pointer;"/>';
	toolbarAppRej   = '<img src="'+img_path+'/btn/btnY_approval_reject.gif" title="승인거부"     onmouseover="imageOver(this)" onmouseout="imageOut(this)" id="moveProdBtn" style="cursor:pointer;"/>';
	toolbarApp      = '<img src="'+img_path+'/btn/btnR_approval.gif"        title="승인"         onmouseover="imageOver(this)" onmouseout="imageOut(this)" id="moveProdBtn" style="cursor:pointer;"/>';
	toolbarNewReg   = '<img src="'+img_path+'/btn/btn_new_regist.gif"       title="신규등록"     onmouseover="imageOver(this)" onmouseout="imageOut(this)" id="moveProdBtn" style="cursor:pointer;"/>';
	toolbarColOpen  = '<img src="'+img_path+'/btn/05_all_column_open.gif"   title="전체컬럼열기" onmouseover="imageOver(this)" onmouseout="imageOut(this)" id="moveProdBtn" style="cursor:pointer;"/>';
	toolbarColClose = '<img src="'+img_path+'/btn/05_all_column_close.gif"  title="전체컬럼닫기" onmouseover="imageOver(this)" onmouseout="imageOut(this)" id="moveProdBtn" style="cursor:pointer;"/>';

	// Column Button Images
	searchimg       = img_path+'/common/btn/btn_search.gif';
	clearimg        = img_path+'/common/btn/btn_del1.gif';
	modifyimg       = img_path+'/common/btn/btn_modify.gif';
	calendarimg     = img_path+'/common/ico/calendar.png';

	// Column Buttons
	//colSearch       = '<img src="'+img_path+'/common/btn/btn_search.gif" $search$  title="찾기"   id="colSearchBtn" style="cursor:pointer;vertical-align:middle;padding-right:5px;"/>';
	//colClear        = '<img src="'+img_path+'/common/btn/btn_del1.gif"   $clear$   title="지우기" id="colClearBtn"  style="cursor:pointer;vertical-align:middle;padding-right:5px;"/>';
	//colModify       = '<img src="'+img_path+'/common/btn/btn_modify.gif" $onclick$ title="수정"   id="colModifyBtn" style="cursor:pointer;vertical-align:middle;padding-right:5px;"/>';
	colCalendar     = '<img src="'+img_path+'/common/ico/calendar.png"             title="달력"   id="colCalendar"  style="cursor:pointer;vertical-align:middle;padding-right:5px;"/>';

	colSearch       = '<span class="btn btn-gray" title="찾기"   $search$  style="cursor:pointer;vertical-align:middle;">찾기</span>';
	colClear        = '<span class="btn btn-gray" title="지우기" $clear$   style="cursor:pointer;vertical-align:middle;">지우기</span>';
	colAdd          = '<span class="btn btn-gray" title="등록"   $onclick$ style="cursor:pointer;vertical-align:middle;">등록</span>';
	colMod          = '<span class="btn btn-gray" title="수정"   $onclick$ style="cursor:pointer;vertical-align:middle;">수정</span>';
	
	// 그리드 컬럼 세팅용 div
	colDiv          = '<div style="width:95%;align:center;margin:0 auto;">$div$</div>';
	
	// 색상 컬럼에 사용할 html
	input4          = [ '<input type="text" name="$name$" id="$id$" value="$value$" style="width:22%;height:auto;"/>', '<input type="text" name="$name$" id="$id$" value="$value$" style="width:22%;height:auto;"/>'
	                  , '<input type="text" name="$name$" id="$id$" value="$value$" style="width:22%;height:auto;"/>', '<input type="text" name="$name$" id="$id$" value="$value$" style="width:22%;height:auto;"/>'];
	
	// 부가서비스 컬럼에 사용할 html
	textsearchclear = '<span $id$ style="vertical-align:middle;padding-right:5px;">$value$</span>'+colSearch+' '+colClear;
	
	// 판매사이트 컬럼에 사용할 html
	buttonlink      = colMod+'<span $spanId$ style="vertical-align:middle;padding-left:5px;">$span$</span>';
}

// 그리드가 화면을 벗어나지 않게 Max 사이즈로 고정 후 가로 스크롤 생성
function gridHScroll(obj) {
	var id = obj.attr('id');
	//obj.setGridWidth($('#gbox_'+id).css('width'), false);
	obj.setGridWidth($('#gbox_'+id).css('width'), false);
	$('.ui-jqgrid-bdiv').css('overflow-x', 'scroll').css('width', '100%');
}

// 그리드가 화면을 벗어나지 않게 Max 사이즈로 고정 후 세로 스크롤 생성 - 필요없음
function gridVScroll(obj) {
	var id = obj.attr('id');
	obj.setGridWidth($('#gbox_'+id).css('width'), false);
	$('.ui-jqgrid-bdiv').css('overflow-y', 'scroll');
}

// Grid 틀고정
function frozenColumns(Obj, size, idx, flag, plus) {
	if(flag) {
		for(var s = 0; s <= size + plus; s++) {
			var colNm = Obj.getCellName(s);
			Obj.setColProp(colNm, {frozen : false});
		}
		Obj.jqGrid('destroyFrozenColumns'); // 현재 틀고정을 전부 해제
	}
	var index = (idx > 1) ? parseInt(idx)+plus : idx;
	for(var i = 0; i <= index ; i++) {
		var colNm = Obj.getCellName(i);
		Obj.setColProp(colNm, {frozen : true});
	}
	Obj.jqGrid('setFrozenColumns');			// 새로운 값으로 틀고정
}

// File Download
function goFiledownLoad(obj, url, target, fileNm, logicFileNm, seq) {
	obj.find('input[name=seq]').val(seq);
	obj.find('input[name=filename]').val(fileNm);
	obj.find('input[name=aliasfilename]').val(logicFileNm);
	obj.attr('action', url);
	obj.attr('target', target);
	obj.submit();
}

// Common Code JSON List : DB에서 공통코드 값을 가져와 select, radio 생성가능
function getCommCodeList(codeInfo, nextProcess, sort) {
	
	var info     = codeInfo;
	var lclCd    = new Array();
	var useCd    = new Array();
	var callFunc = new Array();
	for(var c = 0; c < info.length; c++) {
		/* 
		 * 0:LCL_CD, 1:사용할 코드 배열, 2:호출함수(makeRadioGroup/makeComboSel...), 3:생성할 Object ID
		 * 4:Object 생성에 필요한 값 배열(name값, id값, Radio Checked Value, Combo 생성시 사용할 Title index...)
		 */ 
		var callFuncParam = info[c][2]+'(codeList,\''+info[c][3]+'\'';	   
		if(info[c].length > 4){
		    for(var p = 0; p < info[c][4].length; p++) {
		    	callFuncParam += ',\''+info[c][4][p]+'\'';
		    }
		}
	    callFuncParam += ');';

		lclCd[c]    = info[c][0];
		useCd[c]    = info[c][1];
		callFunc[c] = callFuncParam;
	}	
	
	var param = 'lcl_cd=';
	for(var i = 0; i < lclCd.length; i++) {
		param += (i > 0) ? ',' : '';
		param += lclCd[i];
	}
	param += '&sort=' + sort;
	
	$.ajax({
		  url      : '/common/getCommCodeJSONList.do?'+param
		, type     : 'POST'
		, dataType : 'JSON'
		, cache    : false
		, success  : function(data, stauts, request) {
			var list = data.commCodeList;
			
			if(list.length > 0) {
				for(var g = 0; g < lclCd.length; g++) {
					var codeList = new Array(), n = 0, c= 0;
					for(var d = 0; d < list.length; d++) {
						if(lclCd[g] == list[d].LCL_CD) {
							c++;
							if(useCd[g].length > 0) {
								for(var u = 0; u < useCd[g].length; u++) {
									if(useCd[g][u] == list[d].CD_VAL) {
										codeList[n++] = [list[d].CD_VAL, list[d].LCL_NM];
										break;
									}
								}
							} else {
								codeList[n++] = [list[d].CD_VAL, list[d].LCL_NM];
							}
						}
					}
					if(c == 0) {
						alert(lclCd[g] + ' : 요청하신 코드가 존재하지 않습니다.');
					} else {
						//alert(callFunc[g]);
						eval(callFunc[g]);
					} 
				}
			} else {
				alert('요청하신 코드가 존재하지 않습니다.');
			}
			eval(nextProcess);
		}
		, error    : function(request, status, error) {
			alert('에러가 발생하였습니다.\n\r\n\r상태코드 : ' + request.status + '\n\r에러메세지 :\n\r' + request.responseText);
		}
	});	
}

//Common Code JSON Group : DB에서 공통코드 값을 가져와 jsonData에 저장
function getCommCodeGroup(codeInfo, nextProcess, sort) {
	
	var info     = codeInfo;
	var lclCd    = new Array();
	var useCd    = new Array();
	var setData  = new Array();
	var option0  = new Array();
	for(var c = 0; c < info.length; c++) {
		// jsonData Obj
		var dataObj = 'jsonData.' + info[c][2] + ' = codeList';	  

		lclCd[c]   = info[c][0];
		useCd[c]   = info[c][1];
		setData[c] = dataObj;
		option0[c] = info[c][3];
	}	
	
	var param = 'lcl_cd=';
	for(var i = 0; i < lclCd.length; i++) {
		param += (i > 0) ? ',' : '';
		param += lclCd[i];
	}
	param += '&sort=' + sort;
	
	$.ajax({
		  url      : '/common/getCommCodeJSONList.do?'+param
		, type     : 'POST'
		, dataType : 'JSON'
		, cache    : false
		, success  : function(data, stauts, request) {
			var list = data.commCodeList;
			
			if(list.length > 0) {
				for(var g = 0; g < lclCd.length; g++) {
					var codeList = option0[g], n = 0, c = 0, lclTotal = 0;
					
					for(var t = 0; t < list.length; t++) {
						if(lclCd[g] == list[t].LCL_CD) {
							lclTotal++;
						}
					}					
					
					for(var d = 0; d < list.length; d++) {
						if(lclCd[g] == list[d].LCL_CD) {
							if(useCd[g].length > 0) {
								for(var u = 0; u < useCd[g].length; u++) {
									if(useCd[g][u] == list[d].CD_VAL) {
										codeList += list[d].CD_VAL + ':' + list[d].LCL_NM;
										if(u < useCd[g].length - 1) {
											codeList += ';';
										}
										break;
									}
								}
							} else {
								codeList += list[d].CD_VAL + ':' + list[d].LCL_NM;
								if(c < lclTotal - 1) {
									codeList += ';';
								}
							}
							c++;
						}
					}
					codeList += '';
					if(c == 0) {
						alert(lclCd[g] + ' : 요청하신 코드가 존재하지 않습니다.');
					} else {
						//alert(codeList);
						eval(setData[g]);
					} 
				}
			} else {
				alert('요청하신 코드가 존재하지 않습니다.');
			}
			eval(nextProcess);
		}
		, error    : function(request, status, error) {
			alert('에러가 발생하였습니다.\n\r\n\r상태코드 : ' + request.status + '\n\r에러메세지 :\n\r' + request.responseText);
		}
	});	
}

// make Radio Group
function makeRadioGroup(data, obj, name, id, chkVal) {
	var str = '<table cellapdding="0" cellspacing="0" border="0" style="width:auto;"><tr>';
	for(var i = 0; i < data.length; i++) {
		var checked = (data[i][0] == chkVal) ? 'checked' : ''; 
		str += '<td><input type="radio" name="'+name+'" id="'+id+'" value="'+data[i][0]+'" '+checked+'>'+data[i][1]+'</td>';
	}
	str += '</tr></table>';
	$(obj).html(str);
}

//make Radio Group
function makeRadioGroupLabel(data, obj, name, id, chkVal) {
	var str = '';
	for(var i = 0; i < data.length; i++) {
		var checked = (data[i][0] == chkVal) ? 'checked' : ''; 
		str += '<label class="radio-label"><input type="radio" name="'+name+'" id="'+id+'" value="'+data[i][0]+'" '+checked+'>'+data[i][1]+'</label>';
	}
	$(obj).html(str);
}

// make Combo Box : '선택'
function makeComboSel(data, obj, idx, selVal) {
	var option;
	if(idx != undefined && !isNaN(idx)) {
		option= '<option value="'+STR_SEL[idx][0]+'">'+STR_SEL[idx][1]+'</option>';
	} else {
		option= '<option value="'+STR_SEL[0][0]+'">'+STR_SEL[0][1]+'</option>';
	}
	for(var i = 0; i < data.length; i++) {
		var selected = (data[i][0] == selVal) ? 'selected' : '';
		option += '<option value="'+data[i][0]+'" '+selected+'>'+data[i][1]+'</option>';
	}
	$(obj).html(option);
}

//make Combo Box : '전체'
function makeComboAll(data, obj, idx, selVal) {
	var option;
	if(idx != undefined && !isNaN(idx)) {
		option= '<option value="'+STR_ALL[idx][0]+'">'+STR_ALL[idx][1]+'</option>';
	} else {
		option= '<option value="'+STR_ALL[0][0]+'">'+STR_ALL[0][1]+'</option>';
	}
	for(var i = 0; i < data.length; i++) {
		var selected = (data[i][0] == selVal) ? 'selected' : '';
		option += '<option value="'+data[i][0]+'" '+selected+'>'+data[i][1]+'</option>';
	}
	$(obj).html(option);
}

//make Combo Box : ''
function makeComboNone(data, obj, selVal) {
	var option = '';
	for(var i = 0; i < data.length; i++) {
		var selected = (data[i][0] == selVal) ? 'selected' : '';
		option += '<option value="'+data[i][0]+'">'+data[i][1]+'</option>';
	}
	$(obj).html(option);
}

/*
 * Org Combo Box Create with Change Event
 * Param : form ID, 판매자 사용여부
 * Hidden : prent_org_id, mkt_div_org_id, cntr_org_id, mktg_org_lvl_cd
 */
function commOrgList(fObj, sale) {

	if(sale) {
		fObj.append('<input type="hidden" name="contentName" value="sale"/>');
	}
	
	$.ajax({
		  url      : '/common/getCommOrgList.do?'+fObj.serialize()
		, type     : 'POST'
		, dataType : 'JSON'
		, cache    : false
		, success  : function(data, stauts, request) {				
			var mktg_org_lvl_cd = data.mktg_org_lvl_cd;
			var obj = (sale) ? [data.bList, data.mList, data.dList, data.pList] : [data.bList, data.mList, data.dList];

			if(obj != undefined) {
				for(var i = 0; i < obj.length; i++) {
					var option = '';
					for(var j = 0; j < obj[i].length; j++) {
						option += '<option value="'+((obj[i][j].ORG_ID == null) ? 'NULL' : obj[i][j].ORG_ID)+'">'+obj[i][j].ORG_NM+'</option>';
					}
					switch(i) {
					case 0 : $('#org_lvl_20').find('option').remove().end().append(option); break;
					case 1 : $('#org_lvl_30').find('option').remove().end().append(option); break;
					case 2 : $('#org_lvl_40').find('option').remove().end().append(option); break;
					case 3 : $('#org_lvl_90').find('option').remove().end().append(option); break;
					}
				}
			}
		}
		, error    : function(request, status, error) {
			alert('에러가 발생하였습니다.\n\r\n\r상태코드 : ' + request.status + '\n\r에러메세지 :\n\r' + request.responseText);
		}
	});
	
	var selObj = (sale) ? '#org_lvl_20, #org_lvl_30, #org_lvl_40' : '#org_lvl_20, #org_lvl_30';
	
	$(selObj).change( function() {
		var id = $(this).attr('id').split('_')[2];
		switch(id) {
		case '20' : 
			fObj.find('input[name=prent_org_id]').val($(this).val());
			break;
		case '30' : 
			fObj.find('input[name=mkt_div_org_id]').val($('#org_lvl1_20').val());
			fObj.find('input[name=prent_org_id]').val($(this).val());
			break;
		case '40' : 
			fObj.find('input[name=mkt_div_org_id]').val($('#org_lvl1_20').val());
			fObj.find('input[name=cntr_org_id]').val($('#org_lvl1_30').val());
			fObj.find('input[name=prent_org_id]').val($(this).val());
			break;
		}
		
		$('#${resources}/img').find('input[name=mktg_org_lvl_cd]').val((id == '20') ? '30' : (id == '30') ? '40' : 'P');
		
		$.ajax({
			  url      : '/common/getChangeOrgList.do?'+fObj.serialize()
			, type     : 'POST'
			, dataType : 'JSON'
			, cache    : false
			, success  : function(data, stauts, request) {	
				var obj = [data.mList, data.dList, data.pList];
				var mList, dList, pList;
	
				for(var i = 0; i < obj.length; i++) {
					var option = '';
					if(obj[i] != undefined) {
						for(var j = 0; j < obj[i].length; j++) {
							if(id == '40' && j > 0) {
								option += '<option value="'+((obj[i][j].ORG_ID == null) ? 'NULL' : obj[i][j].ORG_ID)+'">['+obj[i][j].ORG_ID+'] '+obj[i][j].ORG_NM+'</option>';
							} else {
								option += '<option value="'+((obj[i][j].ORG_ID == null) ? 'NULL' : obj[i][j].ORG_ID)+'">'+obj[i][j].ORG_NM+'</option>';
							}
						}
						switch(i) {
						case 0 : mList = option; break;
						case 1 : dList = option; break;
						case 2 : pList = option; break;
						}
					}
					switch(id) {
					case '20' : 
						$('#org_lvl_30').find('option').remove().end().append(mList); 
						$('#org_lvl_40').find('option').remove().end().append(dList);
						$('#org_lvl_90').find('option').remove().end().append(pList);
						break;
					case '30' : 
						$('#org_lvl_40').find('option').remove().end().append(dList);
						$('#org_lvl_90').find('option').remove().end().append(pList);
						break;
					case '40' :
						$('#org_lvl_90').find('option').remove().end().append(pList); 
						break;
					}
				}	
			}
			, error    : function(request, status, error) {
				alert('에러가 발생하였습니다.\n\r\n\r상태코드 : ' + request.status + '\n\r에러메세지 :\n\r' + request.responseText);
			}
		});			
	});
	
}

/*
 * Prod Org Combo Box Create with Change Event : 상품관리에서 사용
 * Param : form ID
 * Hidden : org_id, mktg_org_lvl_cd
 */
function prodOrgList(fObj, nextProcess, grid) {

	$.ajax({
		  url      : '/prod/getOrgLvlJSONList.do'
		, type     : 'POST'
		, dataType : 'JSON'
		, cache    : false
		, success  : function(data, stauts, request) {				
			var mktg_org_lvl_cd = data.mktg_org_lvl_cd;
			var obj = [data.mktDivLst, data.mktgLst, data.agnLst, data.selrLst];

			if(obj != undefined) {
				for(var i = 0; i < obj.length; i++) {
					var option = '';
					for(var j = 0; j < obj[i].length; j++) {
						if(i == 3) {
							option += '<option value="'+obj[i][j].USER_ID+'" sale_chnl="'+obj[i][j].SALE_CHNL+'">'+obj[i][j].ORG_NM+'</option>'; // 판매자일 경우 가져오는 DB값이 다름, sale_chnl 필수(중요:*****)
						} else {
							option += '<option value="'+obj[i][j].ORG_ID+'">'+obj[i][j].ORG_NM+'</option>';
						}
					}
					switch(i) {
					case 0 : $('#org_lvl_20').find('option').remove().end().append(option); break;
					case 1 : $('#org_lvl_30').find('option').remove().end().append(option); break;
					case 2 : $('#org_lvl_40').find('option').remove().end().append(option); break;
					case 3 : $('#org_lvl_90').find('option').remove().end().append(option); break;
					}					
				}
				if(mktg_org_lvl_cd >= 90) {
					// Tab Load
					eval(nextProcess);
					// Grid Load
				}
			}
		}
		, error    : function(request, status, error) {
			alert('에러가 발생하였습니다.\n\r\n\r상태코드 : ' + request.status + '\n\r에러메세지 :\n\r' + request.responseText);
		}
	});
	
	// 조직 콤보 change 이벤트 정의
	$('#org_lvl_20, #org_lvl_30, #org_lvl_40').change( function() {

		fObj.find('input[name=org_id]').val($(this).val());
		fObj.find('input[name=mktg_org_lvl_cd]').val($(this).attr('id').split('_')[2]);
		
		$.ajax({
			  url      : '/prod/getOrgInfoJSONList.do?'+fObj.serialize()
			, type     : 'POST'
			, dataType : 'JSON'
			, cache    : false
			, success  : function(data, stauts, request) {	
				var obj = data.orgInfoLst, option = '';			
				var mktg_org_lvl_cd = data.mktg_org_lvl_cd;

				if(obj != undefined) {
					for(var i = 0; i < obj.length; i++) {
						if(mktg_org_lvl_cd == '40') {
							option += '<option value="'+obj[i].USER_ID+'" sale_chnl="'+obj[i].SALE_CHNL+'">'+obj[i].ORG_NM+'</option>'; // 판매자일 경우 가져오는 DB값이 다름, sale_chnl 필수(중요:*****)
						} else {
							option += '<option value="'+obj[i].ORG_ID+'">'+obj[i].ORG_NM+'</option>';
						}
					}
					switch(mktg_org_lvl_cd) {
					case '20' : 
						$('#org_lvl_30').find('option').remove().end().append(option); 
						$('#org_lvl_40').find('option').remove();
						$('#org_lvl_90').find('option').remove();
						break;
					case '30' : 
						$('#org_lvl_40').find('option').remove().end().append(option);
						$('#org_lvl_90').find('option').remove();
						break;
					case '40' : 
						$('#org_lvl_90').find('option').remove().end().append(option); 
						break;
					}
				}
			}
			, error    : function(request, status, error) {
				alert('에러가 발생하였습니다.\n\r\n\r상태코드 : ' + request.status + '\n\r에러메세지 :\n\r' + request.responseText);
			}
		});			
	});
	
	// 판매자 콤보 change 이벤트 정의 : 판매자 Tab 생성 후 그리드 reload
	$('#org_lvl_90').change( function() {
		if(searchValidation('org_lvl_90', grid)) {
			// Tab Load
			eval(nextProcess);
			// Grid Load
		}	
	});
	
}

// Tab List : 판매자 Tab 생성
function tabList(fObj, nextProcess, grid) {
	
	$.ajax({
		  url      : '/prod/wlessProdTabList.do?'+fObj.serialize()
		, type     : 'POST'
		, dataType : 'JSON'
		, cache    : false
		, success  : function(data, stauts, request) {	
			var obj = data.tabList, li = '';
			for(var i = 0; i < obj.length; i++) {
				var className = '';//(i == 0) ? 'class="current"' : '';
				li += '<li id="'+obj[i].TAB_MST_SEQ+'" title="'+obj[i].TAB_NM+'" '+className+'><span id="'+obj[i].TAB_MST_SEQ+'" seq="'+obj[i].TAB_MGMT_SEQ+'">'+obj[i].TAB_NM+'</span></li>';				
			}
			$('#tabs').html('');
			$('#tabs').append(li);
			$('#tabs').attr('style', 'display:;');

			// 버튼 생성
			$('.tabmenu span').after('<i class="btn-modify-tab"></i>');

			// 판매자 Tab 이벤트 정의 : 클릭시 그리드 reload, 더블클릭시 Tab명 수정
			$('#tabs').find('li').each( function() {
				
				var id = $(this).attr('id');
				// Tab Menu
				// 탭 클릭 - 데이터 처리
				$(this).find('span[id='+id+']').on("click", function(ev){
					//ev.preventDefault();
					var $this = $(this);
					
					if(searchValidation('org_lvl_90', $prodGrid)) {
						$('#tabs').find('.current').removeClass();
						$this.parent().addClass('current');
						fObj.find('input[name=tab_mgmt_seq]').val($this.attr('seq'));
						setTimeout(function(){
							eval(nextProcess);
						},1000);						
					}
				});

				// 탭 변경 아이콘 클릭
				$(this).find('span[id='+id+']').next('.btn-modify-tab').click(function(ev){
					var $this = $(this) // I Button
					,	$tab = $(this).prev() // SPAN
					,	currText = $(this).prev().text() // SPAN text
					,	$inputTab = $('<input />').attr({ type: 'text', value: currText	})
						.addClass('input input-tab')
						.on('keydown', function(e){
							var code = e.keyCode || e.which;
							if( code == 13 )
							{
								// 엔터 시 탭데이터 변경
								if(currText != $inputTab.val()) {
									fObj.find('input[name=tab_mgmt_seq]').val($tab.attr('seq'));
									fObj.find('input[name=tab_nm]').val(encodeURIComponent($inputTab.val()));
									$.ajax({
										  url      : '/prod/wlessProdTabUpt.do?' + $('#${resources}/img').serialize()
										, type     : 'POST'
										, dataType : 'JSON'
										, cache    : false
										, success  : function(data, stauts, request) {
											if(data.result > 0) {
												alert('탭 명이 수정 되었습니다.');
												$tab.parent().attr('title', $inputTab.val());
											} 
										}
										, error    : function(request, status, error) {
											alert('에러가 발생하였습니다.\n\r\n\r상태코드 : ' + request.status + '\n\r에러메세지 :\n\r' + request.responseText);
										}
									});	
								}
								// Do something.

								$tab.html( $inputTab.val() ); // change text in SPAN
							}
						}).on('focusout', function(e) {								
							// focus out시 탭데이터 변경
							if(currText != $inputTab.val()) {
								fObj.find('input[name=tab_mgmt_seq]').val($tab.attr('seq'));
								fObj.find('input[name=tab_nm]').val(encodeURIComponent($inputTab.val()));
								$.ajax({
									  url      : '/prod/wlessProdTabUpt.do?' + $('#${resources}/img').serialize()
									, type     : 'POST'
									, dataType : 'JSON'
									, cache    : false
									, success  : function(data, stauts, request) {
										if(data.result > 0) {
											alert('탭 명이 수정 되었습니다.');
											$tab.parent().attr('title', $inputTab.val());
										}
									}
									, error    : function(request, status, error) {
										alert('에러가 발생하였습니다.\n\r\n\r상태코드 : ' + request.status + '\n\r에러메세지 :\n\r' + request.responseText);
									}
								});	
							}
							$tab.html( $inputTab.val() );
						});

					$tab.html($inputTab);
					$tab.find('.input-tab').focus();
				});
			});	
				
			// Tab 생성 후 첫번째 탭클릭 이벤트 강제실행
			$('#tabs').find('li:first > span').trigger('click'); // AJAX 데이터 불러오기
						
		}
		, error    : function(request, status, error) {
			alert('에러가 발생하였습니다.\n\r\n\r상태코드 : ' + request.status + '\n\r에러메세지 :\n\r' + request.responseText);
		}
	});	
	
}

// 무선상품관리 : 조직 Combo 또는 Tab 이벤트 발생시 실행 : 판매자 선택 여부 확인
function selrValidation(slerName, type) { 
	var sler = $('select[name='+slerName+'] option:selected').val(), msg = '';
	switch(type) {
	case 'excel' : msg = '판매자를 선택 후 엑셀다운로드 가능합니다.'; break;
	default      : msg = '판매자를 선택 후 검색 해주세요.';
	}
	if(sler == undefined || sler == '' || sler == '00') {
		alert(msg);
		return false;
	} else {
		return true;
	}
}

// 무선상품관리 : 조직 Combo 또는 Tab 이벤트 발생시 실행 : 판매자 선택 여부 및 데이터 수정 여부 확인
function searchValidation(slerName, grid, type) {
	var sler = $('select[name='+slerName+'] option:selected').val(), msg = '', flag = false;
	switch(type) {
	case 'excel' : msg = '판매자를 선택 후 엑셀다운로드 가능합니다.'; break;
	default      : msg = '판매자를 선택 후 검색 해주세요.';
	}
	if(sler == undefined || sler == '' || sler == '00') {
		alert(msg);
		return false;
	}

	if(grid != undefined) {
		var rowIds = $(grid).getDataIDs(), editCnt = 0;
		if(rowIds.length > 0) {
			for(var i = 0; i < rowIds.length; i++){
				if($('#'+rowIds[i], $prodGrid).attr('class').indexOf('checked') > 0) { // 이벤트 중복 발생시 return true
					return true;
				} else {
					// 그리드 수정 여부 체크 (셀수정 : edited, row추가 : inserted)
					if($('#'+rowIds[i], $prodGrid).attr('class').indexOf('edited') > 0 || $('#'+rowIds[i], $prodGrid).attr('class').indexOf('inserted') > 0) { 
						if(confirm('저장 하지 않은 데이터는 적용되지 않습니다.\n변경하시겠습니까?')) {
							$('#'+rowIds[i], $prodGrid).addClass('checked'); // 이벤트 중복 발생을 막기위해 수정 또는 추가된 첫번째 row에 checked 표시
							return true;
						} else {
							return false;
						}
					}
				}
			}
			if(editCnt == 0) {
				return true;
			}
		} else {
			return true;
		}
	} else {
		return true;
	}

}

/**
 * Grid Column Display
 * 그리드 로드시 변경되는 컬럼정의
 */ 
function makeGridColumn(grid, rowId) {

	var rowData = grid.getRowData(rowId);
	var chgCols = grid.getGridParam('changeCols');
	for(var j = 0; j < chgCols.length; j++) {
		var data = rowData[chgCols[j]], html;
		switch(chgCols[j]) {
		case 'EQP_COLOR' : // 색상
			var input = '', str;
			var color = data.split(',');
			for(var c = 0; c < input4.length; c++) {
				str    = input4[c].replace('$name$', chgCols[j].toLowerCase()+'_'+(c+1));
				str    = str.replace('$id$', chgCols[j].toLowerCase()+'_'+(c+1));
				str    = str.replace('$value$', (color[c] == undefined) ? '' : color[c]);
				input += str;
			}
			grid.setCell(rowId, chgCols[j], colDiv.replace('$div$',input));
			// 색상컬럼 input 박스에 이벤트 정의 : 입력시 해당 row 수정 설정 (edited)
			for(var e = 0; e < input4.length; e++) {
				$('#'+chgCols[j].toLowerCase()+'_'+(e+1), $('#'+grid.attr('id')).find('tr[id='+rowId+']')).keyup( function(e) {
					grid.jqGrid('getGridParam', 'onCellSelect').call(grid, rowId, $prodGrid.getCellIndexByColModel('EQP_COLOR'), null, e);
					grid.jqGrid("setSelection", rowId, false, e);
					
					allModify.push("EQP_COLOR|" + rowId);
				});
			}
			break;
		case 'SUPL_SVC_CNT' : // 부가서비스
			html = colDiv.replace('$div$' ,textsearchclear.replace('$id$', 'id='+rowId+'_'+chgCols[j]));
			html = html.replace('$value$' , (data == '') ? '0' : data);
			html = html.replace('$search$', 'onclick="'+feeProdSearchF+'"');
			html = html.replace('$clear$' , 'onclick="'+clearCol.replace('$iRow$', rowId).replace('$iCol$', $prodGrid.getCellIndexByColModel('SUPL_SVC_CNT'))+'"');
			grid.setCell(rowId, chgCols[j], html);
			break;
		case 'SPMALL' : // 판매사이트
			if(data == '') {
				grid.setCell(rowId, chgCols[j], colAdd.replace('$onclick$', 'onclick="'+saleSiteSearchF+'"'));								
			} else {
				var html = '';
				var abbr = rowData['SPMALL_ABBR'].split(',');
				var cd   = rowData['SPMALL_CD'].split(',');
				var nm   = rowData['SPMALL_NM'].split(',');
				var cl   = rowData['SPMALL_CL'].split(',');
				var url  = rowData['SPMALL_URL'].split(',');
				for(var i = 0; i < abbr.length; i++) {
					html += '<a href="javascript:openSaleSiteCont($(\'#'+grid.attr('id')+'\'), \''+rowId+'\', \''+cd[i]+'\', \''+nm[i]+'\');" title="'+nm[i]+'" class="ellipsis" style="display:inline-block;width:20px;vertical-align:middle;">'+abbr[i]+'</a>';
					if(i < abbr.length - 1) {
						html += ',';
					}
				}
				grid.setCell(rowId, chgCols[j], buttonlink.replace('$onclick$', 'onclick="'+saleSiteSearchF+'"').replace('$spanId$', 'id="'+rowId+'_'+chgCols[j]+'"').replace('$span$', html));
			}
			break;
		case 'COMBI' : // 결함상품
			if(rowData['WIRE'] == '') {
				grid.setCell(rowId, chgCols[j], colAdd.replace('$onclick$', 'onclick="'+combiSearchF+'"'));								
			} else {
				grid.setCell(rowId, chgCols[j], colMod.replace('$onclick$', 'onclick="'+combiSearchF+'"'));
			}
			break;
		case 'TMP' : // 가입유형 hidden column
			grid.setCell(rowId, chgCols[j], rowData['SCRB_CL_CD']);
			break;
		}
	}
		
}

/**
 * 판매사이트 설정 팝업
 */
function openSaleSiteCont(grid, rowId, spmall_cd, spmall_nm) {
	if($('#'+rowId, grid).attr('class').indexOf('edited') > 0 || $('#'+rowId, grid).attr('class').indexOf('inserted') > 0) {
		alert('저장 후 사용 가능 합니다.');
		return;
	}
	
	var rowData = grid.getRowData(rowId);
	popupData.eqp_mdl_cd   = rowData['EQP_MDL_CD']; 
	popupData.cd           = spmall_cd; 
	popupData.nm           = spmall_nm; 
	popupData.spmall_abbr  = rowData['SPMALL_ABBR'];  
	popupData.scrb_cl_cd   = rowData['SCRB_CL_CD'];   
	popupData.scrb_cl_nm   = rowData['SCRB_CL_NM']; 
	popupData.prod_seq     = rowData['PROD_SEQ'];
	popupData.prod_grp_seq = rowData['PROD_GRP_SEQ'];
	
	eval(saleSiteContF);
}

/**
 * 그리드 특정컬럼 값 세팅
 * 팝업에서 내려온 값을 그리드 변경컬럼에 적용할때 사용
 */
function setGridCell(grid, rowId, cellNm, data) {

	var rowData = grid.getRowData(rowId), html;
	switch(cellNm) {
	case 'EQP_COLOR' : // 색상
		var input = '', str;
		var color = data.split(',');
		for(var c = 0; c < input4.length; c++) {
			str    = input4[c].replace('$name$', cellNm.toLowerCase()+"_"+(c+1));
			str    = str.replace('$id$', cellNm.toLowerCase()+"_"+(c+1));
			str    = str.replace('$value$', (color[c] == undefined) ? '' : color[c]);
			input += str;
		}
		grid.setCell(rowId, cellNm, colDiv.replace('$div$',input));
		// 색상컬럼 input 박스에 이벤트 정의 : 입력시 해당 row 수정 설정 (edited)
		for(var e = 0; e < input4.length; e++) {
			$('#'+cellNm.toLowerCase()+'_'+(e+1), $('#'+grid.attr('id')).find('tr[id='+rowId+']')).keyup( function(e) {
				grid.jqGrid('getGridParam', 'onCellSelect').call(grid, rowId, $prodGrid.getCellIndexByColModel('EQP_COLOR'), null, e);
				grid.jqGrid("setSelection", rowId, false, e);
				
				allModify.push("EQP_COLOR|"+ rowId);
			});
		}
		break;
	case 'SUPL_SVC_CNT' : // 부가서비스
		html = colDiv.replace('$div$' ,textsearchclear.replace('$id$', 'id='+rowId+'_'+cellNm));
		html = html.replace('$value$' , (data == '') ? '0' : data);
		html = html.replace('$search$', 'onclick="'+feeProdSearchF+'"');
		html = html.replace('$clear$' , 'onclick="'+clearCol.replace('$iRow$', rowId).replace('$iCol$', $prodGrid.getCellIndexByColModel('SUPL_SVC_CNT'))+'"');
		grid.setCell(rowId, cellNm, html);
		break;
	case 'SPMALL' : // 판매사이트
		if(data == '') {
			grid.setCell(rowId, cellNm, colAdd.replace('$onclick$', 'onclick="'+saleSiteSearchF+'"'));								
		} else {
			var html = '';
			var abbr = rowData['SPMALL_ABBR'].split(',');
			var cd   = rowData['SPMALL_CD'].split(',');
			var nm   = rowData['SPMALL_NM'].split(',');
			var cl   = rowData['SPMALL_CL'].split(',');
			var url  = rowData['SPMALL_URL'].split(',');
			for(var i = 0; i < abbr.length; i++) {
				html += '<a href="javascript:openSaleSiteCont($(\'#'+grid.attr('id')+'\'), \''+rowId+'\', \''+cd[i]+'\', \''+nm[i]+'\');" title="'+nm[i]+'" class="ellipsis" style="display:inline-block;width:20px;vertical-align:middle;">'+abbr[i]+'</a>';
				if(i < abbr.length - 1) {
					html += ',';
				}
			}
			grid.setCell(rowId, cellNm, buttonlink.replace('$onclick$', 'onclick="'+saleSiteSearchF+'"').replace('$spanId$', 'id="'+rowId+'_'+cellNm+'"').replace('$span$', html));
		}
		break;	
	case 'COMBI' : // 결합상품
		if(rowData['WIRE'] == '') {
			grid.setCell(rowId, cellNm, colAdd.replace('$onclick$', 'onclick="'+combiSearchF+'"'));								
		} else {
			grid.setCell(rowId, cellNm, colMod.replace('$onclick$', 'onclick="'+combiSearchF+'"'));
		}
		break;
	}
	
}

/**
 * 그리드 Row Copy
 * 선택된 그리드 row Data를 가져와 str에 복사하여 return
 */
function gridRowCopy(grid, rowId, rowCnt) {

	var rowData  = grid.getRowData(rowId);
	var colModel = grid.jqGrid('getGridParam', 'colModel');
	var str = '{';
	for(var i = 0; i< colModel.length; i++) {
		var nm   = colModel[i].name;
		var vl   = rowData[nm];
		var type = colModel[i].edittype;
		if(nm != 'cb' && nm != 'COMBI') {
			if(nm == 'NUM') {
				str += nm+':\''+(rowCnt+1)+'\'';
			} else if (nm == 'ACT_YN' || nm == 'ODER_ACT_YN') { // 상품관리 복사 또는 상품추가 시 필수 (중요:*****)
				str += nm+':\'Y\'';
			} else if (nm == 'RSV_PROD_YN') { // 상품관리 복사 또는 상품추가 시 필수 (중요:*****)
				str += nm+':\'N\'';
			} else if (nm == 'AGN_PROD_GRP_SEQ' || nm == 'PROD_GRP_SEQ') { // 상품관리 복사 또는 상품추가 시 필수 (중요:*****)
				str += nm+':null';
			// 활성기간 copy 오류로 주석처리 2013.12.19 T-Gate Song In Soon
			//} else if (nm == 'PROD_SALE_PRD_FROM' || nm == 'PROD_SALE_PRD_TO') { 
			//	str += nm+':\'\'';
			} else if (nm == 'EQP_COLOR') {
				var val = '';
				var len = (type.indexOf('input') > -1) ? type.replace('input', '') : 1;
				for(var c = 0; c < len; c++) {
					val += $('#'+nm.toLowerCase()+'_'+(c+1), $('tr[role=row]', grid).eq(rowId)).val();
					if(c < len - 1) {
						val += ',';
					}
				}
				str += nm+':\''+val+'\'';
			} else if (nm == 'SUPL_SVC_CNT' || nm == 'SPMALL') {
				var val = $('#'+rowId+'_'+nm, $('tr[role=row]', grid).eq(rowId)).text();
				str += nm+':\''+val+'\'';
			} else {
				str += nm+':\''+vl+'\'';
			}
			if(i < colModel.length - 1) {
				str += ',';
			}
		}
	}
	str += '}';
	
	return str;
}

function getInput4GridData(grid, rowId) {

	var rowData  = grid.getRowData(rowId);
	var colModel = grid.jqGrid('getGridParam', 'colModel');
	var str = '';
	for(var i = 0; i< colModel.length; i++) {
		var nm   = colModel[i].name;
		var vl   = rowData[nm];
		var type = colModel[i].edittype;
		
		if (nm == 'EQP_COLOR') {
				var val = '';
				var len = (type.indexOf('input') > -1) ? type.replace('input', '') : 1;
				for(var c = 0; c < len; c++) {
					val += $('#'+nm.toLowerCase()+'_'+(c+1), $('tr[role=row]', grid).eq(rowId)).val();
					if(c < len - 1) {
						val += ',';
					}
				}
				str = val;
			} 
		}
	return str;
}

// Datepicker
function calendarFromTo(fObj, tObj, dateformat, img_path) {
	var df = (dateformat) ? dateformat : "yyyy-mm-dd";
	$( fObj ).datepicker({
		defaultDate: "-1w",
		changeMonth: true,
		numberOfMonths: 1,
		showAnim:'',
		showButtonPanel: true,
		dateFormat: df,
		showOn: "button",
		buttonImage: img_path+"/common/ico/calendar.png",
		buttonText: "달력",
		buttonImageOnly: true,
		onClose: function( selectedDate ) {
			$( tObj ).datepicker( "option", "minDate", selectedDate );
		}
	});
	$( tObj ).datepicker({
		changeMonth: true,
		numberOfMonths: 1,
		showAnim:'',
		showButtonPanel: true,
		dateFormat: df,
		showOn: "button",
		buttonImage: img_path+"/common/ico/calendar.png",
		buttonText: "달력",
		buttonImageOnly: true,
		onClose: function( selectedDate ) {
			$( fObj ).datepicker( "option", "maxDate", selectedDate );
		}
	});
}

// New Window Open
var win;
function windowOpen(pageUrl, pageName, width, height, scroll, popNm){
	var resizeh = height;
    if($.browser.safari) {
    	switch(popNm) {
    	case 'eqpSearch'      : resizeh = height - 80; break;
    	case 'saleSiteSearch' : resizeh = height - 80; break;
    	case 'scrbClSelect'   : resizeh = height - 90; break;
    	case 'feeProdSearch'  : resizeh = height - 80; break;
    	case 'periodSelect'   : resizeh = height - 80; break;
    	case 'combiSearch'    : resizeh = height - 80; break;
    	case 'saleSiteCont'   : resizeh = height - 90; break;
    	case 'sms'            : resizeh = height - 90; break;
    	case 'prodMove'       : resizeh = height - 80; break;
    	case 'applDistribute' : resizeh = height - 80; break;
    	}    	
    }	    
    
	var LeftPosition = (screen.width ) ? (screen.width - width  )/2 : 0;	 
	var TopPosition  = (screen.height) ? (screen.height - height)/2 : 0;	
    var settings     = 'height='+resizeh+',width='+width+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable';	 
    win = window.open(pageUrl, pageName, settings);
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
		var hour  = dt.substr( 9, 2);
		var minut = dt.substr(11, 2);	 
	 
	 return year + ddelim + month + ddelim + day + ' ' + hour + tdelim + minut;
}

/**
 * 바이트 계산 함수
 * @param str
 */
function getByteLength(data) {
	var len = 0;
	var str = data.substring(0);
	if(str == null) return 0;
	for(var i = 0; i < str.length; i++) {
		var ch = escape(str.charAt(i));
		if(ch.length == 1) len++;
		else if(ch.indexOf('%U') != -1) len += 2;
		else if(ch.indexOf('%') != -1) len += 3;
	}
	return len;
}

/**
 * 전화번호
 * @param phonNum
 * @returns
 */
function callNumFormat(phonNum){
	var phon_num = "";
	var mov_1 ="";
	var mov_2 ="";
	var mov_3 ="";
	
	if(phonNum == '' || phonNum == null ){
		return phonNum;
	}
	
	if(phonNum.length == 12){ //ex>000206764832
		mov_1 = phonNum.substring(0, 4);
		mov_2 = phonNum.substring(4, 8);
		mov_3 = phonNum.substring(8, 12);
		
		// 국번이 4자리로 들어오므로 최초자릿수를 자른 후 세팅한다. 
		if('000' == phonNum.substring(0, 3)){
			mov_1 = mov_1.substring(2,4);
		}else{
			mov_1 = mov_1.substring(1,4);
		}		
		
		// 두번째 번호가 0으로 시작 될 때는 버린다. 
		if(mov_2.startsWith('0')) {
			mov_2 = mov_2.substring(1);
			//log.info("mov_2 : " + mov_2);
		}
		phon_num = mov_1 +"-"+ mov_2+"-" + mov_3;					
	}else if(phonNum.length == 11){
		mov_1 = phonNum.substring(0, 3);
		mov_2 = "";
		mov_3 = "";
		
		if('00' == phonNum.substring(0, 2)){
			mov_1 = phonNum.substring(1, 3);
		}else{
			mov_1 = phonNum.substring(0, 3);
		}
		
		if(phonNum.substring(3).startsWith('0')) {
			mov_2 = phonNum.substring(4, 7);
		} else {
			mov_2 = phonNum.substring(3, 7);
		}
		mov_3 = phonNum.substring(7);
		phon_num = mov_1 +'-'+ mov_2+'-' + mov_3;
	}else if(phonNum.length == 10) {
		if('02' == phonNum.substring(0, 2)){
			mov_1 = phonNum.substring(0, 2);
			mov_2 = phonNum.substring(2, 6);
			mov_3 = phonNum.substring(6);
		}else{
			mov_1 = phonNum.substring(0, 3);
			mov_2 = phonNum.substring(3, 6);
			mov_3 = phonNum.substring(6);
		}
		phon_num = mov_1 +'-'+ mov_2+'-' + mov_3;
	} else if(phonNum.length == 9){
		mov_1 = phonNum.substring(0, 2);
		mov_2 = phonNum.substring(2, 5);
		mov_3 = phonNum.substring(5);
		phon_num = mov_1 +'-'+ mov_2+'-' + mov_3;
	} else if(phonNum.length == 8){
		mov_1 = phonNum.substring(0, 4);
		mov_2 = phonNum.substring(4, 8);
		return mov_1 + '-' + mov_2;			
	}else{	
		phon_num = phonNum;
	}
	
	return phon_num;
}

//기존 flex에서 사용했던 javascript 마이그레이션
function atchFileImgView(fullpathname) {
	//document.getElementById(div).style.height=height;
	//alert(fullpathname);
	//window.open('/tgate/common/imgview.jsp?spath='+fullpathname);
	var win = window.open("/tgate/common/imgview.jsp?spath="+ fullpathname  , "imgview", "titlebar=no, location=no, statusbar=no, toolbar=no, scrollbars=yes, menubar=no, resizable=yes, width=800, height=600");
	win.focus();
}


function atchFileUserImgView(fullpathname) {
	//document.getElementById(div).style.height=height;
	//alert(fullpathname);
	//window.open('/tgate/common/imgview.jsp?spath='+fullpathname);
	var win = window.open("/tgate/common/imgUserview.jsp?spath="+ fullpathname  , "imgview", "titlebar=no, location=no, statusbar=no, toolbar=no, scrollbars=yes, menubar=no, resizable=yes, width=800, height=600");
	win.focus();
}

function mtgateImgView(fullpathname) {
	//document.getElementById(div).style.height=height;
	//alert(fullpathname);
	//window.open('/tgate/common/imgview.jsp?spath='+fullpathname);
	var win = window.open("/tgate/common/mtgateImgView.jsp?spath="+ fullpathname  , "imgview", "titlebar=no, location=no, statusr=no, toolbar=no, scrollbars=no, menubar=no, resizable=no, directories=no");
	//var win = window.open("/tgate/common/TestView.jsp?spath="+ fullpathname  , "imgview", "titlebar=no, location=no, statusr=no, toolbar=no, scrollbars=no, menubar=no, resizable=no, directories=no");
	win.focus();
}

// 운송장출력
function fnCallWayBill(_applformseq, _ivicnum, _viewTyp){
	//우체국은 팝업 화면이 아니라 flex 화면에서 처리
	var win = window.open("/deliv/getDelivInfoBySeq.do?appl_form_seq="+_applformseq+"&ivic_num="+_ivicnum+"&viewTyp="+_viewTyp, "imgview", "titlebar=no, location=no, statusr=no, toolbar=no, scrollbars=yes, menubar=no, resizable=yes, directories=no, width=640, height=472");
	win.focus();
}

// 배송추적
function fnCallHomeDelivery(_ivicnum){
	//우체국은 팝업 화면이 아니라 flex 화면에서 처리
	var win = window.open("http://www.hydex.net/ehydex/jsp/home/distribution/tracking/tracingNView.jsp?param1="+_ivicnum, "imgview", "titlebar=no, location=no, statusr=no, toolbar=no, scrollbars=yes, menubar=no, resizable=yes, directories=no, width=800, height=600");
	win.focus();
}

// 운송장 다중 출력
function fnCallWayBillMulti(_applformseq){
	//우체국은 팝업 화면이 아니라 flex 화면에서 처리
	var win = window.open("/deliv/getDelivMutilSender.do?appl_form_seq="+_applformseq, "imgview", "titlebar=no, location=no, statusr=no, toolbar=no, scrollbars=yes, menubar=no, resizable=yes, directories=no, width=640, height=510");
	win.focus();
}

// InternetExplorer 여부 확인
function isIEBrowser(){
	
	 if(navigator.userAgent.indexOf("MSIE") != -1) {
		 return true;
	 } else {
		 return false;
	 }
}

//START --> 정책팀-강인혁M / 이종길 / CHG610000055390 / "TWD라이트할부, 쓰던폰반납" / 20171228
/** 숫자 콤마붙이기 */
function display_comma(value) {
	
	if(value==null){return false;}

	var src;
	var i;
	var factor;
	var su;
	var Spacesize = 0;
	
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

/** dash 붙이기 */
function display_dash(value) {
	
	if(value==null){return false;}

	var src;
	var i;
	var factor;
	var su;
	var Spacesize = 0;
	
	var String_val = Math.floor(value).toString();
	
	factor = String_val.length % 4;
	su = (String_val.length - factor) /4;
	src = String_val.substring(0,factor);
	
	for(i=0; i<su ; i++)
	{
	   if ((factor==0)&&(i==0))
	    {
	         src += String_val.substring(factor+(4*i), factor+4+(4*i));
	    }
	    else 
	    {
	        if ( String_val.substring(factor+(4*i) - 1, factor+(4*i)) != "," ) src +="-";
	        src += String_val.substring(factor+(4*i), factor+4+(4*i));
	    }
	}
	return src;
}

/**  쓰던폰 반납 테이블 Tag 생성 */
function oldPhRtnHtmlCreate() {
	var html_src = "<tr><th>단말기코드</th><td><span id='rtnModelNo'></span></td><th>단말기 팻네임</th><td><span id='rtnModelName'></span></td></tr>";
	html_src += "<tr><th>일련번호</th><td><span id='eqpSerNum'></span></td><th>처리상태</th><td><span id='usePhonRtnProcStCdNm'></span></td></tr>";
	html_src += "<tr><th>등급</th><td><span id='grCd'></span></td><th>고객보상금액</th><td><span id='rtnAmt'></span></td></tr>";
	html_src += "<tr><th>추가 체크사항</th><td><span id='penRtnYn'></span></td><th>보상방법</th><td id='dcMthdTd'><span id='dcMthd'></span>&nbsp;&nbsp;</td></tr>";
	
	return html_src;
}

/** 라이트할부 테이블 Tag 생성 */
function lghtAllotHtmlCreate() {
	var html_src = "<tr><th>할부금액</th><td><span id='ligthAllotAmt'></span></td><th>할부개월</th><td><span id='cardAllotReqMth'></span></td></tr>";
	html_src += "<tr><th>처리상태</th><td><span id='cardProcStNm'></span></td><th>카드명</th><td><span id='cardPrdNm'></span></td></tr>";
	html_src += "<tr><th>카드번호</th><td><span id='cardNum'></span></td><th>카드주명</th><td><span id='cardOwnrNm'></span></td></tr>";
	html_src += "<tr><th>유효기간(월/년)</th><td><span id='cardEffYYMM'></span></td><th>카드주 생년월일</th><td><span id='cardOwnrCtzNum'></span></td></tr>";
	html_src += "<tr><th>카드주/관계</th><td><span id='cardOwnrRelCd'></span></td><th>할부유형</th><td><span id='cardDcType'></span></td></tr>";
	
	return html_src;
}
//END --> 요청차/수정자/변계ID/변경계획요건/날짜

