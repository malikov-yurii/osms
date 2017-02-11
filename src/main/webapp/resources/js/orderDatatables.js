var ajaxUrl = 'ajax/profile/orders/';
var datatableApi;

function updateTable() {
    $.get(ajaxUrl, updateTableByData);
}

$(function () {

    datatableApi = $('#datatable').DataTable({
        "ajax": {
            "url": ajaxUrl,
            "dataSrc": ""
        },
        "searching": false,
        "paging": false,
        "info": true,
        "columns": [
            // {
            //     "className": "orderrow-show",
            //     "data": null,
            //     "defaultContent": "",
            //     "orderable": false
            // },
            {"data": "id", "orderable": false},
            {"data": "firstName", "orderable": false, "className": "order-first-name editable"},
            {"data": "lastName", "orderable": false, "className": "order-last-name editable"},
            {"data": "phoneNumber", "orderable": false, "className": "order-phone-number editable"},
            {"data": "city", "orderable": false, "className": "order-city editable"},
            {"data": "postOffice", "orderable": false, "className": "order-post-office editable"},
            {"data": "paymentType", "orderable": false, "className": "order-payment-type"},
            {"data": "totalSum", "orderable": false, "className": "order-total-sum editable"},
            {"data": "status", "orderable": false, "className": "order-status"},
            // {"data": "date", "orderable": false},
            // {
            //     "defaultContent": "",
            //     "orderable": false,
            //     "render": renderAddOrderItemBtnSmall
            // },
            {
                "defaultContent": "",
                "orderable": false,
                "render": renderAddCustomerBtnSmall
            },
            // {
            //     "defaultContent": "",
            //     "orderable": false,
            //     "render": renderEditBtn
            // },
            {
                "defaultContent": "",
                "orderable": false,
                "render": renderDeleteBtnSmall

            }
        ],
        "createdRow": function (row, data, rowIndex) {
            $(row).addClass('parent-row');
        },
        "order": [
            [
                0,
                "desc"
            ]
        ],
        "initComplete": orderTableReady
    });


    datatableApi.on('click', '.order-status, .order-payment-type', function () {
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

        $(this).autocomplete({
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
                    data: key + '=' + ui.item.value
                });
            }
            , minLength: 0
        });

        $(this).autocomplete("search");

    });

    datatableApi.on('focusin', '.order-product-table td,.order-status,.order-payment-type,.order-city,.order-post-office,.order-total-sum', function () {
    /**
     * Storing initial value of order-item-cell, 'status', 'payment-type', 'city', 'post-office', 'total-sum' when getting focus
    **/

        $(this).data('value', $(this).text());

        // Making element to lose focus on ENTER keybutton
        $(this).keypress(function (e) {
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
                $(tr).find('.order-first-name').html(ui.item.firstName);
                $(tr).find('.order-last-name').html(ui.item.lastName);
                $(tr).find('.order-phone-number').html(ui.item.phoneNumber);
                $(tr).find('.order-city').html(ui.item.city);
                $(tr).find('.order-post-office').html(ui.item.postOffice);
                $.ajax({
                    url: ajaxUrl + rowId +'/update-first-last-name-phone-city-post',
                    type: "POST",
                    data: {
                        "firstName": ui.item.firstName,
                        "lastName": ui.item.lastName,
                        "phoneNumber": ui.item.phoneNumber,
                        "city": ui.item.city,
                        "postOffice": ui.item.postOffice
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
        $this.keypress(function (e) {
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
            // At first check if cell isn't empty

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
                    success: function () {
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

        row.child(buildOrderItemList(orderItemTos, orderId)).show();
        $(tr).addClass('opened');

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

                // Saving after autocompleted
                $.ajax({
                    url: ajaxUrl + orderItemId + '/update-order-item-after-order-item-name-autocomplete',
                    type: 'POST',
                    data: 'price=' + ui.item.orderItemPrice + '&productId=' + ui.item.productId + '&productVariationId=' + ui.item.productVariationId
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

function buildOrderItemList(orderItemTos, orderId) {
/**
 * Building DOM node child row - list of order ITEMS
**/

    var orderItemsList =
        '<table class="order-product-table" data-order-id="' + orderId + '">\
            <thead>\
                <tr><th>Item Name</th><th>Q-ty</th><th>Price</th><th>' + renderAddOrderItemBtnSmall(orderId) + '</th></tr>\
            </thead>\
            <tbody>';

    // debugger;

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
    $.ajax({
        url: ajaxUrl + 'order-item/' + id,
        type: 'DELETE',
        success: function () {
            updateTable();
            successNoty('common.deleted');
        }
    });
}

function orderTableReady() {
/**
 * Initialising of DATATABLE completed
**/

    makeEditable();



    $('.parent-row .editable').attr('contenteditable', true);

    $('.parent-row [class*="order-"]').each(function() {
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