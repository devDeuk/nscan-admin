<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="sp" uri="http://www.springframework.org/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" scope="request"/>
<c:set var="resources" value="${contextPath}/web/theme" scope="request"/>

 <aside class="left-sidebar sidebar-dark" id="left-sidebar">
  <div id="sidebar" class="sidebar sidebar-with-footer">
    <!-- Aplication Brand -->
    <div class="app-brand">
      <a href="/index.html">
        <img src="${resources}/images/logo.png" alt="Mono">
        <span class="brand-name">Deuk Lab</span>
      </a>
    </div>

    <!-- begin sidebar scrollbar -->
    <div class="sidebar-left" data-simplebar style="height: 100%;">
      <!-- sidebar menu -->
      <ul class="nav sidebar-inner" id="sidebar-menu">

          <li class ="active">
            <a class="sidenav-item-link" href="">
              <i class="mdi mdi-briefcase-account-outline"></i>
              <span class="nav-text">Server</span>
            </a>
          </li>

          <!-- -->
          <li class="section-title">
            GENERATION
          </li>

          <li>
            <a class="sidenav-item-link" href="calendar.html">
              <i class="mdi mdi-calendar-check"></i>
              <span class="nav-text">JAVA</span>
            </a>
          </li>

          <li  class="has-sub active expand" >
            <a class="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#email"
              aria-expanded="false" aria-controls="email">
              <i class="mdi mdi-email"></i>
              <span class="nav-text">email</span> <b class="caret"></b>
            </a>
            <ul  class="collapse show"  id="email"
              data-parent="#sidebar-menu">
              <div class="sub-menu">
                    <li class="active">
                      <a class="sidenav-item-link" href="email-inbox.html">
                        <span class="nav-text">Email Inbox</span>

                      </a>
                    </li>
                    <li >
                      <a class="sidenav-item-link" href="email-details.html">
                        <span class="nav-text">Email Details</span>

                      </a>
                    </li>
                    <li >
                      <a class="sidenav-item-link" href="email-compose.html">
                        <span class="nav-text">Email Compose</span>
                      </a>
                    </li>
              </div>
            </ul>
          </li>




          <li  class="has-sub" >
            <a class="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#authentication"
              aria-expanded="false" aria-controls="authentication">
              <i class="mdi mdi-account"></i>
              <span class="nav-text">Authentication</span> <b class="caret"></b>
            </a>
            <ul  class="collapse"  id="authentication"
              data-parent="#sidebar-menu">
              <div class="sub-menu">

                    <li >
                      <a class="sidenav-item-link" href="sign-in.html">
                        <span class="nav-text">Sign In</span>
                      </a>
                    </li>
                    <li >
                      <a class="sidenav-item-link" href="sign-up.html">
                        <span class="nav-text">Sign Up</span>
                      </a>
                    </li>
                    <li >
                      <a class="sidenav-item-link" href="reset-password.html">
                        <span class="nav-text">Reset Password</span>
                      </a>
                    </li>
              </div>
            </ul>
          </li>



          <li  class="has-sub" >
            <a class="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#other-page"
              aria-expanded="false" aria-controls="other-page">
              <i class="mdi mdi-file-multiple"></i>
              <span class="nav-text">Other pages</span> <b class="caret"></b>
            </a>
            <ul  class="collapse"  id="other-page"
              data-parent="#sidebar-menu">
              <div class="sub-menu">

                    <li>
                      <a class="sidenav-item-link" href="invoice.html">
                        <span class="nav-text">Invoice</span>

                      </a>
                    </li>

                    <li>
                      <a class="sidenav-item-link" href="404.html">
                        <span class="nav-text">404 page</span>
                      </a>
                    </li>

                    <li >
                      <a class="sidenav-item-link" href="page-comingsoon.html">
                        <span class="nav-text">Coming Soon</span>
                      </a>
                    </li>

                    <li >
                      <a class="sidenav-item-link" href="page-maintenance.html">
                        <span class="nav-text">Maintenance</span>
                      </a>
                    </li>
              </div>
            </ul>
          </li>

          <li class="section-title">
            Documentation
          </li>
          <li>
            <a class="sidenav-item-link" href="getting-started.html">
              <i class="mdi mdi-airplane"></i>
              <span class="nav-text">Getting Started</span>
            </a>
          </li>


          <li  class="has-sub" >
            <a class="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#customization"
              aria-expanded="false" aria-controls="customization">
              <i class="mdi mdi-square-edit-outline"></i>
              <span class="nav-text">Customization</span> <b class="caret"></b>
            </a>
            <ul  class="collapse"  id="customization"
              data-parent="#sidebar-menu">
              <div class="sub-menu">
                    <li >
                      <a class="sidenav-item-link" href="navbar-customization.html">
                        <span class="nav-text">Navbar</span>
                      </a>
                    </li>
                    <li >
                      <a class="sidenav-item-link" href="sidebar-customization.html">
                        <span class="nav-text">Sidebar</span>
                      </a>
                    </li>
                    <li>
                      <a class="sidenav-item-link" href="styling.html">
                        <span class="nav-text">Styling</span>
                      </a>
                    </li>
              </div>
            </ul>
          </li>

            <li class ="active">
              <a class="sidenav-item-link" href="/theme/index.html">
                <i class="mdi mdi-briefcase-account-outline"></i>
                <span class="nav-text">부트스트랩예제</span>
              </a>
            </li>
      </ul>

    </div>
    <!-- begin sidebar scrollbar end -->

    <div class="sidebar-footer">
      <div class="sidebar-footer-content">
        <ul class="d-flex">
          <li>
            <a href="user-account-settings.html" data-toggle="tooltip" title="Profile settings"><i class="mdi mdi-settings"></i></a></li>
          <li>
            <a href="#" data-toggle="tooltip" title="No chat messages"><i class="mdi mdi-chat-processing"></i></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</aside>