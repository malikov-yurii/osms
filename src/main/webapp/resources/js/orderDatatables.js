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
        "paging": false,
        "info": true,
        "columns": [
            {
                "className": "order-moar",
                "data": null,
                "defaultContent": "",
                "orderable": false
            },
            {"data": "id"},
            {"data": "firstName", "orderable": false, "className": "order-first-name"},
            {"data": "lastName", "orderable": false, "className": "order-last-name"},
            {"data": "phoneNumber", "orderable": false, "className": "order-phone-number"},
            {"data": "city", "orderable": false, "className": "order-city"},
            {"data": "postOffice", "orderable": false, "className": "order-post-office"},
            {"data": "paymentType", "orderable": false, "className": "order-payment-type"},
            {"data": "totalSum", "orderable": false, "className": "order-total-sum"},
            {"data": "status", "orderable": false, "className": "order-status"},
            // {"data": "date", "orderable": false},
            {
                "defaultContent": "",
                "orderable": false,
                "render": renderAddOrderItemBtn
            },
            // {
            //     "defaultContent": "",
            //     "orderable": false,
            //     "render": renderEditBtn
            // },
            {
                "defaultContent": "",
                "orderable": false,
                "render": renderDeleteBtn

            }
        ],
        // "createdRow": function (row, data, rowIndex) {
        // Per-cell function to do whatever needed with cells
        // $.each($('td', row), function (colIndex) {
        // For example, adding data-* attributes to the cell
        // if (colIndex > 1 && colIndex < 10) {
        //     $(this).attr('contenteditable', "true");
        // })
        // },
        "order": [
            [
                1,
                "desc"
            ]
        ],
        "initComplete": orderTableReady
    });


    // datatableApi.on('click', '.order-first-name', function () {
    // $(this).attr('contenteditable', "true");
    // });


    //inline order status autocomplete and saving
    datatableApi.on('click', '.order-status, .order-payment-type', function () {

        var $this = $(this);
        var tr = $this.closest('tr');
        // debugger;
        var key = $this.data('key');
        var initVal = $this.data('value');

        $this.data('value', $this.text());
        var currentVal = $this.data('value');

        if ($this.hasClass('error')) $this.removeClass('error');

        var row = datatableApi.row(tr);


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
            // , focus: function (event, ui) {
            // $(this).data("autocomplete").search($(this).val());
            // this.value = ui.item.value;
            // }
            , minLength: 0
        });
        // .bind("focus", function () {
        //     console.log(this.value);
        //     if (this.value === '') {
        //         $(this).autocomplete("search", "");
        //     }
        // })

        $(this).autocomplete("search");
        // .click(function () {
        //
        //     // debugger;
        //     $(this).autocomplete("search");
        //
        //     // Use the below line instead of triggering keydown
        //     // $(this).data("autocomplete").search($(this).val());
        // })
        // .focus(function () {
        //
        //     debugger;
        //     $(this).autocomplete("search");
        //
        //     // Use the below line instead of triggering keydown
        //     // $(this).data("autocomplete").search($(this).val());
        // })
        ;

        // $(this).on( "click", function( event, ui ) {
        //     debugger;
        //     $(this).trigger(jQuery.Event("keydown"));
        // Since I know keydown opens the menu, might as well fire a keydown event to the element
        // });

    });

// Storing initial value of order-item-cell on getting focus
    datatableApi.on('focusin', '.order-product-table td,.order-status,.order-payment-type.order-first-name,.order-last-name,.order-phone-number,.order-city,.order-post-office,.order-total-sum', function () {
        // datatableApi.on('focusin', '.order-product-table td', function () {
        $(this).data('value', $(this).text());

        // Making element to focus out on ENTER keybutton
        $(this).keypress(function (e) {
            if (e.which == 13) {
                e.preventDefault();
                $(this).blur();
                $(this).find('input').blur();
            }
        });
    });

    //inline order firstName, lastName, phoneNumber, city, postOffice, totalSum saving
    datatableApi.on('focusout', '.order-first-name,.order-last-name,.order-phone-number,.order-city,.order-post-office,.order-total-sum', function () {

        var $this = $(this);
        var tr = $this.closest('tr');
        // debugger;
        var key = $this.data('key');
        var initVal = $this.data('value');

        $this.data('value', $this.text());
        var currentVal = $this.data('value');

        if ($this.hasClass('error')) $this.removeClass('error');

        if (currentVal == '') {
            // At first check if cell isn't empty

            simpleFailNoty();
            $this.text(initVal).focus().addClass('error');

        } else if (currentVal != initVal) {
            // if value has changed then send it

            var rowDataId = datatableApi.row(tr).data().id;
            $.ajax({
                url: ajaxUrl + rowDataId + '/update-' + key,
                type: 'POST',
                data: key + '=' + currentVal,
                success: function () {
                    successNoty('common.saved');
                }
            });
        }
    });

    datatableApi.on('click', '.order-moar', function () {
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


// Storing current values of order-item-cell
    datatableApi.on('focusout', '.order-product-table td', function () {

        var $this = $(this);
        var orderItemId = $this.closest('tr').data('order-item-id');
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

            simpleFailNoty();
            $this.text(initVal).focus().addClass('error');

        } else if (currentVal != initVal) {
            // if value has changed then send it

            $.ajax({
                url: ajaxUrl + orderItemId + '/update-' + key,
                type: 'POST',
                data: key + '=' + currentVal,
                success: function () {
                    successNoty('common.saved');
                }
            });
        }
    });

    datatableApi.on('draw.dt', function () {
        showOrderItems();

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
                // this.find('td:first-child').val(ui.item.label);

                $(this).html(ui.item.orderItemName);
                // $(this).nextAll('.order-product-price').html(ui.item.orderItemPrice);
                return false; // Prevent the widget from inserting the value.
            }
        });
    })
}

function renderDeleteOrderItemBtn(orderItemId) {

    // if (type == 'display' && $('#hasRoleAdmin').val()) {
    return '<a class="btn btn-xs btn-danger" onclick="deleteOrderItem(' + orderItemId + ');">' + i18n['common.delete'] + '</a>';
    // }

}

function buildOrderItemList(orderItemTos, orderId) {
    var orderItemsList =
        '<table class="order-product-table" data-order-id="' + orderId + '">\
            <thead>\
                <tr><th>Item Name</th><th>Quantity</th><th>Price</th><th></th></tr>\
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
    makeEditable();

    $('td.order-first-name').prop('contenteditable', "true");
    $('td.order-first-name').data('key', "first-name");

    $('td.order-last-name').prop('contenteditable', "true");
    $('td.order-last-name').data('key', "last-name");

    $('td.order-phone-number').prop('contenteditable', "true");
    $('td.order-phone-number').data('key', "phone-number");

    $('td.order-city').prop('contenteditable', "true");
    $('td.order-city').data('key', "city");

    $('td.order-post-office').prop('contenteditable', "true");
    $('td.order-post-office').data('key', "post-office");

    $('td.order-total-sum').prop('contenteditable', "true");
    $('td.order-total-sum').data('key', "total-sum");

    // $('.order-status').attr('contenteditable', "true");
    $('td.order-status').data('key', "status");

    // $('.order-payment-type').attr('contenteditable', "true");
    $('td.order-payment-type').data('key', "payment-type");

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