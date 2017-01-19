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
                "data": "id"
            },
            {
                "data": "customerFirstName"
            },
            {
                "data": "customerLastName"
            },
            {
                "data": "productNamesOneString"
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
        "order": [
            [
                0,
                "desc"
            ]
        ],
        "initComplete": makeEditable
    });
});
