var ajaxUrl = 'ajax/profile/orders/';
var datatableApi;

function updateTable() {
    var pageStart = datatableApi.page.info().start;
    var pageLength = datatableApi.page.info().length;
    $.get(ajaxUrl + '?start=' + pageStart +
                    '&length='+ pageLength
        , updateTableByData);
}

$(function () {

    datatableApi = $('#datatable').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": ajaxUrl
        },
        "dom": "ft<'row'<'dataTables_length_wrap'l>><'row'<'col-md-6'i><'col-md-6'p>>",
        "searching": false,
        "pagingType": "full_numbers",
        "paging": true,
        "info": true,
        "columns": [
            {"data": "id", "orderable": false, "visible" : false},
            {"data": "customerId", "orderable": false, "visible" : false, "className": "order-customer-id"},
            {"data": "lastName", "orderable": false, "className": "order-last-name editable"},
            {"data": "firstName", "orderable": false, "className": "order-first-name editable"},
            {"data": "phoneNumber", "orderable": false, "className": "order-phone-number editable"},
            {"data": "city", "orderable": false, "className": "order-city editable"},
            {"data": "postOffice", "orderable": false, "className": "order-post-office editable"},
            {"data": "paymentType", "orderable": false, "className": "order-payment-type editable"},
            {"data": "totalSum", "orderable": false, "className": "order-total-sum editable"},
            {"data": "status", "orderable": false, "className": "order-status editable"},
            {"data": "comment", "orderable": false, "className": "order-comment editable"},
        ],
        "createdRow": onCreatedParentRow,
        "order": [
            [
                0,
                "desc"
            ]
        ],
        "autoWidth": false,
        "initComplete": orderTableReady
    });


    datatableApi.on('click focusin', 'td.order-status, td.order-payment-type', function () {
        /**
         * Autocomplete of 'order-status' and 'payment-type'
         **/
        var $this = $(this);
        var tr = $this.closest('tr');
        var row = datatableApi.row(tr);
        var key = $this.data('key');
        var initVal = $this.data('value');

        $this.data('value', $this.text());
        var currentVal = $this.data('value');

        if ($this.hasClass('error')) $this.removeClass('error');

        $this.autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: ajaxUrl + 'autocomplete-' + key,
                    type: "POST",
                    dataType: "json",
                    success: function (data) {
                        response(data);
                    }
                });
            }
            , select: function (event, ui) {
                var rowDataId = datatableApi.row(tr).data().id;

                $.ajax({
                    url: ajaxUrl + rowDataId + '/update-' + key,
                    type: "POST",
                    data: key + '=' + ui.item.value,
                    success: function() {
                        $(tr)
                          .removeClass(function (index, className) {
                            return (className.match (/(^|\s)status-\S+/g) || []).join(' ');
                          })
                          .addClass('status-'+ui.item.value);
                    }
                });

                $this.blur();
            }
            , minLength: 0
        });

        $this.autocomplete("search");

        // Making element to lose focus on ENTER keybutton AND preventing from typing anything in
        $this.keydown(function (e) {
            if (e.which == 13) {
                e.preventDefault();
                $this.blur();
            } else if ((e.shiftKey && e.keyCode == 9) || e.which == 9) {
                $this.blur();
            } else {
                return false;
            }
        });

    });

    datatableApi.on('focusin', '.order-product-table td,.order-status,.order-comment,.order-payment-type,.order-city,.order-post-office,.order-total-sum', function () {
        /**
         * Storing initial value of order-item-cell, 'status', 'payment-type', 'city', 'post-office', 'total-sum' when getting focus
         **/

        $(this).data('value', $(this).text());

        // Making element to lose focus on ENTER keybutton
        $(this).keydown(function (e) {
            if (e.which == 13) {
                e.preventDefault();
                $(this).blur();
                $(this).find('input').blur();
            }
        });
    });

    datatableApi.on('focusin', '.order-first-name,.order-last-name,.order-phone-number', function () {
        /**
         * Autocomplete of 'first-name', 'last-name', 'phone', 'city' and 'post-office'
         **/

        var $this = $(this);
        $this.data('value', $(this).text());
        var tr = $this.closest('tr');
        var rowId = datatableApi.row(tr).data().id;

        // Autocomplete for Order INFO
        var key = $this.data('key');
        $this.autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: ajaxUrl + 'autocomplete-' + key,
                    type: "POST",
                    data: {
                        term: request.term
                    },
                    dataType: "json",
                    success: function (data) {
                        response(data);
                    }
                });
            }
            , select: function (event, ui) {
                $(tr).find('.order-customer-id').html(ui.item.customerId);
                $(tr).find('.order-first-name').html(ui.item.firstName);
                $(tr).find('.order-last-name').html(ui.item.lastName);
                $(tr).find('.order-phone-number').html(ui.item.phoneNumber);
                $(tr).find('.order-city').html(ui.item.city);
                $(tr).find('.order-post-office').html(ui.item.postOffice);
                $.ajax({
                    url: ajaxUrl + rowId + '/set-customer-for-order-by-customer-id',
                    type: "POST",
                    data: {
                        "customerId": ui.item.customerId
                    },
                    success: function (data) {
                        successNoty('common.saved');
                    }
                });
                return false; // Prevent the widget from inserting the value.
            }
            , focus: function (event, ui) {
                return false; // Prevent the widget from inserting the value.
            }
        });

        // Making element to lose focus on ENTER keybutton
        $this.keydown(function (e) {
            if (e.which == 13) {
                e.preventDefault();
                $this.blur();
                $this.find('input').blur();
            }
        });
    });

    datatableApi.on('focusout', '.parent-row [class*="order-"], .order-product-table td', function () {
        /**
         * Making possible inline saving of order INFO and order ITEMS
         **/

        var $this = $(this);
        var tr = $this.closest('tr');
        var key = $this.data('key');
        var initVal = $this.data('value');

        if (key == 'quantity') {
            $this.data('value', $this.find('input').val());
        } else {
            $this.data('value', $this.text());
        }

        var currentVal = $this.data('value');

        if ($this.hasClass('error')) $this.removeClass('error');

        if (currentVal == '') {
            // At first check if cell is currently empty

            if (initVal == '') return true; // Then check if cell already WAS empty. If so, then remove focus as evrthng is OK

            simpleFailNoty();
            $this.text(initVal).focus().addClass('error');

        } else if (currentVal != initVal) {
            // if value has changed then send it

            if ($this.parents('.parent-row').length) {
                // Request for saving order INFO

                var rowDataId = datatableApi.row(tr).data().id;
                $.ajax({
                    url: ajaxUrl + rowDataId + '/update-' + key,
                    type: 'POST',
                    data: key + '=' + currentVal,
                    success: function () {
                        successNoty('common.saved');
                    }
                });

            } else {
                // Request for saving order ITEMS

                var orderItemId = $this.closest('tr').data('order-item-id');
                $.ajax({
                    url: ajaxUrl + orderItemId + '/update-' + key,
                    type: 'POST',
                    data: key + '=' + currentVal,
                    success: function (data) {
                        if (key === 'quantity' || key === 'price') {
                            $(tr).closest('tr.child-row').prev().find('.order-total-sum').html(data);
                        }
                        successNoty('common.saved');
                    }
                });
            }
        }
    });

    datatableApi.on('click', '.orderrow-show', function () {
        var tr = $(this).closest('tr');
        var row = datatableApi.row(tr);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('opened');
        } else {
            row.child.show();
            tr.addClass('opened');
        }
    });


    datatableApi.on('draw.dt', function () {
        showOrderItems();

        orderTableReady();

    });
})
;

