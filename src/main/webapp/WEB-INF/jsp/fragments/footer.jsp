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
    <c:forEach var='key' items='<%=new String[]{"common.update","common.delete","common.deleted","common.saved","common.enabled","common.disabled","common.failed"}%>'>
    i18n['${key}'] = '<fmt:message key="${key}"/>';
    </c:forEach>
</script>