var ajaxUrl = 'ajax/profile/customers/';
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
        "pagingType": "full_numbers",
        "paging": true,
        "info": true,
        "columns": [
            { "data": "id" },
            { "data": "name" },
            { "data": "lastName" },
            { "data": "phoneNumber" },
            { "data": "city" },
            { "data": "postOffice" },
            { "data": "email" },
            // {
            //     "defaultContent": "",
            //     "orderable": false,
            //     "render": renderEditBtn
            // },
            // {
            //     "defaultContent": "",
            //     "orderable": false,
            //     "render": renderDeleteBtn
            // }
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