function showOrderItems() {
    datatableApi.rows().every(function (rowIdx, tableLoop, rowLoop) {
        var row = this;
        var tr = row.node();
        var orderItemTos = row.data().orderItemTos;
        var orderId = row.data().id;

        row.child(buildOrderItemList(orderItemTos, orderId, row.data()), 'child-row').show();

        // Autocomplete for Order ITEMS
        var $firstTd = row.child().find('table td:first-child');
        $firstTd.autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: ajaxUrl + 'autocomplete-order-item-name',
                    type: "POST",
                    data: {
                        term: request.term
                    },
                    dataType: "json",
                    success: function (data) {
                        response(data);
                    }
                });
            }
            , select: function (event, ui) {
                var $this = $(this);
                $this.html(ui.item.orderItemName);
                $(this).nextAll('.order-product-price').html(ui.item.orderItemPrice);
                var orderItemId = $this.closest('tr').data('order-item-id');

                // debugger;
                // Saving after autocompleted
                $.ajax({
                    url: ajaxUrl + orderItemId + '/update-order-item-after-order-item-name-autocomplete',
                    type: 'POST',
                    data: 'price=' + ui.item.orderItemPrice + '&productId=' + ui.item.productId + '&productVariationId=' + ui.item.productVariationId + '&orderItemName=' + ui.item.orderItemName,
                    success: function (data) {
                        // debugger;
                        $(tr).find('td.order-total-sum').html(data);
                    }
                    // todo need PUT for rest??
                    // contentType: "application/json",
                    // type: "PUT",
                    // dataType: "json",
                    // data: JSON.stringify({'price' : ui.item.orderItemPrice, 'productId': ui.item.productId, 'productVariationId' : ui.item.productVariationId}),
                });


                return false; // Prevent the widget from inserting the value.
            }
            , focus: function (event, ui) {
                $(this).html(ui.item.orderItemName);
                return false; // Prevent the widget from inserting the value.
            }
        });
    })
}

