//기본정보 저장
var basicScrbProc = {
		dtlSave : function() {
			
			scrbReqPrstDtl.mbl_phon_auth_typ = $('select[name="idMblPhonauthType"] option:selected').val();
			
			//Bgate 주민번호 실명인증후 저장
			//유선이면서 13자리가 아니면 생년월일  vo.getComm_auth_cl().equals("01")
			if(scrbReqPrstDtl.prod_cl == CONST_PRODCL_WIRE && scrbReqPrstDtl.comm_auth_cl == "01" &&  scrbReqPrstDtl.comm_buyr_rest_num.length != 13){
				//이전번호와 현재 번호가 다르면서 실명인증 체크를 했으면 수정
				var restNum2 = $(':text[name="rest_num_2"]').attr('mask') == '2' ?  $(':text[name="rest_num_2"]').val() : $(':hidden[name="rest_num_2mask"]').val();
				if(scrbReqPrstDtl.comm_buyr_rest_num != $(':text[name="rest_num_1"]').val() + restNum2 && checkedRealAuth){
					scrbReqPrstDtl.comm_buyr_rest_num = $(':text[name="rest_num_1"]').val() + restNum2; /* 일부러 이렇게(rest_num_1rest_num_2)한건가? */
					if(scrbReqPrstDtl.wire_trnsf_rest_num == null || scrbReqPrstDtl.wire_trnsf_rest_num == ""){
					}else{
						//유선 이체 주민 번호가 원래 있었으면 변경
						scrbReqPrstDtl.wire_trnsf_rest_num = scrbReqPrstDtl.comm_buyr_rest_num;
					}
				}
			}
			
			// 1주민등록 2 운전면허
			if( $('select[name="idMblPhonauthType"] option:selected').val() == "1" )	// 주민등록8자리 
			{
				scrbReqPrstDtl.wire_ctz_isue_dt =	$(':text[name="idWireCtzIsueDt"]').val();
			}
			else	// 운전면허번호
			{
				scrbReqPrstDtl.drv_licen_area = $('select[name="idDrvLicenArea"] option:selected').val();
				scrbReqPrstDtl.drv_licen_num = $(':text[name="idDrvLicenNum1"]').val() + $(':text[name="idDrvLicenNum2"]').val() + $(':text[name="idDrvLicenNum3"]').val();
			}

			// 휴대폰인증 확인자 관련사항
			scrbReqPrstDtl.data_agree	=  $(':checkbox[name="idDataAgree"]').is(":checked")?"Y":"N";//(idDataAgree.selected)?'Y':'N';
			scrbReqPrstDtl.wire_mbl_phon_auth_check_dt = $(':text[name="idAuthCheckDt"]').val();
			scrbReqPrstDtl.wire_mbl_phon_auth_chkr = $(':text[name="idAuthCheckNm"]').val();

			// 변경전 상태 확인
			scrbReqPrstDtl.tmp_appl_form_st = scrbReqPrstDtl.appl_form_st;
			
			// 선택이 되어버리는 상황이 있어서 수정함 진행상황유무에서 => 상태별로
			// 무선진행상황 (무선, 와이브로, 결합신규신규)
			if( scrbReqPrstDtl.prod_cl == CONST_PRODCL_WLESS ||
				scrbReqPrstDtl.prod_cl == CONST_PRODCL_WIBRO ||
				scrbReqPrstDtl.prod_cl == CONST_PRODCL_COMBNEWNEW ) {
				
				//console.log("idApplFormSt.selectedCode : " + $('select[name="idApplFormSt"] option:selected').val() );
				scrbReqPrstDtl.appl_form_st =	$('select[name="idApplFormSt"] option:selected').val();
				
			}
			
			// 유선진행상황 (유선, 결합신규신규, 결합기존신규)
			if( scrbReqPrstDtl.prod_cl == CONST_PRODCL_WIRE ||
				scrbReqPrstDtl.prod_cl == CONST_PRODCL_COMBNEWNEW ||
				scrbReqPrstDtl.prod_cl == CONST_PRODCL_COMBOLDNEW )
			{
				scrbReqPrstDtl.wire_st_cl = $('select[name="idWireStCl"] option:selected').val();
			}
			scrbReqPrstDtl.exchg_rtn_cl_cd = $('select[name="exchg_rtn_cl"] option:selected').val();
		}
}

