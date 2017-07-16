var ajaxUrl = 'ajax/profile/products/';
var datatableApi;

function updateTable() {
    $.ajax({
        type: "POST",
        url: ajaxUrl + 'filter',
        data: $('#filter').serialize(),
        success: updateTableByData
    });
}

$(function () {

    datatableApi = $('#datatable').DataTable({
        "ajax": {
            "url": ajaxUrl,
            "dataSrc": ""
        },
        "pagingType": "full_numbers",
        "paging": true,
        "info": true,
        "columns": [
            { "data": "productId" },
            { "data": "productVariationId" },
            { "data": "name" },
            { "data": "price" },
            { "data": "quantity" },
            {
                "data": "unlimited",
                "render": function (data, type, row) {
                    if (type == 'display') {
                        return '<input type="checkbox" ' + (data ? 'checked' : '') + ' onclick="enableUnlimited($(this),' + row.id + ');"/>';
                    }
                    return data;
                }
            },
        ],
        "order": [
            [
                0,
                "desc"
            ]
        ],
        "initComplete": makeEditable
    });
});
