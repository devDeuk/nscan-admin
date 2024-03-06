
var goParentList = function() {
	opener.reloadScrbList();
	window.close();
};

var CommUtil = {
		checkPhonExg : function(value) {
			var tmp = $.trim(value);
			if(tmp.length < 3 || tmp.length > 4) {
				return false;
			}
			return true;
		},
		checkPhonNum : function(value) {
			var tmp = $.trim(value);
			if(tmp.length < 4) {
				return false;
			}
			return true;
		}
};


var checkAtchFile = function(selObj, fileSeq, atchType,  fileTyp, encYn) {
	var selId, idx, filePath = "",fileExt = "", fileSize=0;
	
	selId = selObj.id;
	//console.log("selId:"+selId);
	filePath = $(selObj).val();
	if(atchType=="add" && fileSeq!=null && fileSeq!="") {
		alert("부가 첨부서류는 수정이 불가능합니다.\n삭제하시고 추가하세요.");
		if (/MSIE/.test(navigator.userAgent)) {
            $(selObj).replaceWith($(selObj).clone(true));
        } else {
            $(selObj).val('');
        }
		return false;
	}
	
	if(filePath!=null && filePath!="") {		
		idx =  parseInt(selId.substring(selId.lastIndexOf("_")+1));
		fileExt = filePath.substring(filePath.lastIndexOf(".")+1);
		if(selObj.files!=undefined && selObj.files!=null) {
			fileSize = selObj.files[0].size;
		} else {
			fileSize = selObj.size;
		}
		if(!(fileExt=="jpg" || fileExt=="gif")) {
			alert("이미지파일(gif, jpg)만 등록가능합니다.");
			if (/MSIE/.test(navigator.userAgent)) {
                $(selObj).replaceWith($(selObj).clone(true));
            } else {
                $(selObj).val('');
            }
			return false;
		}
		fileSize = Math.round(fileSize/1024);
		if(fileSize > 500) {
			alert("파일크기 500K 이상은 업로드하실수 없습니다.");
			if (/MSIE/.test(navigator.userAgent)) {
                $(selObj).replaceWith($(selObj).clone(true));
            } else {
                $(selObj).val('');
            }
			return false;
		}
		
		//수정일 경우는 바로 처리한다.
		if(atchType=="req" && fileSeq!=null && fileSeq!="") {
			var fileElementIds = [];
			
			if($.trim($(selObj).val())!="") {
				fileElementIds.push(selObj.id);
			}
	
			var _atchFileInfo = {
					mgmt_seq : scrbReqPrstDtl.appl_form_seq
					,mgmt_user : scrbReqPrstDtl.user_id
					,mgmt_org : scrbReqPrstDtl.org_id
					,comm_auth_cl : scrbReqPrstDtl.comm_auth_cl
					,seq :  fileSeq
					,file_typ : fileTyp
					,enc_yn : encYn
			};
	
			if(fileElementIds.length>0) {
				if(confirm("선택한 파일을 수정하시겠습니까?")) {
					loadingbar_show(); 
		    		tgAjaxUpload('/filemgmt/jsonFileUpt.do'
		    			, _atchFileInfo
		    			, fileElementIds
		    			,{
		    				success: function(data, status) {
			    				if(data!=null && data.result!=null) {
			    					if(parseInt(data.result) > 0) {
			    						$('#scrbDtlForm').submit();
			    					} else if(data.result == "-1"){
			    						alert("파일이 확장자가 강제로 변경 되었거나 암호화 되어 있어 파일 업로드 불가합니다.");
			    					}
			    					else {
			    						alert("파일업로드중에 에러가 발생하였습니다.")
			    					}
			    				} else {
			    					alert("알수없는 에러가 발생했습니다.\n관리자에게 문의하세요.");
			    				}
			    				loadingbar_hide();
			    			}
		    				,error:function(xhr,status,e) {
		    					alert("알수없는 에러가 발생했습니다.\n관리자에게 문의하세요.");
		    					loadingbar_hide();
		    				}
		    			}
		    		);
				}
	    	}
		}
		
	}
};

var addAtchFilePlus = function() {
	var nextNum = 5, selId, selNum;
	$('div[id^="addAtchFile_"]').each(function() {
		selId = this.id;
		selNum = parseInt(selId.substring(selId.lastIndexOf('_')+1));
		if($(this).css('display')=="none") {
			nextNum = selNum;
			return false;
		}	
	});
	//console.log('nextNum : ' + nextNum);
	if(nextNum >=5 ) {
		alert("부가파일 첨부는 5개까지 가능합니다.");
	} else {
		$('#addAtchFile_'+nextNum).css('display','block');
	}
};

var deleteAddAtchFile = function(idx, fileSeq, encYn) {
	if(confirm("선택하신 파일을 삭제하시겠습니까?")) {
		var _url = "/filemgmt/jsonFileDel.do";
		var _data = {seq:fileSeq};
		$.ajax({
			url: _url,
			data: _data,
			type: 'POST',
			dataType : "json",
			success : function(result, status) {
				if(result!=null && result.result!=null) { 
					if( result.result=="Y") {
						$('#addAtchFile_'+idx).css('display','none');
						$('#idAddFileShowBtn'+idx).css('display','none');
						$('#idAddFileDelBtn'+idx).css('display','none');
						$('#idAddFileName_'+idx).attr('onchange',"checkAtchFile(this,'','add','','"+encYn+"');");
						$('#idAddFileTxt_'+idx).val('');
					} 
				} else {
					alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
				}
			}
			,beforeSend : function( xhr, settings ) { 
				loadingbar_show(); 
			}
			,error : function(xhr, status) {
				alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
			}, 
			complete : function(xhr, status) {
				loadingbar_hide();
			}
		});
	}
};

var fnURLdiagokr = function() {
	window.open('http://dl.koroad.or.kr','','');
};

var idWireStClChange = function() {
	var selVal = $('select[name="idWireStCl"] option:selected').val();
	if(scrbReqPrstDtl.wire_st_cl == "01" || scrbReqPrstDtl.wire_st_cl == "10")	//신청완료/유키삭제
	{
		if(selVal != "02")	//신청취소
		{
			// [변경] 이정호M / 김용일 / CHG610000095175 / Tgate 어드민 유선 진행상태 현행화 및 SOP대응 개선 / 20191121
			$('select[name="idWireStCl"]').val(scrbReqPrstDtl.wire_st_cl);
			alert("신청완료,유키삭제는 신청 취소만 가능합니다");
		}
	}
}