//무선정보 저장
var wlessScrbProc = {
		dtlSave : function() { //무선 무선정보 저장
			if(	scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_MNP ||
				scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_KMNP ||
				scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_LMNP ||
				scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_KCTMNP ||
				scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_CJMNP ||
				scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_ONSNP ||
				scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_IBTNP ||
				scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_UNICNP ||
				scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_BIGCNP ||
				scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_SMTNP ||
				scrbReqPrstDtl.appl_form_scrb_typ == "14"|| 
				scrbReqPrstDtl.appl_form_scrb_typ == "15"|| 
				scrbReqPrstDtl.appl_form_scrb_typ == "16"|| 
				scrbReqPrstDtl.appl_form_scrb_typ == "17"|| 
				scrbReqPrstDtl.appl_form_scrb_typ == "18"|| 
				scrbReqPrstDtl.appl_form_scrb_typ == "19"|| 
				scrbReqPrstDtl.appl_form_scrb_typ == "20"|| 
				scrbReqPrstDtl.appl_form_scrb_typ == "21"|| 
				scrbReqPrstDtl.appl_form_scrb_typ == "22"|| 
				scrbReqPrstDtl.appl_form_scrb_typ == "23"|| 
				scrbReqPrstDtl.appl_form_scrb_typ == "24"|| 
				scrbReqPrstDtl.appl_form_scrb_typ == "25"|| 
				scrbReqPrstDtl.appl_form_scrb_typ == "26"|| 
				scrbReqPrstDtl.appl_form_scrb_typ == "27"|| 
				scrbReqPrstDtl.appl_form_scrb_typ == "28"|| 
				scrbReqPrstDtl.appl_form_scrb_typ == "29"|| 
				scrbReqPrstDtl.appl_form_scrb_typ == "30"|| 
				scrbReqPrstDtl.appl_form_scrb_typ == "31"||
				scrbReqPrstDtl.appl_form_scrb_typ == "32"||
				scrbReqPrstDtl.appl_form_scrb_typ == "33"||
				scrbReqPrstDtl.appl_form_scrb_typ == "34"||
				scrbReqPrstDtl.appl_form_scrb_typ == "35"||
				scrbReqPrstDtl.appl_form_scrb_typ == "36"||
				scrbReqPrstDtl.appl_form_scrb_typ == "37"||
				scrbReqPrstDtl.appl_form_scrb_typ == "38"||
				scrbReqPrstDtl.appl_form_scrb_typ == "39"||
				scrbReqPrstDtl.appl_form_scrb_typ == "40"||
				scrbReqPrstDtl.appl_form_scrb_typ == "41"||
				scrbReqPrstDtl.appl_form_scrb_typ == "42"||
				scrbReqPrstDtl.appl_form_scrb_typ == "43"||
				scrbReqPrstDtl.appl_form_scrb_typ == "44"||
				scrbReqPrstDtl.appl_form_scrb_typ == "45"||
				scrbReqPrstDtl.appl_form_scrb_typ == "46"||
				scrbReqPrstDtl.appl_form_scrb_typ == "47"||
				scrbReqPrstDtl.appl_form_scrb_typ == "48"||
				scrbReqPrstDtl.appl_form_scrb_typ == "49"||
				scrbReqPrstDtl.appl_form_scrb_typ == "50"||
				scrbReqPrstDtl.appl_form_scrb_typ == "51"||
				scrbReqPrstDtl.appl_form_scrb_typ == "52"||
				scrbReqPrstDtl.appl_form_scrb_typ == "53"||
				scrbReqPrstDtl.appl_form_scrb_typ == "54"||
				scrbReqPrstDtl.appl_form_scrb_typ == "55"||
				scrbReqPrstDtl.appl_form_scrb_typ == "56"||
				scrbReqPrstDtl.appl_form_scrb_typ == "57"||
				scrbReqPrstDtl.appl_form_scrb_typ == "58"
					){
				CONST_MNP_YN = true; //번호이동
			}else{
				CONST_MNP_YN = false; //번호이동이 아님
				if(scrbReqPrstDtl.pafpay_cnvt_mov == "20" || scrbReqPrstDtl.pafpay_cnvt_mov == "30"  ){
					scrbReqPrstDtl.mov_bf_bizr = $('select[name="idMovBfBizr"] option:selected').val();
				}else{
					scrbReqPrstDtl.mov_bf_bizr = "";
				}
				
				
			}
			// 번호이동 KT, LGT
			if( CONST_MNP_YN ) {

			 	// 고객정보
				scrbReqPrstDtl.mov_num_chg_idnt		=	$('select[name="idMovNumChgIdnt"] option:selected').val();
				if($(':text[name="idMovNumChgExg"]').attr('mask') == '2') { scrbReqPrstDtl.mov_num_chg_exg = $(':text[name="idMovNumChgExg"]').val(); }
				if($(':text[name="idMovNumChgNum"]').attr('mask') == '2') { scrbReqPrstDtl.mov_num_chg_num = $(':text[name="idMovNumChgNum"]').val(); }

				// 변경전 통신회사
				//scrbReqPrstDtl.mov_bf_bizr			=	rtnString(idMovBfBizr.selectedValue);
				scrbReqPrstDtl.mov_bf_bizr			=	$('select[name="idMovBfBizr"] option:selected').val();

				// 번호이동 신청정보
				scrbReqPrstDtl.mov_auth_cl_cd = $(':radio[name="idMovAuthClCd"]:checked').val();
				scrbReqPrstDtl.mov_auth_ctt	= $(':text[name="idMovAuthCtt"]').val();
			} 
			
			//[추가] 금이도M / 김용일 / CHG610000068514/ "T.Gate 신청서 예약번호 채번 기능 개발 요청" :  예약접수번호 저장 / 20180726
			//[추가] 금이도M / 김성득 / CHG610000069163 / "갤럭시노트9 예약판매 대응 기능개선" : 스크립트주석 / 20180809
			// 예약번호 저장
			//scrbReqPrstDtl.tdir_rsv_sale_num = $(':text[name="tdir_rsv_sale_num"]').val();
			
			// 연락받을 전화번호
			scrbReqPrstDtl.buyr_wire_num_area		=	$('select[name="idBuyrWireNumArea"] option:selected').val();
			if($(':text[name="idBuyrWireNumExg"]').attr('mask') == '2') { scrbReqPrstDtl.buyr_wire_num_exg = $(':text[name="idBuyrWireNumExg"]').val(); }
			if($(':text[name="idBuyrWireNumNum"]').attr('mask') == '2') { scrbReqPrstDtl.buyr_wire_num_num = $(':text[name="idBuyrWireNumNum"]').val(); }
			
			// 이동전화번호
			scrbReqPrstDtl.buyr_phon_area			=	$('select[name="idBuyrPhonArea"] option:selected').val();
			if($(':text[name="idBuyrPhonExg"]').attr('mask') == '2') { scrbReqPrstDtl.buyr_phon_exg = $(':text[name="idBuyrPhonExg"]').val(); }
			if($(':text[name="idBuyrPhonNum"]').attr('mask') == '2') { scrbReqPrstDtl.buyr_phon_num = $(':text[name="idBuyrPhonNum"]').val(); }
			
			// E-MAIL 청구서
			scrbReqPrstDtl.buyr_mail_addr = $(':text[name="email1"]').val() +"@"+ ($(':text[name="email3"]').attr('mask') == '2' ? $(':text[name="email3"]').val() : $(':hidden[name="email3mask"]').val());
			
			// 기변일때는 제외
			if( scrbReqPrstDtl.appl_form_scrb_typ != CONST_APPLFORMSCRBTYP_CHGGNRL &&
			 	scrbReqPrstDtl.appl_form_scrb_typ != CONST_APPLFORMSCRBTYP_CHGCMP ) {
			 	//청구지 주소
				scrbReqPrstDtl.buyr_bill_zip_1		=	$(':text[name="idBuyrBillZip1"]').val();
				scrbReqPrstDtl.buyr_bill_zip_2		=	$(':text[name="idBuyrBillZip2"]').val();
				if($(':text[name="idByurInvBasAddr"]').attr('mask') == '2') { scrbReqPrstDtl.buyr_inv_bas_addr = $(':text[name="idByurInvBasAddr"]').val(); }
				if($(':text[name="idBuyrInvDtlAddr"]').attr('mask') == '2') { scrbReqPrstDtl.buyr_inv_dtl_addr = $(':text[name="idBuyrInvDtlAddr"]').val(); }
				
				//[추가] 금이도M / 김용일 / CHG610000070310/ "Tgate 미성년자 법정대리인 이메일정보 추가" :  법정대리인 이메일 추가 / 20180823
				//신규 번호이동이면서, 미성년자일 경우 법정대리인 이메일주소 셋팅
				if("04" == scrbReqPrstDtl.comm_auth_cl){
					// 법정대리인 메일 주소
					scrbReqPrstDtl.lgrep_email_addr = $(':text[name="courtAgntEmail1"]').val() +"@"+ ($(':text[name="courtAgntEmail3"]').attr('mask') == '2' ? $(':text[name="courtAgntEmail3"]').val() : $(':hidden[name="courtAgntEmail3mask"]').val());
				}
			 }
			
			
			// 배송지 주소
			scrbReqPrstDtl.buyr_dlv_zip_1			=	$(':text[name="idBuyrDlvZip1"]').val();
			scrbReqPrstDtl.buyr_dlv_zip_2			= 	$(':text[name="idBuyrDlvZip2"]').val();
			if($(':text[name="idBuyrDlvBasAddr"]').attr('mask') == '2') { scrbReqPrstDtl.buyr_dlv_bas_addr = $(':text[name="idBuyrDlvBasAddr"]').val(); }
			if($(':text[name="idBuyrDlvDtlAddr"]').attr('mask') == '2') { scrbReqPrstDtl.buyr_dlv_dtl_addr = $(':text[name="idBuyrDlvDtlAddr"]').val(); }
			
			/** 수령인 */
			//수령인명
			if($(':text[name="idDlvRcvrNm"]').attr('mask') == '2') { scrbReqPrstDtl.dlv_rcvr_nm = $(':text[name="idDlvRcvrNm"]').val(); }
			//전화번호
			scrbReqPrstDtl.dlv_phon_area		=	$('select[name="idDlvPhonArea"] option:selected').val();
			if($(':text[name="idDlvPhonExg"]').attr('mask') == '2') { scrbReqPrstDtl.dlv_phon_exg = $(':text[name="idDlvPhonExg"]').val(); }
			if($(':text[name="idDlvPhonNum"]').attr('mask') == '2') { scrbReqPrstDtl.dlv_phon_num = $(':text[name="idDlvPhonNum"]').val(); }
			
			//이동전화번호
			scrbReqPrstDtl.dlv_mbl_phon_area		=	$('select[name="idDlvMblPhonArea"] option:selected').val();
			if($(':text[name="idDlvMblPhonExg"]').attr('mask') == '2') { scrbReqPrstDtl.dlv_mbl_phon_exg = $(':text[name="idDlvMblPhonExg"]').val(); }
			if($(':text[name="idDlvMblPhonNum"]').attr('mask') == '2') { scrbReqPrstDtl.dlv_mbl_phon_num = $(':text[name="idDlvMblPhonNum"]').val(); }
			
			
			scrbReqPrstDtl.comm_auto_trnsf_cl		=	$(':radio[name="idautoTrnsfBank"]:checked').val();//은행,카드 구분
			
			// 기변일때는 제외
			if( scrbReqPrstDtl.appl_form_scrb_typ != CONST_APPLFORMSCRBTYP_CHGGNRL &&
			 	scrbReqPrstDtl.appl_form_scrb_typ != CONST_APPLFORMSCRBTYP_CHGCMP &&
			 	scrbReqPrstDtl.pps_yn != "Y"
			 	 ) {

				if(scrbReqPrstDtl.comm_auto_trnsf_cl == "01") {
					scrbReqPrstDtl.comm_bank_cd			=	$('select[name="idCommBankCd"] option:selected').val();					// 은행혹은 카드 코드 번호
					scrbReqPrstDtl.comm_bank_nm			=	$('select[name="idCommBankCd"] option:selected').text();
					if($(':text[name="idCommBankNum"]').attr('mask') == '2') { scrbReqPrstDtl.comm_bank_num = $(':text[name="idCommBankNum"]').val(); } //은행계좌번호, 카드카드번호
				}else if(scrbReqPrstDtl.comm_auto_trnsf_cl == "02") {
					scrbReqPrstDtl.comm_bank_cd			=	$('select[name="idCommCardCd"] option:selected').val();					// 은행혹은 카드 코드 번호
					scrbReqPrstDtl.comm_bank_nm			=	$('select[name="idCommCardCd"] option:selected').text();
					if($(':text[name="idCommCardNum"]').attr('mask') == '2') { scrbReqPrstDtl.comm_bank_num = $(':text[name="idCommCardNum"]').val(); } //은행계좌번호, 카드카드번호
					
					scrbReqPrstDtl.comm_card_eff_prd_mth	=	$('select[name="idCommCardEffPrdMth"] option:selected').val();	//카드유효기간 달
					scrbReqPrstDtl.comm_card_eff_prd_yr	=	$('select[name="idCommCardEffPrdYr"] option:selected').val();	//카드유효기간 년도
				}
			 }
			 
			/*PPS 인 경우, PPS_num 저장*/
			if(scrbReqPrstDtl.pps_yn == "Y"){
				scrbReqPrstDtl.pps_num			=	$(':text[name="idPps_num"]').val();
			}
			/*외국인의 경우, 체류코드(Stay_cd), 보증보험금액(assurance_amount) 추가 */
			scrbReqPrstDtl.stay_cd					=	$(':text[name="idStay_cd"]').val();
			scrbReqPrstDtl.assurance_amount			=	$(':text[name="idAssurance_amount"]').val();
		
			/** 미성년자보호제도  법정대리인 */
			// 연락받을전화번호
			scrbReqPrstDtl.court_agnt_phon_area		=	$('select[name="idCourtAgntPhonArea"] option:selected').val();
			if($(':text[name="idCourtAgntPhonExg"]').attr('mask') == '2') { scrbReqPrstDtl.court_agnt_phon_exg = $(':text[name="idCourtAgntPhonExg"]').val(); }
			if($(':text[name="idCourtAgntPhonNum"]').attr('mask') == '2') { scrbReqPrstDtl.court_agnt_phon_num = $(':text[name="idCourtAgntPhonNum"]').val(); }
			// 이동전화번호
			scrbReqPrstDtl.court_agnt_mbl_phon_area	=	$('select[name="idCourtAgntMblPhonArea"] option:selected').val();
			if($(':text[name="idCourtAgntMblPhonExg"]').attr('mask') == '2') { scrbReqPrstDtl.court_agnt_mbl_phon_exg = $(':text[name="idCourtAgntMblPhonExg"]').val(); }
			if($(':text[name="idCourtAgntMblPhonNum"]').attr('mask') == '2') { scrbReqPrstDtl.court_agnt_mbl_phon_num = $(':text[name="idCourtAgntMblPhonNum"]').val(); }
			
			// 기변일때는 제외
			if( scrbReqPrstDtl.appl_form_scrb_typ != CONST_APPLFORMSCRBTYP_CHGGNRL &&
			 	scrbReqPrstDtl.appl_form_scrb_typ != CONST_APPLFORMSCRBTYP_CHGCMP 
			 	&& scrbReqPrstDtl.pps_yn != "Y") {

			 	// 신청내역
				scrbReqPrstDtl.comm_prefr_num_1		=	$(':text[name="idCommPrefrNum1"]').val();						//희망번호
				scrbReqPrstDtl.comm_prefr_num_2		=	$(':text[name="idCommPrefrNum2"]').val();
	
				//scrbReqPrstDtl.new_grtm_cl			=	rtnString(idNewGrtm.selectedValue);			//보증금
				//scrbReqPrstDtl.new_scrb_fee_cl		=	rtnString(idNewScrbFee.selectedValue);		//가입비
	
				scrbReqPrstDtl.new_bill_req_typ		=	$(':radio[name="idNewBillReqTyp"]:checked').val();	//청구서 종류

				//동일명의/법정대리인 통합청구 체크시 통합번호 setting (통합번호 필수값은 아님)
				if ($('input[name="INTEG_INV_YN"]').is(":checked")) {
					scrbReqPrstDtl.integ_inv_yn = "Y";													//동일명의 통합청구/법정대리인 통합청구
					if($(':text[name="INTEG_INV_PHON_NUM"]').attr('mask') == '2') { scrbReqPrstDtl.integ_inv_phon_num = $("#INTEG_INV_PHON_NUM").val(); } //통합번호
				} else {
					scrbReqPrstDtl.integ_inv_yn = "N";
					scrbReqPrstDtl.integ_inv_phon_num = "";
					
				}
			 }
			
			if($(':text[name="idEqpSerNum"]').attr('mask') == '2') { scrbReqPrstDtl.eqp_ser_num = $(':text[name="idEqpSerNum"]').val(); } //휴대폰 일련번호
			
			// 컬러
			scrbReqPrstDtl.eqp_color				=	$(':text[name="ideqpcolor"]').val();

			// USIM 구입일경우만
			if( scrbReqPrstDtl.usim_card_buy_yn == "02" ) {
				scrbReqPrstDtl.usim_pay_mthd		=	$(':radio[name="idUsimPayMthd"]:checked').val();	//유심카드납부방법
				scrbReqPrstDtl.usim_mdl			=	$(':text[name="idUsimMdlbuy"]').val();//유심카드모델코드
				if($(':text[name="iduSimNumbuy"]').attr('mask') == '2') { scrbReqPrstDtl.usim_num = $(':text[name="iduSimNumbuy"]').val(); } //유심카드일련번호
			}
			// 재사용
			else if( scrbReqPrstDtl.usim_card_buy_yn == "01" ) {
				scrbReqPrstDtl.usim_mdl			=	$(':text[name="idUsimMdl"]').val();//유심카드모델코드
				if($(':text[name="iduSimNum"]').attr('mask') == '2') { scrbReqPrstDtl.usim_num = $(':text[name="iduSimNum"]').val(); } //유심카드일련번호
			}
			
			//사용포인트에 대한 유효성 검사도 해야함.
			//T가족포인트 세팅
			scrbReqPrstDtl.t_fmly_point			=	$(':text[name="tFamilyPoint"]').val();
			//[추가] 금이도M / 김용일 / CHG610000062333/ "기변시 무약정 포인트 사용" :  무약정 플랜 적립 포인트/ 20180426
			try{
				scrbReqPrstDtl.eqp_pre_dc_pt			=	$(':text[name="eqpPreDcPoint"]').val();
			}catch (e) {
			}
			// 가족나눔데이터 신청 세팅
			scrbReqPrstDtl.fmly_div_data_yn = $('input[name="fmly_div_data_yn"]').val();
			// 결합상품
			var afmlyCombProds = [];
			$('input[name^="afmly_comb_prod"]:checked').each(function() {
				afmlyCombProds.push($(this).val());
			});
			scrbReqPrstDtl.afmly_comb_prod_cd = afmlyCombProds.join();
			
			scrbReqPrstDtl.omd_wifi_mac_addr = $("#t_omd_wifi_mac_addr").val();
			scrbReqPrstDtl.omd_nw_typ_cd = $("input[name=t_omd_nw_typ_cd]:checked").val();
			scrbReqPrstDtl.omd_nw_etc_typ_val = $("#t_omd_nw_etc_typ_val").val();
			scrbReqPrstDtl.omd_eqp_typ_cd = $("input[name=t_omd_eqp_typ_cd]:checked").val();
			scrbReqPrstDtl.omd_eqp_etc_typ_val = $("#t_omd_eqp_etc_typ_val").val();
			scrbReqPrstDtl.omd_freq_suprt_cd = $("input[name=t_omd_freq_suprt_cd]:checked").val();
			scrbReqPrstDtl.omd_sms_mms_suprt_cd = $("input[name=t_omd_sms_mms_suprt_cd]:checked").val();
			
			//[추가] 문호석M / 김성득 / CHG610000079356/ "Tgate 2G Fadeout 대응 개선 : " :  / 20190214
			scrbReqPrstDtl.old_idnt_num_op_cl_cd = $("input[name=old_idnt_num_op_cl_cd]:checked").val();
			scrbReqPrstDtl.eqp2g_cmp_mthd_cd = $("input[name=eqp2g_cmp_mthd_cd]:checked").val();
			
		},
		checkDtlSave : function() { //무선 유효성 검사
			if(	scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_MNP ||
					scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_KMNP ||
					scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_LMNP ||
					scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_KCTMNP ||
					scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_CJMNP ||
					scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_ONSNP ||
					scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_IBTNP ||
					scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_UNICNP ||
					scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_BIGCNP ||
					scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_SMTNP ||
					scrbReqPrstDtl.appl_form_scrb_typ == "14"|| 
					scrbReqPrstDtl.appl_form_scrb_typ == "15"|| 
					scrbReqPrstDtl.appl_form_scrb_typ == "16"|| 
					scrbReqPrstDtl.appl_form_scrb_typ == "17"|| 
					scrbReqPrstDtl.appl_form_scrb_typ == "18"|| 
					scrbReqPrstDtl.appl_form_scrb_typ == "19"|| 
					scrbReqPrstDtl.appl_form_scrb_typ == "20"|| 
					scrbReqPrstDtl.appl_form_scrb_typ == "21"|| 
					scrbReqPrstDtl.appl_form_scrb_typ == "22"|| 
					scrbReqPrstDtl.appl_form_scrb_typ == "23"|| 
					scrbReqPrstDtl.appl_form_scrb_typ == "24"|| 
					scrbReqPrstDtl.appl_form_scrb_typ == "25"|| 
					scrbReqPrstDtl.appl_form_scrb_typ == "26"|| 
					scrbReqPrstDtl.appl_form_scrb_typ == "27"|| 
					scrbReqPrstDtl.appl_form_scrb_typ == "28"|| 
					scrbReqPrstDtl.appl_form_scrb_typ == "29"|| 
					scrbReqPrstDtl.appl_form_scrb_typ == "30"|| 
					scrbReqPrstDtl.appl_form_scrb_typ == "31"||
					scrbReqPrstDtl.appl_form_scrb_typ == "32"||
					scrbReqPrstDtl.appl_form_scrb_typ == "33"||
					scrbReqPrstDtl.appl_form_scrb_typ == "34"||
					scrbReqPrstDtl.appl_form_scrb_typ == "35"||
					scrbReqPrstDtl.appl_form_scrb_typ == "36"||
					scrbReqPrstDtl.appl_form_scrb_typ == "37"||
					scrbReqPrstDtl.appl_form_scrb_typ == "38"||
					scrbReqPrstDtl.appl_form_scrb_typ == "39"||
					scrbReqPrstDtl.appl_form_scrb_typ == "40"||
					scrbReqPrstDtl.appl_form_scrb_typ == "41"||
					scrbReqPrstDtl.appl_form_scrb_typ == "42"||
					scrbReqPrstDtl.appl_form_scrb_typ == "43"||
					scrbReqPrstDtl.appl_form_scrb_typ == "44"||
					scrbReqPrstDtl.appl_form_scrb_typ == "45"||
					scrbReqPrstDtl.appl_form_scrb_typ == "46"||
					scrbReqPrstDtl.appl_form_scrb_typ == "47"||
					scrbReqPrstDtl.appl_form_scrb_typ == "48"||
					scrbReqPrstDtl.appl_form_scrb_typ == "49"||
					scrbReqPrstDtl.appl_form_scrb_typ == "50"||
					scrbReqPrstDtl.appl_form_scrb_typ == "51"||
					scrbReqPrstDtl.appl_form_scrb_typ == "52"||
					scrbReqPrstDtl.appl_form_scrb_typ == "53"||
					scrbReqPrstDtl.appl_form_scrb_typ == "54"||
					scrbReqPrstDtl.appl_form_scrb_typ == "55"||
					scrbReqPrstDtl.appl_form_scrb_typ == "56"||
					scrbReqPrstDtl.appl_form_scrb_typ == "57"||
					scrbReqPrstDtl.appl_form_scrb_typ == "58"
						){
					CONST_MNP_YN = true; //번호이동
				}else{
					CONST_MNP_YN = false; //번호이동이 아님
					if(scrbReqPrstDtl.pafpay_cnvt_mov == "20" || scrbReqPrstDtl.pafpay_cnvt_mov == "30"  ){
						scrbReqPrstDtl.mov_bf_bizr = $('select[name="idMovBfBizr"] option:selected').val();
					}else{
						scrbReqPrstDtl.mov_bf_bizr = "";
					}
					
					
				}			
				
				//console.log("checkDtlSave() CONST_MNP_YN : " + CONST_MNP_YN);
				//console.log("checkDtlSave() scrbReqPrstDtl.mov_bf_bizr : " + scrbReqPrstDtl.mov_bf_bizr);
				
				if($('select[name="idBuyrWireNumArea"] option:selected').val() == "" || $.trim($(':text[name="idBuyrWireNumExg"]').val()) == "" || $.trim($(':text[name="idBuyrWireNumNum"]').val()) == "")
				{
					alert("연락받을 전화번호 입력해주세요");
					return false;
				}  
				
				if(!CommUtil.checkPhonExg($(':text[name="idBuyrWireNumExg"]').attr('mask') == '2' ? $(':text[name="idBuyrWireNumExg"]').val() : scrbReqPrstDtl.buyr_wire_num_exg))
				{
					alert("연락받을 전화번호 형식이 잘못되었습니다");
					return false;
				}
				
				if(!CommUtil.checkPhonNum($(':text[name="idBuyrWireNumNum"]').attr('mask') == '2' ? $(':text[name="idBuyrWireNumNum"]').val() : scrbReqPrstDtl.buyr_wire_num_num))
				{
					alert("연락받을 전화번호 형식이 잘못되었습니다");
					return false;
				}
				
				if($('select[name="idBuyrPhonArea"] option:selected').val() == "" || $.trim($(':text[name="idBuyrPhonExg"]').val()) == "" || $.trim($(':text[name="idBuyrPhonNum"]').val()) == "")
				{
					alert("이동전화번호 입력해주세요");
					return false;
				}  
				
				if(!CommUtil.checkPhonExg($(':text[name="idBuyrPhonExg"]').attr('mask') == '2' ? $(':text[name="idBuyrPhonExg"]').val() : scrbReqPrstDtl.buyr_phon_exg))
				{
					alert("이동전화번호 형식이 잘못되었습니다");
					return false;
				}
				
				if(!CommUtil.checkPhonNum($(':text[name="idBuyrPhonNum"]').attr('mask') == '2' ? $(':text[name="idBuyrPhonNum"]').val() : scrbReqPrstDtl.buyr_phon_num))
				{
					alert("이동전화번호 형식이 잘못되었습니다");
					return false;
				}
				
				if (parent_service_num2 =="" || parent_service_num2 == null){
					if($.trim($(':text[name="email1"]').val()) == "" || $.trim($(':text[name="email3"]').val()) == "")
					{
						alert("E-MAIL 청구서를 입력해주세요");
						return false;
					}
					
					//[변경] 이정호M / 이종길 / CHG610000089119 / 동일명의통합청구 기능개선 : 동일명의 통합청구일때 validatiaon 제외처리  / 20190725
					if( scrbReqPrstDtl.appl_form_scrb_typ != CONST_APPLFORMSCRBTYP_CHGGNRL &&
					 	scrbReqPrstDtl.appl_form_scrb_typ != CONST_APPLFORMSCRBTYP_CHGCMP && 
					 	scrbReqPrstDtl.integ_inv_yn != "Y")
					{
					 	
					 	if($.trim($(':text[name="idBuyrBillZip1"]').val()) == "" || $.trim($(':text[name="idBuyrBillZip2"]').val()) == "" 
					 		|| $.trim($(':text[name="idByurInvBasAddr"]').val()) == "" || $.trim($(':text[name="idBuyrInvDtlAddr"]').val()) == "")
						{
							alert("청구지 주소를 입력해주세요");
							return false;
						}
					}
				}
				
				if( scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_CHGGNRL ||
					 	scrbReqPrstDtl.appl_form_scrb_typ == CONST_APPLFORMSCRBTYP_CHGCMP )
					{
						if(!isNum($(':text[name="tFamilyPoint"]').val())){
							alert("T 가족포인트는 숫자만 입력 가능합니다.");
							return false;
						}
						//[추가] 금이도M / 김용일 / CHG610000062333/ "기변시 무약정 포인트 사용" :  무약정 플랜 적립 포인트/ 20180426z
						try{
							if(!isNum($(':text[name="eqpPreDcPoint"]').val())){
								alert("무약정 플랜 적립 포인트는 숫자만 입력 가능합니다.");
								return false;
							}
						}catch (e) {
						}
				}
				
				if(scrbReqPrstDtl.comm_spmall_cd != "TS001"){
				
					//방문수령이 아닐경우 주소 체크
					if("02" != scrbReqPrstDtl.dlv_rcv_cd){
						if($.trim($(':text[name="idBuyrDlvZip1"]').val()) == "" || $.trim($(':text[name="idBuyrDlvZip2"]').val()) == "" 
							|| $.trim($(':text[name="idBuyrDlvBasAddr"]').val()) == "" || $.trim($(':text[name="idBuyrDlvDtlAddr"]').val()) == "")
						{
							alert("배송지 주소를 입력해주세요");
							return false;
						}
					
						if($.trim($(':text[name="idDlvRcvrNm"]').val()) == "")
						{
							alert("수령인명을  입력해주세요");
							return false;
						}
						
						if($('select[name="idDlvPhonArea"] option:selected').val() == "" || $.trim($(':text[name="idDlvPhonExg"]').val()) == "" 
							|| $.trim($(':text[name="idDlvPhonNum"]').val()) == "")
						{
							alert("수령인  전화번호를 입력해주세요");
							return false;
						}
						
						if(!CommUtil.checkPhonExg($(':text[name="idDlvPhonExg"]').attr('mask') == '2' ? $(':text[name="idDlvPhonExg"]').val() : scrbReqPrstDtl.dlv_phon_exg))
						{
							alert("수령인 전화번호 형식이 잘못되었습니다");
							return false;
						}
						
						if(!CommUtil.checkPhonNum($(':text[name="idDlvPhonNum"]').attr('mask') == '2' ? $(':text[name="idDlvPhonNum"]').val() : scrbReqPrstDtl.dlv_phon_num))
						{
							alert("수령인 전화번호 형식이 잘못되었습니다");
							return false;
						}
	
						if($('select[name="idDlvMblPhonArea"] option:selected').val()=="" || $.trim($(':text[name="idDlvMblPhonExg"]').val()) == "" 
							|| $.trim($(':text[name="idDlvMblPhonNum"]').val()) == "")
						{
							alert("수령인  이동전화번호를 입력해주세요");
							return false;
						}
						
						if(!CommUtil.checkPhonExg($(':text[name="idDlvMblPhonExg"]').attr('mask') == '2' ? $(':text[name="idDlvMblPhonExg"]').val() : scrbReqPrstDtl.dlv_mbl_phon_exg))
						{
							alert("수령인 이동전화번호 형식이 잘못되었습니다");
							return false;
						}
						
						if(!CommUtil.checkPhonNum($(':text[name="idDlvMblPhonNum"]').attr('mask') == '2' ? $(':text[name="idDlvMblPhonNum"]').val() : scrbReqPrstDtl.dlv_mbl_phon_num))
						{
							alert("수령인 이동전화번호 형식이 잘못되었습니다");
							return false;
						}
					}
				}
				
				//[변경] 이정호M / 이종길 / CHG610000089119 / 동일명의통합청구 기능개선 : 동일명의 통합청구일때 validatiaon 제외처리  / 20190725
				if( scrbReqPrstDtl.appl_form_scrb_typ != CONST_APPLFORMSCRBTYP_CHGGNRL &&
				 	scrbReqPrstDtl.appl_form_scrb_typ != CONST_APPLFORMSCRBTYP_CHGCMP && 
				 	scrbReqPrstDtl.integ_inv_yn != "Y")
				{
					if (parent_service_num2 =="" || parent_service_num2 == null){
						if($(':radio[name="idautoTrnsfBank"]:checked').val() == "01")
						{
							if($('select[name="idCommBankCd"] option:selected').val() == "")
							{
								alert("은행을 선택해주세요");
								return false;
							}
							
							if($(':text[name="idCommBankNum"]').val() == "")
							{
								alert("은행 계좌번호를 입력해주세요");
								return false;
							}
						}
						else if($(':radio[name="idautoTrnsfBank"]:checked').val() == "02")
						{
							if($('select[name="idCommCardCd"] option:selected').val() == "")
							{
								alert("카드사를 선택해주세요");
								return false;
							}
							
							if($(':text[name="idCommCardNum"]').val() == "")
							{
								alert("카드번호를 입력해주세요");
								return false;
							}
							
							if($('select[name="idCommCardEffPrdMth"] option:selected').val() == "")
							{
								alert("카드유효기간(월)을 선택해주세요");
								return false;
							}
							if($('select[name="idCommCardEffPrdYr"] option:selected').val() == "")
							{
								alert("카드유효기간(년)을 선택해주세요");
								return false;
							}
						}
					}
				}

				//[변경] 이정호M / 이종길 / CHG610000089119 / 동일명의통합청구 기능개선 : 동일명의 통합청구일때 validatiaon 제외처리  / 20190725
				//console.log("PROD_CL (wibro) : "+scrbReqPrstDtl.prod_cl); 
				if( scrbReqPrstDtl.appl_form_scrb_typ != CONST_APPLFORMSCRBTYP_CHGGNRL &&
				 	scrbReqPrstDtl.appl_form_scrb_typ != CONST_APPLFORMSCRBTYP_CHGCMP && 
				 	scrbReqPrstDtl.integ_inv_yn != "Y")
				{
					if(scrbReqPrstDtl.prod_cl != CONST_PRODCL_WIBRO)
					{
						/*
						if($.trim(idCommPrefrNum1) == "" && $.trim(idCommPrefrNum2) == "")
						{
							alert("희망번호를 입력해주세요");
							return false;
						} 
					 	
					 	if(!CommUtil.checkPhonNum(idCommPrefrNum1))
						{
							alert("첫번째 희망번호 형식이 잘못되었습니다");
							return false;
						}
						
						if(!CommUtil.checkPhonNum(idCommPrefrNum2))
						{
							alert("두번째 희망번호 형식이 잘못되었습니다");
							return false;
						}
						*/
					}
					if (parent_service_num2 =="" || parent_service_num2 == null){
						if($(':radio[name="idNewBillReqTyp"]:checked').val() == null || $(':radio[name="idNewBillReqTyp"]:checked').val() == "")
						{
							alert("청구서 종류를 선택해주세요");
							return false;
						}
					}
				 }
				
				// 가족 결합 데이터 체크
				if($("#afmly_comb_join_y").prop("checked")){
					if($(':checkbox[name^="afmly_comb_prod"]:checked').length == 0) {
						alert("결합상품을 선택해주세요.");
						return;
					}
					var fmlyCnt = 5;
					for(var i=1; i<=fmlyCnt; i++){
						if($("#fmly_"+i).prop("checked")){ 
							if($('#reqr_nm_'+ i).val() == "") { alert("가족결합 이름을 입력해주세요."); $("#reqr_nm_"+ i).focus(); return false; }
							if($('#reqr_enc_ctz_num_'+ i).val() == "") { alert("가족결합 생년월일을 입력해주세요."); $("#reqr_enc_ctz_num_"+ i).focus(); return false; }
							if($('#reqr_mbl_phon_num_'+ i).val() == "") { alert("가족결합 이동전화번호를 입력해주세요."); $("#reqr_mbl_phon_num_"+ i).focus(); return false; }
							if($('#fmly_rel_cd_'+ i).val() == "") { alert("가족결합 가족 관계를 선택해주세요."); $("#fmly_rel_cd_"+ i).focus(); return false; }
						}
					}
				}
				
				return true;
		}
};

