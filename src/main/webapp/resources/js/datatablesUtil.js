var form;

function makeEditable() {
    form = $('#detailsForm');
    $(document).ajaxError(function (event, jqXHR, options, jsExc) {
        failNoty(event, jqXHR, options, jsExc);
    });

    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    $(document).ajaxSend(function (e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });

}

function add(add_title) {
    $('#modalTitle').html(add_title);
    form.find(":input").val("");
    $('#editRow').modal();
    $("#firstName").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: ajaxUrl + 'autocomplete-first-name',
                type: "POST",
                data: {
                    term: request.term
                },
                dataType: "json",
                success: function (data) {
                    // debugger;
                    response(data);
                }
            });
        }
        , select: function (event, ui) {
            $('#firstName').val(ui.item.firstName);
            $('#lastName').val(ui.item.lastName);
            $('#phoneNumber').val(ui.item.phoneNumber);
            $('#city').val(ui.item.city);
            $('#postOffice').val(ui.item.postOffice);
            return false; // Prevent the widget from inserting the value.
        }
        , focus: function (event, ui) {
            $("#firstName").val(ui.item.lastName + ' ' + ui.item.phoneNumber + ' ' + ui.item.city + ' ' + ui.item.postOffice);
            return false; // Prevent the widget from inserting the value.
        }
    });
    $("#lastName").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: ajaxUrl + 'autocomplete-last-name',
                type: "POST",
                data: {
                    term: request.term
                },
                dataType: "json",
                success: function (data) {
                    // debugger;
                    response(data);
                }
            });
        }
        , select: function (event, ui) {
            $('#firstName').val(ui.item.firstName);
            $('#lastName').val(ui.item.lastName);
            $('#phoneNumber').val(ui.item.phoneNumber);
            $('#city').val(ui.item.city);
            $('#postOffice').val(ui.item.postOffice);
            return false; // Prevent the widget from inserting the value.
        }
        // , focus: function (event, ui) {
        //     $("#lastName").val(ui.item.lastName + ' ' + ui.item.phoneNumber + ' ' + ui.item.city + ' ' + ui.item.postOffice);
        //     return false; // Prevent the widget from inserting the value.
        // }
    });
    $("#city").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: ajaxUrl + 'autocomplete-city',
                type: "POST",
                data: {
                    term: request.term
                },
                dataType: "json",
                success: function (data) {
                    // debugger;
                    response(data);
                }
            });
        }
        , select: function (event, ui) {
            $('#firstName').val(ui.item.firstName);
            $('#lastName').val(ui.item.lastName);
            $('#phoneNumber').val(ui.item.phoneNumber);
            $('#city').val(ui.item.city);
            $('#postOffice').val(ui.item.postOffice);
            return false; // Prevent the widget from inserting the value.
        }
        , focus: function (event, ui) {
            $("#city").val(ui.item.lastName + ' ' + ui.item.phoneNumber + ' ' + ui.item.city + ' ' + ui.item.postOffice);
            return false; // Prevent the widget from inserting the value.
        }
    });
    $("#phoneNumber").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: ajaxUrl + 'autocomplete-phone-number',
                type: "POST",
                data: {
                    term: request.term
                },
                dataType: "json",
                success: function (data) {
                    // debugger;
                    response(data);
                }
            });
        }
        , select: function (event, ui) {
            $('#firstName').val(ui.item.firstName);
            $('#lastName').val(ui.item.lastName);
            $('#phoneNumber').val(ui.item.phoneNumber);
            $('#city').val(ui.item.city);
            $('#postOffice').val(ui.item.postOffice);
            return false; // Prevent the widget from inserting the value.
        }
        , focus: function (event, ui) {
            $("#phoneNumber").val(ui.item.lastName + ' ' + ui.item.phoneNumber + ' ' + ui.item.city + ' ' + ui.item.postOffice);
            return false; // Prevent the widget from inserting the value.
        }
    });
   $("#paymentType").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: ajaxUrl + 'autocomplete-payment-type',
                type: "POST",
                dataType: "json",
                success: function (data) {
                    response(data);
                }
            });
        }
       , focus: function (event, ui) {
           this.value = ui.item.value;
       }
        ,minLength: 0
    }).bind("focus", function() {
           console.log(this.value);
           if (this.value === '') {
               $(this).autocomplete("search", "");
           }
       });
    //TODO get rid of dublicated code
    $("#status").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: ajaxUrl + 'autocomplete-status',
                type: "POST",
                dataType: "json",
                success: function (data) {
                    response(data);
                }
            });
        }
        ,focus: function (event, ui) {
            this.value = ui.item.value;
        }
        ,minLength: 0
    }).bind("focus", function() {
            console.log(this.value);
            if (this.value === '') {
                $(this).autocomplete("search", "");
            }
        });
}