function renderDeleteOrderItemBtn(orderItemId) {

    return '<a class="btn btn-xs btn-danger" onclick="deleteOrderItem(' + orderItemId + ');">x</a>';

}

function buildOrderItemList(orderItemTos, orderId, row) {
    /**
     * Building DOM node child row - list of order ITEMS
     **/

    var orderItemsList =
        '<table class="order-product-table" data-order-id="' + orderId + '">\
            <thead>\
                <tr>\
                    <th>' + renderAddOrderItemBtn(orderId) + '&nbsp;&nbsp;' + renderPersistOrUpdateCustomerBtn(row) + '&nbsp;&nbsp;' + renderDeleteBtn(row) + '</th>\
                    <th><span class="order-head-lg">Q-ty</span><span class="order-head-sm">Q</span></th>\
                    <th><span class="order-head-lg">Price</span><i class="order-head-sm fa fa-usd" aria-hidden="true"></i></th>\
                    <th><span class="order-head-lg">Delete</span><i class="order-head-sm fa fa-trash-o" aria-hidden="true"></i></th>\
                </tr>\
            </thead>\
            <tbody>';

    for (var i = 0; i < orderItemTos.length; i++) {
        orderItemsList +=
            '<tr class="order-product-row" data-order-item-id="' + orderItemTos[i].orderItemId + '" data-order-product-id="' + orderItemTos[i].orderItemId + '">\
            <td class="order-product-name" data-key="name" contenteditable="true">' +
            orderItemTos[i].name + '</td><td  data-key="quantity"><input type="number" class="order-product-qty" value="' +
            orderItemTos[i].quantity + '"></td><td class="order-product-price" data-key="price" contenteditable="true">' +
            orderItemTos[i].price + '</td><td>' + renderDeleteOrderItemBtn(orderItemTos[i].orderItemId) + '</td></tr>'
    }

    orderItemsList += '</tbody></table>';

    return orderItemsList;

}

function deleteOrderItem(id) {
    if (confirm('Вы уверены, что хотите удалить эту позицию?')) {
        $.ajax({
            url: ajaxUrl + 'order-item/' + id,
            type: 'DELETE',
            success: function () {
                updateTable();
                successNoty('common.deleted');
            }
        });
    }
}

function orderTableReady() {
    /**
     * Initialising of DATATABLE completed
     **/

    makeEditable();

    $('.parent-row .editable').attr('contenteditable', true);
    if ($(window).width() < 768) {
        $('.order-status, .order-payment-type').removeAttr('contenteditable');
    }

    $('.parent-row [class*="order-"]').each(function () {
        var val = this.classList[0].slice(6);

        $(this).data('key', val);
    });

}

