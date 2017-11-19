<!DOCTYPE html>
<html>
<head>
  <meta charset=UTF-8>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Online Shop Management System</title>

  <base href="/">

  <link rel="shortcut icon" href="assets/images/icon-main.png">

  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="/assets/css/spinner.css" rel="stylesheet">
  <link href="/assets/css/style.css" rel="stylesheet">

  <script src="/polyfills.js"></script>

</head>
<body>

<app>
  <div class="spinner-container">
    <div class="spinner">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div>
  </div>
</app>

<script>
    var dbOrders = {
        elements: ${orders},
        totalElements: ${ordersTotal}
    }
    window.module = 'aot';
</script>
</body>
<script src="/app.js"></script>
</html>