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
            { "data": "id" },
            { "data": "first_name", "orderable": false },
            { "data": "last_name", "orderable": false },
            { "data": "phone", "orderable": false },
            { "data": "city", "orderable": false },
            { "data": "nova_poshta", "orderable": false },
            {
                "defaultContent": "",
                "render" : renderPaymentType,
                "orderable": false
            },
            { "data": "total_sum", "orderable": false },
            {
                "render": renderOrderStatus,
                "orderable": false
            },
            { "data": "date", "orderable": false },
            {
                "defaultContent": "",
                "orderable": false,
                "render": renderOrderEditBtn
            },
            {
                "defaultContent": "",
                "orderable": false,
                "render": renderDeleteBtn

            }
        ],
        "order": [
            [
                1,
                "desc"
            ]
        ],
        "initComplete": orderTableInitComplete
    });

    datatableApi.on('click', '.order-moar', function() {
        var tr = $(this).closest('tr');
        var row = datatableApi.row(tr);

        if ( row.child.isShown() ) {
            row.child.hide();
            tr.removeClass('opened');
        } else {
            row.child.show();
            tr.addClass('opened');
        }
    });

    // Storing initial value of order-item-cell on getting focus
    datatableApi.on('focusin', '.order-product-table td', function() {
        $(this).data('value', $(this).text());

        //Preventing ENTER button from being fired
        $(this).keypress(function(e) {
            return e.which != 13;
        });
    });

    // Storing current values of order-item-cell
    datatableApi.on('focusout', '.order-product-table td', function() {

        var $this = $(this);
        var orderItemId = $this.closest('tr').data('order-item-id');
        var key = $this.data('key');
        var initVal = $this.data('value');

        $this.data('value', $this.text());
        var currentVal = $this.data('value');

        if ($this.hasClass('error')) $this.removeClass('error');

        if (currentVal == '') {
            // At first checking if cell isn't empty

            simpleFailNoty();
            $this.text(initVal).focus().addClass('error');

        } else if (currentVal != initVal) {
            // if value has changed then send it

            $.ajax({
            url: ajaxUrl + orderItemId + '/change-' + key,
            type: 'POST',
            data: key + '=' + currentVal,
            success: function() {
                    successNoty('common.saved');
                    $this.removeClass('error');
                }
            });
        }

    });

});

function orderTableInitComplete(settings, json) {
    makeEditable();

    showOrderProds();
}

function showOrderProds() {
    datatableApi.rows().every(function( rowIdx, tableLoop, rowLoop ) {
        var row = this;
        var tr = row.node();
        var products = row.data().products;

        console.log(row.data());

        row.child( buildOrderProductList(products) ).show();

        $(tr).addClass('opened');
    });
}

function buildOrderProductList(products) {
    var orderProdList =
        '<table class="order-product-table">\
            <thead>\
                <tr><th>Product Name</th><th>Quantity</th><th>Price</th></tr>\
            </thead>\
            <tbody>';

    for (var i = 0; i < products.length; i++) {
        orderProdList +=
            '<tr class="order-product-row" data-order-item-id="'+ products[i].orderItemId +'" data-order-product-id="'+ products[i].orderProductId +'">\
            <td class="order-product-name" data-key="name" contenteditable="true">' +
            products[i].name + '</td><td class="order-product-qty" data-key="quantity" contenteditable="true">' +
            products[i].quantity + '</td><td class="order-product-price" data-key="price" contenteditable="true">' +
            products[i].price + '</td></tr>'
    }

    orderProdList += '</tbody></table>';

    return orderProdList;

}

function renderOrderEditBtn(data, type, row) {
    if (type == 'display') {
        return '<a class="btn btn-xs btn-primary" onclick="updateOrderRow(' + row.id + ');">'+i18n['common.update']+'</a>';
    }
}

function updateOrderRow(id) {
    $('#modalTitle').html(edit_title);
    $.get(ajaxUrl + id, function (data) {

        console.log(data);
        $.each(data, function (key, value) {
            form.find("input[name='" + key + "']").val(
                key === "dateTime" ? value.replace('T', ' ').substr(0, 16) : value
            );
        });

        $('#editRow').modal();
    });
}

function renderPaymentType(data, type, row) {
    if (row.payment_type == "PRIVAT_CARD") {
        return i18n['orders.paymentPrivat'];
    } else if (row.payment_type == "CASH_ON_DELIVERY") {
        return i18n['orders.paymentCash'];
    }
}

function renderOrderStatus(data, type, row) {
    if (row.status == "READY_FOR_SHIPMENT") {
        return i18n['orders.statusReady'];
    } else if (row.status == "AWAITING_FOR_PAYMENT") {
        return i18n['orders.statusPaymentAwaiting'];
    }
}