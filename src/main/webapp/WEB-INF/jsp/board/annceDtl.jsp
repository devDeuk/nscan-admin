<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html class="no-js" itemscope="itemscope" itemtype="http://schema.org/WebPage" lang="ko" xml:lang="ko">
<head>
	<%@ include file="../common/defaultHead.jsp"%>
</head>
 
<body>
 
<!-- 상단 -->
<%@ include file="../common/top.jsp"%>
<!-- //상단 -->

 	<form name="frm" method="post" id="frm">
	<input type="hidden" name="filename" value="">
	<input type="hidden" name="aliasfilename" value="">
	<input type="hidden" name="seq" value="<c:out value="${bbsVo.seq}"/>">
	<input type="hidden" name="pageIdx" value="<c:out value="${pageIdx }"/>">
	<input type="hidden" name="board_typ" value="NOTICE">
	<input type="hidden" name="post_user_id" value="<c:out value="${bbsVo.post_user_id}"/>">
	<input type="hidden" name="cre_id" value="<c:out value="${bbsVo.cre_id}"/>">
						
				
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
		<div class="bbsAction02 bbsAction2">
			<a href="javascript:goList();" class="btn btn-gray pull-left"><img src="${resources}/img/common/bul/list.png" alt="" /> 목록</a>
 
 			<c:if test="${mktg_org_lvl_cd eq '00' || user_id eq bbsVo.cre_id}">		
				<a href="javascript:goModify();" class="btn btn-red"><img src="${resources}/img/common/bul/pen.png" alt="" /> 수정</a>
				<button class="btn btn-gray" onclick="javascript:goDelete(); return false;"><img src="${resources}/img/common/bul/cross.png" alt="" /> 삭제</button>
			</c:if>		
		</div>
 
		<article class="bbsContent">
			
	
			<div class="bbsTitle">
				<dl>
					<dt>제목</dt>
					<dd>[<c:out value="${bbsVo.annce_typ}"/>] <c:out value="${bbsVo.title}"/> </dd>
				</dl>
				<dl class="bbsTcon">
					<dt>등록일</dt>
					<dd class="num"><c:out value="${bbsVo.cre_dt}"/></dd>
				</dl>
			</div>
			<div class="bbsCon">
				<c:out value="${bbsVo.ctt}" escapeXml="false"/> 
			</div>
 
			<div class="bbsTitle subInfo">
				<dl>
					<dt>첨부파일</dt>
					<c:if test="${!empty bbsVo.fst_file_nm}">
					<U><a href="javascript:goFiledownLoad('<c:out value="${bbsVo.fst_file_nm}"/>','<c:out value="${bbsVo.save_file_nm}"/>')"><c:out value="${bbsVo.save_file_nm}"/></a></U>
					</c:if>
				</dl>
			</div>
 
			<aside>
				<dl class="sumTxt txtPrev">
					<dt><img src="${resources}/img/common/ico/arrow_up.gif" alt="" /> 이전글</dt>
					<dd>
						<c:if test="${empty prevVo.title}">이전 글이 없습니다.</c:if>
						<c:if test="${!empty prevVo.title}"><a href="/board/annceDtl.do?seq=<c:out value="${prevVo.seq}"/>"><c:out value="${prevVo.title}"/></a></c:if>
					</dd>
				</dl>
				<dl class="sumTxt txtNext">
					<dt><img src="${resources}/img/common/ico/arrow_down.gif" alt="" /> 다음글</dt>
					<dd>
						<c:if test="${empty nextVo.title}">다음 글이 없습니다.</c:if>
						<c:if test="${!empty nextVo.title}"><a href="/board/annceDtl.do?seq=<c:out value="${nextVo.seq}"/>"><c:out value="${nextVo.title}"/></a></c:if>
					</dd>
				</dl>
			</aside>
		</article>
		<div class="bbsAction02 bbsAction2">
			<a href="javascript:goList();" class="btn btn-gray pull-left"><img src="${resources}/img/common/bul/list.png" alt="" /> 목록</a>
 
 			<c:if test="${mktg_org_lvl_cd eq '00' || user_id eq bbsVo.cre_id}">		
				<a href="javascript:goModify();" class="btn btn-red"><img src="${resources}/img/common/bul/pen.png" alt="" /> 수정</a>
				<button class="btn btn-gray" onclick="javascript:goDelete(); return false;"><img src="${resources}/img/common/bul/cross.png" alt="" /> 삭제</button>
			</c:if>	
		</div>
 
 
		<!-- / 컨텐츠 -->
	</div>
	
</div>
 
</form>

<!-- 하단 -->
<%@ include file="../common/defaultFooter.jsp"%>
<!-- //하단 -->


</body>
</html>
