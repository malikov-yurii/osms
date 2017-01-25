<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://topjava.javawebinar.ru/functions" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<html>
<jsp:include page="fragments/headTag.jsp"/>
<link rel="stylesheet" href="webjars/datatables/1.10.12/css/dataTables.bootstrap.min.css">
<link rel="stylesheet" href="webjars/datetimepicker/2.4.7/jquery.datetimepicker.css">

<body>
<jsp:include page="fragments/bodyHeader.jsp"/>

<div class="jumbotron">
    <div class="container">
        <div class="shadow">
            <h3><fmt:message key="customers.title"/></h3>

            <div class="view-box">
                <a class="btn btn-sm btn-info" onclick="add('<fmt:message key="customers.add"/>')"><fmt:message key="customers.add"/></a>
                <table class="table table-striped display" id="datatable">
                    <thead>
                    <tr>
                        <th><fmt:message key="customers.firstName"/></th>
                        <th><fmt:message key="customers.lastName"/></th>
                        <th><fmt:message key="customers.phoneNumber"/></th>
                        <th><fmt:message key="customers.city"/></th>
                        <th><fmt:message key="customers.novaPoshta"/></th>
                        <th><fmt:message key="customers.email"/></th>
                        <sec:authorize access="hasRole('ROLE_ADMIN')">
                            <th></th>
                            <th></th>
                        </sec:authorize>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>
<jsp:include page="fragments/footer.jsp"/>

<div class="modal fade" id="editRow">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h2 class="modal-title" id="modalTitle"></h2>
            </div>
            <div class="modal-body">
                <form:form class="form-horizontal" method="post" id="detailsForm">
                    <input type="hidden" id="id" name="id">

                    <div class="form-group">
                        <label for="firstName" class="control-label col-xs-3"><fmt:message
                                key="customers.firstName"/></label>

                        <div class="col-xs-9">
                            <input type="text" class="form-control" id="firstName" name="name"
                                   placeholder="<fmt:message key="customers.firstName"/>">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="lastName" class="control-label col-xs-3"><fmt:message
                                key="customers.lastName"/></label>

                        <div class="col-xs-9">
                            <input type="text" class="form-control" id="lastName" name="lastName"
                                   placeholder="<fmt:message key="customers.lastName"/>">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="phoneNumber" class="control-label col-xs-3"><fmt:message
                                key="customers.phoneNumber"/></label>

                        <div class="col-xs-9">
                            <input type="text" class="form-control" id="phoneNumber" name="phoneNumber"
                                   placeholder="<fmt:message key="customers.phoneNumber"/>">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="city" class="control-label col-xs-3"><fmt:message
                                key="customers.city"/></label>

                        <div class="col-xs-9">
                            <input type="text" class="form-control" id="city" name="city"
                                   placeholder="<fmt:message key="customers.city"/>">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="novaPoshta" class="control-label col-xs-3"><fmt:message
                                key="customers.novaPoshta"/></label>

                        <div class="col-xs-9">
                            <input type="text" class="form-control" id="novaPoshta" name="novaPoshta"
                                   placeholder="<fmt:message key="customers.novaPoshta"/>">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="email" class="control-label col-xs-3"><fmt:message
                                key="customers.email"/></label>

                        <div class="col-xs-9">
                            <input type="text" class="form-control" id="email" name="email"
                                   placeholder="<fmt:message key="customers.email"/>">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-offset-3 col-xs-9">
                            <button class="btn btn-primary" type="button" onclick="save()"><fmt:message key="common.save"/></button>
                        </div>
                    </div>
                </form:form>
            </div>
        </div>
    </div>
</div>
</body>
<script type="text/javascript">
    var edit_title ='<fmt:message key="customers.edit"/>';
</script>
<script type="text/javascript" src="webjars/jquery/2.2.4/jquery.min.js"></script>
<script type="text/javascript" src="webjars/bootstrap/3.3.7-1/js/bootstrap.min.js"></script>
<script type="text/javascript" src="webjars/datatables/1.10.12/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="webjars/datatables/1.10.12/js/dataTables.bootstrap.min.js"></script>
<script type="text/javascript" src="webjars/noty/2.3.8/js/noty/packaged/jquery.noty.packaged.min.js"></script>
<script type="text/javascript" src="webjars/datetimepicker/2.4.7/build/jquery.datetimepicker.full.min.js"></script>
<script type="text/javascript" src="resources/js/datatablesUtil.js"></script>
<script type="text/javascript" src="resources/js/customerDatatables.js"></script>
</html>