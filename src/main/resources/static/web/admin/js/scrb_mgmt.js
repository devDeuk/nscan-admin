
$(function() {
	
	//tab form event 처리
	for(var st=0; st < scrbTabList.length; st++) {
		$('#'+scrbTabList[st]).click(function() {
			if(!$(this).hasClass("current")) {
				if($('#'+currTabId).hasClass('current')) {
					$('#'+currTabId).removeClass('current');
					$('#'+currTabId+'Form').css('display','none');	
				}
				$(this).addClass('current');
				$('#'+this.id+'Form').css('display','block');
				currTabId = this.id;
				if(this.id == "fltrTab" || this.id == "autoTab") {
					$('button[onclick="dtlSave()"],button[onclick="dtlDel()"]').hide();
				}else{
					$('button[onclick="dtlSave()"],button[onclick="dtlDel()"]').show();
				}
			}
		});
	}
	//숫자만 입력가능하도록
	$("input[type=text][name='rest_num_1']"+
			",input[type=text][name='rest_num_2']"+
			",input[type=text][name='idDrvLicenNum1']"+
			",input[type=text][name='idDrvLicenNum2']"+
			",input[type=text][name='idDrvLicenNum3']"+
			",input[type=text][name='idMovNumChgExg']"+
			",input[type=text][name='idMovNumChgNum']"+
			",input[type=text][name='idBuyrWireNumExg']"+
			",input[type=text][name='idBuyrWireNumNum']"+
			",input[type=text][name='idBuyrPhonExg']"+
			",input[type=text][name='idBuyrPhonNum']"+
			",input[type=text][name='idDlvPhonExg']"+
			",input[type=text][name='idDlvPhonNum']"+
			",input[type=text][name='idDlvMblPhonExg']"+
			",input[type=text][name='idDlvMblPhonNum']"+
			",input[type=text][name='idCourtAgntPhonExg']"+
			",input[type=text][name='idCourtAgntPhonNum']"+
			",input[type=text][name='idCourtAgntMblPhonExg']"+
			",input[type=text][name='idCourtAgntMblPhonNum']"+
			",input[type=text][name='idCommPrefrNum1']"+
			",input[type=text][name='idCommPrefrNum2']"+
			",input[type=text][name='idWireCntcPlcPhonExg']"+
			",input[type=text][name='idWireCntcPlcPhonNum']"+
			",input[type=text][name='idWireCntcPlcMblPhonExg']"+
			",input[type=text][name='idWireCntcPlcMblPhonNum']"+
			",input[type=text][name='VISIT_TEL_2']"+
			",input[type=text][name='VISIT_TEL_3']"+
			",input[type=text][name='idWireBankNum']"+
			",input[type=text][name='idWireCardNum']"+
			",input[type=text][name='WIRE_PHON_PREFR_NUM_1']"+
			",input[type=text][name='WIRE_PHON_PREFR_NUM_2']"+
			",input[type=text][name='WIRE_PHON_EXST_NUM_2']"+
			",input[type=text][name='WIRE_PHON_EXST_NUM_3']"+
			",input[type=text][name='WIRE_INET_PHON_EXST_NUM_2']"+
			",input[type=text][name='WIRE_INET_PHON_EXST_NUM_3']"+
			",input[type=text][name='gifthpexg']"+
			",input[type=text][name='gifthpnum']"+
			",input[type=text][name='giftphonexg']"+
			",input[type=text][name='giftphonnum']"+
			",input[type=text][name='idBuyrPhonExg']"+
			",input[type=text][name='idBuyrPhonNum']"
	).keyup(function(){
		var iVal = $(this).val();
		if(iVal.trim()!="" && !/^[0-9]+$/.test(iVal) && $(this).attr("readonly") == undefined) {
			alert("숫자만 입력가능합니다.");
			$(this).val(iVal.replace(/[^0-9\.]+/g, ""));
			$(this).focus();
		}
		//console.log(this.name + " : " + iVal.length);
		if(this.name=="rest_num_1" && iVal.length==6) {
			$(':text[name="rest_num_2"]').focus();
		}
	});
	
	
	$(':text[name="rest_num_2"]').keypress(function(e) {
		if(e.which==13) {
			nameCheck();
		}
	});
	//영문자,숫자만 입력가능하도록
	$("input[type=text][name='idMovAuthCtt']"+
			",input[type=text][name='wibro_id']"+
			",input[type=text][name='idEqpSerNum']"+
			",input[type=text][name='idUsimMdl']"+
			",input[type=text][name='iduSimNum']"
	).keyup(function(){
		var iVal = $(this).val();
		if(iVal.trim()!="" && !/^[A-z0-9]+$/.test(iVal)) {
			alert("영문자와숫자만 입력가능합니다.");
			$(this).val(iVal.replace(/[^0-9A-z\.]+/g, ""));
			$(this).focus();
		}
	});
	//Email ID 체크
	//[추가] 금이도M / 김용일 / CHG610000070310/ "Tgate 미성년자 법정대리인 이메일정보 추가" :  법정대리인 이메일 추가 / 20180823
	$("input[type=text][name='email1']"+
			",input[type=text][name='idWireReqrEmail1']"+
			",input[type=text][name='idWireBillEmail']"+
			",input[type=text][name='courtAgntEmail1']"
	).keyup(function(){
		var iVal = $(this).val();
		//[추가] 금이도M / 김용일 / CHG610000058730 / [TGATE]Admin 이메일 주소 체크로직 개선" : 정규식 변경 A-z 에서 a-zA-Z로 변경, \- 로 변경
		if(iVal.trim()!="" && !/^[a-zA-Z0-9_.\-]+$/.test(iVal)) {
			alert("영문자와숫자와 (.,-,_)만 입력가능합니다.");
			$(this).val(iVal.replace(/[^a-zA-Z0-9_.\-]+/g, ""));
			$(this).focus();
		}
	});
	
	//Email Domain 체크
	//[추가] 금이도M / 김용일 / CHG610000070310/ "Tgate 미성년자 법정대리인 이메일정보 추가" :  법정대리인 이메일 추가 / 20180823
	$("input[type=text][name='email3']"+
			",input[type=text][name='idWireReqrEmail3']"+
			",input[type=text][name='idWireBillEmail3']"+
			",input[type=text][name='courtAgntEmail3']"
	).keyup(function(){
		
		var iVal = $(this).val();
		if(iVal.trim()!="" && !/^[A-z0-9.]+$/.test(iVal)) {
			alert("영문자와숫자와(.)만 입력가능합니다.");
			$(this).val(iVal.replace(/[^0-9A-z.]+/g, ""));
			$(this).focus();
		}
	});
	
	/* 마스킹처리 20160921 윤재선 기타 */
	$(  "input[type=text][name='rest_num_2']"+
		",input[type=text][name='idMovNumChgExg']"+
		",input[type=text][name='idMovNumChgNum']"+
		",input[type=text][name='idBuyrWireNumExg']"+
		",input[type=text][name='idBuyrWireNumNum']"+
		",input[type=text][name='idBuyrPhonExg']"+
		",input[type=text][name='idBuyrPhonNum']"+
		",input[type=text][name='email3']"+
		",input[type=text][name='idByurInvBasAddr']"+
		",input[type=text][name='idBuyrInvDtlAddr']"+
		",input[type=text][name='idBuyrDlvBasAddr']"+
		",input[type=text][name='idBuyrDlvDtlAddr']"+
		",input[type=text][name='idDlvRcvrNm']"+
		",input[type=text][name='idDlvPhonExg']"+
		",input[type=text][name='idDlvPhonNum']"+
		",input[type=text][name='idDlvMblPhonExg']"+
		",input[type=text][name='idDlvMblPhonNum']"+
		",input[type=text][name='idCommBankNum']"+
		",input[type=text][name='idCommCardNum']"+
		",input[type=text][name='idCourtAgntPhonExg']"+
		",input[type=text][name='idCourtAgntPhonNum']"+
		",input[type=text][name='idCourtAgntMblPhonExg']"+
		",input[type=text][name='idCourtAgntMblPhonNum']"+
		",input[type=text][name='INTEG_INV_PHON_NUM']"+
		",input[type=text][name='idEqpSerNum']"+
		",input[type=text][name='iduSimNumbuy']"+
		",input[type=text][name='iduSimNum']"+
		",input[type=text][name='idWireCntcPlcPhonExg']"+
		",input[type=text][name='idWireCntcPlcPhonNum']"+
		",input[type=text][name='idWireCntcPlcMblPhonExg']"+
		",input[type=text][name='idWireCntcPlcMblPhonNum']"+
		",input[type=text][name='idWireReqrEmail3']"+
		",input[type=text][name='idWireSetPlcAddr1']"+
		",input[type=text][name='idWireSetPlcAddr2']"+
		",input[type=text][name='VISIT_TEL_2']"+
		",input[type=text][name='VISIT_TEL_3']"+
		",input[type=text][name='idWireBillEmail3']"+
		",input[type=text][name='idWireBillAddr1']"+
		",input[type=text][name='idWireBillAddr2']"+
		",input[type=text][name='idWireBankNum']"+
		",input[type=text][name='idWireCardNum']"+
		",input[type=text][name='WIRE_PHON_EXST_NUM_2']"+
		",input[type=text][name='WIRE_PHON_EXST_NUM_3']"+
		",input[type=text][name='WIRE_INET_PHON_EXST_NUM_2']"+
		",input[type=text][name='WIRE_INET_PHON_EXST_NUM_3']"+
		",input[type=text][name='wire_gift_dlv_bas_addr']"+
		",input[type=text][name='wire_gift_dlv_dtl_addr']"+
		",input[type=text][name='giftrecipient']"+
		",input[type=text][name='gifthpexg']"+
		",input[type=text][name='gifthpnum']"+
		",input[type=text][name='giftphonexg']"+
		",input[type=text][name='giftphonnum']"+
		",input[type=text][name='idBuyrPhonExg']"+
		",input[type=text][name='idBuyrPhonNum']"+
		//[추가] 금이도M / 김용일 / CHG610000070310/ "Tgate 미성년자 법정대리인 이메일정보 추가" :  법정대리인 이메일 추가 / 20180823
		",input[type=text][name='courtAgntEmail3']"
	).keyup(function(){
		if($(this).attr("readonly") == undefined) {
			$(this).attr("mask", 2);
		}
	});
	
	//날짜 datepicker
	$("input[type=text][name='idAuthCheckDt']"+
			",input[type=text][name='idWireCtzIsueDt']"+
			",input[type=text][name='idWireSvcPrefrDtmDay']"
	).datepicker({
		dateFormat: "yymmdd",
		buttonImage: "/web/admin/img/common/ico/calendar.png",
		buttonText: "달력",
		showOn: "both"
	});
	
	//휴대폰인증 일 경우 이벤트
	$('select[name="idMblPhonauthType"]').change(function() {
		if($(this).val()=="1")  { //주민등록증
			$('#idWireCtzIsueDtDv').css('display','block');
			$('#idDrvLicenAreaDv').css('display','none');
		} else {
			$('#idWireCtzIsueDtDv').css('display','none');
			$('#idDrvLicenAreaDv').css('display','block');
		}
	});
	
	//무선 E-MAIL 청구서 변경시
	$('select[name="email2"]').change(function() {
		var selVal = $('select[name="email2"] option:selected').val();
		var selText = selVal=="18"?"":$('select[name="email2"] option:selected').text();
		$('input[type=text][name="email3"]').val(selText);
		$('input[type=text][name="email3"]').focus();
		
		/* 마스킹처리 20160921 윤재선 */
		$('input[type=text][name="email3"]').attr("mask", 2);
	});
	
	$('select[name="idWireReqrEmail2"]').change(function() {
		var selVal = $('select[name="idWireReqrEmail2"] option:selected').val();
		var selText = selVal=="18"?"":$('select[name="idWireReqrEmail2"] option:selected').text();
		$('input[type=text][name="idWireReqrEmail3"]').val(selText);
		$('input[type=text][name="idWireReqrEmail3"]').focus();

		/* 마스킹처리 20160921 윤재선 */
		$('input[type=text][name="idWireReqrEmail3"]').attr("mask", 2);
	});
	$('select[name="idWireBillEmail2"]').change(function() {
		var selVal = $('select[name="idWireBillEmail2"] option:selected').val();
		var selText = selVal=="18"?"":$('select[name="idWireBillEmail2"] option:selected').text();
		$('input[type=text][name="idWireBillEmail3"]').val(selText);
		$('input[type=text][name="idWireBillEmail3"]').focus();
		
		/* 마스킹처리 20160921 윤재선 */
		$('input[type=text][name="idWireBillEmail3"]').attr("mask", 2);
	});
	//[추가] 금이도M / 김용일 / CHG610000070310/ "Tgate 미성년자 법정대리인 이메일정보 추가" :  법정대리인 이메일 추가 / 20180823
	//무선 법정대리인 메일주소 변경시
	$('select[name="courtAgntEmail2"]').change(function() {
		var selVal = $('select[name="courtAgntEmail2"] option:selected').val();
		var selText = selVal=="18"?"":$('select[name="courtAgntEmail2"] option:selected').text();
		$('input[type=text][name="courtAgntEmail3"]').val(selText);
		$('input[type=text][name="courtAgntEemail3"]').focus();
		$('input[type=text][name="courtAgntEmail3"]').attr("mask", 2);
	});
	
	$('textarea[name="idWlessMemo"]').keydown(function() {
		var mm = $(this).val();
		//console.log(mm + ":" + mm.length);
		if(mm.length>1000) {
			alert("메모는 1000자까지 입력가능합니다.");
			$(this).val(mm.substring(0,1000));
			$(this).focus();
			return false;
		}
	});
	$('textarea[name="idWireMemo"]').keydown(function() {
		var mm = $(this).val();
		//console.log(mm + ":" + mm.length);
		if(mm.length>1000) {
			alert("메모는 1000자까지 입력가능합니다.");
			$(this).val(mm.substring(0,1000));
			$(this).focus();
			return false;
		}
	});
	
	//신청취소 --> 신청접수로 다시 원복 가능합니다.  
	//무선 번호이동/기기변경시 이미 동일 번호로 유효한 신청상태에 있으면 "이미 동일 휴대폰번호로 처리 진행중이므로, 처리 불가합니다"  
	$('select[name="idApplFormSt"]').change(function() {
		var pnum1,pnum2,pnum3,ctznum;
		if( scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_CHGGNRL ||
			 	scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_CHGCMP ) { //기기번경
			if($('input[type=hidden][name="idApplFormStOrig"]').val()=="10" && $('select[name="idApplFormSt"] option:selected').val()=="01") {
				pnum1 = scrbReqPrstDtl.buyr_phon_area;
				pnum2 = scrbReqPrstDtl.buyr_phon_exg;
				pnum3 = scrbReqPrstDtl.buyr_phon_num;
				ctznum = scrbReqPrstDtl.comm_buyr_rest_num;
				comm_auth_cl = scrbReqPrstDtl.comm_auth_cl;
				comm_buyr_nm = scrbReqPrstDtl.comm_buyr_nm;
				
				checkNewChgIcas(pnum1,pnum2,pnum3,ctznum,comm_auth_cl,comm_buyr_nm);
			}
		} else if(CONST_MNP_YN) { //번호이동
			if($('input[type=hidden][name="idApplFormStOrig"]').val()=="10" && $('select[name="idApplFormSt"] option:selected').val()=="01") {
				pnum1 = $('select[name="idMovNumChgIdnt"] option:selected').val();
				//pnum2 = $(':text[name="idMovNumChgExg"]').val();
				pnum2 =$(':text[name="idMovNumChgExg"]').attr('mask') == '2' ? $(':text[name="idMovNumChgExg"]').val() : scrbReqPrstDtl.mov_num_chg_exg
				//pnum3 = $(':text[name="idMovNumChgNum"]').val();
				pnum3 =$(':text[name="idMovNumChgNum"]').attr('mask') == '2' ? $(':text[name="idMovNumChgNum"]').val() : scrbReqPrstDtl.mov_num_chg_num
				checkMovPhonIcas(pnum1,pnum2,pnum3);
			}
		}
	});
	//무선 메모 목록
	$("#jqTableWless").jqGrid({
		 url : "/scrbmgmt/scrbMgmtMemoLst.do"
		,datatype: "json"
		,mtype: "POST"
		,height: "auto"
		,colNames:['메일전송','작성자', '내용', '작성일','삭제']
		,colModel:[
			{name:'email_trms_yn',index:'email_trms_yn', width:50, align:"center", sortable:false
				, formatter : function(cellvalue, options, row) {
					var ret = "<input type='checkbox'" + (row.email_trms_yn=='Y'?" checked='checked'":"") + " onclick=\"updateMemoEmail('1','"+row.memo_seq+"',this)\"/>";
					//console.log(ret);
					return ret;
				}
			},
			{name:'upd_nm',index:'upd_nm', key:true, width:60, align:"center", sortable:false},
			{name:'memo',index:'memo', width:280, align:"left", sortable:false, formatter: function(cellvalue, options, row) {
				return "<textarea readonly='readonly' rows=5 cols=78>"+row.memo+"</textarea>";
			}},
			{name:'cre_dt',index:'cre_dt', width:75, align:"center",sortable:false},
			{name:'act',index:'act', width:40,align:"center",sortable:false, formatter: function(cellvalue, options, row) {
				var retStr =  "<input name='deleteMemoBtn' id='deleteMemoBtn' onclick=\"fnMemoDel('1','"+row.memo_seq+"');\" type='button' value='삭제'>";
				return retStr;
			}}
		]
		,rowNum:10
		,width : 950
		,postData : {
			appl_form_seq : scrbReqPrstDtl.appl_form_seq
			,org_id : scrbReqPrstDtl.org_id
			,prod_cl : scrbReqPrstDtl.prod_cl
			,memo_cl : "1"
			,user_id :scrbReqPrstDtl.user_id
		}
	});
	//유선 메모 목록
	$("#jqTableWire").jqGrid({
		 url : "/scrbmgmt/scrbMgmtMemoLst.do"
		,datatype: "json"
		,mtype: "POST"
		,height: "auto"
		,colNames:['메일전송','작성자', '내용', '작성일','삭제']
		,colModel:[
			{name:'email_trms_yn',index:'email_trms_yn', width:50, align:"center", sortable:false
				, formatter : function(cellvalue, options, row) {
					var ret = "<input type='checkbox'" + (row.email_trms_yn=='Y'?" checked='checked'":"") + " onclick=\"updateMemoEmail('2','"+row.memo_seq+"',this)\"/>";
					//console.log(ret);
					return ret;
				}
			},
			{name:'upd_nm',index:'upd_nm', key:true, width:60, align:"center", sortable:false},
			{name:'memo',index:'memo', width:280, align:"left", formatter:'textarea', sortable:false, formatter: function(cellvalue, options, row) {
				return "<textarea readonly='readonly' rows=5 cols=78>"+row.memo+"</textarea>";
			}},
			{name:'cre_dt',index:'cre_dt', width:75, align:"center",sortable:false},
			{name:'act',index:'act', width:40,align:"center",sortable:false, formatter: function(cellvalue, options, row) {
				var retStr =  "<input name='deleteMemoBtn' id='deleteMemoBtn' onclick=\"fnMemoDel('2','"+row.memo_seq+"');\" type='button' value='삭제'>";
				return retStr;
			}}
		]
		,rowNum:10
		,width : 950
		,postData : {
			appl_form_seq : scrbReqPrstDtl.appl_form_seq
			,org_id : scrbReqPrstDtl.org_id
			,prod_cl : scrbReqPrstDtl.prod_cl
			,user_id :scrbReqPrstDtl.user_id
		}
	});
	
	//무선 개통진행상황 목록
	$("#applFormStHstLstBtn").click(function() {
		$("#formHstListBox").show();		
		$("#jqTableFormHstLst").jqGrid({
			 url : "/scrbmgmt/scrbReqPrstDtlFormStLst.do"
			,datatype: "json"
			,mtype: "POST"
			,height: "auto"
			,colNames:['변경자','변경상태', '변경일']
			,colModel:[
				{name:'upd_nm',index:'upd_nm', key:true, width:60, align:"center", sortable:false},
				{name:'appl_form_st_nm',index:'appl_form_st_nm', align:"center", sortable:false},
				{name:'upd_dt',index:'upd_dt', width:75, align:"center",sortable:false}
			]
			,rowNum:20
			,width : 938
			,postData : {
				appl_form_seq : scrbReqPrstDtl.appl_form_seq
				,org_id : scrbReqPrstDtl.org_id
				,prod_cl : scrbReqPrstDtl.prod_cl
				,user_id :scrbReqPrstDtl.user_id
			}
		});
	});
	
});
