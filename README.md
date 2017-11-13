ONLINE SHOP MANAGEMENT SYSTEM (CRM)
===============================

Stack:
Maven, Spring (IoC, Security, MVC), JPA(Hibernate), Jackson,  Tomcat
Bootstrap, JSP
jQuery plugins (dataTables, autocomplete, datetimepicker, noty)

Currently this CRM software is used by managers of [online shop https://gilder-shop.com.ua](https://gilder-shop.com.ua)
to manage client and order data. Manager can add/update/delete clients and orders

Application deployed at AWS Elastic Beanstalk, available at [http://osms.pro](http://osms.pro)

Some features of deployed app:
- authorization using Spring Security
- an elaborated design to simplify  manager’s work
- autocomplete live search through database via AJAX
- inline work with DataTable cells
- responsive UI

Currently second version of application is in development:
- switching UI to AngularJS 2
- adding new functionality
- refactoring code