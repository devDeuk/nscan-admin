var getSearchParam = function() {
	//상품검색 조건
	var prodsrchsel = $(':radio[name="idProdCl"]:checked').val();
	//신청일,수정일 기준
	var prdsrchst = $('#idPrdSrchSt option:selected').val();  
	//검색 기간 방법 선택 
	var prdsrchsel = $(':radio[name="idSrchDtCl"]:checked').val();
	var prdsrchstadt = $('#fromDate').val();
	var prdsrchenddt = $('#toDate').val();
	
	var mktdivorgcd = $('#idMktDivOrg option:selected').val(); //본부
	var cntrorgcd = $('#idCntrOrg option:selected').val(); //마케팅
	var agnorgcd = $('#idAgnOrg option:selected').val(); //대리점
	
	var selrid = $('select[name="idSelr"]').multiselect("getChecked").map(function(){return this.value; }).get().join(",");//$('#idSelr').val(); //판매자 여러건으로 검색 가능하도록 , 로 구분
	
	var applformseq = $.trim($('#idApplFormSeq').val()); //신청서 번호
	var appl_form_oper_grp_num = $.trim($('#cntDistribute').val()); //작업그룹번호 2014-11-12
	var buyrnm = $.trim($('#idBuyrNm').val()); //주문자
	
	var buyrphonnum = $.trim($('#idBuyrPhonNum').val()); //연락처 번호
	var fixnum = $.trim($('#idFixNum').val()); //개통번호
	var eqpcd = $('#idEqpCl').val(); //단말기 모델 ,로 여러건 구분.
	var eqp_color = $.trim($('#idEqpColor').val()); //단말기 색상	
	var wireprodcd = $('#idWireProdNm option:selected').val(); //유선상품명
	var eqpsernum = $.trim($('#idEqpSerNum').val()); //단말기 일련번호
	
	
	
	//주문번호 검색 및 리스트 노출(2014-01-10쪽지)
	var spmallodernum = $.trim($('#idSpmallOderNum').val()); //주문번호
	//주문번호 검색 및 리스트 노출(2014-01-10쪽지)
	
	//[추가] 금이도M / 김성득 / CHG610000068575 / "T.Gate  USIM 개통 및 사전적격 필터링 기능 개발 요청" :  / 20180726
	var spmallst11odernum = $.trim($('#idSpmallst11OderNum').val()); //11번가주문번호
	
	//요금제 검색 20150212
	var prcplncl = $.trim($('#idPrcplnCl').val()); //요금제 코드
	var prcplnnm = $.trim($('#idPrcplnNm').val()); //요금제 명
	
	var usimmdl = $.trim($('#idUsimMdl').val()); //USIM 모델코드
	var usimnum = $.trim($('#idUsimNum').val()); //USIM 일련번호

	var applstcdwless = $('#idWlessSt option:selected').val(); //무선진행
	var applstcdwire = $('#idWireSt option:selected').val(); //유선진행
	var exchgrtnclcd =  $('#idExchgRtnClCd option:selected').val(); //교환반품 
	var agrmtallotcl = $('#idAgrmtAllotCl option:selected').val(); //약정할부
	var spmallcl = $('#idSpmallCl option:selected').val(); //쇼핑몰 구분
	var spmallcd = $('#idSpmall').val(); //쇼핑몰 ,로 구분함. 
	var applformscrbtyp =  $('select[name="idScrbTp"]').multiselect("getChecked").map(function(){return this.value; }).get().join(",");//$('select[name="idScrbTp"]').val(); //가입유형 ,로 구분 
	
	var supl_svc = $('select[name="idSupl_svc"]').multiselect("getChecked").map(function(){return this.value; }).get().join(",");//$('#idSupl_svc option:selected').val();
	
	//var allot_prd = $('select[name="idAllot_prd"]').multiselect("getChecked").map(function(){return this.value; }).get().join(",");//$('#idAllot_prd option:selected').val();
	var allot_prd = $('select[name="idAllot_prd"]').multiselect("getChecked").map(function(){
				//할부기간 옵션의 테이크항목은 검색에서 제외
				if(this.value != "Y") {
					return this.value;
				}
			}).get().join(",");//$('#idAllot_prd option:selected').val();
	
	//console.log(allot_prd);
	
	/* 개통대기번호 20160620 윤재선 */
	var movnumidnt = $('#idPhon1').val();
	var movnumexg  = $('#idPhon2').val();
	var movnumnum  = $('#idPhon3').val();
	
	/* 필터링 20160620 윤재선 */
	var fltrTp      = $('#idFltrTp option:selected').val();
	var fltrCmpl    = $(':radio[name="idFltrCmpl"]:checked').val();
	
	/*예판 파라미터 추가 */
	var event_id =  $('select[name="idEventId"]').multiselect("getChecked").map(function(){return this.value; }).get().join(",");
	var ts_val_no =   $('#idTsValNo').val();
	var accp_seq =   $('#idAccpSeq').val();
	
	//START --> 정책팀-강인혁M / 이종길 / CHG610000055390 / "TWD라이트할부, 쓰던폰반납" / 20171228
	/* TWD 라이트할부/쓰던폰반납*/
	var lght_allot_req_yn =  $('select[name="idLghtAllotReqYn"]').multiselect("getChecked").map(function(){return this.value; }).get().join(",");
	var lght_allot_op_st_cd =  $('select[name="idLghtAllotOpStCd"]').multiselect("getChecked").map(function(){return this.value; }).get().join(",");
	var oldph_rtn_req_yn =  $('select[name="idOldPhRtnReqYn"]').multiselect("getChecked").map(function(){return this.value; }).get().join(",");
	var oldph_rtn_op_st_cd =  $('select[name="idOldPhRtnOpStCd"]').multiselect("getChecked").map(function(){return this.value; }).get().join(",");
	//END --> 정책팀-강인혁M / 이종길 / CHG610000055390 / "TWD라이트할부, 쓰던폰반납" / 20171228
	
	if(applStCds.length>0) {
		applstcdwless = applStCds.join(",");
	}

	var currDate = Date.today().toString("yyyyMMdd");
	if(prdsrchsel=="01") {
		prdsrchstadt = Date.today().add({months:-3}).toString("yyyyMMdd");
		prdsrchenddt = currDate;
	} else if(prdsrchsel=="02") {
		prdsrchstadt = Date.today().add({months:-1}).toString("yyyyMMdd");
		prdsrchenddt = currDate;
	} else if(prdsrchsel=="03") {
		prdsrchstadt = currDate;
		prdsrchenddt = currDate;
	} else if(prdsrchsel=="04") {
		prdsrchstadt = $('#fromDate').val();
		prdsrchenddt = $('#toDate').val();
	}
	
	mktdivorgcd = mktdivorgcd=="null"?"":mktdivorgcd;
	cntrorgcd = cntrorgcd=="null"?"":cntrorgcd;
	agnorgcd = agnorgcd=="null"?"":agnorgcd;
	selrid = selrid=="null"?"":selrid;
	
	var mateyn = $("#idAllot_prd > option:eq(5)").is(":checked") ? "Y" : "N";
	
	//[추가] 박송이M / 김성득 / CHG610000059887/ "TWORLD 다이렉트 셀프동의 여부 TGATE어드민 적용" :  셀프동의항목추가 / 20180315
	var tdir_slf_agree_yn  = $('#idTdirSlfAgreeYN option:selected').val();
	
	//예약번호 추가 
	var tdir_rsv_sale_num_yn = $('#idTdirRsvSaleNumYN option:selected').val();
//	alert("tdir_rsv_sale_num_yn1 :" + tdir_rsv_sale_num_yn);
	
	return {
		prodsrchsel : prodsrchsel
		,prdsrchst : prdsrchst
		,prdsrchsel : prdsrchsel
		,prdsrchstadt : prdsrchstadt
		,prdsrchenddt : prdsrchenddt
		,mktdivorgid : mktdivorgcd
		,cntrorgid : cntrorgcd
		,agnorgid : agnorgcd
		,selrid : selrid
		,appl_form_oper_grp_num : appl_form_oper_grp_num
		,applformseq : applformseq
		,buyrnm : buyrnm
		,buyrphonnum : buyrphonnum
		,fixnum : fixnum
		,eqpcd : eqpcd
		,eqp_color : eqp_color
		,wireprodcd : wireprodcd
		,wire_prod : wireprodcd
		,eqpsernum : eqpsernum
		,spmallodernum : spmallodernum
		//[추가] 금이도M / 김성득 / CHG610000068575 / "T.Gate  USIM 개통 및 사전적격 필터링 기능 개발 요청" :  / 20180726
		,spmallst11odernum : spmallst11odernum
		,usimmdl : usimmdl
		,usimnum : usimnum
		,applstcdwless : applstcdwless
		,wire_st_cl : applstcdwire
		,applstcdwire : applstcdwire
		,exchgrtnclcd : exchgrtnclcd
		,agrmtallotcl : agrmtallotcl
		,spmallcl : spmallcl
		,spmallcd : spmallcd
		,applformscrbtyp : applformscrbtyp
		,prcplncl : prcplncl
		,supl_svc : supl_svc
		,allot_prd : allot_prd
		
		//개통대기번호
		,mov_num_idnt : movnumidnt
		,mov_num_exg  : movnumexg
		,mov_num_num  : movnumnum
		
		//필터링
		,fltr_tp   : fltrTp
		,fltr_cmpl : fltrCmpl
		,event_id : event_id
		,ts_val_no : ts_val_no
		,accp_seq : accp_seq
		//2017 테이크		
		,mateyn : mateyn
		
		//START --> 정책팀-강인혁M / 이종길 / CHG610000055390 / "TWD라이트할부, 쓰던폰반납" / 20171228
		// Twd  라이트할부/쓰던폰반납
		, lght_allot_req_yn : lght_allot_req_yn
		, lght_allot_op_st_cd : lght_allot_op_st_cd
		, oldph_rtn_req_yn : oldph_rtn_req_yn
		, oldph_rtn_op_st_cd : oldph_rtn_op_st_cd
		//END --> 정책팀-강인혁M / 이종길 / CHG610000055390 / "TWD라이트할부, 쓰던폰반납" / 20171228
		//[추가] 박송이M / 김성득 / CHG610000059887/ "TWORLD 다이렉트 셀프동의 여부 TGATE어드민 적용" :  셀프동의항목추가 / 20180315
		, tdir_slf_agree_yn : tdir_slf_agree_yn
		//예약번호 조회 추가 
		, tdir_rsv_sale_num_yn : tdir_rsv_sale_num_yn 
	};
};
//단말기 모델 찾기 리턴 값..
var popupType = "";
var popupWin;

