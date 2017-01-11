# prototype-interfaces-training
A web app that leverages gamification techniques, to learn how to use the GTW browser.

## Installation
Unzip the project to a folder on your server, then access it from a browser.

## Configuration
Access user.js and provide values to the four fields:
1. user.firstName: The first name of the participant.
2. user.firstName: The last name of the participant.
3. user.email: A valid e-mail for the participant. 
4. user.password: Provide a password for the creation of the user account.  

It is imperative to note the e-mail and password you provided so as to have access to the user's data that is created.

## How to change database / domain
This web app saves data to a Firebase database. To change the domain and set it up on a different Firebase account than the MAMEM one,
 change the Initialization information that is provided inside the index.html
  
## Localization
All text in the application is localizable. Just change the string values inside the text.js file with the one
in your preferred language.