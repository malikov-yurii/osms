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
            { "data": "customerFirstName", "orderable": false },
            { "data": "customerLastName", "orderable": false },
            { "data": "customerLastName", "orderable": false }, //make this phone
            { "data": "customerFirstName", "orderable": false }, //city
            { "data": "customerFirstName", "orderable": false }, //nova_poshta
            { "data": "customerFirstName", "orderable": false }, //total_sum
            { "data": "customerFirstName", "orderable": false }, //payment_type
            { "data": "productNamesOneString", "orderable": false },
            { "data": "customerFirstName", "orderable": false }, //date
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
                0,
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

});

function orderTableInitComplete(settings, json) {
    makeEditable(); // It previously was in "initComplete"

    showOrderProds();
}

function showOrderProds() {
    datatableApi.rows().every(function( rowIdx, tableLoop, rowLoop ) {
        var row = this;
        var tr = row.node();
        // var products = row.data().productNamesOneString;

        var products = [
            {
                "product_name" : "shellac",
                "quantity" : "4",
                "price" : "235"
            }, {
                "product_name" : "potal",
                "quantity" : "1",
                "price" : "250"
            }, {
                "product_name" : "klei",
                "quantity" : "2",
                "price" : "50"
            }
        ];

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
        orderProdList += '<tr class="order-product-row"><td class="order-product-name">' +
            products[i].product_name + '</td><td class="order-product-qty">' +
            products[i].quantity + '</td><td class="order-product-price">' +
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
        $.each(data.customer, function (key, value) {
            console.log(key);
            console.log(value);
            form.find("input[name='" + key + "']").val(
                key === "dateTime" ? value.replace('T', ' ').substr(0, 16) : value
            );
        });
        $('#editRow').modal();
    });
}
