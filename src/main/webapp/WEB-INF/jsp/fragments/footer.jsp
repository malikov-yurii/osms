<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="footer">
    <div class="container">
        <fmt:message key="app.footer"/>
    </div>
</div>

<script type="text/javascript">
    var i18n = [];
    <c:forEach var='key' items='<%=new String[]{"orders.addCustomer","orders.addOrderItem","common.update","common.delete","common.deleted","common.saved","common.enabled","common.disabled","common.failed","orders.paymentPrivat","orders.paymentCash","orders.statusReady","orders.statusPaymentAwaiting"}%>'>
    i18n['${key}'] = '<fmt:message key="${key}"/>';
    </c:forEach>
</script>

<script type="text/javascript" src="webjars/jquery/2.2.4/jquery.min.js"></script>
<script type="text/javascript" src="webjars/jquery-ui/1.11.4/jquery-ui.js"></script>
<script type="text/javascript" src="webjars/bootstrap/3.3.7-1/js/bootstrap.min.js"></script>
<script type="text/javascript" src="webjars/datatables/1.10.12/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="webjars/datatables/1.10.12/js/dataTables.bootstrap.min.js"></script>
<script type="text/javascript" src="webjars/noty/2.3.8/js/noty/packaged/jquery.noty.packaged.min.js"></script>
<script type="text/javascript" src="webjars/datetimepicker/2.4.7/build/jquery.datetimepicker.full.min.js"></script>
<script type="text/javascript" src="resources/js/datatablesUtil.js"></script>
<script src="https://cdn.jsdelivr.net/lodash/4.17.4/lodash.min.js" integrity="sha256-IyWBFJYclFY8Pn32bwWdSHmV4B9M5mby5bhPHEmeY8w=" crossorigin="anonymous"></script>