function updateRow(id) {
    $('#modalTitle').html(edit_title);
    $.get(ajaxUrl + id, function (data) {
        $.each(data, function (key, value) {
            form.find("input[name='" + key + "']").val(
                key === "dateTime" ? value.replace('T', ' ').substr(0, 16) : value
            );
        });
        $('#editRow').modal();
    });
}

function deleteRow(id) {
    if (confirm('Вы уверены, что хотите удалить заказ?')) {
        $.ajax({
            url: ajaxUrl + id,
            type: 'DELETE',
            success: function () {
                updateTable();
                successNoty('common.deleted');
            }
        });
    }
}



function enableUnlimited(chkbox, id) {
    var enabled = chkbox.is(":checked");
    $.ajax({
        url: ajaxUrl + id + '/change-unlimited',
        type: 'POST',
        data: 'unlimited=' + enabled,
        success: function () {
            successNoty(enabled ? 'common.enabled' : 'common.disabled');
        }
    });
}

function enableHasVariations(chkbox, id) {
    var enabled = chkbox.is(":checked");
    $.ajax({
        url: ajaxUrl + id + '/change-variations',
        type: 'POST',
        data: 'hasVariations=' + enabled,
        success: function () {
            successNoty(enabled ? 'common.enabled' : 'common.disabled');
        }
    });
}

function updateTableByData(data) {
    // console.log(data);

    datatableApi.clear().rows.add(data.data).draw('page');
}

function save() {
    $.ajax({
        type: "POST",
        url: ajaxUrl,
        data: form.serialize(),
        success: function () {
            console.log(form.serialize());
            $('#editRow').modal('hide');
            updateTable();
            successNoty('common.saved');
        }
    });
}

function saveCustomer() {
    $.ajax({

        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // },
        // dataType: 'json',
        type: "POST",
        url: 'rest/profile/customers/' + $("#id").val(),
        data: form.serialize(),
        success: function () {
            console.log(form.serialize());
            $('#editCustomer').modal('hide');
            updateTable();
            successNoty('common.saved');
        }
    });
}

var failedNote;

function closeNoty() {
    if (failedNote) {
        failedNote.close();
        failedNote = undefined;
    }
}

function successNoty(key) {
    closeNoty();
    noty({
        text: i18n[key],
        type: 'success',
        layout: 'bottomRight',
        timeout: true
    });
}

function failNoty(event, jqXHR, options, jsExc) {
    closeNoty();
    var errorInfo = $.parseJSON(jqXHR.responseText);
    failedNote = noty({
        text: i18n['common.failed'] + ': ' + jqXHR.statusText + "<br>" + errorInfo.cause + "<br>" + errorInfo.detail,
        type: 'error',
        layout: 'bottomRight'
    });
}

function renderEditBtn(data, type, row) {
    if (type == 'display' && $('#hasRoleAdmin').val()) {
        return '<a class="btn btn-xs btn-primary" onclick="updateRow(' + row.id + ');">' + i18n['common.update'] + '</a>';
    }
}

// function renderDeleteBtn(data, type, row) {
//
//     if (type == 'display' && $('#hasRoleAdmin').val()) {
//         return '<a class="btn btn-xs btn-danger" onclick="deleteRow(' + row.id + ');">' + i18n['common.delete'] + '</a>';
//     }
//
// }
// function renderDeleteBtn(data, type, row) {
//
//     if (type == 'display' && $('#hasRoleAdmin').val()) {
//         return '<a class="btn btn-xs btn-danger" onclick="deleteRow(' + row.id + ');">x</a>';
//     }
//
// }
function renderDeleteBtn(row) {

        return '<a class="btn btn-xs btn-danger" onclick="deleteRow(' + row.id + ');">' +
            '<span class="order-head-lg">Delete order</span><span class="order-head-sm">Order <i class="fa fa-times" aria-hidden="true"></i></span>' +
          '</a>';

}
function simpleFailNoty() {
    closeNoty();
    failedNote = noty({
        text: 'Введите корректные значения',
        type: 'error',
        layout: 'bottomRight',
        timeout: 1000
    });
}