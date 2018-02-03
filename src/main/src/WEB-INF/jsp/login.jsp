<%@ page contentType="text/html;charset=UTF-8" language="java"          %>
<%@ taglib prefix="c"    uri="http://java.sun.com/jsp/jstl/core"        %>
<%@ taglib prefix="fmt"  uri="http://java.sun.com/jsp/jstl/fmt"         %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fn"   uri="http://java.sun.com/jsp/jstl/functions"   %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width">

    <title><fmt:message key="app.title"/></title>

    <link rel="shortcut icon" href="assets/images/icon-main.png">
    <link rel="stylesheet" href="assets/css/login.css">
</head>
<body>

<div class="login-page">

    <div class="login-logo">
        <fmt:message key="app.title"/>
    </div>

    <div class="login-block">
        <form:form class="login-form" role="form" action="spring_security_check" method="post">
            <input type="text" placeholder="Login" class="input login-input" name='username' autofocus>
            <input type="password" placeholder="Password" class="input login-input" name='password'>
            <button type="submit" class="btn login-submit"><fmt:message key="app.login"/></button>
        </form:form>
    </div>

    <hr>

    <div class="container">
        <c:if test="${error}">
            <div class="error">
                    ${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}
            </div>
        </c:if>
        <c:if test="${not empty message}">
            <div class="message">
                <fmt:message key="${message}"/>
            </div>
        </c:if>
        <p>Developed by Yurii Malikov and Denis Malikov</p>
    </div>
    <div class="container">
        <div class="lead">
            &nbsp;&nbsp;&nbsp;<a href="https://github.com/malikov-yurii/online-shop-management-system">Java based CRM
            web project</a> for <a href="https://gilder-shop.com.ua/potal-i-susal">online-shop 'Lavka Pozolotchika'</a> .
            Stack: Spring (IoC, DATA, MVC, Security), mapstruct, Gradle, Angular
            <fmt:message key="app.footer"/>
        </div>
    </div>

    <script type="text/javascript">
        var i18n = [];
        <c:forEach var='key' items='<%=new String[]{"orders.addCustomer","orders.addOrderItem","common.update","common.delete","common.deleted","common.saved","common.enabled","common.disabled","common.failed","orders.paymentPrivat","orders.paymentCash","orders.statusReady","orders.statusPaymentAwaiting"}%>'>
        i18n['${key}'] = '<fmt:message key="${key}"/>';
        </c:forEach>
    </script>
</div>
</body>
</html>