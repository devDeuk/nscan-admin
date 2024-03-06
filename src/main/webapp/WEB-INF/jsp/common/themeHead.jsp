<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="sp" uri="http://www.springframework.org/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" scope="request"/>
<c:set var="resources" value="${contextPath}/web/theme" scope="request"/>

  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <title>Deuk Lab</title>

  <!-- theme meta -->
  <meta name="theme-name" content="DeukLab" />

  <!-- GOOGLE FONTS -->
  <link href="https://fonts.googleapis.com/css?family=Karla:400,700|Roboto" rel="stylesheet">
  <link href="${resources}/plugins/material/css/materialdesignicons.min.css" rel="stylesheet" />
  <link href="${resources}/plugins/simplebar/simplebar.css" rel="stylesheet" />

  <!-- PLUGINS CSS STYLE -->
  <link href="${resources}/plugins/nprogress/nprogress.css" rel="stylesheet" />
  <link href="${resources}/plugins/DataTables/DataTables-1.10.18/css/jquery.dataTables.min.css" rel="stylesheet" />
  <link href="${resources}/plugins/jvectormap/jquery-jvectormap-2.0.3.css" rel="stylesheet" />
  <link href="${resources}/plugins/daterangepicker/daterangepicker.css" rel="stylesheet" />
  <link href="${resources}/plugins/toaster/toastr.min.css" rel="stylesheet" />
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">

  <!-- MONO CSS -->
  <link id="main-css-href" rel="stylesheet" href="${resources}/css/style.css" />

  <!-- FAVICON -->
  <link href="${resources}/images/favicon.png" rel="shortcut icon" />

  <!--
    HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries
  -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
  <script src="${resources}/plugins/nprogress/nprogress.js"></script>

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
