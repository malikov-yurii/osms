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
        <p>Used technologies: <a href="http://projects.spring.io/spring-security/">Spring Security</a>,
            <a href="http://docs.spring.io/spring/docs/current/spring-framework-reference/html/mvc.html">Spring MVC</a>,
            <%--<a href="http://projects.spring.io/spring-data-jpa/">Spring Data JPA</a>,--%>
            <a href="http://spring.io/blog/2014/05/07/preview-spring-security-test-method-security">Spring Security
                Test</a>,
            <a href="http://hibernate.org/orm/">Hibernate ORM</a>,
            <a href="http://hibernate.org/validator/">Hibernate Validator</a>,
            <a href="http://www.slf4j.org/">SLF4J</a>,
            <a href="https://github.com/FasterXML/jackson">Json Jackson</a>,
            <a href="http://ru.wikipedia.org/wiki/JSP">JSP</a>,
            <a href="http://en.wikipedia.org/wiki/JavaServer_Pages_Standard_Tag_Library">JSTL</a>,
            <a href="http://tomcat.apache.org/">Apache Tomcat</a>,
            <a href="http://www.webjars.org/">WebJars</a>,
            <a href="http://datatables.net/">DataTables plugin</a>,
            <%--<a href="http://ehcache.org">Ehcache</a>,--%>
            <a href="http://www.postgresql.org/">PostgreSQL</a>,
            <a href="http://junit.org/">JUnit</a>,
            <%--<a href="http://hamcrest.org/JavaHamcrest/">Hamcrest</a>,--%>
            <a href="http://jquery.com/">jQuery</a>,
            <a href="http://ned.im/noty/">jQuery notification</a>,
            <a href="http://getbootstrap.com/">Bootstrap</a>.
        </p>
    </div>
    <div class="container">
        <div class="lead">
            &nbsp;&nbsp;&nbsp;<a href="https://github.com/malikov-yurii/online-shop-management-system">Java Enterprise CRM
            project</a> with authorization for <a href="https://gilder-shop.com.ua/potal-i-susal">online-shop 'Lavka Pozolotchika'</a> .
            - inline work with DataTable cells
            - autocomplete live search through database
            - an elaborated design to simplify  manager’s work
            UI uses REST and AJAX.
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