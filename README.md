# Frontend code submitted for HACK-IT (README is the same for both)[Please use main branch only]


This submission uses the pessimistic approach of locking rows via serializable to ensure first in first out. Users would first choose the movie before selecting the seats. When selected, users will be brought to the confirmation page where they fill in their information. When the seats are selected, the seats will be blocked for 10 minutes, unless the user confirms the booking. The blocked seats will be released via batch job running every 10 minutes. Finally, upon filling up the information and pressing confirm, user will then complete the booking of seats and an email would also be fired to the user.

### Documents
App-flow.docx contains more information about the app flow(with screenshots) as well as the assumptions made.
Test-plan contains the test cases for end to end testing.


Hosted on https://hackit-submission-frontend-ny.herokuapp.com/home


# Installation Instructions(for local) - in order 


Set up database
---

To create local database for connection: https://dev.mysql.com/doc/workbench/en/wb-getting-started-tutorial-create-connection.html 
Create with username `root` and password `password` with port `3306`

Run the SQL script (Script.sql located in scripts folder)


BackEnd
---

Backend uses Java 11
Link is at https://github.com/naiyuh95/spring-boot-movie-booking-backend

### Install 
`mvn clean install`

### Run 
`mvn spring-boot:run`


Frontend
---

Link is at https://github.com/naiyuh95/react-movie-booking-frontend

### Install 
`npm install`

### Run 
`npm start` - open localhost:3000/home to view it in the browser.()



Known issues on deployed server
---
User might fail to confirm the booking. This is due to the use of gmail smtp, which requires enabling DisplayUnlockCaptcha 
https://gmailhelp.com/unlocking-googles-gmail-captcha/
