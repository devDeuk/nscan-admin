<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>

<!DOCTYPE html >
<html class="no-js" itemscope="itemscope" itemtype="http://schema.org/WebPage" lang="ko">
<head>
<%@ include file="../common/defaultHead.jsp"%>

</head>

<body>

<!-- 상단 -->
<%@ include file="../common/top.jsp"%>
<!-- //상단 -->

<div id="content">
	<!-- 긴급공지 -->
	<%@ include file="../common/annceLstUrgnt.jsp"%>
	<!-- //긴급공지 -->
	
	<div class="container">
		<!-- bread crumbs -->
		<ul class="location">
			<li class="first"><a href="/main/dashboard.do"><img src="${resources}/img/common/ico/icoHome.gif" alt="홈" /></a></li>
			<li class="current"><a href="javascript:goTo('/board/annceLst.do', 'B010104');">공지사항</a></li>
		</ul>
		<!-- /bread crumbs -->

		<!-- 컨텐츠 -->
		



		<h1>공지사항</h1>		

		<div class="viewBox">			
			<form name="frm" method="post" enctype="multipart/form-data">
				<input type="hidden" name="ctt" value="">
				<input type="hidden" name="mov_phon_num" value="<c:out value="${mov_phon_num }" />">
				<input type="hidden" name="user_id" value="<c:out value="${user_id }" />">
				<input type="hidden" name="org_id" value="">
				<input type="hidden" name="board_typ" value="NOTICE">
	
				<div class="bbsAction2">
					<a href="javascript:goSave();" class="btn btn-red"><img src="${resources}/img/common/bul/save.png" alt="" /> 저장</a>
					<a href="javascript:goList();" class="btn btn-gray" ><img src="${resources}/img/common/bul/cross.png" alt="" /> 취소</a>
				</div>
				<div class="tableList">
					<table class="bbsType02">
						<caption>글 작성/수정</caption>
						<colgroup>
							<col style="width:20%" />
							<col />
						</colgroup>
						<tbody>
							<tr>
								<th scope="row">공지사항선택</th>
								<td colspan="3">
									<label class="radio-label"><input type="radio" name="annce_typ" value="1" checked /> 일반공지</label>
									<label class="radio-label"><input type="radio" name="annce_typ" value="2"/> 시스템공지</label>
									<label class="radio-label"><input type="radio" name="annce_typ" value="3"/> 긴급공지</label>
								</td>
							</tr>
							<tr>
								<th scope="row"><label>공지사항설정</label></th>
								<td colspan="3">
								
<!-- 									<label class="check-label"><input type="checkbox" name="sms_yn" value="Y" onclick="sendMsgPop();"/> SMS전송여부</label> -->
									<label class="check-label"><input type="checkbox" name="popup_yn" value="Y" /> 팝업여부</label>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="from">게시기간</label></th>
								<td>
									<label for="from" class="hide">시작일</label>
									<input type="text" id="from" name="sta_annce_dt" readonly />
									~
									<label for="to" class="hide">종료일</label>
									<input type="text" id="to" name="end_annce_dt" readonly />
								</td>
								<th scope="row"><label>게시글 권한</label></th>
								<td>
									<label class="radio-label"><input type="radio" name="mkt_div_cd" id="div_cd1" value="" checked /> 전체</label>
									<label class="radio-label"><input type="radio" name="mkt_div_cd" id="div_cd2" value="<c:out value="${mkt_div_org_id }"/>" /> 소속본부</label>
								</td>
							</tr>
							<tr>
								<th scope="row"><label for="title">제목</label></th>
								<td colspan="3"><input class="input widthM" id="title" type="text" size="80" maxlength="50" name="title"/></td>
							</tr>							
							<tr>
								<th scope="row"><label >내용</label></th>
								<td colspan="3">
									<textarea  class = "ckeditor" name="contents" id="contents" rows="5" cols="30"></textarea>
								</td>
							</tr>
							<tr class="last"> <!-- [D] 마지막 tr = last class -->
								<th scope="row"><label for="attach">첨부파일</label></th>
								<td colspan="3"><input id="attach" type="file" size="80" class="type-text" name="attachFile" /></td>
							</tr>
						</tbody>
					</table>
				</div>	
				
				<div class="bbsAction2">
					<a href="javascript:goSave();" class="btn btn-red"><img src="${resources}/img/common/bul/save.png" alt="" /> 저장</a>
					<a href="javascript:goList();" class="btn btn-gray" ><img src="${resources}/img/common/bul/cross.png" alt="" /> 취소</a>
				</div>
			</form>

			
		</div>

		



		<!-- / 컨텐츠 -->
	</div>
	
</div>


<!-- 하단 -->
<%@ include file="../common/defaultFooter.jsp"%>
<!-- //하단 -->

</body>
</html>

 