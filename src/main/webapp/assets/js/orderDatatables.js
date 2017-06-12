var ajaxUrl = 'ajax/profile/orders/';
var datatableApi;
var orderAdded = false;
var productAdded = false;
var orderIdOnTab = false;

function updateTable(added, isTabPressed, orderId) {
  var pageStart = datatableApi.page.info().start;
  var pageLength = datatableApi.page.info().length;
  $.get(
      ajaxUrl + '?start=' + pageStart + '&length=' + pageLength,
      updateTableByData
    )
    .done(function () {
      if (added == 'orderAdded') {
        orderAdded = true;
      }
      else if (isTabPressed) {
        productAdded = true;
        orderIdOnTab = orderId;
      }
    });
}

$(function () {

  datatableApi = $('#datatable').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
      "url": ajaxUrl
    },
    "dom": "ft<'row'<'dataTables_length_wrap'l>><'row'<'col-md-6'i><'col-md-6'p>>",
    "searching": false,
    "pagingType": "full_numbers",
    "paging": true,
    "info": true,
    "columns": [
      {"data": "id", "orderable": false, "visible": false},
      {"data": "customerId", "orderable": false, "visible": false, "className": "order-customer-id"},
      {"data": "lastName", "orderable": false, "className": "order-last-name editable"},
      {"data": "firstName", "orderable": false, "className": "order-first-name editable"},
      {"data": "phoneNumber", "orderable": false, "className": "order-phone-number editable"},
      {"data": "city", "orderable": false, "className": "order-city editable"},
      {"data": "postOffice", "orderable": false, "className": "order-post-office editable"},
      {"data": "paymentType", "orderable": false, "className": "order-payment-type editable"},
      {"data": "totalSum", "orderable": false, "className": "order-total-sum editable"},
      {"data": "status", "orderable": false, "className": "order-status editable"},
      {"data": "comment", "orderable": false, "className": "order-comment editable"},
    ],
    "createdRow": onCreatedParentRow,
    "order": [
      [
        0,
        "DESC"
      ]
    ],
    "autoWidth": false,
    "initComplete": onOrderTableReady,
  });


  datatableApi.on('click focusin', 'td.order-status, td.order-payment-type', function () {
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

    $this.autocomplete({
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
          data: key + '=' + ui.item.value,
          success: function () {
            $(tr)
              .removeClass(function (index, className) {
                return (className.match(/(^|\s)status-\S+/g) || []).join(' ');
              })
              .addClass('status-' + ui.item.value);
          }
        });

        $this.blur();
      }
      , minLength: 0
    });

    $this.autocomplete("search");

    // Making element to lose focus on ENTER keybutton AND preventing from typing anything in
    $this.keydown(function (e) {
      if (e.which == 13) {
        e.preventDefault();
        $this.blur();
      } else if ((e.shiftKey && e.keyCode == 9) || e.which == 9) {
        $this.blur();
      } else {
        return false;
      }
    });

  });

  datatableApi.on('focusin', '.order-product-table td,.order-status,.order-comment,.order-payment-type,.order-city,.order-post-office,.order-total-sum', function () {
    /**
     * Storing initial value of order-item-cell, 'status', 'payment-type', 'city', 'post-office', 'total-sum' when getting focus
     **/

    $(this).data('value', $(this).text());

    // Making element to lose focus on ENTER keybutton
    $(this).keydown(function (e) {
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
        $(tr).find('.order-customer-id').html(ui.item.customerId);
        $(tr).find('.order-first-name').html(ui.item.firstName);
        $(tr).find('.order-last-name').html(ui.item.lastName);
        $(tr).find('.order-phone-number').html(ui.item.phoneNumber);
        $(tr).find('.order-city').html(ui.item.city);
        $(tr).find('.order-post-office').html(ui.item.postOffice);
        $.ajax({
          url: ajaxUrl + rowId + '/set-customer-for-order-by-customer-id',
          type: "POST",
          data: {
            "customerId": ui.item.customerId
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
    $this.keydown(function (e) {
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
      // At first check if cell is currently empty

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
          success: function (data) {
            if (key === 'quantity' || key === 'price') {
              $(tr).closest('tr.child-row').prev().find('.order-total-sum').html(data);
            }
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

    onOrderTableReady();

  });

  datatableApi.on('focusin', 'tr:last-child .order-product-price', addOrderItemOnTabPressed);

  $('.show-suppliers').on('click', showSuppliers);
})
;

function showOrderItems() {
  datatableApi.rows().every(function (rowIdx, tableLoop, rowLoop) {
    var row = this;
    var tr = row.node();
    var orderItemTos = row.data().orderItemTos;
    var orderId = row.data().id;

    row.child(buildOrderItemList(orderItemTos, orderId, row.data()), 'child-row').show();

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

        // debugger;
        // Saving after autocompleted
        $.ajax({
          url: ajaxUrl + orderItemId + '/update-order-item-after-order-item-name-autocomplete',
          type: 'POST',
          data: 'price=' + ui.item.orderItemPrice + '&productId=' + ui.item.productId + '&productVariationId=' + ui.item.productVariationId + '&orderItemName=' + ui.item.orderItemName,
          success: function (data) {
            // debugger;
            $(tr).find('td.order-total-sum').html(data);
          }
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

function buildOrderItemList(orderItems, orderId, row) {
  /**
   * Building ChildRow - list of order ITEMS
   **/

  //Making templator working properly with JSP
  _.templateSettings = {
    evaluate: /{{([\s\S]+?)}}/g,    // {{ }}  :  <% %>
    interpolate: /{{=([\s\S]+?)}}/g // {{= }} :  <%= %>
  };

  var tmpl = _.template($('#orderItemsList').html());
  return tmpl({
    orderItems,
    orderId,
    row
  });

}

function deleteOrderItem(id) {
  if (confirm('Вы уверены, что хотите удалить эту позицию?')) {
    $.ajax({
      url: ajaxUrl + 'order-item/' + id,
      type: 'DELETE',
      success: function () {
        updateTable();
        successNoty('common.deleted');
      }
    });
  }
}

function onOrderTableReady() {
  /**
   * Initialising of DATATABLE completed
   **/

  makeEditable();

  $('.parent-row .editable').attr('contenteditable', true);
  if ($(window).width() < 768) {
    $('.order-status, .order-payment-type').removeAttr('contenteditable');
  }

  $('.parent-row [class*="order-"]').each(function () {
    var val = this.classList[0].slice(6);

    $(this).data('key', val);
  });

  if (orderAdded) {
    setTimeout(function () {
      $('.parent-row:first td:first-child').focus();
      toggleShowLoading(false);
    }, 100)
    orderAdded = false;
  }

  if (productAdded) {
    setTimeout(function () {
      $('.order-product-table[data-order-id=' + orderIdOnTab + '] tr:last-child td:first-child').focus();
      toggleShowLoading(false);
    }, 100)
    productAdded = false;
  }
}

function addOrder() {
  $.ajax({
    url: 'ajax/profile/orders/',
    type: 'POST',
    success: function () {
      updateTable('orderAdded');
      successNoty('common.saved');
      toggleShowLoading(true);
    }
  });
}

// function renderAddOrderItemBtn(data, type, row) {
//     if (type == 'display' && $('#hasRoleAdmin').val()) {
//         return '<a class="btn btn-xs btn-primary" onclick="addOrderItem(' + row.id + ');">' + i18n['orders.addOrderItem'] + '</a>';
//     }
// }

function renderAddOrderItemBtn(rowId) {
  //todo add "type" to uncomment
  // if (type == 'display' && $('#hasRoleAdmin').val()) {
  return '<a class="btn btn-xs btn-success" onclick="addOrderItem(' + rowId + ', \'isTabPressed\');">' +
    '<span class="order-head-lg">Add order item</span><span class="order-head-sm">Product <i class="fa fa-plus" aria-hidden="true"></i></span>' +
    '</a>';
  // }
}

// function renderPersistOrUpdateCustomerBtn(data, type, row) {
//     if (type == 'display' && $('#hasRoleAdmin').val()) {
//         return '<a class="btn btn-xs btn-primary" onclick="persistOrUpdateCustomerFromOrder(' + row.id + ');">' + i18n['orders.addCustomer'] + '</a>';
//     }
// }
// function renderPersistOrUpdateCustomerBtn(data, type, row) {
// // debugger;
//     if (type == 'display' && $('#hasRoleAdmin').val()) {
//         return '<a class="btn btn-xs btn-primary" onclick="persistOrUpdateCustomerFromOrder(' + row.id + ',' + row.customerId + ');">+</a>';
//     }
//
// }
function renderPersistOrUpdateCustomerBtn(row) {
  var btnText;
  if (row.customerId === 0) {
    btnText = '<span class="order-head-lg">Save customer to DB</span><span class="order-head-sm">Save customer</span>';
  } else {
    btnText = '<span class="order-head-lg">Update customer in DB</span><span class="order-head-sm">Upd. customer</span>'
  }
  ;

  return '<a class="btn btn-xs btn-primary" onclick="persistOrUpdateCustomerFromOrder(' + row.id + ',' + row.customerId + ');">' + btnText + '</a>';
}

function addOrderItem(id, isTabPressed) {
  $.ajax({
    url: 'ajax/profile/orders/' + id + '/add-order-item',
    type: 'POST',
    success: function () {
      updateTable('productAdded', isTabPressed, id);
      successNoty('common.saved');
      toggleShowLoading(true);
    }
  });
}

function persistOrUpdateCustomerFromOrder(orderId, customerId) {
  debugger;
  if (customerId == 0) {
    $.ajax({
      url: 'ajax/profile/orders/' + orderId + '/persist-customer-from-order',
      type: 'POST',
      success: function () {
        updateTable();
        successNoty('common.saved');
      }
    });
  } else {
    showUpdateCustomerModal(customerId)
  }
}

function showUpdateCustomerModal(customerId) {
  $('#editCustomer').modal();
  $.ajax({
    url: 'rest/profile/customers/' + customerId,
    type: "GET",
    dataType: "json",
    success: function (data) {
      // debugger;
      $("#id").val(data.id);
      $("#firstName").val(data.name);
      $("#lastName").val(data.lastName);
      $("#phoneNumber").val(data.phoneNumber);
      $("#city").val(data.city);
      $("#postOffice").val(data.postOffice);
      $("#email").val(data.email);
      $("#note").val(data.note);

    },
    error: function (error) {
      alert.log("Error:" + error);
    }
  });
}

function onCreatedParentRow(row, data, rowIndex) {
  $row = $(row);
  $row.addClass('parent-row').addClass('status-' + data.status);
}

function showSuppliers() {
  $('body').toggleClass('suppliers-shown');
}

function addOrderItemOnTabPressed(e) {
  $(this).keydown(function (e) {
    if (e.which == 9) {
      var orderId = $(this).closest('.order-product-table').data('order-id');
      addOrderItem(orderId, 'isTabPressed');
    }
  });
}