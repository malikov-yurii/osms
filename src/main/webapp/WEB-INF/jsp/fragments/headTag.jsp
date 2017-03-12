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

<link rel="shortcut icon" href="resources/images/icon-main.png">

<link rel="stylesheet" href="webjars/bootstrap/3.3.7-1/css/bootstrap.min.css">
<link rel="stylesheet" href="webjars/datatables/1.10.12/css/dataTables.bootstrap.min.css">
<%--todo Do I already have it in dependencies?--%>
<link rel="stylesheet"   href="webjars/jquery-ui/1.11.4/jquery-ui.css" >
<link rel="stylesheet" href="webjars/datetimepicker/2.4.7/jquery.datetimepicker.css">

<link rel="stylesheet" href="resources/css/style.css">
