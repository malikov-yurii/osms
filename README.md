ONLINE SHOP MANAGEMENT SYSTEM (CRM)
===============================

Stack:
Spring (IoC, DATA, MVC, Security), mapstruct, Gradle, Angular

Web application is CRM system used by managers of [online shop https://gilder-shop.com.ua](https://gilder-shop.com.ua)
to handle online shop data.

Application deployed at AWS Elastic Beanstalk (Tomcat), available at [http://osms.pro](http://osms.pro)

To build project:
./gradlew buildAll

To rebuild project backend (if './gradlew buildAll' has been run already):
./gradlew bootJar

To run app:
java -jar build/libs/osms-0.1.0.jar
(actual jar name may vary depending on app version)