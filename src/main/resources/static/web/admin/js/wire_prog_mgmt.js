var wireGridLoad = false; // Grid FrozenColumns 컨트롤시 사용
var giftRowId, spmallRowId, pcdRowId;

/* 무약정이 불가한 인터넷요금제 코드  @스마트요금제 */
var isnotcnt = "NI00000278,NI00000279,NI00000280,NI00000281,NI00000282,NI00000283,NI00000284,NI00000285";

var rowStatus = {};

var colInfos = [
{index:26,type:"select",item:null,col:"WIRE"}
,{index:27,type:"select",item:"04,05,11,06,07,08,09",col:"SET_REGU_CNTRCT"}
,{index:28,type:"select",item:"01,04,05,11,06,07,08,09",col:"WIRE_INET"}
,{index:29,type:"select",item:"01,04,05,11,06,07,08,09",col:"WIRE_INET_REGU_CNTRCT"}
,{index:30,type:"select",item:"01,04,05,11,06,07,08,09",col:"WIRE_INET_SUPL_SVC"}
,{index:31,type:"select",item:"07,08,09,10,11",col:"WIRE_TV"}
,{index:32,type:"select",item:"07,08,09,10,11",col:"WIRE_TV_REGU_CNTRCT"}
,{index:33,type:"select",item:"02,04,06,07,09",col:"WIRE_PHON_NEW_YN"}
,{index:34,type:"select",item:"02,04,06,07,09",col:"WIRE_PHON"}
,{index:35,type:"select",item:"02,04,06,07,09",col:"WIRE_PHON_REGU_CNTRCT"}
,{index:36,type:"select",item:"02,04,06,07,09",col:"WIRE_PHON_SUPL_SVC"}
,{index:37,type:"select",item:"03,05,06,08,09",col:"WIRE_INET_PHON_NEW_YN"}
,{index:38,type:"select",item:"03,05,06,08,09",col:"WIRE_INET_PHON"}
,{index:39,type:"select",item:"03,05,06,08,09",col:"WIRE_INET_PHON_REGU_CNTRCT"}
,{index:40,type:"select",item:"03,05,06,08,09",col:"WIRE_INET_PHON_ADD_SVC"}
,{index:41,type:"select",item:"03,05,06,08,09",col:"WIRE_INET_PHON_EQP_TYP"}
,{index:42,type:"text",item:"03,05,06,08,09",col:"WIRE_INET_PHON_CUST_PAY_AMT"}
,{index:43,type:"select",item:"03,05,06,08,09",col:"WIRE_INET_PHON_PRXPAY_CL"}
]

