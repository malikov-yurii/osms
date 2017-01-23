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
            { "data" : "payment_type", "orderable": false },
            { "data": "total_sum", "orderable": false },
            { "data": "status", "orderable": false },
            { "data": "date", "orderable": false },
            {
                "defaultContent": "",
                "orderable": false,
                "render": renderEditBtn
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
        "initComplete": makeEditable
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
            // At first check if cell isn't empty

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

                }
            });
        }

    });


  datatableApi.on('draw.dt', function() {
    showOrderProds();
  });

});

function showOrderProds() {
    datatableApi.rows().every(function( rowIdx, tableLoop, rowLoop ) {
        var row = this;
        var tr = row.node();
        var products = row.data().products;
        var orderId = row.data().id;

        console.log(row.data());

        row.child( buildOrderProductList(products, orderId) ).show();
        $(tr).addClass('opened');

    });
}

function buildOrderProductList(products, orderId) {
    var orderProdList =
        '<table class="order-product-table" data-order-id="'+orderId+'">\
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