//단말기 찾기
// [추가] 이정호M / 김성득 / CHG610000096203 / Admin 단말기 펫네임 적용 및 제휴카드 혜택정보 현행화: / 20191211
var eqpOpen = function() 
{
	popupType = "eqp";
	var url = "/common/eqpSrchList.do?popType=multi";
	var twm = "eqpOpenOpen";
	var centeredY,centeredX,width = 770,height = 730;
	if($.browser.msie) {
		centeredY = (window.screenTop - 120) + ((((document.documentElement.clientHeight + 120)/2) - (height/2)));
		centeredX = window.screenLeft + ((((document.body.offsetWidth + 20)/2) - (width/2)));
	} else {
		centeredY = window.screenY + (((window.outerHeight/2) - (height/2)));
		centeredX = window.screenX + (((window.outerWidth/2) - (width/2)));
	}
	if(popupWin) popupWin.close();
	
	popupWin = window.open(url,twm, "width="+width+", height="+height+", left=" + centeredX +",top=" + centeredY+", toolbar=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no");
};
var rtnFunction = function(popType) {
	if(popupType=="eqp") {
		if(popupData.cd!=null && popupData.cd.length>0) {
			$('#idEqpCl').val(popupData.cd);
			$('#idEqpNm').val(popupData.cd.split(',').length);
		} else {
			eqpClose();
		}
	} else if(popupType=="spmall"){
		if(popupData.cd!=null && popupData.cd.length>0) {
			$('#idSpmall').val(popupData.cd);
			$('#idSpmallNm').val(popupData.cd.split(',').length);
		} else {
			closeSpmall();
		}
	} else if(popupType=="FEE_PROD_CD_NM"){
		if(popupData.cd!=null && popupData.nm!=null) {
			$('#idPrcplnCl').val(popupData.cd);
			$('#idPrcplnNm').val(popupData.nm);
		} else {
			prcplnClose();
		}
	}
		
}
//단말기 값 초기화
var eqpClose = function() 
{
	popupData.cd = "";
	popupData.nm = "";
	$('#idEqpCl').val('');
	$('#idEqpNm').val('0');
};