function addOrder() {
    $.ajax({
        url: 'ajax/profile/orders/',
        type: 'POST',
        success: function () {
            updateTable();
            successNoty('common.saved');
        }
    });
}

// function renderAddOrderItemBtn(data, type, row) {
//     if (type == 'display' && $('#hasRoleAdmin').val()) {
//         return '<a class="btn btn-xs btn-primary" onclick="addOrderItem(' + row.id + ');">' + i18n['orders.addOrderItem'] + '</a>';
//     }
// }

function renderAddOrderItemBtn(rowId) {
    //todo add "type" to uncomment
    // if (type == 'display' && $('#hasRoleAdmin').val()) {
    return '<a class="btn btn-xs btn-success" onclick="addOrderItem(' + rowId + ');">' +
      '<span class="order-head-lg">Add order item</span><span class="order-head-sm">Product <i class="fa fa-plus" aria-hidden="true"></i></span>' +
      '</a>';
    // }
}

// function renderPersistOrUpdateCustomerBtn(data, type, row) {
//     if (type == 'display' && $('#hasRoleAdmin').val()) {
//         return '<a class="btn btn-xs btn-primary" onclick="persistOrUpdateCustomerFromOrder(' + row.id + ');">' + i18n['orders.addCustomer'] + '</a>';
//     }
// }
// function renderPersistOrUpdateCustomerBtn(data, type, row) {
// // debugger;
//     if (type == 'display' && $('#hasRoleAdmin').val()) {
//         return '<a class="btn btn-xs btn-primary" onclick="persistOrUpdateCustomerFromOrder(' + row.id + ',' + row.customerId + ');">+</a>';
//     }
//
// }
function renderPersistOrUpdateCustomerBtn(row) {
    var btnText;
    if (row.customerId === 0) {
        btnText = '<span class="order-head-lg">Save customer to DB</span><span class="order-head-sm">Save customer</span>';
    } else {
        btnText = '<span class="order-head-lg">Update customer in DB</span><span class="order-head-sm">Upd. customer</span>'
    };

    return '<a class="btn btn-xs btn-primary" onclick="persistOrUpdateCustomerFromOrder(' + row.id + ',' + row.customerId + ');">' + btnText + '</a>';
}

function addOrderItem(id) {
    $.ajax({
        url: 'ajax/profile/orders/' + id + '/add-order-item',
        type: 'POST',
        success: function () {
            updateTable();
            successNoty('common.saved');
        }
    });
}

function persistOrUpdateCustomerFromOrder(orderId, customerId) {
    debugger;
    if (customerId == 0) {
        $.ajax({
            url: 'ajax/profile/orders/' + orderId + '/persist-customer-from-order',
            type: 'POST',
            success: function () {
                updateTable();
                successNoty('common.saved');
            }
        });
    } else {
        showUpdateCustomerModal(customerId)
    }
}

function showUpdateCustomerModal(customerId) {
    $('#editCustomer').modal();
    $.ajax({
        url: 'rest/profile/customers/' + customerId,
        type: "GET",
        dataType: "json",
        success: function (data) {
            // debugger;
            $("#id").val(data.id);
            $("#firstName").val(data.name);
            $("#lastName").val(data.lastName);
            $("#phoneNumber").val(data.phoneNumber);
            $("#city").val(data.city);
            $("#postOffice").val(data.postOffice);
            $("#email").val(data.email);
            $("#note").val(data.note);

        },
        error: function (error) {
            alert.log("Error:" + error);
        }
    });
}

function onCreatedParentRow(row, data, rowIndex) {
  $row = $(row);
  $row.addClass('parent-row');

  switch (data.status) {
    case "OK":
      $row.addClass('status-ok');
      break;
    case "SHP":
      $row.addClass('status-shp');
      break;
    case "WFP":
      $row.addClass('status-wfp');
      break;
    case "NEW":
      $row.addClass('status-new');
      break;
    case "NOT":
      $row.addClass('status-not');
      break;
    default:;
  }
}
