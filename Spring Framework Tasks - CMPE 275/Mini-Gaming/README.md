# Mini-game application

## Made for CMPE275 Lab2
## For implementation criteria, see the PDF.

## Read the blogs in Links Sections, they are very insightful in design perspective.

### Setup
1. This has to be done, If you have issues while setting up the application in Intellij.
2. Open the project in Intellij.
3. Right click on src/main/java and select Mark Directory As -> Src folder.
4. Right Click on pom.xml and select Add as maven project.
5. Create resources folder as a sibling to java folder. and put application.properties in it.
6. Application.properties if not available will be in my env files folder.
7. Sometimes you may need to set java8 as your build language (By right clicking on project and select Open module settings).
8. Setting up live-reload for SpringBoot project in Intellij. (It will not work direct in Intellij)   https://stackoverflow.com/questions/33869606/intellij-15-springboot-devtools-livereload-not-working

### Links
https://stackoverflow.com/questions/10832865/hibernate-declare-composite-primary-key-in-jointable-list
https://www.baeldung.com/hibernate-many-to-many
https://blog.jbaysolutions.com/2013/06/06/jpa-2-tutorial-many-to-many-with-self-2/
https://thoughts-on-java.org/ultimate-guide-association-mappings-jpa-hibernate/#manyToMany
https://thoughts-on-java.org/avoid-cascadetype-delete-many-assocations/
https://www.codejava.net/frameworks/spring-boot/spring-boot-crud-example-with-spring-mvc-spring-data-jpa-thymeleaf-hibernate-mysql
http://javawebtutor.com/articles/spring/spring-mvc-hibernate-crud-example.php
https://www.javacodemonk.com/difference-between-getone-and-findbyid-in-spring-data-jpa-3a96c3ff

### Note
1. Even though, Hibernate creates tables for us. It is always a best practise to create tables ourselves. That way we can avoid mistakes.
2. We have created Opponents attribute in Player table using List, But I wanted to have primary key in the underlying table created. For that I should have used Set instead of List.
3. Don't set cascade type as Cascade, it creates problems while deleting. It doesn't work as per the name suggests. Deleting a ManyToMany Relationship is a tedious task. Take a look at the article for how to delete it properly.
4. @Transactional method, make the method atomic. It either happens fully or not happens at all.
5. Design wise, 
    a. dto(dataTransferObject) contains model. It can also be called dao(DataAccessObject)
    b. repository contains, JPA repository files.
    c. controller contains, entry point.
    d. services contains the business logic.
    e. Application is the starting point. (it will have @SpringBootApplication to indicate, this appn is a springboot application)
    f. POM.xml has the required dependencies.
6. findById() and getOne() are not same (https://www.javacodemonk.com/difference-between-getone-and-findbyid-in-spring-data-jpa-3a96c3ff). See the link.
    
    
    