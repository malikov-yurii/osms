var ajaxUrl = 'ajax/profile/orders/';
var datatableApi;

function updateTable() {
    $.get(ajaxUrl, updateTableByData);
}

$(function () {
    datatableApi = $('#datatable').DataTable({
        // "aoColumnDefs": [
        //     { "sClass": "editable_class", "aTargets": [ 2 ] }
        // ],
        // "fnDrawCallback": function() {
        //     $("td.my_class").editable();
        // },
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
            {"data": "firstName", "orderable": false},
            {"data": "lastName", "orderable": false},
            {"data": "phoneNumber", "orderable": false},
            {"data": "city", "orderable": false},
            {"data": "postOffice", "orderable": false},
            {"data": "paymentType", "orderable": false},
            {"data": "totalSum", "orderable": false},
            {"data": "status", "orderable": false},
            {"data": "date", "orderable": false},
            {
                "defaultContent": "",
                "orderable": false,
                "render": renderAddOrderItemBtn
            },
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
        "createdRow": function (row, data, rowIndex) {
            // Per-cell function to do whatever needed with cells
            // $.each($('td', row), function (colIndex) {
            $.each($('td', row), function (colIndex) {
                // For example, adding data-* attributes to the cell
                if (colIndex > 1 && colIndex < 10) {
                    $(this).attr('contenteditable', "true");
                }
            })
        },
        "order": [
            [
                1,
                "desc"
            ]
        ],
        "initComplete": makeEditable
    })
    ;

// datatableApi.on('click', )

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

// Storing initial value of order-item-cell on getting focus
    datatableApi.on('focusin', '.order-product-table td', function () {
        $(this).data('value', $(this).text());

        // Making element to focus out on ENTER keybutton
        $(this).keypress(function (e) {
            if (e.which == 13) {
                e.preventDefault();
                $(this).blur();
            }
        });
    });

// Storing current values of order-item-cell
    datatableApi.on('focusout', '.order-product-table td', function () {

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

// debugger;


        // var cellId = '#cell-' + orderId + '-2';
        // var data = datatableApi.cell(cellId).data();
        // $( row)
        //     .column(0)
        //     .find('td:first-child')
        // .find('sorting_1')
        // .find('td:eq(1)')
        // .prop('contenteditable','true');
        // .attr('contenteditable','true');
        // .attr('contenteditable','true');

        // console.log(data);


        // datatableApi.cells().every( function () {
        //
        //     console.log(this.data());
        //     debugger;
        // } );

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
            orderItemTos[i].name + '</td><td class="order-product-qty" data-key="quantity" contenteditable="true">' +
            orderItemTos[i].quantity + '</td><td class="order-product-price" data-key="price" contenteditable="true">' +
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