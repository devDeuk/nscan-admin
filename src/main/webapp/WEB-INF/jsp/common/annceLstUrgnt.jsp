<!--긴급공지화면 -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<c:choose>
    <c:when test="${!empty notiIssue}">
        <div class="notice-alarm">

            <ul class="news-ticker">
                <c:forEach items="${notiIssue }" var="noticeList" varStatus="i">
                    <li><a href="/board/annceDtl.do?seq=<c:out value="${noticeList.seq}" />">[<c:out value="${noticeList.annce_typ}" />] <c:out value="${noticeList.title}" /> (<c:out value="${noticeList.cre_dt}"/>)</a></li>
                </c:forEach>
            </ul>

        </div>
    </c:when>
    <c:otherwise>
        <div class="notice-alarm" id = "notice-alarm" style="display:none" ></div>
    </c:otherwise>
</c:choose>