var checkSpmallCode = function() {
	var mkt_div_org_id = $('#idMktDivOrg option:selected').val();
	var cntr_org_id = $('#idCntrOrg option:selected').val();
	var org_id = $('#idAgnOrg option:selected').val();
	
	popupData.chnl_cd = '03';
	popupData.org_id = org_id=="null"?"":org_id;
	popupData.mktg_org_lvl_cd = cur_mktg_org_lvl_cd;
	popupData.mkt_div_org_id = mkt_div_org_id=="null"?"":mkt_div_org_id;
	popupData.cntr_org_id = cntr_org_id=="null"?"":cntr_org_id;
	if(popupData.org_id!=""||popupData.mkt_div_org_id!=""||popupData.cntr_org_id!="") {
		popupData.chnl_cd = '';
	}
}
//쇼핑몰 찾기
var openSpmall = function() 
{
	checkSpmallCode();
	popupType = "spmall";
	var url = "/common/saleSiteSrchList.do?popType=multi";
	var twm = "openSpmallWin";
	var centeredY,centeredX,width = 600,height = 730;
	if($.browser.msie) {
		centeredY = (window.screenTop - 120) + ((((document.documentElement.clientHeight + 120)/2) - (height/2)));
		centeredX = window.screenLeft + ((((document.body.offsetWidth + 20)/2) - (width/2)));
	} else {
		centeredY = window.screenY + (((window.outerHeight/2) - (height/2)));
		centeredX = window.screenX + (((window.outerWidth/2) - (width/2)));
	}
	if(popupWin) popupWin.close();
	popupWin = window.open(url,twm, "width="+width+", height="+height+", left=" + centeredX +",top=" + centeredY+", toolbar=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no");
};

