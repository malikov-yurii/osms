<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width">

<meta name="_csrf" content="${_csrf.token}"/>
<meta name="_csrf_header" content="${_csrf.headerName}"/>

<title><fmt:message key="app.title"/></title>
<base href="${pageContext.request.contextPath}/"/>

<link rel="shortcut icon" href="assets/images/icon-main.png">

<link rel="stylesheet" href="webjars/bootstrap/3.3.7-1/css/bootstrap.min.css">

<link rel="stylesheet" href="assets/css/style.css">
