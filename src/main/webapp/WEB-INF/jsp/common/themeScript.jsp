<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="sp" uri="http://www.springframework.org/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" scope="request"/>
<c:set var="resources" value="${contextPath}/web/theme" scope="request"/>

<script src="${resources}/plugins/jquery/jquery.min.js"></script>
<script src="${resources}/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="${resources}/plugins/simplebar/simplebar.min.js"></script>
<script src="https://unpkg.com/hotkeys-js/dist/hotkeys.min.js"></script>
<script src="${resources}/plugins/apexcharts/apexcharts.js"></script>
<script src="${resources}/plugins/DataTables/DataTables-1.10.18/js/jquery.dataTables.min.js"></script>
<script src="${resources}/plugins/jvectormap/jquery-jvectormap-2.0.3.min.js"></script>
<script src="${resources}/plugins/jvectormap/jquery-jvectormap-world-mill.js"></script>
<script src="${resources}/plugins/jvectormap/jquery-jvectormap-us-aea.js"></script>
<script src="${resources}/plugins/daterangepicker/moment.min.js"></script>
<script src="${resources}/plugins/daterangepicker/daterangepicker.js"></script>
<script>
  jQuery(document).ready(function() {
    jQuery('input[name="dateRange"]').daterangepicker({
    autoUpdateInput: false,
    singleDatePicker: true,
    locale: {
      cancelLabel: 'Clear'
    }
  });
    jQuery('input[name="dateRange"]').on('apply.daterangepicker', function (ev, picker) {
      jQuery(this).val(picker.startDate.format('MM/DD/YYYY'));
    });
    jQuery('input[name="dateRange"]').on('cancel.daterangepicker', function (ev, picker) {
      jQuery(this).val('');
    });
  });
</script>
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
<script src="${resources}/plugins/toaster/toastr.min.js"></script>
<script src="${resources}/js/mono.js"></script>
<script src="${resources}/js/chart.js"></script>
<script src="${resources}/js/map.js"></script>
<script src="${resources}/js/custom.js"></script>