//유선신청결과
var wireSvcRsltOpen = function() {
	var url = "/common/cmnAdminPopup.do?vw=scrb_wire_req_result&appl_form_seq="+scrbReqPrstDtl.appl_form_seq;
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
//사유보기
var fnWireAprvRsltLog = function() {
	var _url = "/scrbmgmt/wireAprvRsltLog.do";
	var data = {appl_form_seq : scrbReqPrstDtl.appl_form_seq};
	$.ajax({
		url: _url,
		data: data,
		type: 'POST',
		dataType : "json",
		success : function(result, status) {
			if(result!=null) {
				alert(result.message);
			} else {
				alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
			}
		}
		,beforeSend : function( xhr, settings ) { 
			loadingbar_show(); 
		}
		,error : function(xhr, status) {
			alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
		}, 
		complete : function(xhr, status) {
			loadingbar_hide();
		}
	});
};

//배송 추적 
var fnExtDelivery = function(flag) {
	if(flag==1) {
		var win = window.open('http://biz.epost.go.kr','','');
		win.focus();
	} else {
		fnCallHomeDelivery(scrbReqPrstDtl.ivic_num);
	}
};

//운송자 출력
var fnExtWayBill = function(type) {
	ivic_num = (scrbReqPrstDtl.ivic_num==null||scrbReqPrstDtl.ivic_num=="null")?"":scrbReqPrstDtl.ivic_num;
	if(type!=3) {
		fnCallWayBill(scrbReqPrstDtl.appl_form_seq, ivic_num, type);
	} else {
		if(ivic_num==null || ivic_num=="" || ivic_num=="null") {
			var _url = "/epost/sendEPostDlvInfo.do";
			var data = {
					appl_form_seq : scrbReqPrstDtl.appl_form_seq	
			}
			$.ajax({
				url: _url,
				data: data,
				type: 'POST',
				dataType : "json",
				success : function(result, status) {
					if(result!=null) {
						alert(result.msg);
					} else {
						alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
					}
				}
				,beforeSend : function( xhr, settings ) { 
					loadingbar_show(); 
				}
				,error : function(xhr, status) {
					alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
				}, 
				complete : function(xhr, status) {
					loadingbar_hide();
				}
			});
		} else {
			var win = window.open('http://biz.epost.go.kr','','');
			win.focus();
		}
	}
}

//메일 발송
var fnSendEmailSKTDay = function(idx) {
	var msg = "개통완료 메일을 재발송 하시겠습니까?";
	var _url = "";
	var data = {
			appl_form_seq : scrbReqPrstDtl.appl_form_seq	
	}
	if(idx==1) {
		msg = "무선" + msg;
		_url = "/email/sendEmailSKTDay.do";
	} else if(idx==2) {
		msg = "유선" + msg;
		_url = "/email/sendEmailSKBDay.do";
	}
	if(confirm(msg)) {
		
		$.ajax({
			url: _url,
			data: data,
			type: 'POST',
			dataType : "json",
			success : function(result, status) {
				if(result!=null) {
					alert(result.msg);
					fnGetMailInfo();
				} else {
					alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
				}
			}
			,beforeSend : function( xhr, settings ) { 
				loadingbar_show(); 
			}
			,error : function(xhr, status) {
				alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
			}, 
			complete : function(xhr, status) {
				loadingbar_hide();
			}
		});
	}
}
/**
 * 무선 타사미납 송신/조회 
 * @param value:String	1:조회 2:송신
 */
var CreditCheckUnpaidUkeyWless = function(idx) {
	var _url = "";
    var data = {ctz_corp_num:"",biz_num:"",ctz_corp_cd:"",if_cl_cd:"",scrb_auth_cl:"", comm_buyr_nm:"", comm_auth_cl:"",appl_form_scrb_typ:"",user_id:"", org_id:"", court_agnt_nm:"", court_agnt_rest_num:""};
	var strAuthCl = '01';
	var strClCd = 'Q1';
	
	
	if(idx==1) {
		_url = "/credit/creditCheckUnpaidUkey.do";
	} else if(idx==2){
		_url = "/credit/creditCheckUnpaidRequest.do";
	}
	
	// 실명인증 구분
	if(scrbReqPrstDtl.comm_auth_cl == '01' || scrbReqPrstDtl.comm_auth_cl == '04')	// 개인, 미성년자
	{
		strAuthCl = '01';
		data.ctz_corp_num = scrbReqPrstDtl.comm_buyr_rest_num;
				
		/** 2016.09.21 이종길*/
		data.comm_auth_cl = scrbReqPrstDtl.comm_auth_cl;
		data.scrb_auth_cl = scrbReqPrstDtl.scrb_auth_cl;
		data.comm_buyr_nm = scrbReqPrstDtl.comm_buyr_nm;
		data.appl_form_scrb_typ = scrbReqPrstDtl.appl_form_scrb_typ;
		data.user_id = scrbReqPrstDtl.user_id;
		data.org_id = scrbReqPrstDtl.org_id;
		data.court_agnt_nm = scrbReqPrstDtl.court_agnt_nm; 
		data.court_agnt_rest_num = scrbReqPrstDtl.court_agnt_rest_num;
		/** 2016.09.21 이종길*/
		
	}
	else if(scrbReqPrstDtl.comm_auth_cl == '02')	// 법인
	{
		strAuthCl = '02';
		data.ctz_corp_num = scrbReqPrstDtl.comm_buyr_rest_num;
		data.biz_num = scrbReqPrstDtl.comm_bizr_num;
	}
	else if(scrbReqPrstDtl.comm_auth_cl == '05' || scrbReqPrstDtl.comm_auth_cl == '06')	// 외국인 
	{
		strAuthCl = '05'
	}
	
	data.ctz_corp_cd = strAuthCl;
	
	if(scrbReqPrstDtl.prod_cl == '04')
		strClCd = 'Q3';

	data.if_cl_cd = strClCd;
	
	if(_url!="") {
		$.ajax({
			url: _url,
			data: data,
			type: 'POST',
			dataType : "json",
			success : function(result, status) {
				if(result!=null) {
					alert(result.msg);
				} else {
					alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
				}
			}
			,beforeSend : function( xhr, settings ) { 
				loadingbar_show(); 
			}
			,error : function(xhr, status) {
				alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
			}, 
			complete : function(xhr, status) {
				loadingbar_hide();
			}
		});
	}
};

/**
 * 유선 타사미납 송신/조회
 * @param value:String	1:조회 2:송신
 */
var CreditCheckUnpaidUkeyWire = function(idx) {
	var _url="";
	var data = {input_typ:"",ctz_biz_num:"",biz_num:"",temp:"",comm_auth_cl:"",scrb_auth_cl:"",comm_buyr_nm:"",appl_form_scrb_typ:"",user_id:"",org_id:"",court_agnt_nm:"",court_agnt_rest_num:"",svc_num:""};
	var input_typ = "";		//구분(01:주민 02:법인 03:사업 05:외국)
	var ctz_biz_num = "";	//식별번호(주민/법입/사업)
	var biz_num = "";		//사업자번호(ctz_corp_cd 가 02 법인인경우)
	
	if(scrbReqPrstDtl.comm_auth_cl == '01' || scrbReqPrstDtl.comm_auth_cl == '04')	// 개인, 미성년자
	{
		data.input_typ = '01';
		data.ctz_biz_num = scrbReqPrstDtl.comm_buyr_rest_num;
		
		/** 2016.09.21 이종길*/
		data.comm_auth_cl = scrbReqPrstDtl.comm_auth_cl;
		data.scrb_auth_cl = scrbReqPrstDtl.scrb_auth_cl;
		data.comm_buyr_nm = scrbReqPrstDtl.comm_buyr_nm;
		data.appl_form_scrb_typ = scrbReqPrstDtl.appl_form_scrb_typ;
		data.user_id = scrbReqPrstDtl.user_id;
		data.org_id = scrbReqPrstDtl.org_id;
		data.court_agnt_nm = scrbReqPrstDtl.court_agnt_nm; 
		data.court_agnt_rest_num = scrbReqPrstDtl.court_agnt_rest_num;
		/** 2016.09.21 이종길*/
	}
	else if(scrbReqPrstDtl.comm_auth_cl == '02')	// 법인
	{
		data.input_typ = '02'
		data.ctz_biz_num = scrbReqPrstDtl.comm_buyr_rest_num;
		data.biz_num = scrbReqPrstDtl.comm_bizr_num;
	}
	else if(scrbReqPrstDtl.comm_auth_cl == '05' || scrbReqPrstDtl.comm_auth_cl == '06')	// 외국인 
	{
		data.input_typ = '05'
	}
	data.svc_num = scrbReqPrstDtl.buyr_phon_area + "" + scrbReqPrstDtl.buyr_phon_exg + "" + scrbReqPrstDtl.buyr_phon_num;
	data.temp = Math.random();
	
	if(idx==1) {
		_url = "/credit/creditCheckWireUnpaidUkey.do";
	} else if(idx==2){
		_url = "/credit/creditCheckWireUnpaidRequest.do";
	}
	
	if(_url!="") {
		$.ajax({
			url: _url,
			data: data,
			type: 'POST',
			dataType : "json",
			success : function(result, status) {
				if(result!=null) {
					alert(result.msg);
				} else {
					alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
				}
			}
			,beforeSend : function( xhr, settings ) { 
				loadingbar_show(); 
			}
			,error : function(xhr, status) {
				alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
			}, 
			complete : function(xhr, status) {
				loadingbar_hide();
			}
		});
	}
};

/**
 * 보험적격 송신/조회
 * @param value:String	1:조회 2:송신
 */
var CreditCheckInsuUkey = function(idx) {
	var _url="";
	var data = {ctz_corp_num:"",biz_num:"",ctz_corp_cd:"",comm_auth_cl:"",appl_form_scrb_typ:"",comm_buyr_nm:"",svc_num:"", scrb_auth_cl:"",appl_form_scrb_typ:"",user_id:"",org_id:"",court_agnt_nm:"",court_agnt_rest_num:""};
	
	if(idx==1) {
		_url = "/credit/creditCheckInsuUkey.do";
	} else if(idx==2){
		_url = "/credit/creditCheckRequest.do";
	}
	
	var strAuthCl = '01';
	
	// 실명인증 구분
	if(scrbReqPrstDtl.comm_auth_cl == '01' || scrbReqPrstDtl.comm_auth_cl == '04')	// 개인, 미성년자
	{
		strAuthCl = '01';
		data.ctz_corp_num = scrbReqPrstDtl.comm_buyr_rest_num;
				
		/** 2016.09.21 이종길*/
		data.scrb_auth_cl = scrbReqPrstDtl.scrb_auth_cl;
		data.appl_form_scrb_typ = scrbReqPrstDtl.appl_form_scrb_typ;
		data.user_id = scrbReqPrstDtl.user_id;
		data.org_id = scrbReqPrstDtl.org_id;
		data.court_agnt_nm = scrbReqPrstDtl.court_agnt_nm; 
		data.court_agnt_rest_num = scrbReqPrstDtl.court_agnt_rest_num;
		/*
		console.log("data.ctz_copr_num : " + data.ctz_corp_num);
		console.log("data.comm_auth_cl : " + data.comm_auth_cl);
		console.log("data.scrb_auth_cl : " + data.scrb_auth_cl);
		console.log("data.comm_buyr_nm : " + data.comm_buyr_nm);
		console.log("data.appl_form_scrb_typ : " + data.appl_form_scrb_typ);
		console.log("data.user_id : " + data.user_id);
		console.log("data.org_id : " + data.org_id);	
		console.log("data.court_agnt_nm : " + data.court_agnt_nm);
		console.log("data.court_agnt_rest_num : " + data.court_agnt_rest_num);
		*/
		/** 2016.09.21 이종길*/
	}
	else if(scrbReqPrstDtl.comm_auth_cl == '02')	// 법인
	{
		strAuthCl = '02';
		data.ctz_corp_num = scrbReqPrstDtl.comm_buyr_rest_num;
		data.biz_num = scrbReqPrstDtl.comm_bizr_num;
	}
	else if(scrbReqPrstDtl.comm_auth_cl == '05' || scrbReqPrstDtl.comm_auth_cl == '06')	// 외국인
	{
		strAuthCl = '05'
	}

	data.ctz_corp_cd = strAuthCl;
	data.comm_auth_cl = scrbReqPrstDtl.comm_auth_cl;
	data.appl_form_scrb_typ = scrbReqPrstDtl.appl_form_scrb_typ;
	data.comm_buyr_nm = scrbReqPrstDtl.comm_buyr_nm;
	data.svc_num = scrbReqPrstDtl.buyr_phon_area + "" + scrbReqPrstDtl.buyr_phon_exg + "" + scrbReqPrstDtl.buyr_phon_num;
	
	if(_url!="") {
		$.ajax({
			url: _url,
			data: data,
			type: 'POST',
			dataType : "json",
			success : function(result, status) {
				if(result!=null) {
					alert(result.msg);
				} else {
					alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
				}
			}
			,beforeSend : function( xhr, settings ) { 
				loadingbar_show(); 
			}
			,error : function(xhr, status) {
				alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
			}, 
			complete : function(xhr, status) {
				loadingbar_hide();
			}
		});
	}
	
};

//[추가] 금이도M / 김용일 / CHG610000068514/ "T.Gate 신청서 예약번호 채번 기능 개발 요청" :  예약접수번호 등록 및 삭제버튼 기능 추가 / 20180726
/**
 * 예약접수번호 등록
 */
var rsvNumRgst = function() {
	
	var _url = "/scrbmgmt/getRsvNum.do";
	var data = {
			appl_form_seq : scrbDtlForm.appl_form_seq.value //신청서번호
			, org_id : scrbDtlForm.org_id.value	//조직ID
	}
	if(_url!="") {
		$.ajax({
			url: _url,
			data: data,
			type: 'POST',
			dataType : "json",
			success : function(result, status) {
				if(result!=null) {
					alert(result.msg);
					if(result.result=="Y") {
						tdir_rsv_sale_num.value=result.rsvNum;
						$("#createRsvNum").hide();
						$("#deleteRsvNum").show();
					}
				} else {
					alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
				}
			}
			,beforeSend : function( xhr, settings ) { 
				loadingbar_show(); 
			}
			,error : function(xhr, status) {
				alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
			}, 
			complete : function(xhr, status) {
				loadingbar_hide();
			}
		});
	}
	
};

/**
 * 예약접수번호 삭제
 */
var rsvNumCancel = function(appl_form_seq) {
	var _url = "/scrbmgmt/getRsvNumCancel.do";
	var data = {
			appl_form_seq : scrbDtlForm.appl_form_seq.value //신청서번호
			, org_id : scrbDtlForm.org_id.value	//조직ID
	}
	if(_url!="") {
		$.ajax({
			url: _url,
			data: data,
			type: 'POST',
			dataType : "json",
			success : function(result, status) {
				if(result!=null) {
					alert(result.msg);
					if(result.result=="Y") {
						tdir_rsv_sale_num.value="";
						$("#createRsvNum").show();
						$("#deleteRsvNum").hide();
					}
				} else {
					alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
				}
			}
			,beforeSend : function( xhr, settings ) { 
				loadingbar_show(); 
			}
			,error : function(xhr, status) {
				alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
			}, 
			complete : function(xhr, status) {
				loadingbar_hide();
			}
		});
	}
}

var gl_zip1, gl_zip2, gl_addr1, gl_addr2, gl_addr_tp;

var showZipPopup = function(zip1,zip2,addr1, addr2, addr_tp, gb) {
	var url = "/address/listSidoNew.do";
	var twm = "showZipPopupWin";
	gl_zip1 = zip1;
	gl_zip2 = zip2;
	gl_addr1 = addr1;
	gl_addr2 = addr2;
	gl_addr_tp = addr_tp;

	if("WIRE_PLC" == gb) {
		
		//상품코드를 설치장소 주소검색에 맞는 포맷으로 반환
		var prodcode = getProdInfo();
		var svccode = getSvcCode();
		//alert("prodcode : " + prodcode + ", svccode : " + svccode + ", wire : " + scrbReqPrstDtl.wire_prod + ", appl_form_seq : " + scrbReqPrstDtl.appl_form_seq);
		
		var param = "srchTyp=area&prodIds=" + prodcode + "&svcDtlCds=" + svccode + "&appl_form_seq=" + scrbReqPrstDtl.appl_form_seq + "&wire=" + scrbReqPrstDtl.wire_prod + "&view=admin";
		
		url = "/address/listSidoNew.do?" + param;
	}

	var centeredY,centeredX,width = 660,height = 730;
	if($.browser.msie) {
		centeredY = (window.screenTop - 120) + ((((document.documentElement.clientHeight + 120)/2) - (height/2)));
		centeredX = window.screenLeft + ((((document.body.offsetWidth + 20)/2) - (width/2)));
	} else {
		centeredY = window.screenY + (((window.outerHeight/2) - (height/2)));
		centeredX = window.screenX + (((window.outerWidth/2) - (width/2)));
	}
	window.open(url,twm, "width="+width+", height="+height+", left=" + centeredX +",top=" + centeredY+", toolbar=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no");
}

var setZip = function(zipData) {
	console.log(JSON.stringify(zipData));
	if(gl_addr_tp=="street") {
		$('input[type=text][name="'+gl_zip1+'"]').val(zipData.street.stZip.replace(/-/gi, '').substring(0,3));
		$('input[type=text][name="'+gl_zip2+'"]').val(zipData.street.stZip.replace(/-/gi, '').substring(3));
		$('input[type=text][name="'+gl_addr1+'"]').val(zipData.street.stAddrBase);
		$('input[type=text][name="'+gl_addr2+'"]').val(zipData.street.stAddrDetail);
	} else if(gl_addr_tp=='jibun'){
		$('input[type=text][name="'+gl_zip1+'"]').val(zipData.jibun.jibunZip.replace(/-/gi, '').substring(0,3));
		$('input[type=text][name="'+gl_zip2+'"]').val(zipData.jibun.jibunZip.replace(/-/gi, '').substring(3));
		$('input[type=text][name="'+gl_addr1+'"]').val(zipData.jibun.jibunAddrBase);
		$('input[type=text][name="'+gl_addr2+'"]').val(zipData.jibun.jibunAddrDetail);
	}
	
	$('input[type=text][name="'+gl_addr1+'"]').attr('mask',2);
	$('input[type=text][name="'+gl_addr2+'"]').attr('mask',2);
}

var checkBankCard = function(tp) {
	if(tp=="01") {
		$('#idautoTrnsfBank_01_dv').css('display','block');
		$('#idautoTrnsfBank_02_dv').css('display','none');
		$('#idautoTrnsfBank_03_dv').css('display','none');
	} else if(tp=="02") {
		$('#idautoTrnsfBank_01_dv').css('display','none');
		$('#idautoTrnsfBank_02_dv').css('display','block');
		$('#idautoTrnsfBank_03_dv').css('display','none');
	} else if(tp=="03") {
		$('#idautoTrnsfBank_01_dv').css('display','none');
		$('#idautoTrnsfBank_02_dv').css('display','none');
		$('#idautoTrnsfBank_03_dv').css('display','block');
	}
	wlesscheckbankcard = false;
};

var checkBankCardWire = function(tp) {
	if(tp=="01") {
		$('#idWirePayMthd_03_dv').css('display','');
		$('#idWirePayMthd_01_dv').css('display','block');
		$('#idWirePayMthd_02_dv').css('display','none');
	} else if(tp=="02") {
		$('#idWirePayMthd_03_dv').css('display','');
		$('#idWirePayMthd_01_dv').css('display','none');
		$('#idWirePayMthd_02_dv').css('display','block');
	} else {
		$('#idWirePayMthd_03_dv').css('display','none');
	}
	wirecheckbankcard = false;
};
var checkWireBillType = function(tp) {
	if(tp=="01") {
		$('#wireBillEmailDv_01').css('display','block');
		$('#wireBillEmailDv_02').css('display','none');
	} else if(tp=="02") {
		$('#wireBillEmailDv_01').css('display','none');
		$('#wireBillEmailDv_02').css('display','block');
	} else {
		$('#wireBillEmailDv_01').css('display','none');
		$('#wireBillEmailDv_02').css('display','none');
	}
};
/**
 * 은행 유효성 체크 : 1: 무선, 2:유선
 */
 /*[추가] 금이도M / 김성득 / CHG610000072257 / "T.Gate 계좌번호 유효성 체크 기능 개발" :  / 20180823 */
var bankNumCheck = function(tp) {
	var bankCdTp  = "idCommBankCd" ;
	var bankNumTp  = "idCommBankNum" ;
	
	var comm_auth_cl = "";
	var trnsf_nm_rest_num = 	"";
	var frgnr_birth_dt= "";

	comm_auth_cl = scrbReqPrstDtl.comm_auth_cl;
	frgnr_birth_dt= scrbReqPrstDtl.frgnr_birth_dt;
	
	if(tp==2) {
		bankCdTp  = "idWireBankCoCd" ;
		bankNumTp  = "idWireBankNum" ;
		wirecheckbankcard = false;
		trnsf_nm_rest_num = 	scrbReqPrstDtl.wire_trnsf_rest_num;

	} else if(tp==1){
		wlesscheckbankcard = false;
		trnsf_nm_rest_num = 	scrbReqPrstDtl.trnsf_nm_rest_num;
	}
	var bankCd = $('select[name="'+bankCdTp+'"] option:selected').val();
	//var bankNum = $('input[type=text][name="'+bankNumTp+'"]').val();
	var bankNum = $('input[type=text][name="'+bankNumTp+'"]').attr('mask') == '2' ? $('input[type=text][name="'+bankNumTp+'"]').val() : (tp==2 ? scrbReqPrstDtl.wire_comm_bank_num : scrbReqPrstDtl.comm_bank_num);
	//$(':text[name="idWireBankNum"]').attr('mask') == '2') { scrbReqPrstDtl.wire_comm_bank_num = $(':text[name="idWireBankNum"]').val(); //getWire_comm_bank_num, wire_comm_bank_num
	//$(':text[name="idCommBankNum"]').attr('mask') == '2') { scrbReqPrstDtl.comm_bank_num = $(':text[name="idCommBankNum"]').val(); }	//getComm_bank_num, comm_bank_num

	//alert(scrbReqPrstDtl.wire_trnsf_rest_num);
	
	if(comm_auth_cl  == '02' || comm_auth_cl =='03' ){
		if(trnsf_nm_rest_num.length > 9){
			rsdt_biz_no = trnsf_nm_rest_num;
		}else{
			rsdt_biz_no = trnsf_nm_rest_num.substring(0,6);	
		}
	}else if(comm_auth_cl  == '06' ){ //여권번호
		rsdt_biz_no = frgnr_birth_dt.substring(2,8);
	}else{
		rsdt_biz_no = trnsf_nm_rest_num.substring(0,6);	
	}
	
	if(bankCd==null || bankCd=="") {
		alert("은행명을 선택해주세요.");
		$('select[name="'+bankCdTp+'"]').focus();
		return false;
	}
	if(bankNum==null || bankNum=="") {
		alert("계좌번호를 입력해주세요.");
		$('input[type=text][name="'+bankNumTp+'"]').focus();
		return false;
	}
	
	var _url = "/bccheck/jsonCheckNewBankCardNum.do";
		
	var data = {
			pay_mthd_cd : "01" //은행
			,bank_card_co_cd : bankCd
			,bank_card_num : bankNum
			,rsdt_biz_no : rsdt_biz_no
	}
	if(_url!="") {
		$.ajax({
			url: _url,
			data: data,
			type: 'POST',
			dataType : "json",
			success : function(result, status) {
				if(result!=null) {
					alert(result.msg);
					if(result.result=="Y") {
						if(tp==1) {
							wlesscheckbankcard = true;
						} else if(tp==2) {
							wirecheckbankcard = true;
						}
					}
				} else {
					alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
				}
			}
			,beforeSend : function( xhr, settings ) { 
				loadingbar_show(); 
			}
			,error : function(xhr, status) {
				alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
			}, 
			complete : function(xhr, status) {
				loadingbar_hide();
			}
		});
	}
	
};

/*[추가] 금이도M / 김성득 / CHG610000072257 / "T.Gate 계좌번호 유효성 체크 기능 개발" :  / 20180823 */
var cardCheck = function(tp) {
	
	var cardCdTp = "idCommCardCd";
	var cardMthTp = "idCommCardEffPrdMth";
	var cardYrTp = "idCommCardEffPrdYr";
	var cardNumTp = "idCommCardNum";
	
	var comm_auth_cl = scrbReqPrstDtl.comm_auth_cl;
	var frgnr_birth_dt= scrbReqPrstDtl.frgnr_birth_dt;
	var trnsf_nm_rest_num = 	"";
	
	if(tp==2) {
		cardCdTp = "idWireCardCoCd";
		cardMthTp = "idWireCardEffPrdMth";
		cardYrTp = "idWireCardEffPrdYr";
		cardNumTp = "idWireCardNum";
		wirecheckbankcard = false;
		trnsf_nm_rest_num = 	scrbReqPrstDtl.wire_trnsf_rest_num;
	} else if(tp==1) {
		wlesscheckbankcard = false;
		trnsf_nm_rest_num = 	scrbReqPrstDtl.trnsf_nm_rest_num;
	}
	var cardCd = $('select[name="'+cardCdTp+'"] option:selected').val();
	var cardMth = $('select[name="'+cardMthTp+'"] option:selected').val();
	var cardYr = $('select[name="'+cardYrTp+'"] option:selected').val();
	//var cardNum = $('input[type=text][name="'+cardNumTp+'"]').val();
	var cardNum = $('input[type=text][name="'+cardNumTp+'"]').attr('mask') == '2' ? $('input[type=text][name="'+cardNumTp+'"]').val() : scrbReqPrstDtl.comm_bank_num;
	//scrbReqPrstDtl.getComm_bank_num()
	//scrbReqPrstDtl.getComm_bank_num()
	//$(':text[name="idCommCardNum"]').attr('mask') == '2') { scrbReqPrstDtl.comm_bank_num = $(':text[name="idCommCardNum"]').val(); 
	//$(':text[name="idWireCardNum"]').attr('mask') == '2') { scrbReqPrstDtl.wire_comm_bank_num = $(':text[name="idWireCardNum"]').val();

	var rsdt_biz_no = "";
	
	if(comm_auth_cl  == '02' || comm_auth_cl =='03' ){
		if(trnsf_nm_rest_num.length > 9){
			rsdt_biz_no = trnsf_nm_rest_num;
		}else{
			rsdt_biz_no = trnsf_nm_rest_num.substring(0,6);	
		}
	}else if(comm_auth_cl  == '06' ){ //여권번호
		rsdt_biz_no = frgnr_birth_dt.substring(2,8);
	}else{
		rsdt_biz_no = trnsf_nm_rest_num.substring(0,6);	
	}
	
	if(cardCd==null || cardCd=="") {
		alert("카드사를 선택해주세요.");
		$('select[name="'+cardCdTp+'"]').focus();
		return false;
	}
	if(cardNum==null || cardNum=="") {
		alert("카드번호를 입력해주세요");
		$('input[type=text][name="'+cardNumTp+'"]').focus();
		return false;
	}
	if(cardMth==null || cardMth=="") {
		alert("카드유효기간 월을 입력해주세요");
		$('select[name="'+cardMthTp+'"]').focus();
		return false;
	}
	if(cardYr==null || cardYr=="") {
		alert("카드유효기간 년을 입력해주세요");
		$('select[name="'+cardYrTp+'"]').focus();
		return false;
	}
	var _url = "/bccheck/jsonCheckNewBankCardNum.do";
	var data = {
			pay_mthd_cd : "02" 
			,bank_card_co_cd : cardCd
			,bank_card_num : cardNum
			,eff_ym : cardYr+cardMth
			,rsdt_biz_no : rsdt_biz_no
	}
	if(_url!="") {
		$.ajax({
			url: _url,
			data: data,
			type: 'POST',
			dataType : "json",
			success : function(result, status) {
				if(result!=null) {
					alert(result.msg);
					console.log("\n"  +"result.msg : " + result.msg +"\n" );
					if(result.result=="Y") {
						if(tp==1) {
							wlesscheckbankcard = true;
						} else if(tp==2) {
							wirecheckbankcard = true;
						}
					}
				} else {
					alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
				}
			}
			,beforeSend : function( xhr, settings ) { 
				loadingbar_show(); 
			}
			,error : function(xhr, status) {
				alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
			}, 
			complete : function(xhr, status) {
				loadingbar_hide();
			}
		});
	}
};

//무선/유선 메모 등록(memo_cl -> 1:무선,2:유선)
var fnMemoBtnIns = function(memo_cl) {
	var jqGridNm = "jqTableWless";
	var memoObj = $('textarea[name="idWlessMemo"]');
	var emailTransObj = $('input[type=checkbox][name="idWlessEmailTrms"]');
	if(memo_cl=="2") {
		jqGridNm = "jqTableWire";
		memoObj = $('textarea[name="idWireMemo"]');
		emailTransObj = $('input[type=checkbox][name="idWireEmailTrms"]');
	}
	//console.log(jqGridNm + "," + memoObj.id + ":" + emailTransObj.id);
	var memoTxt = memoObj.val();
	var emailTransYn = emailTransObj.is(":checked");
	
	if(memoTxt==null || memoTxt=="") {
		alert("내용을 작성하세요.");
		memoObj.focus();
		return false;
	}
	if(memoTxt.length > 1000) {
		alert("메모는 1000자까지 입력가능합니다.");
		memoObj.focus();
		return false;
	}
	
	if(confirm("메모 내용을 등록 하시겠습니까?")) {
		var _url = "/scrbmgmt/scrbReqPrstDtlMemoIns.do";
		var data = {
				appl_form_seq : scrbReqPrstDtl.appl_form_seq 
				,memo_cl : memo_cl
				,org_id : scrbReqPrstDtl.org_id 
				,user_id : scrbReqPrstDtl.user_id
				,memo : memoTxt
				,email_trms_yn : emailTransYn?"Y":"N"
				,cre_nm : cur_user_id
		}
		//console.log(JSON.stringify(data));
		$.ajax({
			url: _url,
			data: data,
			type: 'POST',
			dataType : "json",
			success : function(result, status) {
				if(result!=null && result.result=="Y" && result.memoLst!=null) {
					memoObj.val("");
					emailTransObj.attr("checked",false);
					$('#'+jqGridNm).jqGrid("setGridParam",
							{
								postData : {
									appl_form_seq : scrbReqPrstDtl.appl_form_seq
									,org_id : scrbReqPrstDtl.org_id
									,prod_cl : scrbReqPrstDtl.prod_cl
									,memo_cl : memo_cl
									,user_id :scrbReqPrstDtl.user_id
								}
					}).trigger("reloadGrid");
				} else {
					alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
				}
			}
			,beforeSend : function( xhr, settings ) { 
				loadingbar_show(); 
			}
			,error : function(xhr, status) {
				alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
			}, 
			complete : function(xhr, status) {
				loadingbar_hide();
			}
		});
	}
};
//무선 메모 삭제
var fnMemoDel = function(memo_cl, memo_seq) {
	var jqGridNm = "jqTableWless";
	var memoObj = $('textarea[name="idWlessMemo"]');
	var emailTransObj = $('input[type=checkbox][name="idWlessEmailTrms"]');
	if(memo_cl=="2") {
		jqGridNm = "jqTableWire";
		memoObj = $('textarea[name="idWireMemo"]');
		emailTransObj = $('input[type=checkbox][name="idWireEmailTrms"]');
	}
	
	if(confirm("메모 내용을 삭제 하시겠습니까?")) {
		var _url = "/scrbmgmt/scrbReqPrstDtlMemoDel.do";
		var data = {
				appl_form_seq : scrbReqPrstDtl.appl_form_seq 
				,memo_seq : memo_seq
				,memo_cl : memo_cl
				,org_id : scrbReqPrstDtl.org_id 
				,user_id : scrbReqPrstDtl.user_id
				,del_yn : "Y"
				,upd_nm : cur_user_id
		}
		//console.log(JSON.stringify(data));
		$.ajax({
			url: _url,
			data: data,
			type: 'POST',
			dataType : "json",
			success : function(result, status) {
				if(result!=null && result.result=="Y" && result.memoLst!=null) {
					$('#'+jqGridNm).jqGrid("setGridParam",
							{
								postData : {
									appl_form_seq : scrbReqPrstDtl.appl_form_seq
									,org_id : scrbReqPrstDtl.org_id
									,prod_cl : scrbReqPrstDtl.prod_cl
									,memo_cl : memo_cl
									,user_id :scrbReqPrstDtl.user_id
								}
					}).trigger("reloadGrid");
				} else {
					alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
				}
			}
			,beforeSend : function( xhr, settings ) { 
				loadingbar_show(); 
			}
			,error : function(xhr, status) {
				alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
			}, 
			complete : function(xhr, status) {
				loadingbar_hide();
			}
		});
	}
};

var updateMemoEmail = function(memo_cl, memo_seq, obj) {
	var jqGridNm = "jqTableWless";
	var memoObj = $('textarea[name="idWlessMemo"]');
	var emailTransObj = $('input[type=checkbox][name="idWlessEmailTrms"]');
	if(memo_cl=="2") {
		jqGridNm = "jqTableWire";
		memoObj = $('textarea[name="idWireMemo"]');
		emailTransObj = $('input[type=checkbox][name="idWireEmailTrms"]');
	}
	if(confirm("메모내용의 e-mail 전송설정을 변경 하시겠습니까?")) {
		var _url = "/scrbmgmt/scrbReqPrstDtlMemoDel.do";
		var data = {
				appl_form_seq : scrbReqPrstDtl.appl_form_seq 
				,memo_seq : memo_seq
				,memo_cl : memo_cl
				,org_id : scrbReqPrstDtl.org_id 
				,user_id : scrbReqPrstDtl.user_id
				,email_trms_yn : obj.checked?"Y":"N"
				,upd_nm : "["+cur_login_id+"]"+cur_user_nm
		}
		//console.log(JSON.stringify(data));
		$.ajax({
			url: _url,
			data: data,
			type: 'POST',
			dataType : "json",
			success : function(result, status) {
				if(result!=null && result.result=="Y" && result.memoLst!=null) {
					$('#'+jqGridNm).jqGrid("setGridParam",
							{
								postData : {
									appl_form_seq : scrbReqPrstDtl.appl_form_seq
									,org_id : scrbReqPrstDtl.org_id
									,prod_cl : scrbReqPrstDtl.prod_cl
									,memo_cl : memo_cl
									,user_id :scrbReqPrstDtl.user_id
								}
					}).trigger("reloadGrid");
				} else {
					alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
				}
			}
			,beforeSend : function( xhr, settings ) { 
				loadingbar_show(); 
			}
			,error : function(xhr, status) {
				alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
			}, 
			complete : function(xhr, status) {
				loadingbar_hide();
			}
		});
	} else {//원복
		obj.checked = obj.checked?false:true;
	}
};

var searchGiftItem = function(corp, tgiftitemenable, tgiftitemDtlenable) {
	var	w = 670;    
	var	h = 500;    
  	var TopPosition	 = (screen.height-h)/2;
	var LeftPosition = (screen.width-w)/2;
	var param = "co_cl_cd=T&giftPlcyMgmtNum=" + tgiftitemenable;
		param += "&giftPlcyMgmtNumList=" + tgiftitemDtlenable;
	
	var url 	 = "/freegift/popFreeGiftItems.do?" + param;
	var features = "width="+w+",height="+h+",top="+TopPosition+",left="+LeftPosition+", scrollbars=yes"+",resizable=1";
	
	popFreeGiftItemsT_preview = window.open(url , "popFreeGiftItemsT_preview" , features);
	
}

var setFreeGiftItems = function(co_cl_cd, giftMgmtNum, giftNm) {
	if(co_cl_cd=="T") {
		$('input[type=hidden][name="skTheadGiftitemti_cd"]').val(giftMgmtNum);
		$('input[type=text][name="skTheadGiftitemti"]').val(giftNm);
	} else {
		$('input[type=hidden][name="skTheadGiftitemti_cd"]').val(giftMgmtNum);
		$('input[type=text][name="skBheadGiftitemti"]').val(giftNm);
	}
}

//무선 Ukey 전송 버튼
var fnUkeySendWless = function() {
	var send = true;
	var sendmsg ="";
	
	
	//[추가] 문호석M / 김성득 / CHG610000079356/ "Tgate 2G Fadeout 대응 개선 : " :  / 20190214
	if(scrbReqPrstDtl.eqp_2g3g_cl == "0"){
		alert("2G 서비스 종료에 따라 2G 단말기는 신청하실 수 없습니다.");
		return;	
	}
	
	
	if(scrbReqPrstDtl.sale_chnl == "95")
	{
		alert("M-Tgate 는 여기서 전송하실수 없습니다.");
		return;
	}
	
	//PPS 의 경우, PPS카드 번호 여부 확인.
	if(scrbReqPrstDtl.pps_yn == 'Y'){
		if( $('input[type=text][name="idPps_num"]').val() == ""){
			alert("PPS 카드 번호가 없습니다. 카드 번호 입력 및 저장 후, Ukey 전송 하시기 바랍니다.");
			return;
		}
	}	
	
	//단통법으로 인해, 상품구조가 변경 되므로, 9월 신청서 인 경우, 개통이 어렵다는 안내 문구 삽입
	if(scrbReqPrstDtl.cre_dt < "2014-10-01"){
		alert("이동통신 단말기 유통구조 개선법(단통법)으로 인하여, \n상품 구조 변경으로 10/1 이전 신청서의 U.key 전송이 불가합니다.");
	}
	
	// 무선 신규, 번호이동
	//[변경] 이정호M / 이종길 / CHG610000089119 / 동일명의통합청구 기능개선 : 동일명의 통합청구일때 validatiaon 제외처리  / 20190725
	if( (scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_NEW || CONST_MNP_YN )
		&&(!scrbReqPrstDtl.pps_yn =='Y') && scrbReqPrstDtl.integ_inv_yn != 'Y' )
	{
		if( $(':radio[name="idautoTrnsfBank"]:checked').val()=="")	// 자동이체 신청정보 
		{
			sendmsg += "자동이체 은행 카드 선택이 없습니다.\n"; 
			send = false;
		}
		
		if( $.trim($('input[type=text][name="idCommBankNum"]').val()) == "")	// 은행 or 카드 번호
		{
			sendmsg += "은행 혹은 카드 번호가 없습니다.\n"; 
			send = false;
		}
		
		
		if( $(':radio[name="idautoTrnsfBank"]:checked').val() == "02" )	// 카드일경우 
		{
			
			if( $('select[name="idCommCardEffPrdMth"] option:selected').val() == "" )	// 카드 유효기간 월
			{
				sendmsg += "카드 유효기간 월이 없습니다.\n"; 
				send = false;
			}
			
			if( $('select[name="idCommCardEffPrdYr"] option:selected').val() == "" )	// 카드 유효기간 년 
			{
				sendmsg += "카드 유효기간 년도가 없습니다.\n"; 
				send = false;
			}
		}
	}
	
	// 추가 번호이동
	if( CONST_MNP_YN ) 
	{
		
		// 번호이동 전화번호
		//scrbReqPrstDtl.mov_num_chg_idnt;
		//scrbReqPrstDtl.mov_num_chg_exg;
		//scrbReqPrstDtl.mov_num_chg_num;
		
		if( $('select[name="idMovBfBizr"] option:selected').val() == "" )	// 변경전 통신회사 03, 04 
		{
			sendmsg += "변경전 통신회사를 선택해주세요.\n"; 
			send = false;
		}
		
		if( $(':radio[name="idMovAuthClCd"]:checked').val() == "" )	// 번호이동신청정보 코드 
		{
			sendmsg += "번호이동 신청정보 를 선택해주세요.\n"; 
			send = false;
		}
		
		if( $.trim($('input[type=text][name="idMovAuthCtt"]').val()) == "" )	// 번호이동신청정보 4자리 
		{
			sendmsg += "번호이동 신청정보 4자리를 입력해주세요.\n"; 
			send = false;
		}
		
		//번호이동시 연락받을 전화번호와 이동전화번호가 같을 경우 UKEY 전송안되도록 처리
		var buyrWireNumExg = $(':text[name="idBuyrWireNumExg"]').attr('mask') == '2' ? $(':text[name="idBuyrWireNumExg"]').val() : scrbReqPrstDtl.buyr_wire_num_exg;
		var buyrWireNumNum = $(':text[name="idBuyrWireNumNum"]').attr('mask') == '2' ? $(':text[name="idBuyrWireNumNum"]').val() : scrbReqPrstDtl.buyr_wire_num_num;
		var encCntcNum = $('select[name="idBuyrWireNumArea"] option:selected').val() + buyrWireNumExg + buyrWireNumNum;
		
		var buyrPhonExg = $(':text[name="idBuyrPhonExg"]').attr('mask') == '2' ? $(':text[name="idBuyrPhonExg"]').val() : scrbReqPrstDtl.buyr_phon_exg;
		var buyrPhonNum = $(':text[name="idBuyrPhonNum"]').attr('mask') == '2' ? $(':text[name="idBuyrPhonNum"]').val() : scrbReqPrstDtl.buyr_phon_num;
		var mblPhonNum = $('select[name="idBuyrPhonArea"] option:selected').val()    + buyrPhonExg + buyrPhonNum;
		
		if(encCntcNum==mblPhonNum) {
			sendmsg += "번호이동시 연락받을 전화번호와 이동전화번호가 같을 수 없습니다.\n"; 
			send = false;
		}
	}
	
	// 무선 기변
	if( scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_CHGGNRL ||
		scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_CHGCMP ) 
	{
			
		//console.log("scrbReqPrstDtl.sale_chnl :" + scrbReqPrstDtl.sale_chnl);
		//console.log("scrbReqPrstDtl.meet_st_cd :" + scrbReqPrstDtl.meet_st_cd);
		
		if(scrbReqPrstDtl.sale_chnl != '97')
		{
			if( $('input[type=text][name="idEqpSerNum"]').val() == "" )	// 휴대폰일련번호 
			{
				sendmsg += "휴대폰 일련번호가 없습니다.\n"; 
				send = false;
			}
		}
	}
	
	//공통 휴대폰 인증일경우, 번호이동시 휴대폰인증의 상세내역이 없어짐. 
	/*
	if( scrbReqPrstDtl.scrb_auth_cl == '02' && (scrbReqPrstDtl.data_agree != "Y" || scrbReqPrstDtl.data_agree == null) && 
		(scrbReqPrstDtl.wire_mbl_phon_auth_chkr == null || scrbReqPrstDtl.wire_mbl_phon_auth_chkr == "") ) 
	{
		sendmsg += "휴대폰 인증일 경우 대리점 확인,확인자가 필요 합니다.\n";
		send = false;
	}
	*/
	//UKey 개통번호와 연락가능번호가 동일할 경우 접수 불가능하도록 처리
	//if() {
	//	sendmsg += "개통번호와 연락\n";
	//	send = false;
	//}
	
	sendmsg += "\n확인 하시고  저장후 다시 전송 하세요.";
	
	if(send) {
		if(confirm("저장 하지 않은 내용은 삭제 됩니다. 전송하시겠습니까?")) {
			var _url = "/ukey/ukeySubmit.do";
			var _data = {
					appl_form_seq : scrbReqPrstDtl.appl_form_seq,
					org_id		 : scrbReqPrstDtl.org_id,
					user_id		 : scrbReqPrstDtl.user_id	
			}
			$.ajax({
				url: _url,
				data: _data,
				type: 'POST',
				dataType : "json",
				success : function(result, status) {
					if(result!=null) {
						//console.log(JSON.stringify(result));
						alert(result.msg);
						//alert("U.Scan 이미지 확인은 업무 상황에 따라 10분 이상 소요될 수 있습니다.");
						if(result.result=="Y") {
							opener.reloadScrbList();
							$('#scrbDtlForm').submit();
						}
					} else {
						alert("SWING 전송이 실패하였습니다.");
						
					}
				}
				,beforeSend : function( xhr, settings ) { 
					loadingbar_show(); 
				}
				,error : function(xhr, status) {
					alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
				}, 
				complete : function(xhr, status) {
					loadingbar_hide();
				}
			});
		}
	} else {
		alert(sendmsg);
	}
	
};


//유선 Ukey 전송 버튼
var fnUkeySendWire = function() {
	var send = true;
	var sendmsg ="";
	
	//유선 실명확인
	if(scrbReqPrstDtl.prod_cl == CONST_PRODCL_WIRE && scrbReqPrstDtl.comm_auth_cl == "01" &&  scrbReqPrstDtl.comm_buyr_rest_num.length != 13){
		sendmsg += "실명 인증이 완료되지 않았습니다.\n"; 
		send = false;
	}
	// 유선상품명
	if( scrbReqPrstDtl.wire_prod == null ) {
		sendmsg += "유선상품명이 없습니다.\n"; 
		send = false;
	}
	
	if( $(':radio[name="idWireBillTyp"]:checked').val() == "" ) {
		sendmsg += "청구서 수령방법이 없습니다.\n"; 
		send = false;
	}
	
	// 유선 납부방법
	if( $(':radio[name="idWirePayMthd"]:checked').val() == "" ) {
		sendmsg += "납부방법 정보가 없습니다.\n";
		send = false;
	}
	
	// 자동이체 신청정보 wire_bank_card_num
	//if( scrbReqPrstDtl.wire_pay_mthd == null) {
	//	sendmsg += "은행/카드사 선택이 없습니다.\n"; 
	//	send = false;
	//}
	
	if ( $(':radio[name="idWirePayMthd"]:checked').val() != null && $(':radio[name="idWirePayMthd"]:checked').val() != "03" ) {

		// 은행 or 카드 번호
		if( $.trim($('input[type=text][name="idWireBankNum"]').val()) == "" && $('input[type=text][name="idWireCardNum"]').val() == null  )
		{
			sendmsg += "은행 혹은 카드 번호가 없습니다.\n"; 
			send = false;
		}
		
		// 카드일경우
		if( $(':radio[name="idWirePayMthd"]:checked').val() == "02" )
		{
			// 카드 유효기간 월
			if( $('select[name="idWireCardEffPrdMth"] option:selected').val() == "")
			{
				sendmsg += "카드 유효기간 월이 없습니다.\n"; 
				send = false;
			}
			
			// 카드 유효기간 년
			if( $('select[name="idWireCardEffPrdYr"] option:selected').val() == "") 
			{
				sendmsg += "카드 유효기간 년도가 없습니다.\n"; 
				send = false;
			}
		}
	}
	
	//공통 휴대폰 인증일경우
	/*
	if( scrbReqPrstDtl.scrb_auth_cl == '02' && (scrbReqPrstDtl.data_agree != "Y" || scrbReqPrstDtl.data_agree == null) && 
		(scrbReqPrstDtl.wire_mbl_phon_auth_chkr == null || scrbReqPrstDtl.wire_mbl_phon_auth_chkr == "") ) 
	{
		sendmsg += "휴대폰 인증일 경우 대리점 확인,확인자가 필요 합니다.\n";
		send = false;
	}
	*/
	sendmsg += "\n확인 하시고  저장후 다시 전송 하세요.";
	
	if(send) {
		if(confirm("저장 하지 않은 내용은 삭제 됩니다. 전송하시겠습니까?")) {
			
			$('#swgSendBtn').hide();
			$('#swgSendBtnDown').hide();
			var _url = "/ukeywire/ukeyWireSubmit.do";
			var _data = {
					appl_form_seq : scrbReqPrstDtl.appl_form_seq,
					org_id		 : scrbReqPrstDtl.org_id,
					user_id		 : scrbReqPrstDtl.user_id	
			}
			$.ajax({
				url: _url,
				data: _data,
				type: 'POST',
				dataType : "json",
				success : function(result, status) {
					if(result!=null) {
						//console.log(JSON.stringify(result));
						if(result.msg.lastIndexOf("ZINVE8009")>-1){
							alert("해당 신청서에 비가용 서비스가 포함되어 있어 SWING 전송이 불가합니다.\n  - 스피드/디지털전화 가용인 경우에는 '유선신청서'에서 변경 \n     (광랜→스피드 변경시에는 고객안내 필수)\n  - 비가용 서비스인 경우에는 신청서 재작성 필요 (본 신청서 취소처리)");
						} else {
							alert(result.msg);
							//alert("U.Scan 이미지 확인은 업무 상황에 따라 10분 이상 소요될 수 있습니다.");
						}
						if(result.result=="Y") {
							opener.reloadScrbList();
							$('#scrbDtlForm').submit();
						}
					} else {
						$('#swgSendBtn').show();
						$('#swgSendBtnDown').show();
						alert("SWING 전송이 실패하였습니다.");
					}
				}
				,beforeSend : function( xhr, settings ) { 
					loadingbar_show(); 
				}
				,error : function(xhr, status) {
					alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
				}, 
				complete : function(xhr, status) {
					loadingbar_hide();
				}
			});
		}
	} else {
		alert(sendmsg);
	}
	
};

var dtlDel = function() {

	if(confirm("삭제 하시겠습니까?") && scrbReqPrstDtl!=undefined && scrbReqPrstDtl!=null) {
		var _url = "/scrbmgmt/scrbMgmtLstDel.do";
		var _data = {
				appl_form_seq : scrbReqPrstDtl.appl_form_seq,
				org_id		 : scrbReqPrstDtl.org_id,
				user_id		 : scrbReqPrstDtl.user_id,
				prod_cl		 : scrbReqPrstDtl.prod_cl,
				accp_seq	 : scrbReqPrstDtl.accp_seq
		}
		$.ajax({
			url: _url,
			data: _data,
			type: 'POST',
			dataType : "json",
			success : function(result, status) {
				if(result!=null && result.result!=null) {
					if(parseInt(result.result) > 0) {
						if(scrbReqPrstDtl.accp_seq != "" && scrbReqPrstDtl.event_id != "" && scrbReqPrstDtl.ts_val_no != "" && scrbReqPrstDtl.appl_form_st == "10"){
							if(result.err_cd != "100"){
								alert(result.err_msg);
							}else {
								alert("삭제되었습니다.");
							}
						}else{
							alert("삭제되었습니다.");
						}
						opener.reloadScrbList();
						window.close();
					} else {
						alert("삭제에 실패하였습니다.");
					}
				} else {
					alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
				}
			}
			,beforeSend : function( xhr, settings ) { 
				loadingbar_show(); 
			}
			,error : function(xhr, status) {
				alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
			}, 
			complete : function(xhr, status) {
				loadingbar_hide();
			}
		});
	}
};


var dtlSave = function() {
	if(confirm("저장 하시겠습니까?") && scrbReqPrstDtl!=undefined && scrbReqPrstDtl!=null) {
		// 무선
		if( scrbReqPrstDtl.prod_cl == CONST_PRODCL_WLESS )
		{
			if(currTabId=="basicTab") {
				/*
				if((cur_org_id == '1000039083' || cur_org_id == '1000165781' || cur_org_id == '1000165787')&& (scrbReqPrstDtl.tmp_appl_form_st != scrbReqPrstDtl.appl_form_st)){
					if(scrbReqPrstDtl.appl_form_st == "02" || scrbReqPrstDtl.appl_form_st == "03" || scrbReqPrstDtl.appl_form_st == "04" || scrbReqPrstDtl.appl_form_st == "06" || 
						scrbReqPrstDtl.appl_form_st == "07" || scrbReqPrstDtl.appl_form_st == "12" || scrbReqPrstDtl.appl_form_st == "22" || scrbReqPrstDtl.appl_form_st == "25"){
						if(cur_login_id.indexOf("SC")=="0"){
							alert("'" + $('select[name="idApplFormSt"] option:selected').text() + "' 상태 변경에 대한 권한이 없습니다.");
							return false;
						}
					}
				}
				*/
			
				basicScrbProc.dtlSave();
			}
			
			if(currTabId=="wlessTab") {
				if(CONST_MNP_YN == true) {
					if(CONST_MNP_CHK_YN == "Y") {
						alert("번호이동 휴대폰번호를 확인해주세요");
						$("#idMovNumChgExg").focus();
						return;
					}
				}
				
				if(scrbReqPrstDtl.pps_yn != "Y"){ // pps 유효성 체크 넘김
					if(!wlessScrbProc.checkDtlSave())
						return;
					//[변경] 이정호M / 이종길 / CHG610000089119 / 동일명의통합청구 기능개선 : 동일명의 통합청구일때 validatiaon 제외처리  / 20190725	
					if(scrbReqPrstDtl.integ_inv_yn != "Y") {	// 동일명의 통합청구가 아닐때만, 유효성 검사
						if (parent_service_num2 =="" || parent_service_num2 == null){
							if("03"!=$(':radio[name="idautoTrnsfBank"]:checked').val() &&!wlesscheckbankcard)
							{
								alert("무선신청서 계좌번호/카드 유효성 검사를 해주세요");
								$("#bankNumCheckBtn").focus();
								return;
							}
						}
					}
				}
				
				wlessScrbProc.dtlSave();
			}
			
		}
		else if(scrbReqPrstDtl.prod_cl == CONST_PRODCL_WIRE) 
		{
			if(currTabId=="basicTab") {
				basicScrbProc.dtlSave();
			}
			if(currTabId=="wireTab") {
				if(!wireScrbProc.checkDtlSave())
					return;
				
				if("03"!=$(':radio[name="idWirePayMthd"]:checked').val() && !wirecheckbankcard)
				{
					alert("유선신청서 계좌번호/카드 유효성 검사를 해주세요");
					return;
				}
				
				wireScrbProc.dtlSave();
			}
		}
		else if(scrbReqPrstDtl.prod_cl == CONST_PRODCL_COMBNEWNEW)
		{
			if(currTabId=="basicTab") {
				basicScrbProc.dtlSave();
			}	
			if(currTabId=="wlessTab") {
				if(!wlessScrbProc.checkDtlSave())
					return;
				
				if (parent_service_num2 =="" || parent_service_num2 == null){
					if("03"!=$(':radio[name="idautoTrnsfBank"]:checked').val() && !wlesscheckbankcard)
					{
						alert("무선신청서 계좌번호/카드 유효성 검사를 해주세요");
						return;
					}
				}
				
				wlessScrbProc.dtlSave();
			}
			if(currTabId=="wireTab") {
				if(!wireScrbProc.checkDtlSave())
					return;
				
				if("03"!=$(':radio[name="idWirePayMthd"]:checked').val() && !wirecheckbankcard)
				{
					alert("유선신청서 계좌번호/카드 유효성 검사를 해주세요");
					return;
				}
				
				wireScrbProc.dtlSave();
			}
			
		}
		else if(scrbReqPrstDtl.prod_cl == CONST_PRODCL_WIBRO) 
		{
			if(currTabId=="basicTab") {
				basicScrbProc.dtlSave();
			}
			if(currTabId=="wlessTab") {
				if(!wlessScrbProc.checkDtlSave())
					return;
				if (parent_service_num2 =="" || parent_service_num2 == null){
					if("03"!=$(':radio[name="idautoTrnsfBank"]:checked').val() && !wlesscheckbankcard)
					{
						alert("무선신청서 계좌번호/카드 유효성 검사를 해주세요");
						return;
					}
				}
					
				wlessScrbProc.dtlSave();
			}
		}
		else if(scrbReqPrstDtl.prod_cl == CONST_PRODCL_COMBOLDNEW)
		{
			if(currTabId=="basicTab") {
				basicScrbProc.dtlSave();
			}
			
			if(currTabId=="wireTab") {
				if(!wireScrbProc.checkDtlSave())
						return;
						
				if("03"!=$(':radio[name="idWirePayMthd"]:checked').val() && !wirecheckbankcard)
				{
					alert("유선신청서 계좌번호/카드 유효성 검사를 해주세요");
					return;
				}
				wireScrbProc.dtlSave();
			}
			if(currTabId=="combProdTab") {
				comboOldComb.dtlSave();
			}
			
		}
		
		if(currTabId=="basicTab") {
			var fileElementIds = [];
			for(var idx=0; idx < 5; idx++) {
				if($.trim($('#idFileName_'+idx).val())!="") {
					fileElementIds.push('idFileName_'+idx);
				}
				if($.trim($('#idAddFileName_'+idx).val())!="") {
					fileElementIds.push('idAddFileName_'+idx);
				}
			}	
	
			var _atchFileInfo = {
					appl_form_seq : scrbReqPrstDtl.appl_form_seq
					,user_id : scrbReqPrstDtl.user_id
					,org_id : scrbReqPrstDtl.org_id
					,comm_auth_cl : scrbReqPrstDtl.comm_auth_cl
					,enc_yn : (scrbReqPrstDtl.appl_form_typ == 'M') ? 'Y' : ''
			};
	
			if(fileElementIds.length>0) {
	
	    		tgAjaxUpload('/filemgmt/fileUpload.do'
	    			, _atchFileInfo
	    			, fileElementIds
	    			,{
	    				success: function(data, status) {
		    				if(data!=null && data.result!=null) {
		    					if(parseInt(data.result) > 0) {
		    						scrbMgmtDtlSave();
		    					} else if (data.result=="-1") {
		    						alert("파일이 확장자가 강제로 변경 되었거나 암호화 되어 있어 파일 업로드 불가합니다.");
		    					}
		    					else {
		    						alert("파일업로드에서 에러 발생");
		    					}
		    				} else {
		    					alert("알수없는 에러가 발생했습니다.\n관리자에게 문의하세요.");
		    				}
		    			}
	    				,error:function(xhr,status,e) {
	    					alert("알수없는 에러가 발생했습니다.\n관리자에게 문의하세요.");
	    				}
	    			}
	    		);
	    	} else {
	    		scrbMgmtDtlSave();
	    	}
		} else {
			scrbMgmtDtlSave();
		}
		
	}
};


var scrbMgmtDtlSave = function() {
	// 가족나눔데이터 삭제 후 저장
	
	var result_yn = false;
	
	$.ajax({
		url  :"/tgApplform/TgTbAfmlyInit.do",
		data : {appl_form_seq : scrbReqPrstDtl.appl_form_seq},
		type: 'POST',
		dataType : "json",
		success : function(data) {
			result_yn = true;
		}
		,beforeSend : function( xhr, settings ) { 
			loadingbar_show(); 
		}
		,error : function(xhr, status) {
			alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
		}, 
		complete : function(xhr, status) {
			
			if(result_yn){
				if($("#afmly_comb_join_y").prop("checked")){
					var req_line_seq = 0;
					var i = 0;
					$("input:text[name='reqr_enc_ctz_num']").each(function(index){
						i = index + 1;
						
						if($("#fmly_"+i).prop("checked")){ 
							req_line_seq++;
							
							$.ajax({
								url  :"/tgApplform/TgTbAfmlyFreeReqDtlIns.do",
								data : {appl_form_seq : scrbReqPrstDtl.appl_form_seq,
										req_line_seq : req_line_seq,
										reqr_nm : $('#reqr_nm_'+ i).val(), 
										reqr_enc_ctz_num : $('#reqr_enc_ctz_num_'+ i).val(),
										reqr_mbl_phon_num : $('#reqr_mbl_phon_num_'+ i).val(),
										fmly_rel_cd : $('#fmly_rel_cd_'+ i).val(),
										tb_comb_benf_cl_cd : $('#tb_comb_benf_cl_cd_'+ i).val(),
										dc_asgn_mbl_phon_num : $('#dc_asgn_mbl_phon_num_'+ i).val()},
								type: 'POST',
								dataType : "json",
								success : function(result) {
								}
								,beforeSend : function( xhr, settings ) { 
								}
								,error : function(xhr, status) {
								}, 
								complete : function(xhr, status) {
								}
							});
							
						}
					});
				}
				
			}
			
			
			loadingbar_hide();
		}
	});
	
	// 가족나눔데이터 삭제 후 저장 끝
	
	$.ajax({
		url: "/scrbmgmt/scrbReqPrstDtlUpt.do",
		data: scrbReqPrstDtl,
		type: 'POST',
		dataType : "json",
		success : function(result, status) {
			if(result!=null && result.result!=null) {
				if(parseInt(result.result) > 0) {
					if(scrbReqPrstDtl.accp_seq != "" && scrbReqPrstDtl.event_id != "" && scrbReqPrstDtl.ts_val_no != "" && scrbReqPrstDtl.appl_form_st == "10" && scrbReqPrstDtl.tmp_appl_form_st != "10"){
						if(result.err_cd != "100"){
							alert(result.err_msg);
						}else {
							alert("저장되었습니다.");
						}
					}else{
						alert("저장되었습니다.");
					}
					opener.reloadScrbList();
					$('#scrbDtlForm').submit();
				} else {
					alert("저장에 실패하였습니다.");
				}
			} else {
				alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
			}
		}
		,beforeSend : function( xhr, settings ) { 
			loadingbar_show(); 
		}
		,error : function(xhr, status) {
			alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
		}, 
		complete : function(xhr, status) {
			loadingbar_hide();
		}
	});
};
var nameCheck = function() {
	var restNum1 = $(':text[name="rest_num_1"]').val();
	//var restNum2 = $(':text[name="rest_num_2"]').val();
	var restNum2 = $(':text[name="rest_num_2"]').attr('mask') == '2' ?  $(':text[name="rest_num_2"]').val() : $(':hidden[name="rest_num_2mask"]').val();
	var hanNm = scrbReqPrstDtl.comm_buyr_nm;
	if(restNum1!=undefined && $.trim(restNum1)=="") {
		alert("주민등록번호를 정확히 입력하십시오.");
		$(':text[name="rest_num_1"]').focus();
		return false;
	}
	if(restNum2!=undefined && $.trim(restNum2)=="") {
		alert("주민등록번호를 정확히 입력하십시오.");
		$(':text[name="rest_num_2"]').focus();
		return false;
	}
	var _url = "/name/nameCheckJson.do";
	var _data = {
			input_typ : "01"
			,ctz_biz_num : restNum1 + restNum2
			,cust_nm : hanNm
	}	
	$.ajax({
		url: _url,
		data: _data,
		type: 'POST',
		dataType : "json",
		success : function(result, status) {
			
			if(result!=null && result.result!=null) { 
				if( result.result=="Y") {
					alert("정상적으로 실명인증이 확인 되었습니다.");
					checkedRealAuth = true;
					namecheckvalue = false;
				} else {
					alert("실명인증에 실패 하였습니다.");
					checkedRealAuth = false;
					$(':text[name="rest_num_1"]').focus();
				}
			} else {
				alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
			}
		}
		,beforeSend : function( xhr, settings ) { 
			loadingbar_show(); 
		}
		,error : function(xhr, status) {
			alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
		}, 
		complete : function(xhr, status) {
			loadingbar_hide();
		}
	});
};

/**
 * 로딩바 show
 */
function loadingbar_show() {
	
	var doc_height = $(document).height();
	var viewDisabled_style = "position:absolute; z-index:9;width:100%;height:" + doc_height + "px;left:0px;top:0px;display:none; background-color:white;filter:alpha(opacity=60);opacity:.6;";
   var twidth = 150, theight = 50;
   var left = ($(document).width()/2);
   var top = $(window).scrollTop() + ($(window).height()/2)-theight; 
   var loadingbar_style = "position:absolute; z-index:10000;display:none;left:"+left+"px;top:" + top + "px;";
	
	$("#viewDisabled").attr("style", viewDisabled_style);
	$("#loadingbar").attr("style", loadingbar_style);
	$("#viewDisabled").show();
	$("#loadingbar").show();
}

/**
* 로딩바 hide
*/
function loadingbar_hide() {
	$("#viewDisabled").hide();
	$("#loadingbar").hide();
}


function checkNewChgIcas(pnum1, pnum2, pnum3, ctzNum, comm_auth_cl, cust_nm) {
	var _url = "/tgApplform/iCasChk.do";
	var _param = "icasnum=" + pnum1+pnum2+pnum3;
	_param += "&ctz_corp_num=" + ctzNum;
	_param += "&comm_auth_cl=" + comm_auth_cl;
	_param += "&cust_nm=" + cust_nm;

	$.ajax({
	       async: true,
	       type : "post",
	       url  : _url,
	       data : _param,
	       dataType: "json",
	       timeout: 5000,
	       success : function(data) {
	       		if(data.successYn == "F") {
		        		alert("기기변경 대상번호가 실명인증한 명의자와 일치 하지 않습니다.");
		        		$('select[name="idApplFormSt"]').val("10");
	       		}
	       		
	       		if(data.successYn == "N") {
		        		alert("이미 동일 휴대폰번호로 처리 진행중이므로, 처리 불가합니다");
		        		$('select[name="idApplFormSt"]').val("10");
	       		}
	       		
	       		if(data.SvcMgmtNum == null || data.SvcMgmtNum == "") {
	       			alert("SKT기존 사용자 고객이 아닙니다. 번호를 다시한번 확인해 주세요.");
	       			$('select[name="idApplFormSt"]').val("10");
	       		} 
	       }
			,beforeSend : function( xhr, settings ) { 
				loadingbar_show(); 
			}
			,error : function(xhr, status) {
				alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
			}, 
			complete : function(xhr, status) {
				loadingbar_hide();
			}
	});
}


function checkMovPhonIcas(pnum1, pnum2, pnum3) {
	 var _param  = "";
	 var _url = "/tgApplform/NumMovOverlapChk.do";

	 _param  = "mov_num_chg_idnt=" + pnum1;
	 _param  += "&mov_num_chg_exg=" + pnum2;
	 _param  += "&mov_num_chg_num=" + pnum3;

	$.ajax({
       async: true,
       type : "post",
       url  : _url,
       data : _param,
       dataType: "json",
       timeout: 5000,
       success : function(data) {
       		if("Y" == data.successYn) {
        	} else if("F" == data.successYn) {
				alert("SKT고객님의 번호입니다. 타사번호만 신청을 하실수 있습니다.");
				$('select[name="idApplFormSt"]').val("10");
        	} else {		
				alert("이미 동일 휴대폰번호로 처리 진행중이므로, 처리 불가합니다");
				$('select[name="idApplFormSt"]').val("10");
        	}
       }
		,beforeSend : function( xhr, settings ) { 
			loadingbar_show(); 
		}
		,error : function(xhr, status) {
			alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
		}, 
		complete : function(xhr, status) {
			loadingbar_hide();
		}
   });
}

var prodChange = function(type) {
	if(type=="inet") {
		scrbReqPrstDtl.wire_inet = $('select[name="idWireInetProd"] option:selected').val();
	} else if(type=="phon") {
		scrbReqPrstDtl.wire_phon = $('select[name="idWirePhonProd"] option:selected').val();
	}
	scrbReqPrstDtl["prodinfo"] = "";
	scrbReqPrstDtl["svccode"] = "";
	var _url = "/address/processAddressNew.do";
	var _data = {
			appl_form_seq : scrbReqPrstDtl.appl_form_seq
			,flag : 'Check'
			,prodIds : getProdInfo()
			,svcDtlCds : getSvcCode()
	}	
	$.ajax({
		url: _url,
		data: _data,
		type: 'POST',
		dataType : "json",
		success : function(result, status) {
			
			if(result!=null ) { 
				console.log(JSON.stringify(result));
				if(result.msgCd=="fail") {
					alert(result.msg);
				} else if(result.msgCd=="success"){
					if(result.stdOut!=null && result.stdOut.length>0) {
						var tempobj = result.stdOut[0];
						scrbReqPrstDtl["wire_set_plc_new_addr_yn"] = tempobj.addr_flag;
						if(tempobj.zip!=null && tempobj.zip.length>3)
						{
							$('input[type=text][name="idWireSetPlcZip1"]').val(tempobj.zip.substr(0,3));
							$('input[type=text][name="idWireSetPlcZip2"]').val(tempobj.zip.substr(3));
						}
						
						scrbReqPrstDtl["wire_set_plc_addr_id"] = tempobj.addr_id;
						
						$('input[type=text][name="idWireSetPlcAddr1"]').val(tempobj.juso_main);
						$('input[type=text][name="idWireSetPlcAddr2"]').val(result.custJusoSub);
						$('input[type=text][name="idWireSetPlcAddr1"]').attr('mask','2');
						$('input[type=text][name="idWireSetPlcAddr2"]').attr('mask','2');
						
						
						if(tempobj.bldblk_num == null || tempobj.bldblk_num == "null")	//잘못된 동/호 검색시 
							tempobj.bldblk_num = "0"
						
						if(tempobj.bldunt_num == null || tempobj.bldunt_num == "null")	//잘못된 동/호 검색시 
							tempobj.bldunt_num = "0";	
							
						
						scrbReqPrstDtl["wire_set_plc_bld_blk_num"] = tempobj.bldblk_num;	//건물동 번호
						scrbReqPrstDtl["wire_set_plc_bldunt_num"] = tempobj.bldunt_num;	//건물호 번호
						
						if(result.info_msg!=null && result.info_msg.length>0)	//동/호가 잘못 입력 됬을경우 경고 메세지 출력
						{
							var ary_infomessage = [];
							var str_infomessage = "";
							
							for(var i=0; i < result.info_msg.length; i++) {
								ary_infomessage.push(str.replace(/^\s[2]$/gi,' '));
							}
							
							str_infomessage = ary_infomessage.join("\n \n");
		
							alert(str_infomessage);
		
							scrbReqPrstDtl["wire_set_plc_assist_addr"] = tempobj.assist_addr;	 
						}
					}
					
					
					
					if(result.srchTyp == "area")	//설치장소 조회인 경우
					{
						var tempobj2 = result.rsltMap;
						//기술방식 코드
						if(tempobj2.inet!=undefined&&tempobj2.inet!=null)
							scrbReqPrstDtl["inet_svc_tech_mthd_cd"] = tempobj2.inet;
						else
							scrbReqPrstDtl["inet_svc_tech_mthd_cd"] = "";
						
						if(tempobj2.tv!=undefined&&tempobj2.tv!=null)
							scrbReqPrstDtl["tv_svc_tech_mthd_cd"] = tempobj2.tv;
						else
							scrbReqPrstDtl["tv_svc_tech_mthd_cd"] = "";
						
						if(tempobj2.phon!=undefined&&tempobj2.phon!=null)
							scrbReqPrstDtl["phon_svc_tech_mthd_cd"] = tempobj2.phon;
						else
							scrbReqPrstDtl["phon_svc_tech_mthd_cd"] = "";
						
						if(tempobj2.iphon!=undefined&&tempobj2.iphon!=null)
							scrbReqPrstDtl["inet_phon_svc_tech_mthd_cd"] = tempobj2.iphon;
						else
							scrbReqPrstDtl["inet_phon_svc_tech_mthd_cd"] = "";
					}
				}
			} else {
				alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
			}
		}
		,beforeSend : function( xhr, settings ) { 
			loadingbar_show(); 
		}
		,error : function(xhr, status) {
			alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
		}, 
		complete : function(xhr, status) {
			loadingbar_hide();
		}
	});
}

var  getProdInfo = function()
{
	//console.log("상품 목록 : "+scrbReqPrstDtl.prodinfo);
//	if(prodinfo == "")
//	{
		var temparray = [];
		
		if(scrbReqPrstDtl.wire_inet != "" && scrbReqPrstDtl.wire_inet != null){
			temparray.push(scrbReqPrstDtl.wire_inet);
		}
		
		if(scrbReqPrstDtl.wire_tv != "" && scrbReqPrstDtl.wire_tv != null){
			temparray.push(scrbReqPrstDtl.wire_tv);
		}
		if(scrbReqPrstDtl.wire_phon != "" && scrbReqPrstDtl.wire_phon != null){
			temparray.push(scrbReqPrstDtl.wire_phon);
		}
		if(scrbReqPrstDtl.wire_inet_phon != "" && scrbReqPrstDtl.wire_inet_phon != null){
			temparray.push(scrbReqPrstDtl.wire_inet_phon);			
		}
		scrbReqPrstDtl.prodinfo = temparray.join(":");
//	}
	return scrbReqPrstDtl.prodinfo;
}

/**
 * 서비스 상세구분코드를 반환합니다.(인터넷:I1,일반전화:P1,인터넷전화:P2,TV:T1)
 */
var  getSvcCode = function()
{
	//console.log("서비스코드 목록 : "+scrbReqPrstDtl.svccode);
//	if(svccode == "")
//	{
		var temparray = [];
		
		if(scrbReqPrstDtl.wire_inet != "" && scrbReqPrstDtl.wire_inet != null)
			temparray.push("I1");
		
		if(scrbReqPrstDtl.wire_tv != "" && scrbReqPrstDtl.wire_tv != null)
			temparray.push("T1");
		
		if(scrbReqPrstDtl.wire_phon != "" && scrbReqPrstDtl.wire_phon != null)
			temparray.push("P1");
		
		if(scrbReqPrstDtl.wire_inet_phon != "" && scrbReqPrstDtl.wire_inet_phon != null)
			temparray.push("P2");			
		
		scrbReqPrstDtl.svccode = temparray.join(":");
//	}
	
	return scrbReqPrstDtl.svccode;
}

//TWD 상태값 전송
var stTranf = function() {
	
	var selectVal = $('select[name="formStTrnf"] option:selected').val();
	var openDelayReason = $('#formStTrnf option:selected').text();
	var orderId = scrbReqPrstDtl.comm_spmall_oder_num;
	if ($("select[name=idApplFormSt]").val() != "09") {		
		alert("신청서가 개통보류 상태인 경우에만 전송 가능합니다.");
	} else {
		if (selectVal == "formStTrnf0") {
			alert("상태 값을 선택 후 전송하시기 바랍니다.");
		} else {
			//Order-SetSvcOpenDt?orderId="+orderId+"&openDelayReason="+openDelayReason"
			var _url = "/tshop/sendDelayRsn.do";
			var data = {openDelayReason : openDelayReason , orderId : orderId};
			$.ajax({
				url: _url,
				data: data,
				type: 'POST',
				dataType : "json",
				success : function(result, status) {
					if(result.rtnMsg == "Y") {
						alert("정상 발송되었습니다.  내역은 TWD Admin에서 확인 가능합니다.");
					} else {
						alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
					}
				}
				,beforeSend : function( xhr, settings ) { 
					loadingbar_show(); 
				}
				,error : function(xhr, status) {
					alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
				}, 
				complete : function(xhr, status) {
					loadingbar_hide();
				}
			});
				
		}
	}
	
};

/**
 * 보험적격 팝업 
 */
function creditCheckInsuPopup(){

	//safari 브라우져에서는 팝업 크기 조절
	var agent = navigator.userAgent;
	var safariGb = false;
	
	if (agent.indexOf("Safari") > -1) {
		safariGb = true;
	} else {
		safariGb = false;
	}

	//보험적격
	if(safariGb == true){
		NewWindow("/credit/creditCheckInsuPopup.do","insure","640","410","no");
	}else {
		NewWindow("/credit/creditCheckInsuPopup.do","insure","640","490","no");
	
	}
	
}

function deleteFmly(){
	var result_yn = false;	
	
	
}

function initMask(){
	 
	 //$("input[name=rest_num_1]").attr("mask","1");
	 $("input[name=rest_num_2]").attr("mask","1");
	 $("input[name=idMovNumChgExg]").attr("mask","1");
	 $("input[name=idMovNumChgNum]").attr("mask","1");
	 $("input[name=idBuyrWireNumExg]").attr("mask","1");
	 $("input[name=idBuyrWireNumNum]").attr("mask","1");
	 $("input[name=idBuyrPhonExg]").attr("mask","1");
	 $("input[name=idBuyrPhonNum]").attr("mask","1");
	 //$("input[name=email1]").attr("mask","1");
	 $("input[name=email3]").attr("mask","1");
	 $("input[name=idByurInvBasAddr]").attr("mask","1");
	 $("input[name=idBuyrInvDtlAddr]").attr("mask","1");
	 $("input[name=idBuyrDlvBasAddr]").attr("mask","1");
	 $("input[name=idBuyrDlvDtlAddr]").attr("mask","1");
	 $("input[name=idDlvRcvrNm]").attr("mask","1");
	 $("input[name=idDlvPhonExg]").attr("mask","1");
	 $("input[name=idDlvPhonNum]").attr("mask","1");
	 $("input[name=idDlvMblPhonExg]").attr("mask","1");
	 $("input[name=idDlvMblPhonNum]").attr("mask","1");
	 $("input[name=idCommBankNum]").attr("mask","1");
	 $("input[name=idCommCardNum]").attr("mask","1");
	 $("input[name=idCourtAgntPhonExg]").attr("mask","1");
	 $("input[name=idCourtAgntPhonNum]").attr("mask","1");
	 $("input[name=idCourtAgntMblPhonExg]").attr("mask","1");
	 $("input[name=idCourtAgntMblPhonNum]").attr("mask","1");
	 $("input[name=INTEG_INV_PHON_NUM]").attr("mask","1");
	 $("input[name=idEqpSerNum]").attr("mask","1");
	 //$("input[name=idUsimMdlbuy]").attr("mask","1");
	 $("input[name=iduSimNumbuy]").attr("mask","1");
	 $("input[name=iduSimNum]").attr("mask","1");
	 $("input[name=idWireCntcPlcPhonExg]").attr("mask","1");
	 $("input[name=idWireCntcPlcPhonNum]").attr("mask","1");
	 $("input[name=idWireCntcPlcMblPhonExg]").attr("mask","1");
	 $("input[name=idWireCntcPlcMblPhonNum]").attr("mask","1");
	 //$("input[name=idWireReqrEmail1]").attr("mask","1");
	 $("input[name=idWireReqrEmail3]").attr("mask","1");
	 $("input[name=idWireSetPlcAddr1]").attr("mask","1");
	 $("input[name=idWireSetPlcAddr2]").attr("mask","1");
	 $("input[name=VISIT_TEL_2]").attr("mask","1");
	 $("input[name=VISIT_TEL_3]").attr("mask","1");
	 //$("input[name=idWireBillEmail]").attr("mask","1");
	 $("input[name=idWireBillEmail3]").attr("mask","1");
	 $("input[name=idWireBillAddr1]").attr("mask","1");
	 $("input[name=idWireBillAddr2]").attr("mask","1");
	 $("input[name=idWireBankNum]").attr("mask","1");
	 $("input[name=idWireCardNum]").attr("mask","1");
	 $("input[name=WIRE_PHON_EXST_NUM_2]").attr("mask","1");
	 $("input[name=WIRE_PHON_EXST_NUM_3]").attr("mask","1");
	 $("input[name=WIRE_INET_PHON_EXST_NUM_2]").attr("mask","1");
	 $("input[name=WIRE_INET_PHON_EXST_NUM_3]").attr("mask","1");
	 $("input[name=wire_gift_dlv_bas_addr]").attr("mask","1");
	 $("input[name=wire_gift_dlv_dtl_addr]").attr("mask","1");
	 $("input[name=giftrecipient]").attr("mask","1");
	 $("input[name=gifthpexg]").attr("mask","1");
	 $("input[name=gifthpnum]").attr("mask","1");
	 $("input[name=giftphonexg]").attr("mask","1");
	 $("input[name=giftphonnum]").attr("mask","1");
	 $("input[name=idBuyrPhonExg]").attr("mask","1");
	 $("input[name=idBuyrPhonNum]").attr("mask","1");
	 //[추가] 금이도M / 김용일 / CHG610000070310/ "Tgate 미성년자 법정대리인 이메일정보 추가" :  법정대리인 이메일 추가 / 20180823
	 $("input[name=courtAgntEmail3]").attr("mask","1");
}