//쇼핑몰 초기화
var closeSpmall = function() 
{
	popupData.cd = "";
	popupData.nm = "";
	$('#idSpmall').val('');
	$('#idSpmallNm').val('0');
};

//요금제 찾기
var prcplnOpen = function() 
{
	popupType = "FEE_PROD_CD_NM";
	var url = "/common/prcplnSrchList.do?popType=single";
	var twm = "feeProdSearch";
	resetPopupData('feeProdSearch');
	popupData.prod_nm_cl_cd = '10';
	var centeredY,centeredX,width = 660,height = 650;
	if($.browser.msie) {
		centeredY = (window.screenTop - 120) + ((((document.documentElement.clientHeight + 120)/2) - (height/2)));
		centeredX = window.screenLeft + ((((document.body.offsetWidth + 20)/2) - (width/2)));
	} else {
		centeredY = window.screenY + (((window.outerHeight/2) - (height/2)));
		centeredX = window.screenX + (((window.outerWidth/2) - (width/2)));
	}
	if(popupWin) popupWin.close();
	
	popupWin = window.open(url,twm, "width="+width+", height="+height+", left=" + centeredX +",top=" + centeredY+", toolbar=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no");
};

//요금제 값 초기화
var prcplnClose = function() 
{
	popupData.cd = "";
	popupData.nm = "";
	$('#idPrcplnCl').val('');
	$('#idPrcplnNm').val('');
};

//검색
var searchScrb = function() {
	var prdsrchsel = $(':radio[name="idSrchDtCl"]:checked').val();
	if(prdsrchsel=="04") {
		var sta_dt = $('#fromDate').val();
		var end_dt = $('#toDate').val();
		//30일 제한조건 체크
		var startDt = Date.parseExact(sta_dt,'yyyyMMdd');
		var endDt = Date.parseExact(end_dt,'yyyyMMdd');
		if(Date.compare(startDt, endDt.add(-30).day()) < 0) {
			alert("조회기간은 30일 제한입니다.");
			$('#fromDate').val("");
			$('#toDate').val("");
			return false;
		} 
	}
	
	// 개통대기번호 20160620 윤재선
	var movNumCnt = 0;
	var movNum = [$('#idPhon1').val(), $('#idPhon2').val(), $('#idPhon3').val()]
	for(var i=0;i<movNum.length;i++){
		if(movNum[i] != "") movNumCnt++;
	}
	if(movNumCnt > 0 && movNum.length != movNumCnt){
		alert("개통대기번호를 모두 입력해주세요.");
		return false;
	}
	
	
	var rowNum = parseInt($('#sRowNum_1 option:selected').val());
	$("#jqTable").setGridParam({
		page: 1
		,url :'/scrbmgmt/scrbMgmtSrchLst.do'
		,rowNum : rowNum
		,postData : getSearchParam()
	}).trigger("reloadGrid");
};

