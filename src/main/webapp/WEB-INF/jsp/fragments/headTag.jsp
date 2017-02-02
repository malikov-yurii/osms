<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="_csrf" content="${_csrf.token}"/>
    <meta name="_csrf_header" content="${_csrf.headerName}"/>

    <title><fmt:message key="app.title"/></title>
    <base href="${pageContext.request.contextPath}/"/>

    <link rel="stylesheet" href="resources/css/style.css">
    <link rel="stylesheet" href="webjars/bootstrap/3.3.7-1/css/bootstrap.min.css">
    <link rel="shortcut icon" href="resources/images/icon-main.png">

    <%--todo Do I already have it in dependencies?--%>
    <link rel="stylesheet"   href="webjars/jquery-ui/1.11.4/jquery-ui.css" >
    <%--K:\Users\Malikov\.m2\repository\org\webjars\jquery-ui\1.11.4\jquery-ui-1.11.4.jar!\META-INF\resources\webjars\jquery-ui\1.11.4\jquery-ui.css--%>

    <link rel="stylesheet"   href="resources/css/my-overriding.css">
</head>
