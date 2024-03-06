<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="sp" uri="http://www.springframework.org/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" scope="request"/>
<c:set var="resources" value="${contextPath}/web/admin" scope="request"/>
<%--<sp:eval var="NO_CACHE" expression="T(com.skt.trgate.core.util.StringUtil).getRandomNumber(10)" />					<% // 캐시방지용 랜덤숫자 %>--%>

<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta charset="utf-8">
<meta name="title" content="SK T-gate">
<meta name="Description" content="SK T-gate">
<meta name="keywords" content="SK T-gate">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="format-detection" content="telephone=no">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="shortcut icon" type="image/x-icon" href="${resources}/img/favicon.ico">
<title>SK T-gate</title>

<link rel="stylesheet" type="text/css"  href="${resources}/css/jquery-ui-1.10.3.custom.min.css"/>
<link rel="stylesheet" href="${resources}/css/jquery-ui.smoothness.css" />
<link rel="stylesheet" href="${resources}/css/jquery.multiselect.css" />
<link rel="stylesheet" href="${resources}/css/normalize.css" media="all" />
<link rel="stylesheet" href="${resources}/css/component.css" media="all" />
<link rel="stylesheet" href="${resources}/css/style.css" media="all" />

<link rel="stylesheet" type="text/css"  href="${resources}/js/jqgrid/css/ui.jqgrid.css"/>
<link rel="stylesheet" type="text/css"  href="${resources}/js/jqgrid/css/ui.multiselect.css"/>

<script type="text/javascript"  src="${resources}/js/common/common.js"></script>
<script type="text/javascript"  src="${resources}/js/common/common_Html.js"></script>
<script type="text/javascript"  src="${resources}/js/lib/jquery-1.9.1.min.js"></script>
<script type="text/javascript"  src="${resources}/js/lib/modernizr-2.6.2.min.js"></script>
<script type="text/javascript"  src="${resources}/js/lib/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript"  src="${resources}/js/lib/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript"  src="${resources}/js/lib/jquery.ui.datepicker-ko.js"></script>
<script type="text/javascript"  src="${resources}/js/lib/jquery.multiselect.min.js"></script>
<script type="text/javascript"  src="${resources}/js/jqgrid/src/i18n/grid.locale-en.js"></script>
<script type="text/javascript"  src="${resources}/js/jqgrid/js/jquery.jqGrid.min.js"></script>
<script type="text/javascript"  src="${resources}/js/jqgrid/js/jquery.jqGrid.src.js"></script>
<script type="text/javascript"  src="${resources}/js/datejs/date.js"></script>
<script type="text/javascript"  src="${resources}/js/datejs/date-ko-KR.js"></script>


<!-- Le supporter -->
<script>window.jQuery || document.write('<script src="${resources}/js/lib/jquery-1.9.1.min.js"><\/script>')</script>
<script>window.jQuery || document.write('<script src="${resources}/js/lib/jquery-ui-1.10.3.min.js"><\/script>')</script>

<!--[if lte IE 8]>
<script src="${resources}/js/lib/html5shiv-printshiv.js"></script>
<script src="${resources}/js/lib/html5shiv.js"></script>
<![endif]-->

<!--[if IE 8]>
<script src="${resources}/js/lib/IE8.js"></script>
<![endif]-->
<!--[if IE 7]>
<script src="${resources}/js/lib/IE7.js"></script>
<![endif]-->

<script src="${resources}/js/plugins.js"></script>
<script src="${resources}/js/script.js"></script>


<script type="text/javascript">

    /*** 공통 상수 ***/
    contextPath = "${contextPath}";
    resources = "${resources}";

    try {
        // BFCache를 이용하여 페이지가 표시된 경우 페이지 새로고침 (브라우저의 이전 페이지, 다음 페이지로 이동)
        /*
        $(window).bind('pageshow', function(e) {
            if(e.original.persisted || (window.performance && window.performance.navigation.type == 2)) {
                location.reload();
            }
        });
         */
    } catch(e) {}

</script>