//사전적격 및 필터링항목 속성변경 20160620 윤재선 
var disableFiltering = function() {

	var isWless = $(':radio[name="idProdCl"]:checked').val() == '01' ? true : false;
	
	if(isWless) {
		$('#idFltrTp, #idPhon1, #idPhon2, #idPhon3').val('');
	} else {
		$('#idFltrTp').val('');
	}
	$('#idFltrPre, #idFltrAuto').hide();
	$('#idFltrTp').attr('disabled', !isWless);
	$('input:radio[id=idFltrCmpl]').eq(0).attr('checked', true);
}

//신청접수 상황 속성 변경
//2016-08-08 윤재선 : scrb_mgmt_lst.js 파일 다운로드전에 disableApplStCd함수가 호출되어 스크립트오류 발생 ScrbMgmt.jsp로 소스 이동

//Hidden 검색 초기화
var initSearchItem = function() {
	$('#idBuyrPhonNum').val("");
	$('#idFixNum').val("");
	$('#idEqpCl').val("");
	$('#idEqpNm').val("0");
	$('#idEqpColor').val("");
	$('#idWireProdNm').val("");
	$('#idEqpSerNum').val("");
	
	//주문번호 검색 및 리스트 노출(2014-01-10쪽지)
		$('#idSpmallOderNum').val("");
		//[추가] 금이도M / 김성득 / CHG610000068575 / "T.Gate  USIM 개통 및 사전적격 필터링 기능 개발 요청" :  / 20180726
		$('#idSpmallst11OderNum').val("");
		
	//요금제 검색 20150212
		$('#idPrcplnCl').val("");
		$('#idPrcplnNm').val("");
	
	$('#idUsimMdl').val("");
	$('#idUsimNum').val("");
	$('#idWlessSt').val("");
	$('#idWireSt').val("");
	$('#idExchgRtnClCd').val("");
	$('#idAgrmtAllotCl').val("");
	$('#idSpmallCl').val("");
	$('#idSpmall').val("");
	$('#idSpmallNm').val("0");
	$('#idPrcplnCl').val("");
	$('#idPrcplnNm').val("");
	$('select[name="idScrbTp"]').multiselect("uncheckAll");
	$('select[name="idSupl_svc"]').multiselect("uncheckAll");
	$('select[name="idAllot_prd"]').multiselect("uncheckAll");
	$('select[name="idEvent_id"]').multiselect("uncheckAll");
	$('#ts_val_no').val("");
	$('#accp_seq').val("");
	//개통대기번호 + 필터링 20160620 윤재선
	$('#idTdirSlfAgreeYN').val("");
	disableFiltering();
	
	disableApplStCd(false);
};

