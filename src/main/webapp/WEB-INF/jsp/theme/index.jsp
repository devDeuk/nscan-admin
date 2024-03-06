<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko" dir="ltr">
<head>
    <%@ include file="../common/themeHead.jsp"%>
</head>

<body class="navbar-fixed sidebar-fixed" id="body">
    <script>
      NProgress.configure({ showSpinner: false });
      NProgress.start();
    </script>

    <!--문구-->
    <div id="toaster" ></div>

    <!-- WRAPPER START -->
    <div class="wrapper">

        <!-- LEFT_SIDEBAR START -->
        <%@ include file="../common/themeLeftSidebar.jsp"%>
        <!-- LEFT_SIDEBAR END -->


      <!-- PAGE WRAPPER START-->
      <div class="page-wrapper">
        <!-- Page Header START -->
        <%@ include file="../common/themeHeader.jsp"%>
        <!-- Page Header END -->

          <!--CONTENT WRAPPER-->
          <div class="content-wrapper">
            <div class="content"><!-- For Components documentaion -->


            </div> <!--content>
          </div>
          <!--CONTENT WRAPPER end-->


      </div>
      <!-- PAGE WRAPPER END-->

    </div>
    <!-- WRAPPER END -->

    <!-- Script Start-->
    <%@ include file="../common/themeScript.jsp"%>
    <!-- Script End-->
</body>

</html>
