<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://topjava.javawebinar.ru/functions" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<html>
<head>
    <jsp:include page="fragments/headTag.jsp"/>
</head>

<body>
<jsp:include page="fragments/bodyHeader.jsp"/>

<div class="jumbotron">
    <div class="container">
        <div class="shadow">
            <h3><fmt:message key="products.title"/></h3>

            <div class="view-box">
                <form:form method="post" class="form-horizontal" role="form" id="filter">
                    <div class="form-group">
                        <label class="control-label col-sm-2" for="startDate"><fmt:message
                                key="products.startDate"/>:</label>

                        <div class="col-sm-2">
                            <input class="form-control" name="startDate" id="startDate">
                        </div>

                        <label class="control-label col-sm-2" for="endDate"><fmt:message
                                key="products.endDate"/>:</label>

                        <div class="col-sm-2">
                            <input class="form-control" name="endDate" id="endDate">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2" for="startTime"><fmt:message
                                key="products.startTime"/>:</label>

                        <div class="col-sm-1">
                            <input class="form-control" name="startTime" id="startTime">
                        </div>

                        <label class="control-label col-sm-3" for="endTime"><fmt:message
                                key="products.endTime"/>:</label>

                        <div class="col-sm-1">
                            <input class="form-control" name="endTime" id="endTime">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-6"></div>
                        <div class="col-sm-1">
                            <button class="btn btn-primary" type="button" onclick="updateTable()"><fmt:message
                                    key="products.filter"/></button>
                        </div>
                    </div>
                </form:form>

                <sec:authorize access="hasRole('ROLE_ADMIN')">
                    <a class="btn btn-sm btn-info" onclick="add('<fmt:message key="products.add"/>')"><fmt:message
                            key="products.add"/></a>
                </sec:authorize>

                <table class="table table-striped display" id="datatable">
                    <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Variation Id</th>
                        <th><fmt:message key="products.name"/></th>
                        <th><fmt:message key="products.price"/></th>
                        <th><fmt:message key="products.quantity"/></th>
                        <th><fmt:message key="products.unlimited"/></th>
                        <%--<th><fmt:message key="products.different_prices"/></th>--%>
                        <%--<sec:authorize access="hasRole('ROLE_ADMIN')">--%>
                            <th></th>
                            <th></th>
                        <%--</sec:authorize>--%>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>

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
                        <label for="name" class="control-label col-xs-3"><fmt:message
                                key="products.name"/></label>

                        <div class="col-xs-9">
                            <input type="text" class="form-control" id="name" name="name"
                                   placeholder="<fmt:message key="products.name"/>">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="price" class="control-label col-xs-3"><fmt:message key="products.price"/></label>

                        <div class="col-xs-9">
                            <input type="number" class="form-control" id="price" name="price"
                                   placeholder="0">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="quantity" class="control-label col-xs-3"><fmt:message
                                key="products.quantity"/></label>

                        <div class="col-xs-9">
                            <input type="number" class="form-control" id="quantity" name="quantity"
                                   placeholder="1">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-offset-3 col-xs-9">
                            <button class="btn btn-primary" type="button" onclick="save()"><fmt:message
                                    key="common.save"/></button>
                        </div>
                    </div>
                </form:form>
            </div>
        </div>
    </div>
</div>
</body>
<script type="text/javascript">
    var edit_title = '<fmt:message key="products.edit"/>';
</script>


<jsp:include page="fragments/footer.jsp"/>
<script type="text/javascript" src="resources/js/productDatatables.js"></script>

</html>