var changeOrg = function(kind) {
	var mkt_div_org_id="", 
		cntr_org_id = "",
		prent_org_id="",
		contentName="sale",
		aprv_op_st="";
	var mList, dList, pList;
	var url = "/common/getChangeOrgList.do";
	
	if(kind=="20") {
		cur_mktg_org_lvl_cd = "30";
		prent_org_id = $('#idMktDivOrg option:selected').val();
	} else if(kind=="30") {
		cur_mktg_org_lvl_cd = "40";
		mkt_div_org_id = $('#idMktDivOrg option:selected').val();
		prent_org_id = $('#idCntrOrg option:selected').val();
		aprv_op_st = "approval";
	} else if(kind=="40") {
		cur_mktg_org_lvl_cd = "P";
		mkt_div_org_id = $('#idMktDivOrg option:selected').val();
		cntr_org_id = $('#idCntrOrg option:selected').val();
		prent_org_id = $('#idAgnOrg option:selected').val();
	}
	var pData = {
			  mktg_org_lvl_cd : cur_mktg_org_lvl_cd
			, mkt_div_org_id : mkt_div_org_id
			, cntr_org_id : cntr_org_id
			, prent_org_id : prent_org_id
			, aprv_op_st : aprv_op_st
			, contentName : contentName
			, orgsrchlvlcd : kind
	}
	
	$.ajax({
		url: url,
		data: pData,
		type : 'POST',
		dataType : 'JSON',
		cache    : false,
		success : function(data, status) {
			var obj = [data.mList, data.dList, data.pList];
			//console.log("test :...");
			for(var i = 0; i < obj.length; i++) {
				var option = '';
				if(obj[i] != undefined) {
					for(var j = 0; j < obj[i].length; j++) {
						if(kind == '40' && j > 0) {
							if(i==2) {
								if(!(obj[i][j].ORG_ID == null||obj[i][j].ORG_ID == "NULL"||obj[i][j].ORG_ID == "")) {
									option += '<option value="'+((obj[i][j].ORG_ID == null||obj[i][j].ORG_ID == "NULL") ? 'null' : obj[i][j].ORG_ID)+'">['+obj[i][j].ORG_ID+'] '+obj[i][j].ORG_NM+'</option>';
								}
							} else {
							option += '<option value="'+((obj[i][j].ORG_ID == null||obj[i][j].ORG_ID == "NULL") ? 'null' : obj[i][j].ORG_ID)+'">['+obj[i][j].ORG_ID+'] '+obj[i][j].ORG_NM+'</option>';
							}
						} else {
							if(i==2) {
								if(!(obj[i][j].ORG_ID == null||obj[i][j].ORG_ID == "NULL"||obj[i][j].ORG_ID == "")) {
									option += '<option value="'+((obj[i][j].ORG_ID == null||obj[i][j].ORG_ID == "NULL") ? 'null' : obj[i][j].ORG_ID)+'">['+obj[i][j].ORG_ID+'] '+obj[i][j].ORG_NM+'</option>';
								}
							} else {
							option += '<option value="'+((obj[i][j].ORG_ID == null||obj[i][j].ORG_ID == "NULL") ? 'null' : obj[i][j].ORG_ID)+'">'+obj[i][j].ORG_NM+'</option>';
							}
						}
					}
					switch(i) {
					case 0 : mList = option; break;
					case 1 : dList = option; break;
					case 2 : pList = option; break;
					}
				}
			}	

			if(kind=="20") {
				$('#idCntrOrg').find('option').remove().end().append(mList); 
				$('#idAgnOrg').find('option').remove().end().append(dList);
				$('select[name="idSelr"]').find('option').remove().end().append(pList);
			} else if(kind=="30") {
				$('#idAgnOrg').find('option').remove().end().append(dList);
				$('#idSelr').find('option').remove().end().append(pList);
			} else if(kind=="40") {
				$('#idSelr').find('option').remove().end().append(pList);
			}
			$('#idSelr').multiselect("refresh");
			closeSpmall();
		},
		error : function(xhr, status) {
			
		}, 
		complete : function(xhr, status) {
			
		}
		
	}); 
	
};
//메모팝업
var popupMemo = function(appl_form_seq, org_id, prod_cl) {
	var url = "/common/cmnAdminPopup.do?vw=scrb_memo&appl_form_seq="+appl_form_seq+"&org_id="+org_id+"&prod_cl="+prod_cl;
	var twm = "popupMemoWin";
	var centeredY,centeredX,width = 680,height = 445;
	if($.browser.msie) {
		centeredY = (window.screenTop - 120) + ((((document.documentElement.clientHeight + 120)/2) - (height/2)));
		centeredX = window.screenLeft + ((((document.body.offsetWidth + 20)/2) - (width/2)));
	} else {
		centeredY = window.screenY + (((window.outerHeight/2) - (height/2)));
		centeredX = window.screenX + (((window.outerWidth/2) - (width/2)));
	}
	window.open(url,twm, "width="+width+", height="+height+", left=" + centeredX +",top=" + centeredY+", toolbar=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no");
}

//메모팝업
var popupWire = function(appl_form_seq, org_id, prod_cl) {
	var url = "/common/cmnAdminPopup.do?vw=scrb_memo&appl_form_seq="+appl_form_seq+"&org_id="+org_id+"&prod_cl="+prod_cl;
	var twm = "popupMemoWin";
	var centeredY,centeredX,width = 680,height = 445;
	if($.browser.msie) {
		centeredY = (window.screenTop - 120) + ((((document.documentElement.clientHeight + 120)/2) - (height/2)));
		centeredX = window.screenLeft + ((((document.body.offsetWidth + 20)/2) - (width/2)));
	} else {
		centeredY = window.screenY + (((window.outerHeight/2) - (height/2)));
		centeredX = window.screenX + (((window.outerWidth/2) - (width/2)));
	}
	window.open(url,twm, "width="+width+", height="+height+", left=" + centeredX +",top=" + centeredY+", toolbar=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no");
}