//유선정보 저장
var wireScrbProc = {
		dtlSave : function() { 
			//연락받을전화번호
			scrbReqPrstDtl.wire_cntc_plc_phon_area = $('select[name="idWireCntcPlcPhonArea"] option:selected').val();
			if($(':text[name="idWireCntcPlcPhonExg"]').attr('mask') == '2') { scrbReqPrstDtl.wire_cntc_plc_phon_exg = $.trim($(':text[name="idWireCntcPlcPhonExg"]').val()); }
			if($(':text[name="idWireCntcPlcPhonNum"]').attr('mask') == '2') { scrbReqPrstDtl.wire_cntc_plc_phon_num = $.trim($(':text[name="idWireCntcPlcPhonNum"]').val()); }
			
			//이동전화번호
			scrbReqPrstDtl.wire_cntc_plc_mbl_phon_area = $('select[name="idWireCntcPlcMblPhonArea"] option:selected').val();
			if($(':text[name="idWireCntcPlcMblPhonExg"]').attr('mask') == '2') { scrbReqPrstDtl.wire_cntc_plc_mbl_phon_exg = $.trim($(':text[name="idWireCntcPlcMblPhonExg"]').val()); }
			if($(':text[name="idWireCntcPlcMblPhonNum"]').attr('mask') == '2') { scrbReqPrstDtl.wire_cntc_plc_mbl_phon_num = $.trim($(':text[name="idWireCntcPlcMblPhonNum"]').val()); }
			
			// e-mail 에 내용이 있을경우.
			if ($(':text[name="idWireReqrEmail1"]').length > 0)
			{
				var tempstr = "";
				
				tempstr += $.trim($(':text[name="idWireReqrEmail1"]').val());
				tempstr += "@";
				
				if($('select[name="idWireReqrEmail2"] option:selected').val() == "18")
					tempstr += $(':text[name="idWireReqrEmail3"]').attr('mask') == '2' ? $.trim($(':text[name="idWireReqrEmail3"]').val()) : $.trim($(':hidden[name="idWireReqrEmail3mask"]').val());	//E-MAIL 청구서
				else
					tempstr += $('select[name="idWireReqrEmail2"] option:selected').text();
				 
				scrbReqPrstDtl.wire_reqr_email_addr =	tempstr;
			}
			
			// 설치장소
			scrbReqPrstDtl.wire_set_plc_zip_1	= $(':text[name="idWireSetPlcZip1"]').val();
			scrbReqPrstDtl.wire_set_plc_zip_2 = $(':text[name="idWireSetPlcZip2"]').val();
			if($(':text[name="idWireSetPlcAddr1"]').attr('mask') == '2') { scrbReqPrstDtl.wire_set_plc_addr_1 = $(':text[name="idWireSetPlcAddr1"]').val(); }
			if($(':text[name="idWireSetPlcAddr2"]').attr('mask') == '2') { scrbReqPrstDtl.wire_set_plc_addr_2 = $(':text[name="idWireSetPlcAddr2"]').val(); }
			
			scrbReqPrstDtl.wire_svc_rel_req_mtr =	$(':text[name="idWireSvcRelReqMtr"]').val();	//개통요청사항
			scrbReqPrstDtl.wire_svc_prefr_dtm = $(':text[name="idWireSvcPrefrDtmDay"]').val() + $('select[name="idWireSvcPrefrDtmTime"] option:selected').val();	//개통요청일
			scrbReqPrstDtl.cntc_psbl_tm_cd = $('select[name="CALL_TIME"] option:selected').val();	//연락 시간대
			
			//방문연락처
			scrbReqPrstDtl.cust_visit_tel_area = $('select[name="VISIT_TEL_1"]').val();
			if($(':text[name="VISIT_TEL_2"]').attr('mask') == '2') { scrbReqPrstDtl.cust_visit_tel_exg = $(':text[name="VISIT_TEL_2"]').val(); }
			if($(':text[name="VISIT_TEL_3"]').attr('mask') == '2') { scrbReqPrstDtl.cust_visit_tel_num = $(':text[name="VISIT_TEL_3"]').val(); }
			scrbReqPrstDtl.wire_bill_typ = $(':radio[name="idWireBillTyp"]:checked').val();	//청구서수령방법
			
			// 청구지 수령 방법
			if( $(':radio[name="idWireBillTyp"]:checked').val() == "02")	// e-mail 
			{
				if ($(':text[name="idWireBillEmail"]').length > 0)//이메일
				{
					var tempstr2 = "";
				
					tempstr2 += $(':text[name="idWireBillEmail"]').val();
					tempstr2 += "@";
					
					if($('select[name="idWireBillEmail2"] option:selected').val() == "18")
						tempstr2 += $(':text[name="idWireBillEmail3"]').attr('mask') == '2' ? $(':text[name="idWireBillEmail3"]').val() : $(':text[name="idWireBillEmail3mask"]').val();	//E-MAIL 청구서
					else
						tempstr2 += $('select[name="idWireBillEmail2"] option:selected').text();
					 
					scrbReqPrstDtl.wire_bill_email_addr =	tempstr2;
				}
			}
			else if( $(':radio[name="idWireBillTyp"]:checked').val() == "01")	// 우편 
			{
				//청구서수령방법 우편
				scrbReqPrstDtl.wire_bill_zip_1 = $(':text[name="idWireBillZip1"]').val();
				scrbReqPrstDtl.wire_bill_zip_2 = $(':text[name="idWireBillZip2"]').val();
				if($(':text[name="idWireBillAddr1"]').attr('mask') == '2') { scrbReqPrstDtl.wire_bill_addr_1 =	$(':text[name="idWireBillAddr1"]').val(); }
				if($(':text[name="idWireBillAddr2"]').attr('mask') == '2') { scrbReqPrstDtl.wire_bill_addr_2 =	$(':text[name="idWireBillAddr2"]').val(); }
			}
			
			//자동이체 신청
			scrbReqPrstDtl.wire_pay_mthd = $(':radio[name="idWirePayMthd"]:checked').val();//은행,카드,지로 구분
			
			if($(':radio[name="idWirePayMthd"]:checked').val() == "01")
			{
				scrbReqPrstDtl.wire_comm_bank_cd = $('select[name="idWireBankCoCd"] option:selected').val();	//idWireBankCoCd.selectedItem.cd_val;	// 은행혹은 카드 코드 번호
				if($(':text[name="idWireBankNum"]').attr('mask') == '2') { scrbReqPrstDtl.wire_comm_bank_num = $(':text[name="idWireBankNum"]').val(); } //idWireBankNum"]').val();					//은행계좌번호, 카드카드번호
				scrbReqPrstDtl.wire_comm_bank_nm = $('select[name="idWireBankCoCd"] option:selected').text();	//idWireBankCoCd.selectedItem.lcl_nm;	//은행명
			}
			else if($(':radio[name="idWirePayMthd"]:checked').val() == "02")
			{
				scrbReqPrstDtl.wire_comm_bank_cd = $('select[name="idWireCardCoCd"] option:selected').val();	//idWireCardCoCd.selectedItem.cd_val;	// 은행혹은 카드 코드 번호
				if($(':text[name="idWireCardNum"]').attr('mask') == '2') { scrbReqPrstDtl.wire_comm_bank_num = $(':text[name="idWireCardNum"]').val(); } //idWireCardNum"]').val();					//은행계좌번호, 카드카드번호
				
				scrbReqPrstDtl.wire_comm_bank_nm = $('select[name="idWireCardCoCd"] option:selected').text();	//idWireCardCoCd.selectedItem.lcl_nm;	//은행명
									 
				scrbReqPrstDtl.wire_comm_card_eff_prd_mth = $('select[name="idWireCardEffPrdMth"] option:selected').val();	//카드유효기간 달
				scrbReqPrstDtl.wire_comm_card_eff_prd_yr = $('select[name="idWireCardEffPrdYr"] option:selected').val();		//카드유효기간 년도
			}


			//유선상품 신청내역( 일반전화/인터넷전화의 기존번호 또는 희망번호만 수정 가능)
			//2012.02.22 인터넷 상품 및 전화 상품도 수정 가능
//			if(isinet)	//인터넷
//			{
//				if(idWireInetProd.visible == true && idWireInetProd.includeInLayout == true)
//				{
//					scrbReqPrstDtl.wire_inet = idWireInetProd.selectedItem.data;
//					Debug.trace("scrbReqPrstDtl.wire_inet = " + scrbReqPrstDtl.wire_inet);
//					Debug.trace("idWireInetProd.selectedItem = " + idWireInetProd.selectedItem.data);
//				}
//			}
			if(isphon) //일반전화
			{
				if(scrbReqPrstDtl.wire_phon_new_yn == "01")	//신규가입
				{
					scrbReqPrstDtl.wire_phon_prefr_num_1 = $(':text[name="WIRE_PHON_PREFR_NUM_1"]').val();	//희망번호 1
					scrbReqPrstDtl.wire_phon_prefr_num_2 = $(':text[name="WIRE_PHON_PREFR_NUM_2"]').val();	//희망번호 2
				}
				else if(scrbReqPrstDtl.wire_phon_new_yn == "02")	//번호이동
				{
					//기존 전화번호
					scrbReqPrstDtl.wire_phon_exst_num_1 = $('select[name="WIRE_PHON_EXST_NUM_1"] option:selected').val();
					if($(':text[name="WIRE_PHON_EXST_NUM_2"]').attr('mask') == '2') { scrbReqPrstDtl.wire_phon_exst_num_2 = $(':text[name="WIRE_PHON_EXST_NUM_2"]').val(); }
					if($(':text[name="WIRE_PHON_EXST_NUM_3"]').attr('mask') == '2') { scrbReqPrstDtl.wire_phon_exst_num_3 = $(':text[name="WIRE_PHON_EXST_NUM_3"]').val(); }
				}
//				if(idWirePhonProd.visible == true && idWirePhonProd.includeInLayout == true)
//				{
//					Debug.trace("scrbReqPrstDtl.wire_phon1 = " + scrbReqPrstDtl.wire_phon);
//					scrbReqPrstDtl.wire_phon = scrbReqPrstDtl.wire_phon;
//					Debug.trace("scrbReqPrstDtl.wire_phon2 = " + scrbReqPrstDtl.wire_phon);
//					Debug.trace("idWirePhonProd.selectedItem.data = " + idWirePhonProd.selectedItem.data);
//				}
			}
			
			if(isinetphon) //인터넷전화
			{
				if(scrbReqPrstDtl.wire_inet_phon_new_yn == "01")	//신규가입
				{
					scrbReqPrstDtl.wire_inet_phon_prefr_num_1 = $(':text[name="WIRE_INET_PHON_PREFR_NUM_1"]').val();	//희망번호 1
					scrbReqPrstDtl.wire_inet_phon_prefr_num_2 = $(':text[name="WIRE_INET_PHON_PREFR_NUM_2"]').val();	//희망번호 2
				}
				else if(scrbReqPrstDtl.wire_inet_phon_new_yn == "02")	//번호이동
				{
					//기존 전화번호
					scrbReqPrstDtl.wire_inet_phon_exst_num_1 = $('select[name="WIRE_INET_PHON_EXST_NUM_1"] option:selected').val();
					if($(':text[name="WIRE_INET_PHON_EXST_NUM_2"]').attr('mask') == '2') { scrbReqPrstDtl.wire_inet_phon_exst_num_2 = $(':text[name="WIRE_INET_PHON_EXST_NUM_2"]').val(); }
					if($(':text[name="WIRE_INET_PHON_EXST_NUM_3"]').attr('mask') == '2') { scrbReqPrstDtl.wire_inet_phon_exst_num_3 = $(':text[name="WIRE_INET_PHON_EXST_NUM_3"]').val(); }
				}
			}
			if(bl_isgift_b || bl_isgift_t) {
				//SKT 본사 사은품 
				scrbReqPrstDtl.head_gift_itm = $(':hidden[name="skTheadGiftitemti_cd"]').val();	
				scrbReqPrstDtl.head_gift_itm_nm = $(':text[name="skTheadGiftitemti"]').val();
			
				//SKB 본사 사은품
				scrbReqPrstDtl.b_head_gift_itm = $(':hidden[name="skBheadGiftitemti_cd"]').val();	// (String(skBheadGiftitemti.data) == "null")?"":String(skBheadGiftitemti.data);
				scrbReqPrstDtl.b_head_gift_itm_nm = $(':text[name="skBheadGiftitemti"]').val();
				
				//고객사은품 배송 주소 
				scrbReqPrstDtl.wire_gift_dlv_zip_1 = $(':text[name="wire_gift_dlv_zip_1"]').val();
				scrbReqPrstDtl.wire_gift_dlv_zip_2 = $(':text[name="wire_gift_dlv_zip_2"]').val();
				if($(':text[name="wire_gift_dlv_bas_addr"]').attr('mask') == '2') { scrbReqPrstDtl.wire_gift_dlv_bas_addr = $(':text[name="wire_gift_dlv_bas_addr"]').val(); }
				if($(':text[name="wire_gift_dlv_dtl_addr"]').attr('mask') == '2') { scrbReqPrstDtl.wire_gift_dlv_dtl_addr = $(':text[name="wire_gift_dlv_dtl_addr"]').val(); }
				
				//고객사은품 수령인
				if($(':text[name="giftrecipient"]').attr('mask') == '2') { scrbReqPrstDtl.wire_dlv_rcvr_nm = $(':text[name="giftrecipient"]').val(); }
				
				//고객사은품 수령자 전화 
				scrbReqPrstDtl.wire_dlv_phon_area = $('select[name="giftphonarea"] option:selected').val();
				if($(':text[name="giftphonexg"]').attr('mask') == '2') { scrbReqPrstDtl.wire_dlv_phon_exg = $(':text[name="giftphonexg"]').val(); }
				if($(':text[name="giftphonnum"]').attr('mask') == '2') { scrbReqPrstDtl.wire_dlv_phon_num = $(':text[name="giftphonnum"]').val(); }
				
				//고객사은품 수령자 핸드폰 
				scrbReqPrstDtl.wire_dlv_mbl_phon_area = $('select[name="gifthparea"] option:selected').val();
				if($(':text[name="gifthpexg"]').attr('mask') == '2') { scrbReqPrstDtl.wire_dlv_mbl_phon_exg = $(':text[name="gifthpexg"]').val(); }
				if($(':text[name="gifthpnum"]').attr('mask') == '2') { scrbReqPrstDtl.wire_dlv_mbl_phon_num = $(':text[name="gifthpnum"]').val(); }
			}
		},
		checkDtlSave : function() {
			if($('select[name="idWireCntcPlcPhonArea"] option:selected').val() == "" 
				|| $.trim($(':text[name="idWireCntcPlcPhonExg"]').val()) == "" 
				|| $.trim($(':text[name="idWireCntcPlcPhonNum"]').val()) == "")
			{
				alert("연락받을 전화번호 입력해주세요");
				return false;
			}  
			
			if(!CommUtil.checkPhonExg($(':text[name="idWireCntcPlcPhonExg"]').attr('mask') == '2' ? $(':text[name="idWireCntcPlcPhonExg"]').val() : scrbReqPrstDtl.wire_cntc_plc_phon_exg))
			{
				alert("연락받을 전화번호 형식이 잘못되었습니다");
				return false;
			}
			
			if(!CommUtil.checkPhonNum($(':text[name="idWireCntcPlcPhonNum"]').attr('mask') == '2' ? $(':text[name="idWireCntcPlcPhonNum"]').val() : scrbReqPrstDtl.wire_cntc_plc_phon_num))
			{
				alert("연락받을 전화번호 형식이 잘못되었습니다");
				return false;
			}
			
			if($('select[name="idWireCntcPlcMblPhonArea"] option:selected').val() == "" || $.trim($(':text[name="idWireCntcPlcMblPhonExg"]').val()) == "" || $.trim($(':text[name="idWireCntcPlcMblPhonNum"]').val()) == "")
			{
				alert("이동전화번호 입력해주세요");
				return false;
			}  
			
			if(!CommUtil.checkPhonExg($(':text[name="idWireCntcPlcMblPhonExg"]').attr('mask') == '2' ? $(':text[name="idWireCntcPlcMblPhonExg"]').val() : scrbReqPrstDtl.wire_cntc_plc_mbl_phon_exg))
			{
				alert("이동전화번호 형식이 잘못되었습니다");
				return false;
			}
			
			if(!CommUtil.checkPhonNum($(':text[name="idWireCntcPlcMblPhonNum"]').attr('mask') == '2' ? $(':text[name="idWireCntcPlcMblPhonNum"]').val() : scrbReqPrstDtl.wire_cntc_plc_mbl_phon_num))
			{
				alert("이동전화번호 형식이 잘못되었습니다");
				return false;
			}
			
			if($(':text[name="idWireSetPlcZip1"]').val() == "" || $(':text[name="idWireSetPlcZip2"]').val() == "" || $(':text[name="idWireSetPlcAddr1"]').val() == "" || $(':text[name="idWireSetPlcAddr2"]').val() =="")
			{
				alert("주소 찾기로 설치장소 주소를 입력해주세요");
				return false;
			}
			
			
			if($.trim($(':text[name="idWireSvcPrefrDtmDay"]').val()) == "" || $('select[name="idWireSvcPrefrDtmTime"] option:selected').val() == "")
			{
				alert("개통 요청일을 선택해주세요");
				return false;
			}
			
			if($('select[name="CALL_TIME"] option:selected').val() == "")
			{
				alert("연락 시간대를 선택해주세요");
				return false;
			}
			
			if($('select[name="VISIT_TEL_1"] option:selected').val() == "" || $.trim($(':text[name="VISIT_TEL_2"]').val()) == "" || $.trim($(':text[name="VISIT_TEL_3"]').val()) == "")
			{
				alert("방문 연락처를 입력해주세요");
				return false;
			}
			
			if(!CommUtil.checkPhonExg($(':text[name="VISIT_TEL_2"]').attr('mask') == '2' ? $(':text[name="VISIT_TEL_2"]').val() : scrbReqPrstDtl.cust_visit_tel_exg))
			{
				alert("방문 연락처 형식이 잘못되었습니다");
				return false;
			}
			
			if(!CommUtil.checkPhonNum($(':text[name="VISIT_TEL_3"]').attr('mask') == '2' ? $(':text[name="VISIT_TEL_3"]').val() : scrbReqPrstDtl.cust_visit_tel_num))
			{
				alert("방문 연락처 형식이 잘못되었습니다");
				return false;
			}
			
			if ($(':text[name="idWireReqrEmail1"]').length > 0)
			{
				if($.trim($(':text[name="idWireReqrEmail1"]').val()) == "")
				{
					alert("Email을 입력해주세요");
					return false;
				}
				
				if($('select[name="idWireReqrEmail2"] option:selected').val() == "18")
				{
					if($.trim($(':text[name="idWireReqrEmail3"]').val()) == "")
					{
						alert("Email 메일 주소를 확인해주세요");
						return false;
					}
				}
				else
				{
					if($('select[name="idWireReqrEmail2"] option:selected').val() == "")
					{
						alert("Email 메일 주소를 확인해주세요");
						return false;
					}
				} 
			}
			
			
			if( $(':radio[name="idWireBillTyp"]:checked').val() == "02")	//청구지 수령 방법 e-mail 
			{
				if($(':text[name="idWireBillEmail"]').length > 0)	//청구지 이메일
				{
					if($.trim($(':text[name="idWireBillEmail"]').val()) == "")
					{
						alert("청구지 Email을 입력해주세요");
						return false;
					}
					
					if($('select[name="idWireBillEmail2"] option:selected').val() == "18")
					{
						if($.trim($(':text[name="idWireBillEmail3"]').val()) == "")
						{
							alert("청구지 Email주소를 확인해주세요");
							return false;
						}
					}
					else
					{
						if($('select[name="idWireBillEmail2"] option:selected').val() == "")
						{
							alert("청구지 Email주소를 확인해주세요");
							return false;
						}
					} 
				}
			}
			else if( $(':radio[name="idWireBillTyp"]:checked').val() == "01")	// 우편 
			{
				
				if($(':text[name="idWireBillZip1"]').val() == "" || $(':text[name="idWireBillZip2"]').val() == "" || $(':text[name="idWireBillAddr1"]').val() == "")
				{
					alert("청구지 수령 주소를 입력해주세요");
					return false;
				}
			}
			
			if($('select[name="idWirePayMthd"] option:selected').val() == "01")
			{
				if($('select[name="idWireBankCoCd"] option:selected').val() == "")
				{
					alert("은행을 선택해주세요");
					return false;
				}
				
				if($(':text[name="idWireBankNum"]').val() == "")
				{
					alert("은행 계좌번호를 입력해주세요");
					return false;
				}
			}
			else if($('select[name="idWirePayMthd"] option:selected').val() == "02")
			{
				if($('select[name="idWireCardCoCd"] option:selected').val() == "")
				{
					alert("카드사를 선택해주세요");
					return false;
				}
				if($(':text[name="idWireCardNum"]').val() == "")
				{
					alert("카드번호를 입력해주세요");
					return false;
				}
				if($('select[name="idWireCardEffPrdMth"] option:selected').val() == "")
				{
					alert("카드유효기간(월)을 선택해주세요");
					return false;
				}
				if($('select[name="idWireCardEffPrdYr"] option:selected').val() == "")
				{
					alert("카드유효기간(년)을 선택해주세요");
					return false;
				}
			}
			
			
			if(isphon) //일반전화
			{
				if(scrbReqPrstDtl.wire_phon_new_yn == "01")	//신규가입
				{
					if($.trim($(':text[name="WIRE_PHON_PREFR_NUM_1"]').val()) == "" || $.trim($(':text[name="WIRE_PHON_PREFR_NUM_2"]').val()) == "")
					{
						alert("일반전화 희망번호를 입력해주세요");
						return false;
					} 
					
					if(!CommUtil.checkPhonNum($(':text[name="WIRE_PHON_PREFR_NUM_1"]').val()))
					{
						alert("일반전화 첫번째 희망번호 형식이 잘못되었습니다");
						return false;
					}
					
					if(!CommUtil.checkPhonNum($(':text[name="WIRE_PHON_PREFR_NUM_2"]').val()))
					{
						alert("일반전화 두번째 희망번호 형식이 잘못되었습니다");
						return false;
					}
					
					if($(':text[name="WIRE_PHON_PREFR_NUM_1"]').val() == $(':text[name="WIRE_PHON_PREFR_NUM_2"]').val())
					{
						alert("일반전화 두개의 희망번호가 같습니다.다시 입력해 주세요");
						return false;
					}
					
				}
				else if(scrbReqPrstDtl.wire_phon_new_yn == "02")	//번호이동 기존 전화번호
				{
					if($('select[name="WIRE_PHON_EXST_NUM_1"] option:selected').val() == "" 
						|| $.trim($(':text[name="WIRE_PHON_EXST_NUM_2"]').val()) == "" 
						|| $.trim($(':text[name="WIRE_PHON_EXST_NUM_3"]').val()) == "")
					{
						alert("일번전화 기존전화번호를 입력해주세요");
						return false;
					} 
					
					if(!CommUtil.checkPhonExg($(':text[name="WIRE_PHON_EXST_NUM_2"]').attr('mask') == '2' ? $(':text[name="WIRE_PHON_EXST_NUM_2"]').val() : scrbReqPrstDtl.wire_phon_exst_num_2))
					{
						alert("일번전화 기존전화번호 형식이 잘못되었습니다");
						return false;
					}
					
					if(!CommUtil.checkPhonNum($(':text[name="WIRE_PHON_EXST_NUM_3"]').attr('mask') == '2' ? $(':text[name="WIRE_PHON_EXST_NUM_3"]').val() : scrbReqPrstDtl.wire_phon_exst_num_3))
					{
						alert("일번전화 기존전화번호 형식이 잘못되었습니다");
						return false;
					}
				}
			}
			
			if(isinetphon) //인터넷전화
			{
				if(scrbReqPrstDtl.wire_inet_phon_new_yn == "01")	//신규가입
				{
					if($.trim($(':text[name="WIRE_INET_PHON_PREFR_NUM_1"]').val()) == "" || $.trim($(':text[name="WIRE_INET_PHON_PREFR_NUM_2"]').val()) == "")
					{
						alert("인터넷전화 희망번호를 입력해주세요");
						return false;
					} 
					
					if(!CommUtil.checkPhonNum($(':text[name="WIRE_INET_PHON_PREFR_NUM_1"]').val()))
					{
						alert("인터넷전화 첫번째 희망번호 형식이 잘못되었습니다");
						return false;
					}
					
					if(!CommUtil.checkPhonNum($(':text[name="WIRE_INET_PHON_PREFR_NUM_2"]').val()))
					{
						alert("인터넷전화 두번재 희망번호 형식이 잘못되었습니다");
						return false;
					}
					
					if($(':text[name="WIRE_INET_PHON_PREFR_NUM_1"]').val() == $(':text[name="WIRE_INET_PHON_PREFR_NUM_2"]').val())
					{
						alert("인터넷전화 두개의 희망번호가 같습니다.다시 입력해 주세요");
						return false;
					}
				}
				else if(scrbReqPrstDtl.wire_inet_phon_new_yn == "02")	//번호이동 기존전화번호
				{
					if($('select[name="WIRE_INET_PHON_EXST_NUM_1"] option:selected').val() == "" 
						|| $.trim($(':text[name="WIRE_INET_PHON_EXST_NUM_2"]').val()) == "" 
							|| $.trim($(':text[name="WIRE_INET_PHON_EXST_NUM_3"]').val()) == "")
					{
						alert("일번전화 기존전화번호를 입력해주세요");
						return false;
					}
					
					if(!CommUtil.checkPhonExg($(':text[name="WIRE_INET_PHON_EXST_NUM_2"]').attr('mask') == '2' ? $(':text[name="WIRE_INET_PHON_EXST_NUM_2"]').val() : scrbReqPrstDtl.wire_inet_phon_exst_num_2))
					{
						alert("인터넷전화 기존전화번호 형식이 잘못되었습니다");
						return false;
					}
					
					if(!CommUtil.checkPhonNum($(':text[name="WIRE_INET_PHON_EXST_NUM_3"]').attr('mask') == '2' ? $(':text[name="WIRE_INET_PHON_EXST_NUM_3"]').val() : scrbReqPrstDtl.wire_inet_phon_exst_num_3))
					{
						alert("인터넷전화 기존전화번호 형식이 잘못되었습니다");
						return false;
					}
				}
			}
			
			if(bl_isgift_b || bl_isgift_t) 	//사은품이 있을경우
			{	
				if($(':text[name="wire_gift_dlv_zip_1"]').val() == "" || $(':text[name="wire_gift_dlv_zip_2"]').val() == "" 
					|| $(':text[name="wire_gift_dlv_bas_addr"]').val() == "" || $(':text[name="wire_gift_dlv_dtl_addr"]').val() =="")
				{
					alert("배송지 주소를 입력해주세요");
					return false;
				}
				
				if($.trim($(':text[name="giftrecipient"]').val()) == "")
				{
					alert("사은품 수령자를 입력해주세요");
					return false;
				}
				
				if($('select[name="giftphonarea"] option:selected').val() == "" || $.trim($(':text[name="giftphonexg"]').val()) == "" 
					|| $.trim($(':text[name="giftphonnum"]').val()) == "")
				{
					alert("수령자 유선전화번호를 입력해주세요");
					return false;
				}
				
				if(!CommUtil.checkPhonExg($(':text[name="giftphonexg"]').attr('mask') == '2' ? $(':text[name="giftphonexg"]').val() : scrbReqPrstDtl.wire_dlv_phon_exg))
				{
					alert("수령자 유선전화번호 형식이 잘못되었습니다");
					return false;
				}
				
				if(!CommUtil.checkPhonNum($(':text[name="giftphonnum"]').attr('mask') == '2' ? $(':text[name="giftphonnum"]').val() : scrbReqPrstDtl.wire_dlv_phon_num))
				{
					alert("수령자 유선전화번호 형식이 잘못되었습니다");
					return false;
				}
				
				if($('select[name="gifthparea"] option:selected').val() == "" || $.trim($(':text[name="gifthpexg"]').val()) == "" 
					|| $.trim($(':text[name="gifthpnum"]').val()) == "")
				{
					alert("수령자 유선전화번호를 입력해주세요");
					return false;
				}
				
				if(!CommUtil.checkPhonExg($(':text[name="gifthpexg"]').attr('mask') == '2' ? $(':text[name="gifthpexg"]').val() : scrbReqPrstDtl.wire_dlv_mbl_phon_exg))
				{
					alert("수령자 핸드폰번호 형식이 잘못되었습니다");
					return false;
				}
				
				if(!CommUtil.checkPhonNum($(':text[name="gifthpnum"]').attr('mask') == '2' ? $(':text[name="gifthpnum"]').val() : scrbReqPrstDtl.wire_dlv_mbl_phon_num))
				{
					alert("수령자 핸드폰번호 형식이 잘못되었습니다");
					return false;
				}
			}
							
			return true;
		}
		
};

//결합(기존/신규) 결합상품 저장
var comboOldComb = {
		dtlSave : function() { 
			if( scrbReqPrstDtl.prod_cl == CONST_PRODCL_COMBOLDNEW ) {
				// 이동전화번호
				scrbReqPrstDtl.buyr_phon_area			=	$('select[name="idBuyrPhonArea"] option:selected').val();
				if($(':text[name="idBuyrPhonExg"]').attr('mask') == '2') { scrbReqPrstDtl.buyr_phon_exg = $(':text[name="idBuyrPhonExg"]').val(); }
				if($(':text[name="idBuyrPhonNum"]').attr('mask') == '2') { scrbReqPrstDtl.buyr_phon_num = $(':text[name="idBuyrPhonNum"]').val(); }
			}
		}
};