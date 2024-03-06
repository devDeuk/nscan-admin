<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<header id="header">
    <div class="container">
        <nav id="util">
            <ul class="util-info">
                <li><a href="#" id="annceMv" >공지사항</a></li>
                <li><a href="#" id="spmallMv" >판매사이트 요청</a></li>
                <li><a href="#" id="faqMv">FAQ</a></li>
            </ul>
            <ul class="util-extra">
                <li><a href="#" id="myInfoMv">내정보수정</a></li>
                <li><a href="#" id="systemInfoMv" >시스템점검 설정</a></li>
                <li><a href="#" id="batchInfoMv">배치 일일 점검</a></li>
                <li><a href="#" iid="centerChgMv">고객센터조직변경</a></li>
                <li><a href="#" id="adminPageMv">어드민 관리페이지</a></li>
            </ul>
            <div class="auth">
                <a href="#" id="logout" class="sign">로그아웃</a>
                <span class="profile">
					슈퍼관리자 김성득 (P140250)
			    </span>
            </div>
        </nav>
        <!-- / #util -->
        <div id="navigation">
            <a href="/main/dashboard" id="brand"><img src="/web/admin/img/common/brand.png" alt="티게이트"></a>
            <ul id="gnb">
                <li>
                    <a href="#">조직관리</a>
                    <ul class="subGnb">
                        <li><a href="#">대리점 관리</a></li>
                        <li><a href="#">판매자 관리</a></li>
                        <li><a href="#">조직별 사용자 검색</a></li>
                        <li><a href="#">예외조직 관리</a></li>
                        <li><a href="#">판매사이트 관리</a></li>
                    </ul>
                </li>
                <li class="current" data-current="true">
                    <a href="#">상품관리</a>
                    <ul class="subGnb">
                        <li class="current"><a href="#">무선상품관리</a></li>
                        <li><a href="#">유선상품관리</a></li>
                    </ul>
                </li>
                <li class="">
                    <a href="#">가입신청관리</a>
                    <ul class="subGnb">
                        <li><a href="#">가입신청현황 관리</a></li>
                        <li><a href="#">SWING일괄전송</a></li>
                        <li><a href="#">운송장조회</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#">통계관리</a>
                    <ul class="subGnb">
                        <li><a href="#">가입신청현황통계</a></li>
                        <li><a href="#">월별가입신청통계</a></li>
                        <li><a href="#">무선판매정책현황</a></li>
                        <li><a href="#">조직통계</a></li>
                        <li><a href="#">유선통계</a></li>
                        <li><a href="#">가입신청상태별현황</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#">정책관리</a>
                    <ul class="subGnb">
                        <li><a href="#">대리점승인권한관리</a></li>
                        <li><a href="#">판매통제관리</a></li>
                        <li><a href="#">채널관리</a></li>
                        <li><a href="#">공통코드 관리</a></li>
                    </ul>
                </li>
            </ul>
        </div> <!-- / # navigation -->
    </div>
</header>