var popupExchgRtn = function(appl_form_seq, comm_buyr_nm) {
	var ${resources}/img = document.scrbExchgRtnForm;
	
	var url = "/common/cmnAdminPopup.do?vw=scrb_exchg_rtn";
	var twm = "popupExchgRtnWin";
	var centeredY,centeredX,width = 610,height = 421;
	if($.browser.msie) {
		centeredY = (window.screenTop - 120) + ((((document.documentElement.clientHeight + 120)/2) - (height/2)));
		centeredX = window.screenLeft + ((((document.body.offsetWidth + 20)/2) - (width/2)));
	} else {
		centeredY = window.screenY + (((window.outerHeight/2) - (height/2)));
		centeredX = window.screenX + (((window.outerWidth/2) - (width/2)));
	}
	window.open('',twm, "width="+width+", height="+height+", left=" + centeredX +",top=" + centeredY+", toolbar=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no");
	${resources}/img.action = url;
	${resources}/img.vw.value = "scrb_exchg_rtn";
	${resources}/img.appl_form_seq.value = appl_form_seq;
	${resources}/img.comm_buyr_nm.value = comm_buyr_nm;
	${resources}/img.target = twm;
	${resources}/img.submit();

}
//신청접수 상세 수정화면 띄우기
var popupScrbMgmtDtl = function(appl_form_seq, org_id, prod_cl) {
	var targetWinName = "scrbMgmtDtlWin";
	var centeredY,centeredX;
	var width = 1024;
	var height = 800;
	if($.browser.msie) {
		height = document.documentElement.clientHeight;
		centeredY = (window.screenTop - 120) + ((((document.documentElement.clientHeight + 120)/2) - (height/2)));
		centeredX = window.screenLeft + ((((document.body.offsetWidth + 20)/2) - (width/2)));
	} else {
		height = window.innerHeight;
		centeredY = window.screenY + (((window.outerHeight/2) - (height/2)));
		centeredX = window.screenX + (((window.outerWidth/2) - (width/2)));
	}
	var RecordInfoWin = window.open('',targetWinName, "width="+width+", height="+height+", left=" + centeredX +",top=" + centeredY+", toolbar=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no");
	$('#appl_form_seq').val(appl_form_seq);
	$('#org_id').val(org_id);
	$('#prod_cl').val(prod_cl);
	$("#scrbDtlForm").attr("target",targetWinName);
    $('#scrbDtlForm').submit();
    RecordInfoWin.focus();
        
};

var fnDeliveryExcel = function() {
	if(mobile) {
		alert('해당기기에서는 엑셀다운로드를 지원하지 않습니다.');
		return false;
	}
	alert("배송정보 엑셀다운로드에 관해, 고객정보 사용 이슈가 있어 고객정보 사용에 대한 정책적 결정이 날 때까지 당분간 사용하실 수 없습니다.");
}

