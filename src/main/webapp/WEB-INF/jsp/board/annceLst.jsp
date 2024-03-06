<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html class="no-js" itemscope="itemscope" itemtype="http://schema.org/WebPage" lang="ko">
<head>
<%@ include file="../common/defaultHead.jsp"%>
</head>

<body>
<!-- 상단 -->
<%@ include file="../common/top.jsp"%>
<!-- //상단 -->

<div id="content">


	<form name="frm" method="post" id="frm">
			<input type="hidden" name="board_typ"     value="NOTICE"/>
			<input type="hidden" name="seq"           value=""/>
			<input type="hidden" name="filename"      value=""/>
			<input type="hidden" name="aliasfilename" value=""/>
			
			
	<!-- 긴급공지 -->
	<%@ include file="../common/annceLstUrgnt.jsp"%>
	<!-- //긴급공지 -->

	<div class="container">
			
		<ul class="location">
			<li class="first"><a href="/main/dashboard.do"><img src="${resources}/img/common/ico/icoHome.gif" alt="홈" /></a></li>
			<li class="current"><a href="javascript:goTo('/board/annceLst.do', 'B010104');">공지사항</a></li>
			
		</ul>
		
		<h1>공지사항</h1>
		<div class="bbsAction">
			<div>
				<select class="select01" style="width:110px" name="search_gb" id="search_gb"> <!-- [D] style="width:110px" 처럼 가로 크기는 필요하면 제어 -->
					<option value="">선택</option>
					<option value="title" <c:if test="${boardVo.search_gb eq 'title' }">selected</c:if>>제목</option>
					<option value="ctt" <c:if test="${boardVo.search_gb eq 'ctt' }">selected</c:if>>내용</option>
					<option value="cre_nm" <c:if test="${boardVo.search_gb eq 'cre_nm' }">selected</c:if>>작성자</option>
				</select>
				<input type="text" class="type-text" size="60" name="search_txt" id="search_txt" value="<c:out value="${boardVo.search_txt}"/>">
				<img  src="${resources}/img/common/btn/btn_search_txt.png" alt="검색" id = "searchBtn" />
			</div>
		</div>
	
		<!-- Grid -->
		<div id="jqGrid"><table id="annGrid"></table><div id="annPager"></div></div>
		
		<!-- File Download -->
		<iframe name="fileDownload" width="0" height="0" frameborder="0"></iframe>
		<!-- content End -->
		
		
	</div>
	</form>
</div><!-- //wrap -->

<!-- 하단 -->
<%@ include file="../common/defaultFooter.jsp"%>
<!-- //하단 -->


</body>
</html>