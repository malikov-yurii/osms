ONLINE SHOP MANAGEMENT SYSTEM (OSMS)
===============================

Stack:
Spring (Boot, MVC, DATA, Cache, Security), JasperReports, mapstruct, Gradle, Angular

Web application is CRM system to manage online shop.

To build project:
./gradlew buildAll

To rebuild project backend (if './gradlew buildAll' has been run already):
./gradlew bootJar

To run app:
java -jar build/libs/osms-0.1.0.jar
(actual jar name may vary depending on app version)