var excelScrb = function(index) {
	if(mobile) {
		alert('해당기기에서는 엑셀다운로드를 지원하지 않습니다.');
		return false;
	}
	var params = getSearchParam();
	//console.log(JSON.stringify(params));
	var ${resources}/img = document.${resources}/img;
	var selrnm = user_nm;
//	alert(params.tdir_rsv_sale_num_yn);
	var buyrnm=params.buyrnm;
	var eqp_color=params.eqp_color

	with(${resources}/img)
	{
		orderbysort.value =    "" ; 
		orderbynm.value =      "" ; 
		olddata.value =        "" ; 
		stanum.value =         params.prdsrchstadt ; 
		endnum.value =         params.prdsrchenddt ; 
		iscount.value =        "" ; 
		totalcount.value =     "" ; 
		curpage.value =        "" ; 
		orgid.value =          ""; 
		userid.value =         login_id ; 
		mktgorglvlcd.value =   ""; 
		mktdivorgcd.value =    "" ; 
		mktdivorgid.value =    params.mktdivorgid ; 
		mktdivorgnm.value =    ""; 
		cntrorgcd.value =      ""; 
		cntrorgid.value =      params.cntrorgid ; 
		cntrorgnm.value =      ""; 
		agnorgcd.value =       ""; 
		agnorgid.value =       params.agnorgid ; 
		agnorgnm.value =       ""; 
		selrid.value =         params.selrid ; 
		spmallcd.value =       params.spmallcd ; 
		prodsrchsel.value =    params.prodsrchsel ; 
		prdsrchst.value =      params.prdsrchst ; 
		prdsrchsel.value =     params.prdsrchsel ; 
		prdsrchstadt.value =   params.prdsrchstadt ; 
		prdsrchenddt.value =   params.prdsrchenddt ; 
		orgsrchlvlcd.value =   ""; 
		spmallodernum.value =  "";
		//[추가] 금이도M / 김성득 / CHG610000068575 / "T.Gate  USIM 개통 및 사전적격 필터링 기능 개발 요청" :  / 20180726
		spmallst11odernum.value =  params.spmallst11odernum; 
		applformscrbtyp.value =params.applformscrbtyp ; 
		fixnum.value =         params.fixnum ; 
		//buyrnm.value =         encodeURIComponent(encodeURIComponent(params.buyrnm)); 
		wireprodcd.value =     params.wireprodcd ;
		applstcdwless.value =  params.applstcdwless ; 
		applstcdwire.value =   params.applstcdwire ;
		movbfbizr.value =      "";
		agrmtallotcl.value =   params.agrmtallotcl ;
		eqpcd.value =          params.eqpcd ;
		
		restnum.value =        "";
		email.value =          "";
		applformseq.value =    params.applformseq ;
		spmallcl.value =       params.spmallcl ;
		reserve_yn.value =     "";
		rsv_ts_val.value =     "";
		//eqp_color.value =     params.eqp_color ;
		//TODO 엑셀 필터링(?)
		//[추가] 박송이M / 김성득 / CHG610000059887/ "TWORLD 다이렉트 셀프동의 여부 TGATE어드민 적용" :  엑셀조회조건 파라미터세팅 / 20180315
		tdir_slf_agree_yn.value = params.tdir_slf_agree_yn;
		
//		alert("params.tdir_rsv_sale_num_yn : " + params.tdir_rsv_sale_num_yn);
		//예약번호
		tdir_rsv_sale_num_yn.value = params.tdir_rsv_sale_num_yn;
	}

	if(index == "1")
	{
		${resources}/img.action = "/tgate/excel/scrbReqPrstLstExcelExport.jsp?selrnm="+encodeURIComponent(encodeURIComponent(selrnm))+"&buyrnm="+encodeURIComponent(encodeURIComponent(buyrnm))+"&eqp_color="+encodeURIComponent(encodeURIComponent(eqp_color));
	}
	else if(index == "2")
	{
		${resources}/img.action = "/tgate/excel/scrbReqPrstDeliveryExcelExp.jsp?selrnm="+encodeURIComponent(encodeURIComponent(selrnm));
	}
	else if(index == "3") 
	{
		${resources}/img.action = "/tgate/excel/scrbRPMWireExcelExp.jsp?selrnm="+encodeURIComponent(encodeURIComponent(selrnm));
	}
	//console.log('test');
	${resources}/img.target = "fileDownload";
	${resources}/img.submit();
}

//재조회 함수
var reloadScrbList = function() {
	$("#jqTable").trigger("reloadGrid");
}

//유선신청결과
var wireSvcRsltOpen = function(appl_form_seq) {
	var url = "/common/cmnAdminPopup.do?vw=scrb_wire_req_result&appl_form_seq="+appl_form_seq;
	var twm = "wireSvcRsltOpen";
	var centeredY,centeredX,width = 400,height = 445;
	if($.browser.msie) {
		centeredY = (window.screenTop - 120) + ((((document.documentElement.clientHeight + 120)/2) - (height/2)));
		centeredX = window.screenLeft + ((((document.body.offsetWidth + 20)/2) - (width/2)));
	} else {
		centeredY = window.screenY + (((window.outerHeight/2) - (height/2)));
		centeredX = window.screenX + (((window.outerWidth/2) - (width/2)));
	}
	window.open(url,twm, "width="+width+", height="+height+", left=" + centeredX +",top=" + centeredY+", toolbar=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no");
};