var wireProdMgmt = {
		 changeWire: function(wireVal, rowId) {
			 //console.log("changeWire : " + wireVal + " : " + rowId);
			 var _url = "/prod/getWireProdMappCheck.do";
			 var _data = {mapp_get_type : 'w_prod_cd', mapp_cd : wireVal}
			 if(wireVal != "") {
				 $.ajax({
					url: _url,
					data: _data,
					type: 'POST',
					dataType : "json",
					success : function(result, status) {
						if(result.isSucces) {
							var wireVal = result.rtn_w_prod_cd;
												
							for(var i=1; i < colInfos.length; i++) {
								 if(colInfos[i].item.lastIndexOf(wireVal)>-1) {
									 $('#'+colInfos[i].col+'_'+rowId).attr('disabled',false); 
								 } else {
									$('#'+colInfos[i].col+'_'+rowId).attr('disabled',true);
									$('#'+colInfos[i].col+'_'+rowId).val('');
									$prodGrid.jqGrid('setCell',rowId,colInfos[i].col, '');
								 }
							 }
							 
							//사은품 초기화
							$('#HEAD_GIFT_ITM_NM_'+rowId).html("");
							$('#HEAD_GIFT_ITM_CD_'+rowId).val("");
							$('#HQ_GIFT_DTL_ID_'+rowId).val("");
							$('#HQ_GIFT_DTL_NM_'+rowId).val("");
							$('#HEAD_GIFT_ITM_BTN_'+rowId).text("등록");
							$prodGrid.setCell(rowId, 'HEAD_GIFT_ITM', null);
							$prodGrid.setCell(rowId, 'HEAD_GIFT_ITM_NM', null);
							$prodGrid.setCell(rowId, 'HQ_GIFT_DTL_ID', null);
							$prodGrid.setCell(rowId, 'HQ_GIFT_DTL_NM', null);
		
							$('#B_HEAD_GIFT_ITM_NM_'+rowId).html("");
							$('#B_HEAD_GIFT_ITM_CD_'+rowId).val("");
							$('#B_HQ_GIFT_DTL_ID_'+rowId).val("");
							$('#B_HQ_GIFT_DTL_NM_'+rowId).val("");
							$('#B_HEAD_GIFT_ITM_BTN_'+rowId).text("등록");
							$prodGrid.setCell(rowId, 'B_HEAD_GIFT_ITM', null);
							$prodGrid.setCell(rowId, 'B_HEAD_GIFT_ITM_NM', null);
							$prodGrid.setCell(rowId, 'B_HQ_GIFT_DTL_ID', null);
							$prodGrid.setCell(rowId, 'B_HQ_GIFT_DTL_NM', null);
		
							$prodGrid.jqGrid('setCell',rowId,'WIRE', wireVal);
							$('#'+rowId, $prodGrid).addClass('edited');
						} else {
							alert(result.message);
							$("#WIRE_"+rowId).multiselect("uncheckAll");
							var multiWidget = $("#WIRE_"+rowId).multiselect("widget");
							multiWidget.find(":checkbox").each(function(index) {
								if(index < mlSlctIngetDefualtCheckBoxCnt(multiWidget)) {
									$(this).removeAttr("disabled");
								} else {
									$(this).attr("disabled", "disabled");
								}
							});
						}
					}
					,error : function(xhr, status) {
						alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
					}, 
					complete : function(xhr, status) {}
				});
			 }
		 },
		 setColValues : function(rowId, rowData) {
			 var wireVal = rowData["WIRE"];
			 for(var i=0; i < colInfos.length; i++) {
				 $('#'+colInfos[i].col+'_'+rowId).val(rowData[colInfos[i].col]);
				 if(colInfos[i].item==null || colInfos[i].item.lastIndexOf(wireVal)>-1) {
					 $('#'+colInfos[i].col+'_'+rowId).attr('disabled',false); 
				 } else {
					 $('#'+colInfos[i].col+'_'+rowId).attr('disabled',true);
				 }
			}
		 },
		 changeReguCntrct:function(obj, rowId, rowData, chkId) {
			 if(rowData[chkId]!=null && rowData[chkId]!="" && (rowStatus[chkId+"_"+rowId]==undefined || !rowStatus[chkId+"_"+rowId])) {
				$(obj).attr("disabled",true);
				$(obj).find('option').each(function() {
					if($(this).val()!="") $(this).attr("disabled",true);
				});
				
				if(isnotcnt.lastIndexOf(rowData[chkId])==-1) {
					$(obj).find('option[value="00"]').attr('disabled',false);
				} 
				 var _url = "/addsvc/jsonAgrmtDcCdComboList.do";
				 var _data = {
						 prodId : rowData[chkId]
				 }
				 $.ajax({
						url: _url,
						data: _data,
						type: 'POST',
						dataType : "json",
						success : function(result, status) {
							if(result!=null && result.errCd!=null && result.errCd=="success") {
								var ll = result.list;
								for(var i=0; i<ll.length;i++) {
									$(obj).find('option[value="'+ll[i]["agrmt_cd_mth_cd"]+'"]').attr('disabled',false);
								}
							} else {
								alert("서비스 호출중에 에러가 발생하였습니다.");
							}
						}
						,error : function(xhr, status) {
							alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
						}, 
						complete : function(xhr, status) {
							$(obj).attr("disabled",false);
							rowStatus[chkId+"_"+rowId] = true;
						}
				});
			 }
		 },
		 clearColData:function(obj, rowId, colNm) {
			 $(obj).val("");
			 $prodGrid.jqGrid('setCell',rowId,colNm, "");
		 },
		 saveColData:function(rowId, colNm, colVal) {
			 $prodGrid.jqGrid('setCell',rowId,colNm, colVal);
		 },
		 checkAddSvc:function(rowId, rowData, colNm, colVal, chkId, obj) {
			 if(colVal!=null && colVal!="" && rowData[chkId]!=null && rowData[chkId]!=null) {
				 var _url = "/addsvc/jsonCheckAddSvc.do";
				 var _data = {
						 prodId : rowData[chkId]
				 		,addProdId : colVal
				 }
				 $.ajax({
					url: _url,
					data: _data,
					type: 'POST',
					dataType : "json",
					success : function(result, status) {
						if(result!=null && result.errCd!=null && result.errCd=="success") {
							//check, count
							if(result.check!="Y") {
								alert("선택하신 요금제에는 부가서비스를 사용 할 수 없습니다.");
								wireProdMgmt.clearColData(obj, rowId, colNm);
							} else {
								wireProdMgmt.saveColData(rowId,colNm, colVal);
							}
						} else {
							alert("서비스 호출중에 에러가 발생하였습니다.");
							wireProdMgmt.clearColData(obj, rowId, colNm);
						}
					}
					,error : function(xhr, status) {
						alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
						wireProdMgmt.clearColData(obj, rowId, colNm);
					}, 
					complete : function(xhr, status) {
					}
				});
			 }
		 },
		 clearHeadGiftItm:function(rowId) {
			 $prodGrid.jqGrid('setCell',rowId,"HEAD_GIFT_ITM", "");
			 $prodGrid.jqGrid('setCell',rowId,"HEAD_GIFT_ITM_NM", "");
			 $('#HEAD_GIFT_ITM_'+rowId).val("");
			 $('#HEAD_GIFT_ITM_NM_'+rowId).html("");
		 },
		 clearBheadGiftItm:function(rowId) {		 
			 $prodGrid.jqGrid('setCell',rowId,"B_HEAD_GIFT_ITM", "");
			 $prodGrid.jqGrid('setCell',rowId,"B_HEAD_GIFT_ITM_NM", "");
			 $('#B_HEAD_GIFT_ITM_'+rowId).val("");
			 $('#B_HEAD_GIFT_ITM_NM_'+rowId).html("");
		 },
		 clickCol:function(obj, rowId) {
			 var colNm = obj.id.replace('_'+rowId,'');
			 var colVal = $(obj).val();
			 var rowData = $prodGrid.getRowData(rowId);
			 var wireVal = rowData["WIRE"];
			// console.log(JSON.stringify(rowData));
			 if(colNm=="WIRE_INET_REGU_CNTRCT") {
				this.changeReguCntrct(obj, rowId, rowData, "WIRE_INET");
			 } else if(colNm=="WIRE_TV_REGU_CNTRCT") {
				 this.changeReguCntrct(obj, rowId, rowData, "WIRE_TV");
			 } else if(colNm=="WIRE_PHON_REGU_CNTRCT") {
				 this.changeReguCntrct(obj, rowId, rowData, "WIRE_PHON");
			 } else if(colNm=="WIRE_INET_PHON_REGU_CNTRCT") {
				 this.changeReguCntrct(obj, rowId, rowData, "WIRE_INET_PHON");
			 }
		 },
		 changeCol:function(obj, rowId) {
			 var colNm = obj.id.replace('_'+rowId,'');
			 var colVal = $(obj).val();
			 var rowData = $prodGrid.getRowData(rowId);
			 var wireVal = rowData["WIRE"];
			 //인터넷 전화 대납여부에서 대납은 인터넷 전화정기계약이 3년인 경우만 가능하다.
			 if(colNm=="WIRE_INET_PHON_PRXPAY_CL" && colVal=="1") {
				 if(rowData["WIRE_INET_PHON_REGU_CNTRCT"]!="03") {
					 alert("대납은 정기계약 3년만 가능합니다");
					 $(obj).val("");
					 return false;
				 } else {
					 this.saveColData(rowId, colNm, colVal);
				 }
			 } else {
				 if(colNm=="SET_REGU_CNTRCT") {
					this.clearHeadGiftItm();
					this.clearBheadGiftItm();

					 this.saveColData(rowId, colNm, colVal);
				 } else if(colNm=="WIRE_INET_REGU_CNTRCT") {
					 if("01,02,03,10".lastIndexOf(wireVal)!=-1) {
						 this.clearHeadGiftItm();
						 this.clearBheadGiftItm();
					 }
					 this.saveColData(rowId, colNm, colVal);
				 } else if(colNm=="WIRE_INET") {
					 
					 this.clearColData($('#WIRE_INET_REGU_CNTRCT_'+rowId), rowId, "WIRE_INET_REGU_CNTRCT");
					 this.clearColData($('#WIRE_INET_SUPL_SVC_'+rowId), rowId, "WIRE_INET_SUPL_SVC");
					 
					 this.saveColData(rowId, colNm, colVal);
					 
					 rowStatus["WIRE_INET_"+rowId] = false;
					 
				 } else if(colNm=="WIRE_INET_SUPL_SVC") {
					 this.checkAddSvc(rowId, rowData, colNm, colVal, "WIRE_INET", obj);
					 
				 } else if(colNm=="WIRE_TV") {
					 this.clearColData($('#WIRE_TV_REGU_CNTRCT_'+rowId), rowId, "WIRE_TV_REGU_CNTRCT");
					 this.saveColData(rowId, colNm, colVal);
					 
					 rowStatus["WIRE_TV_"+rowId] = false;
				 } else if(colNm=="WIRE_PHON") {
					 this.clearColData($('#WIRE_INET_REGU_CNTRCT_'+rowId), rowId, "WIRE_INET_REGU_CNTRCT");
					 this.clearColData($('#WIRE_INET_SUPL_SVC_'+rowId), rowId, "WIRE_INET_SUPL_SVC");
					 
					 this.saveColData(rowId, colNm, colVal);
					 
					 rowStatus["WIRE_INET_"+rowId] = false;
				 } else if(colNm=="WIRE_PHON_REGU_CNTRCT") {
					 if("01,02,03,10".lastIndexOf(wireVal)!=-1) {
						 this.clearHeadGiftItm();
						 this.clearBheadGiftItm();
					 }
					 this.saveColData(rowId, colNm, colVal);
				 } else if(colNm=="WIRE_PHON_SUPL_SVC") {
					 this.checkAddSvc(rowId, rowData, colNm, colVal, "WIRE_PHONE", obj);
				 } else if(colNm=="WIRE_INET_PHON") {
					 this.clearColData($('#WIRE_INET_PHON_ADD_SVC_'+rowId), rowId, "WIRE_INET_PHON_ADD_SVC");
					 this.clearColData($('#WIRE_INET_PHON_REGU_CNTRCT_'+rowId), rowId, "WIRE_INET_PHON_REGU_CNTRCT");
					 
					 this.saveColData(rowId, colNm, colVal);
					 
					 rowStatus["WIRE_INET_PHON_"+rowId] = false;
				 } else if(colNm=="WIRE_INET_PHON_REGU_CNTRCT") {
					 if("01,02,03,10".lastIndexOf(wireVal)!=-1) {
						 this.clearHeadGiftItm();
						 this.clearBheadGiftItm();
					 }
					 this.saveColData(rowId, colNm, colVal);
				 } else if(colNm=="WIRE_INET_PHON_ADD_SVC") {
					 this.checkAddSvc(rowId, rowData, colNm, colVal, "WIRE_INET_PHON", obj);
				 } else {
					 this.saveColData(rowId, colNm, colVal);
				 }
			 }
			 
			 $('#'+rowId, $prodGrid).addClass('edited');
		 },
		 checkNum : function(obj) {
				var iVal = $(obj).val();
				if(iVal.trim()!="" && !/^[0-9]+$/.test(iVal)) {
					alert("숫자만 입력가능합니다.");
					$(obj).val(iVal.replace(/[^0-9\.]+/g, ""));
					$(obj).focus();
				}
		},
		 createTabs: function() {

				$('#${resources}/img').find('input[name=org_id]').val($('#org_lvl_40').val());
				$('#${resources}/img').find('input[name=user_id]').val($('#org_lvl_90').val());
				this.tabList($('#${resources}/img'), 'wireProdMgmt.resetFrozenCol(); wireGridLoad=false; wireProdMgmt.reloadGrid();', $("#prodGrid"));
		 },//엑셀 다운로드 이벤트
		 wlessExcel: function(org_id, user_id, wire_wless_comb_typ, tab_mgmt_seq, sale_chnl){
			if(mobile) {
					alert('해당기기에서는 엑셀다운로드를 지원하지 않습니다.');
					return false;
			}
			var ${resources}/img = document.${resources}/img;
			//${resources}/img.filenm.value = filenm;
			${resources}/img.org_id.value 				= org_id;
			${resources}/img.user_id.value 				= user_id;
			${resources}/img.wire_wless_comb_typ.value 	= wire_wless_comb_typ;
			${resources}/img.tab_mgmt_seq.value 			= tab_mgmt_seq;
			${resources}/img.sale_chnl.value 			= sale_chnl;
			${resources}/img.action						= "/tgate/excel/wireExcelExport.jsp";
			${resources}/img.target 						= "fileDownload";
			${resources}/img.submit();
		}, 
		loadOrgCombo: function() {
			/*
			 * Prod Org Combo Box Create with Change Event
			 * Param : form ID
			 * Hidden : org_id, mktg_org_lvl_cd
			 */
			prodOrgList($('#${resources}/img'), 'wireProdMgmt.createTabs();', $("#prodGrid"));	
		},
		resetFrozenCol: function() {
			$('#t_prodGrid, #tb_prodGrid').find('select[name=frozenCol]').val(1);
			$('#t_prodGrid').find('select[name=frozenCol]').trigger('change');
		},
		reloadGrid: function() {
			
			var sale_chnl                 = $('select[name=org_lvl_90] option:selected').attr('sale_chnl');
			var wire_wless_comb_typ       = $(':input[name=wire_wless_comb_typ]:radio:checked').val();
			var hide96                    = (sale_chnl != '96') ? true : false;
			popupData.sale_chnl           = sale_chnl;
			popupData.org_id              = $('select[name=org_lvl_40] option:selected').val();
			popupData.user_id             = $('select[name=org_lvl_90] option:selected').val();
			popupData.wire_wless_comb_typ = wire_wless_comb_typ;
			
			
			$prodGrid.clearGridData();
			$prodGrid.jqGrid('setGridParam', { page    : 1
			                                 , url     : '/prod/wireProdLst.do?' + $('#${resources}/img').serialize()
			                                 , editurl : '/prod/wireProdLst.do?' + $('#${resources}/img').serialize()
			                                 }).trigger("reloadGrid");
			
		},
		gridValidation:function(rowId, rowData, grid) {
			
			if(popupData.sale_chnl == '96') {
				/* 유선은 B2b_online_cl을 선택하는 항목이 없으므로 주석처리함
				if(rowData['B2B_ONLINE_CL'] == '') {
					alert(rowId+' 번째 상품 고객유형을 선택해주세요.');
					return false;
				}
				*/
			} else {
				grid.setCell(rowId, 'B2B_ONLINE_CL', 'C00');
			}
			
			var tmpWire = rowData['WIRE'];
			//console.log("tmpWire : " + tmpWire);
			if(tmpWire=="") {
				alert(rowId + " 번째 상품명을 선택해 주세요");
				return false;
			}
			
			if("04,05,06,07,08,09,11".lastIndexOf(tmpWire)!=-1 && rowData['SET_REGU_CNTRCT']=="") {
				alert(rowId + " 번째 세트약정을 선택해 주세요");
				return false;
			}
			
			if($.trim(rowData['PROD_SALE_PRD_FROM']) != '' || $.trim(rowData['PROD_SALE_PRD_TO']) != '') {
				if($.trim(rowData['PROD_SALE_PRD_FROM']) == '') {
					alert(rowId+' 번째 상품 활성화 시작일을 등록해주세요.');
					return false;
				}
		
				if($.trim(rowData['PROD_SALE_PRD_TO']) == '') {
					alert(rowId+' 번째 상품 활성화 종료일을 등록해주세요.');
					return false;
				}
			}
			
			if ("01,04,05,06,07,08,09,11".lastIndexOf(tmpWire) != -1)	//인터넷이 포함된 상품 
			{
				if ($.trim(rowData['WIRE_INET']) == "") {
					alert(rowId+' 번째 인터넷 상품을 선택해 주세요');
					return false;
				}
				
				if ($.trim(rowData['WIRE_INET_REGU_CNTRCT']) == "") {
					alert(rowId+' 번째 인터넷 정기계약을 선택해 주세요');
					return false;
				}
			}
			
			if ("07,08,09,10,11".lastIndexOf(tmpWire) != -1)	//BTv가 포함된 상품 
			{
				if ($.trim(rowData['WIRE_TV']) == "") {
					alert(rowId+' 번째 TV 요금제을 선택해 주세요');
					return false;
				}
				if ($.trim(rowData['WIRE_TV_REGU_CNTRCT']) == "") {
					alert(rowId+' 번째 TV 정기계약을 선택해 주세요');
					return false;
				}
				
			}
			
			if ("02,04,06,07,09".lastIndexOf(tmpWire) != -1)	//일반전화 가 포함된 상품
			{
				if ($.trim(rowData['WIRE_PHON_NEW_YN']) == "") {
					alert(rowId+' 번째 일반전화 신규/번호이동을 선택해 주세요');
					return false;
				}
				if ($.trim(rowData['WIRE_PHON']) == "") {
					alert(rowId+' 번째 일반전화 요금제을 선택해 주세요');
					return false;
				}
				if ($.trim(rowData['WIRE_PHON_REGU_CNTRCT']) == "") {
					alert(rowId+' 번째 일반전화 정기계약을 선택해 주세요');
					return false;
				}

			}
			
			if ("03,05,06,08,09".lastIndexOf(tmpWire) != -1)	//인터넷전화가 포함된 상품 
			{
				if ($.trim(rowData['WIRE_INET_PHON_NEW_YN']) == "") {
					alert(rowId+' 번째 인터넷전화 신규/번호이동을 선택해 주세요');
					return false;
				}
				
				if ($.trim(rowData['WIRE_INET_PHON']) == "") {
					alert(rowId+' 번째 인터넷전화 요금제을 선택해 주세요');
					return false;
				}
				if ($.trim(rowData['WIRE_INET_PHON_REGU_CNTRCT']) == "") {
					alert(rowId+' 번째 인터넷전화 정기계약을 선택해 주세요');
					return false;
				}
				if ($.trim(rowData['WIRE_INET_PHON_EQP_TYP']) == "") {
					alert(rowId+' 번째 인터넷전화 단말기 종류를 선택해 주세요');
					return false;
				}

				if ($.trim(rowData['WIRE_INET_PHON_PRXPAY_CL']) == "") {
					alert(rowId+' 번째 인터넷전화 대납여부를 선택해 주세요');
					return false;
				}
				
			}
			
			
			if($('#SPMALL_CD_'+rowId).val() == '') {
				alert(rowId+' 번째 상품 판매사이트를 등록해 주세요.');
				return false;
			}
		
			var colModel    = grid.jqGrid('getGridParam', 'colModel'), spmallCnt = 0;
			var spmall_cd   = rowData['SPMALL_CD'].split(',');
			var spmall_nm   = rowData['SPMALL_NM'].split(',');
			var spmall_cl   = rowData['SPMALL_CL'].split(',');
			var spmall_url  = rowData['SPMALL_URL'].split(',');
			var spmall_abbr = rowData['SPMALL_ABBR'].split(',');
			for(var s = 0; s < 40; s++) {
				if(s < spmall_cd.length) {
					var data = spmall_cd[s]+':=:'+spmall_url[s]+':=:'+spmall_nm[s]+':=:'+spmall_cl[s]+':=:'+spmall_abbr[s];
					grid.setCell(rowId, 'ICON_PATH_'+(s+1), data);
					spmallCnt++;
				} else {
					grid.setCell(rowId, 'ICON_PATH_'+(s+1), '');
				}
			}
			grid.setCell(rowId, 'SPMALL_CNT', spmallCnt);
			
			grid.setCell(rowId, 'TMP', "01"); //유선상품은 가입유형이 무조건 신규(01)

			
			//시작일/종료일
			grid.setCell(rowId, 'PROD_SALE_PRD_FROM', $('#PROD_SALE_PRD_FROM_'+rowId).val());
			grid.setCell(rowId, 'PROD_SALE_PRD_TO', $('#PROD_SALE_PRD_TO_'+rowId).val());
			grid.setCell(rowId, 'WIRE_INET_PHON_CUST_PAY_AMT', $('#WIRE_INET_PHON_CUST_PAY_AMT_'+rowId).val());
			
			return true;
		},
		/**
		 * 그리드 Row Copy
		 * 선택된 그리드 row Data를 가져와 str에 복사하여 return
		 */
		gridRowCopy : function(grid, rowId, rowCnt) {

			var rowData  = grid.getRowData(rowId);
			var colModel = grid.jqGrid('getGridParam', 'colModel');
			var str = '{';
			for(var i = 0; i< colModel.length; i++) {
				var nm   = colModel[i].name;
				var vl   = rowData[nm];
				var type = colModel[i].edittype;
				if(nm != 'cb' && nm != 'COMBI' && nm != 'PERIOD' && nm!='gift1' && nm!='gift2' && nm!='SPMALL' && nm.substring(0,6)!='noitem' && nm!='PCD_RGST_NM' ) {
					if(nm == 'NUM') {
						str += nm+':\''+(rowCnt+1)+'\'';
					} else if (nm == 'ACT_YN' || nm == 'ODER_ACT_YN') { // 상품관리 복사 또는 상품추가 시 필수 (중요:*****)
						str += nm+':\'Y\'';
					} else if (nm == 'RSV_PROD_YN') { // 상품관리 복사 또는 상품추가 시 필수 (중요:*****)
						str += nm+':\'N\'';
					} else if (nm == 'ALLOT_PRD') { // 상품관리 복사 또는 상품추가 시 필수 (중요:*****)
						str += nm+':\'0\'';
					} else if (nm == 'AGN_PROD_GRP_SEQ' || nm == 'PROD_GRP_SEQ') { // 상품관리 복사 또는 상품추가 시 필수 (중요:*****)
						str += nm+':null';
					// 활성기간 copy 오류로 주석처리 2013.12.19 T-Gate Song In Soon
					//} else if (nm == 'PROD_SALE_PRD_FROM' || nm == 'PROD_SALE_PRD_TO') { 
					//	str += nm+':\'\'';
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
		},
		//조직 Combo 또는 Tab 이벤트 발생시 실행
		selrValidation : function(slerName, type) {
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
		},
		searchValidation: function(slerName, grid, type) {
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
						if($('#'+rowIds[i], $prodGrid).attr('class').indexOf('checked') > 0) {
							return true;
						} else {
							if($('#'+rowIds[i], $prodGrid).attr('class').indexOf('edited') > 0 || $('#'+rowIds[i], $prodGrid).attr('class').indexOf('inserted') > 0) {
								if(confirm('저장 하지 않은 데이터는 적용되지 않습니다.\n변경하시겠습니까?')) {
									$('#'+rowIds[i], $prodGrid).addClass('checked');
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

		},
		successfunc: function(rowId, grid, last) {
			if(last) {
				wireProdMgmt.reloadGrid();
			}
		},
		errorfunc: function(rowId) {
			alert(rowId + ' 번째 상품 저장 중 오류가 발생하였습니다.');
			return;
		},
		tabList: function(fObj, nextProcess, grid) {
			
			$.ajax({
				  url      : '/prod/wlessProdTabList.do?'+fObj.serialize()
				, type     : 'POST'
				, dataType : 'JSON'
				, cache    : false
				, success  : function(data, stauts, request) {	
					var obj = data.tabList, li = '';
					for(var i = 0; i < obj.length; i++) {
						var className = (i == 0) ? 'class="current"' : '';
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
							ev.preventDefault();
							var $this = $(this);

							if(searchValidation('org_lvl_90', $prodGrid)) {
								$('#tabs').find('.current').removeClass();
								$this.parent().addClass('current');
								fObj.find('input[name=tab_mgmt_seq]').val($this.attr('seq'));
								eval(nextProcess);
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
			
		},
		createGridButtons:function(img_path) {

			// Title Buttons
			insertBtn = '<button type="button" class="btn btn-red  pull-right" id="insertBtn" ><img src="'+img_path+'/common/bul/add.png"   title="등록"         /> 등록</button>';
			deleteBtn = '<button type="button" class="btn btn-gray pull-right" id="deleteBtn" ><img src="'+img_path+'/common/bul/cross.png" title="삭제"         /> 삭제</button>';
			saveBtn   = '<button type="button" class="btn btn-red  pull-right" id="saveBtn"   ><img src="'+img_path+'/common/bul/save.png"  title="저장"         /> 저장</button>';
			excelBtn  = '<button type="button" class="btn btn-gray pull-right" id="excelBtn"  ><img src="'+img_path+'/common/bul/exel.png"  title="엑셀다운로드" /> 엑셀 다운로드</button>';
			newAddBtn = '<button type="button" class="btn btn-red  pull-right" id="newAddBtn" ><img src="'+img_path+'/common/bul/check.png"  title="신규등록" 	 /> 신규등록</button>';
			prodMtBtn = '<button type="button" class="btn btn-red  pull-left" id="prodMtBtn" ><img src="'+img_path+'/common/bul/pen.png"  title="신규등록" 	     />상품관리</button>';
			
			
			// Toolbar Buttons
			toolbarFrozen   = '<select class="select01" name="frozenCol" style="width:120px">';
			toolbarFrozen  += '<option value="1">고정컬럼수 : 1</option>';
			toolbarFrozen  += '<option value="2">고정컬럼수 : 2</option>';
			toolbarFrozen  += '<option value="3">고정컬럼수 : 3</option>';
			toolbarFrozen  += '<option value="4">고정컬럼수 : 4</option>';
			toolbarFrozen  += '</select>';
			toolbarAdd      = '<button type="button" class="btn btn-gray" style="cursor:pointer;vertical-align:middle;" id="addProdBtn" ><img src="'+img_path+'/common/bul/add.png"  title="상품추가"     /> 상품추가</button>';
			toolbarMod      = '<button type="button" class="btn btn-gray" style="cursor:pointer;vertical-align:middle;" id="modProdBtn" ><img src="'+img_path+'/common/bul/pen.png"  title="상품일괄수정" /> 상품일괄수정</button>';
			toolbarCopy     = '<button type="button" class="btn btn-gray" style="cursor:pointer;vertical-align:middle;" id="copyProdBtn"><img src="'+img_path+'/common/bul/copy.png" title="복사"         /> 복사</button>';
			toolbarMove     = '<button type="button" class="btn btn-gray" style="cursor:pointer;vertical-align:middle;" id="movProdBtn" > 이동 </span>';
			toolbarCustPay  = '<label>( 인터넷전화 고객부담금: 3년 약정시 월 부담금은 첫 달은 4,000원, 둘째 달부터는 2,400원 입니다 )</label>';
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
			colSearch       = '<img src="'+img_path+'/common/btn/btn_search.gif" $search$  title="찾기"   id="colSearchBtn" style="cursor:pointer;vertical-align:middle;padding-right:5px;"/>';
			colClear        = '<img src="'+img_path+'/common/btn/btn_del1.gif"   $clear$   title="지우기" id="colClearBtn"  style="cursor:pointer;vertical-align:middle;padding-right:5px;"/>';
			colModify       = '<img src="'+img_path+'/common/btn/btn_modify.gif" $onclick$ title="수정"   id="colModifyBtn" style="cursor:pointer;vertical-align:middle;padding-right:5px;"/>';
			colCalendar     = '<img src="'+img_path+'/common/ico/calendar.png"             title="달력"   id="colCalendar"  style="cursor:pointer;vertical-align:middle;padding-right:5px;"/>';
			colAdd          = '<span class="btn btn-gray" title="등록" $onclick$ style="cursor:pointer;vertical-align:middle;">등록</span>';
			colMod          = '<span class="btn btn-gray" title="수정" $onclick$ style="cursor:pointer;vertical-align:middle;">수정</span>';
			
			colDiv          = '<div style="width:95%;align:center;margin:0 auto;">$div$</div>';
			
			input4          = [ '<input type="text" name="$name$" id="$id$" value="$value$" style="width:22%;height:auto;"/>', '<input type="text" name="$name$" id="$id$" value="$value$" style="width:22%;height:auto;"/>'
			                  , '<input type="text" name="$name$" id="$id$" value="$value$" style="width:22%;height:auto;"/>', '<input type="text" name="$name$" id="$id$" value="$value$" style="width:22%;height:auto;"/>'];
			
			textsearchclear = '<span $id$ style="vertical-align:middle;padding-right:5px;">$value$</span>'+colSearch+colClear;
			
			buttonlink      = colModify+'<span $spanId$ style="vertical-align:middle;padding-left:5px;">$span$</span>';
		},// 그리드가 화면을 벗어나지 않게 Max 사이즈로 고정 후 가로 스크롤 생성
		gridHScroll:function(obj) {
			var id = obj.attr('id');
			obj.setGridWidth($('#gbox_'+id).css('width'), false);
			$('.ui-jqgrid-bdiv').css('overflow-x', 'scroll');
		},// 그리드가 화면을 벗어나지 않게 Max 사이즈로 고정 후 세로 스크롤 생성
		gridVScroll:function(obj) {
			var id = obj.attr('id');
			obj.setGridWidth($('#gbox_'+id).css('width'), false);
			$('.ui-jqgrid-bdiv').css('overflow-y', 'scroll');
		},// Grid 틀고정
		frozenColumns:function(Obj, size, idx, flag, plus) {
			if(!($.browser.msie && parseFloat($.browser.version)<8)){
				if(flag) {
					for(var s = 0; s <= size + plus; s++) {
						var colNm = Obj.getCellName(s);
						Obj.setColProp(colNm, {frozen : false});
					}
					Obj.jqGrid('destroyFrozenColumns');
				}
				var index = (idx > 1) ? parseInt(idx)+plus : idx;
				for(var i = 0; i <= index ; i++) {
					var colNm = Obj.getCellName(i);
					Obj.setColProp(colNm, {frozen : true});
				}
				Obj.jqGrid('setFrozenColumns');	
			}
		},
		/**
		 * 판매사이트 설정 팝업
		 */
		openSaleSiteCont : function(grid, rowId, spmall_cd, spmall_nm) {
			if($('#'+rowId, grid).attr('class').indexOf('edited') > 0 || $('#'+rowId, grid).attr('class').indexOf('inserted') > 0) {
				alert('저장 후 사용 가능 합니다.');
				return;
			}
			
			var rowData = grid.getRowData(rowId);
			popupData.eqp_mdl_cd   = rowData['EQP_MDL_CD']; 
			popupData.cd           = spmall_cd; 
			popupData.nm           = spmall_nm; 
			popupData.spmall_abbr  = rowData['SPMALL_ABBR'];  
			popupData.scrb_cl_cd   = "01";
			popupData.scrb_cl_nm   = "신규"; 
			popupData.prod_seq     = rowData['PROD_SEQ'];
			popupData.prod_grp_seq = rowData['PROD_GRP_SEQ'];
			
			eval(saleSiteContF);
		},
		initWireProdMapp : function(grid, rowIds) {
		// 2016.06.06 티게이트고도화 이종길
			for(var i = 0; i < rowIds.length; i++) {								// row 수 만큼 돌면서 세팅
				var rowId = rowIds[i];
				var rowData = grid.getRowData(rowId);
				var wireValue = rowData['WIRE'];				
				mlSlctInitProdMappForAjax(rowId, wireValue);
			}
		}, addWireProdMapp : function(grid, rowId, mode) {
			// 2016.06.06 티게이트고도화 이종길
			if("copy" == mode) {
				var rowData = grid.getRowData(rowId);
				var wireValue = rowData['WIRE'];				
				mlSlctInitProdMappForAjax(rowId, wireValue);
			} else if ("insert" == mode) {
				mlSlctInitProdMapp(rowId);
			} else {
				alert("mode value가 잘못되었습니다. 'copy' 또는 'insert'를 선택해주십시요.");
			}
		}
};

var searchGiftItem = function(corp, rowNum) {
	//2014.04.17 사은품 로직 안타던것 tgate2.0 버전으로 변경
	//var wire = $('#WIRE_'+rowNum).val();
	var head_gift_itm_cd = $('#HEAD_GIFT_ITM_CD_'+rowNum).val();
	var hq_gift_dtl_id = $('#HQ_GIFT_DTL_ID_'+rowNum).val();
	var b_head_gift_itm_cd = $('#B_HEAD_GIFT_ITM_CD_'+rowNum).val();
	var b_hq_gift_dtl_id = $('#B_HQ_GIFT_DTL_ID_'+rowNum).val();
	var giftItmCd = "";
	var giftDtlId = "";

	var coClCd = corp;
	var setClCd = "";	//T에서 B사은품은 무조건 단품으로 셋팅
	var svcCd = "";
	var payStrdAgrmtDcMthCd = ""; 
	var orgId = $('select[name=org_lvl_40] option:selected').val();
	
	var rowData = $prodGrid.getRowData(rowNum);
	var wire = rowData["WIRE"];
	
	
	//alert("wire : "+ wire + "svc_num : "+ svc_num);
	
	/*
 		인터넷 - 인터넷정기예약
		일반전화 -  일반전화정기계약
		인터넷전화 - 인터넷전화정기계약
		TV- TV정기계약
	 */
	if(wire != "01" && wire != "02" && wire != "03" && wire != "10"){
		svcCd = "";
		payStrdAgrmtDcMthCd = $('#SET_REGU_CNTRCT_'+rowNum).val();
	}else if(wire == "01"){//인터넷
		svcCd = "I";
		payStrdAgrmtDcMthCd = $('#WIRE_INET_REGU_CNTRCT_'+rowNum).val();
	}else if(wire == "02"){//일반전화
		svcCd = "P";
		payStrdAgrmtDcMthCd = $('#WIRE_PHON_REGU_CNTRCT_'+rowNum).val();
	}else if(wire == "03"){//인터넷전화
		svcCd = "P";
		payStrdAgrmtDcMthCd = $('#WIRE_INET_PHON_REGU_CNTRCT_'+rowNum).val();
	}else if(wire == "10"){//Btv
		svcCd = "T";
		payStrdAgrmtDcMthCd = $('#WIRE_TV_REGU_CNTRCT_'+rowNum).val();
	}else{
		//잘 못된 상품 코드
		alert("오류");
	}
	
	if(wire == "01" || wire == "02" || wire == "03" || wire == "10"){
		setClCd = "2";	//단품
	}else{
		setClCd = "1";	//셋트
	}
	
	if(corp == "B"){
		setClCd = "2";	//Tgate에서 B상품은 무조건 단품
		svcCd = "T";
		payStrdAgrmtDcMthCd = $('#WIRE_TV_REGU_CNTRCT_'+rowNum).val();
		giftItmCd = b_head_gift_itm_cd;
		giftDtlId = b_hq_gift_dtl_id;
	} else {
		giftItmCd = head_gift_itm_cd;
		giftDtlId = hq_gift_dtl_id;
	}
	//alert("wire : " + wire + " / coClCd : " + coClCd + " / setClCd : " + setClCd + " / svcCd : " + svcCd + " / payStrdAgrmtDcMthCd : " + payStrdAgrmtDcMthCd + " / orgId : " + orgId);

	giftRowId = rowNum;
	var url = "/freegift/popFreeGiftPlcy.do?coClCd="+coClCd+"&setClCd="+setClCd+"&svcCd="+svcCd+"&payStrdAgrmtDcMthCd="+payStrdAgrmtDcMthCd+"&orgId="+orgId+"&giftItmCd="+giftItmCd+"&giftDtlId="+giftDtlId;
	var twm = "searchGiftItemWin";
	var centeredY,centeredX,width = 950,height = 760;
	if($.browser.msie) {
		centeredY = (window.screenTop - 120) + ((((document.documentElement.clientHeight + 120)/2) - (height/2)));
		centeredX = window.screenLeft + ((((document.body.offsetWidth + 20)/2) - (width/2)));
	} else {
		centeredY = window.screenY + (((window.outerHeight/2) - (height/2)));
		centeredX = window.screenX + (((window.outerWidth/2) - (width/2)));
	}
	window.open(url,twm, "width="+width+", height="+height+", left=" + centeredX +",top=" + centeredY+", toolbar=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no");
}

var setFreeGiftItems = function(co_cl_cd, giftMgmtNum, giftNm, giftNumCheckList, giftNmCheckList) {
	if(co_cl_cd=="T") {
		$('#HEAD_GIFT_ITM_NM_'+giftRowId).html(giftNm);
		$('#HEAD_GIFT_ITM_CD_'+giftRowId).val(giftMgmtNum);
		$('#HQ_GIFT_DTL_ID_'+giftRowId).val(giftNumCheckList);
		$('#HQ_GIFT_DTL_NM_'+giftRowId).val(giftNmCheckList);
		$prodGrid.setCell(giftRowId, 'HEAD_GIFT_ITM', giftMgmtNum);
		$prodGrid.setCell(giftRowId, 'HEAD_GIFT_ITM_NM', giftNm);
		$prodGrid.setCell(giftRowId, 'HQ_GIFT_DTL_ID', giftNumCheckList);
		$prodGrid.setCell(giftRowId, 'HQ_GIFT_DTL_NM', giftNmCheckList);
	} else {
		$('#B_HEAD_GIFT_ITM_NM_'+giftRowId).html(giftNm);
		$('#B_HEAD_GIFT_ITM_CD_'+giftRowId).val(giftMgmtNum);
		$('#B_HQ_GIFT_DTL_ID_'+giftRowId).val(giftNumCheckList);
		$('#B_HQ_GIFT_DTL_NM_'+giftRowId).val(giftNmCheckList);
		//사은품
		$prodGrid.setCell(giftRowId, 'B_HEAD_GIFT_ITM', giftMgmtNum);
		$prodGrid.setCell(giftRowId, 'B_HEAD_GIFT_ITM_NM', giftNm);
		$prodGrid.setCell(giftRowId, 'B_HQ_GIFT_DTL_ID', giftNumCheckList);
		$prodGrid.setCell(giftRowId, 'B_HQ_GIFT_DTL_NM', giftNmCheckList);
	}
	$('#'+giftRowId, $prodGrid).addClass('edited');
}

var checkSpmallCode = function(rowId) {
	var org_id =$('select[name=org_lvl_40] option:selected').val();
	var rowData = $prodGrid.getRowData(rowId);
	popupData.chnl_cd = '';
	popupData.org_id = org_id=="null"?"":org_id;
	popupData.nm = rowData["SPMALL_NM"];
	popupData.cd = rowData["SPMALL_CD"];
	popupData.spmall_cl= rowData["SPMALL_CL"];
	popupData.spmall_url= rowData["SPMALL_URL"];
	popupData.spmall_abbr= rowData["SPMALL_ABBR"];
	
}


//쇼핑몰 찾기
var openSpmall = function(rowNum) 
{
	spmallRowId = rowNum;
	checkSpmallCode(rowNum);
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

	var popupWin = window.open(url,twm, "width="+width+", height="+height+", left=" + centeredX +",top=" + centeredY+", toolbar=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no");

};

//쇼핑몰 초기화
var closeSpmall = function() 
{
	popupData.cd = "";
	popupData.nm = "";
	$('#idSpmall').val('');
	$('#idSpmallNm').val('0');
};

//판매점 찾기
var openPcdRgstNm = function(rowNum) 
{
	pcdRowId = rowNum;
	//코드 초기화
	cleanKait_acept_sale_br_cd(rowNum);
	var url = "/common/PcbRgstSrchListWire.do?popType=single";
	var twm = "openPcdRgstNmWire";
	var centeredY,centeredX,width = 600,height = 730;
	if($.browser.msie) {
		centeredY = (window.screenTop - 120) + ((((document.documentElement.clientHeight + 120)/2) - (height/2)));
		centeredX = window.screenLeft + ((((document.body.offsetWidth + 20)/2) - (width/2)));
	} else {
		centeredY = window.screenY + (((window.outerHeight/2) - (height/2)));
		centeredX = window.screenX + (((window.outerWidth/2) - (width/2)));
	}

	var popupWin = window.open(url,twm, "width="+width+", height="+height+", left=" + centeredX +",top=" + centeredY+", toolbar=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no");

};


//판매점 코드 초기화
var cleanKait_acept_sale_br_cd = function(rowId){
	var rowData = $prodGrid.getRowData(rowId);
	popupData.cd = rowData["PCD_RGST_NM"];
}


function rtnFunctionWire(popType) {
	//alert("return rtnFunctionWire : " +popupData.cd);
	var cd = '';
	cd = popupData.cd!=null?popupData.cd:"";
	
		//판매점 코드 세팅
	$('#PCD_RGST_NM_TXT_'+pcdRowId).html(popupData.cd);

	//$prodGrid.setCell(pcdRowId, 'PCD_RGST_NM', popupData.cd);
	$prodGrid.setCell(pcdRowId, 'KAIT_ACEPT_SALE_BR_CD', popupData.cd);

	
	$('#'+pcdRowId, $prodGrid).addClass('edited');

	
}


function rtnFunction(popType) {
	//console.log("rtnFunction : " + spmallRowId + " ==> " + JSON.stringify(popupData));
	var retStr = "";
	var cd = popupData.cd!=null?popupData.cd.split(','):"";
	
	var nm = popupData.nm!=null?popupData.nm.split(','):"";
	var abbr = popupData.spmall_abbr!=null?popupData.spmall_abbr.split(','):"";
	
	for(var i = 0; i < abbr.length; i++) {
		retStr += '<a href="javascript:wireProdMgmt.openSaleSiteCont($(\'#'+$prodGrid.attr('id')+'\'), \''+spmallRowId+'\', \''+cd[i]+'\', \''+nm[i]+'\');" title="'+nm[i]+'">'+abbr[i]+'</a>';
		if(i < abbr.length - 1) {
			retStr += ',';
		}
	}
	
	//console.log(popupData.cd);
	//console.log(popupData.nm);
	//console.log(popupData.spmall_abbr);
	//console.log(retStr);
	$('#SPMALL_NM_'+spmallRowId).val(popupData.nm);
	$('#SPMALL_CD_'+spmallRowId).val(popupData.cd);
	$('#SPMALL_TXT_'+spmallRowId).html(retStr);
	

	$prodGrid.setCell(spmallRowId, 'SPMALL_CD', popupData.cd);
	$prodGrid.setCell(spmallRowId, 'SPMALL_NM', popupData.nm);
	$prodGrid.setCell(spmallRowId, 'SPMALL_CL', popupData.spmall_cl);
	$prodGrid.setCell(spmallRowId, 'SPMALL_URL', popupData.spmall_url);
	$prodGrid.setCell(spmallRowId, 'SPMALL_ABBR', popupData.spmall_abbr);

	$('#'+spmallRowId, $prodGrid).addClass('edited');
}

/**
 *  그리드 로딩시 사용하는 멀티셀렉트 Init 함수
 * @param rowId
 * @param mapp_cd
 */
function mlSlctInitProdMappForAjax(rowId, mapp_cd) {
	// 상품코드로 멀티셀렉트를 위한 맵핑 값을 조회 
	var _url = "/prod/getWireProdMappCheck.do";
	var _data = {rowId : rowId, mapp_get_type : 'mapp_w_prod_cd', mapp_cd : mapp_cd};
	 $.ajax({
		url: _url,
		data: _data,
		type: 'POST',
		dataType : "json",
		success : function(result, status) {
			var rtn_mapp_w_prod_cd = result.rtn_mapp_w_prod_cd;	// 맵핑값
			$('#WIRE_'+rowId).multiselect({
			    noneSelectedText:"선택"
			    ,header:false
			    ,minWidth:180
			    , create : function(e) {
			    	mlSlctInCreateFn($(this), rtn_mapp_w_prod_cd, mapp_cd);
			    }
			    ,open : function(e) {
			    	// 셀렉트박스 중간 점선 라인 출력
			    	mlSlctInOpenFn($(this));
			    }
			    ,click : function(event, ui) {
			    	var multiWidget = $(this).multiselect("widget");
			    	mlSlctInClickFn(rowId, multiWidget, event, ui);
			    }
			    ,selectedText:function(numChecked, numTotal, checkedItems){
			    	return mlSlctInSelectedTextFn(numChecked, numTotal, checkedItems);
			    }
			   });
		}
		,error : function(xhr, status) {
			alert("알수없는 에러가 발생 하였습니다.\n운영자에게 문의하여 주세요.");
		}, 
		complete : function(xhr, status) {}
	});
}

/**
 * 상품추가시 사용하는 멀티셀렉트 Init 함수
 * @param rowId
 */
function mlSlctInitProdMapp(rowId) {
	// 상품선택 : 상품 추가
	$('#WIRE_'+rowId).multiselect({
	    noneSelectedText:"선택"
	    ,header:false
	    ,minWidth:180
	    , create : function(e) {
	    	var multiWidget = $(this).multiselect("widget");
	    	// 상품추가시 멀티셀러터 헤더 강제 disabled
	    	multiWidget.find(".ui-widget-header").children().attr("disabled","disabled");
	    	$(this).multiselect("uncheckAll");	
	    	multiWidget.find(":checkbox").each(function(index) {
	    		if(index < mlSlctIngetDefualtCheckBoxCnt(multiWidget)) {
	    			$(this).removeAttr("disabled","disabled");
	    		} else {
	    			$(this).attr("disabled","disabled");
	    		}
	    	});
	    }
	    ,open : function(e) {
	    	// 셀렉트박스 중간 점선 라인 출력
	    	mlSlctInOpenFn($(this));
	    }
	    ,click : function(event, ui) {
	    	var multiWidget = $(this).multiselect("widget");
	    	mlSlctInClickFn(rowId, multiWidget, event, ui);
	    }
	    ,selectedText:function(numChecked, numTotal, checkedItems){
	    	return mlSlctInSelectedTextFn(numChecked, numTotal, checkedItems);
	    }
	   });
}

/**
 * 멀티셀렉트 안에서 사용하는 click 이벤트 처리 함수
 * @param rowId
 * @param multiWidget
 * @param event
 * @param ui
 */
function mlSlctInClickFn(rowId, multiWidget, event, ui) {
	var tmpId = multiWidget.find("li").find("input").eq(0).attr("id");
	var tmpIdLen = tmpId.length;
	var idStr = tmpId.substring(0,tmpIdLen-1);
	var onlyOneCheckFirstIndex = 0;
	var onlyOneCheckLastIndex = mlSlctIngetDefualtCheckBoxCnt(multiWidget);
	var mulitCheckFirstIndex = mlSlctIngetDefualtCheckBoxCnt(multiWidget);
	var multiCheckLastIndex = mlSlctIngetDefualtCheckBoxCnt(multiWidget) * 2;
	var idCheck = false; 
	
	if(multiWidget.find("input").is(":checked")) {				    		
    	var checkedId = multiWidget.find("input:checked").attr("id");
    	var checkedVal = multiWidget.find("input:checked").val();
    	
    	for(var idStrIndex =0; idStrIndex<onlyOneCheckLastIndex; idStrIndex++) {
    		if(checkedId == idStr+idStrIndex) {
    			idCheck = true;
    			break;
    		}
    	}
    	
    	if(idCheck) {
    		for(var i=onlyOneCheckFirstIndex; i<onlyOneCheckLastIndex; i++) {
    			var optionsId = multiWidget.find("#"+idStr+i).attr("id");
    			if(checkedId != optionsId) {
    				multiWidget.find('#'+idStr+i).attr("disabled","disabled");
    			}
    		}
    		
    		multiWidget.find(".ui-multiselect-disabled").removeClass("ui-multiselect-disabled").find("label").removeClass("ui-state-disabled").find("input").removeAttr("disabled");
    		
    		for(var i=mulitCheckFirstIndex; i<multiCheckLastIndex; i++) {
    			var optionsVal = multiWidget.find("#"+idStr+i).val();
    			
    			multiWidget.find("#"+idStr+i).removeAttr("disabled","disabled");
    			
    			if(checkedVal == optionsVal) {
    				multiWidget.find("#"+idStr+i).attr("disabled","disabled");
    			}
    		}
    		
    	} else {
    		for(var i=onlyOneCheckFirstIndex; i<onlyOneCheckLastIndex; i++) {
    			multiWidget.find('#'+idStr+i).removeAttr("disabled");
    		}
    		for(var i=mulitCheckFirstIndex; i<multiCheckLastIndex; i++) {
    			multiWidget.find('#'+idStr+i).attr("checked", false);
    			multiWidget.find('#'+idStr+i).attr("disabled", "disabled");
    		}
    	}
	} else {
		multiWidget.find(":checkbox").each(function(index) {
    		if(index < onlyOneCheckLastIndex) {
    			$(this).removeAttr("disabled","disabled");
    		} else {
    			$(this).attr("checked", false);
    			$(this).attr("disabled","disabled");
    		}
    	});
	}
	
	// 최종 선택된 값
	var lastCheckedVal = "";
	multiWidget.find(":checkbox").each(function(index) {
		if($(this).is(":checked")) {
			lastCheckedVal += $(this).val();
		}
	});
		
	// 클릭이벤트 발생시에 changeWire 함수 실행
	// 화면에 로딩시에는 changeWire() 함수를 실행하지 않고, multiselect 가 활성화 되었을 경우, 
	// 사용자가 직접 상품을 변경하였을 경우에만, changeWire() 함수를 실행 
	$(".ui-multiselect-menu").each(function(index) {		
		if($(this).css("display") == "block") {
			wireProdMgmt.changeWire(lastCheckedVal, rowId);
		}
	});
}

/**
 * 멀티셀렉트 안에서 사용하는 selectedText 이벤트 처리 함수
 * 2016.06.06
 * @param numChecked
 * @param numTotal
 * @param checkedItems
 * @returns {String}
 */
function mlSlctInSelectedTextFn(numChecked, numTotal, checkedItems) {
	var sText = '';
	var sValue = '';
	for (var i=0 ; i<checkedItems.length ; i++) {
		var valTmp = $(checkedItems[i]);
	    if (i>0) sText += '+';
	    sText += valTmp.attr('title');
	    sValue += valTmp.val();
	}
	return sText;
}

/**
 * 멀티셀렉트 안에서 사용하는 create 이벤트 처리 함수(mlSlctInitProdMappForAjax()에서만 사용)
 * 2016.06.06
 * @param multiselectObj
 * @param rtn_mapp_w_prod_cd
 * @param mapp_cd
 */
function mlSlctInCreateFn(multiselectObj, rtn_mapp_w_prod_cd, mapp_cd) {
	var multiWidget = multiselectObj.multiselect("widget");	// 멀티셀렉트 selector
	// 상품추가시 멀티셀러터 헤더 강제 disabled
	multiWidget.find(".ui-widget-header").children().attr("disabled","disabled");
	multiWidget.find(":checkbox").each(function(index) {
		$(this).removeAttr("disabled","disabled");
	});			    	 
	multiselectObj.multiselect("uncheckAll");
	var defualtCheck = mlSlctIngetDefualtCheckBoxCnt(multiWidget);
	multiWidget.find(":checkbox").each(function(index) {
		if(rtn_mapp_w_prod_cd.length <= 2) {
			//  단일 상품
			if(index < defualtCheck) {
    			if($(this).val() == rtn_mapp_w_prod_cd) {
    				this.click();
    			}
    		}
		}  else {
			// 결합상품일 경우 맵핑값 파싱			
			var array = new Array();
    		var totlen = rtn_mapp_w_prod_cd.length / 2;
    		var start = 0;
			var end = 2;
    		for(var i=0; i<totlen; i++) {
				array[i] = rtn_mapp_w_prod_cd.substring(start,end);
				start += 2;
				end += 2;
    		}
    		for(var i=0; i<totlen; i++) {
    			if($(this).val() == array[i]) {
    				this.click();
    			}
    		}
		}
	});
	
	//상단그룹에서 선택된 상품의 하단그룹에서의 중복체크를 방지 
	multiWidget.find(":checkbox").each(function(index) {
		var checklistIdx = mlSlctIngetDefualtCheckBoxCnt(multiWidget);
		if(index >= checklistIdx && mapp_cd == $(this).val()) {
			$(this).attr("disabled", "disabled");
		}
	});
}

/**
 *  멀티셀렉트 안에서 사용하는 open 이벤트 처리 함수
 *  2016.06.06
 * @param multiselectObj
 */
function mlSlctInOpenFn(multiselectObj) {	
	// 멀티셀렉트의 상단,하단 그룹을 구분짓기 위한 line 추가
	var multiWidget = multiselectObj.multiselect("widget");
	var chekboxLength = mlSlctIngetDefualtCheckBoxCnt(multiWidget);
	var middleLineIndex =  chekboxLength  + 1;
	multiWidget.find("li").eq(middleLineIndex).addClass("ui-multiselect-optgroup-line");
}

/**
 * 멀티셀렉트 객체의 상단그룹을 구분짓기 위해 상단그룹의 체크박스갯수를 리턴
 * 2016.06.06
 * @param multiselectObj
 * @returns {Number}
 */
function mlSlctIngetDefualtCheckBoxCnt(multiselectObj) {
	var cnt = 0;
	multiselectObj.find(":checkbox").each(function(index) {
		cnt++;
	});
	cnt = cnt / 2;
	return cnt;
}