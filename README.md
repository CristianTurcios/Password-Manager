# Password Manager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.7, [Flask](https://flask.palletsprojects.com/en/2.2.x/) and [Python 3.9.7](https://www.python.org/)

## Technologies

### FrontEnd
- Bootstrap 5
- Angular 14
- TypeScript
- ng bootstrap
- Rxjs
- FontAwesome icons

### BackEnd
- Python
- Flask
- Flask-RESTful
- Flask-Cors

## Limitations
- Due to time constraints the api is not documented with swagger
- Due to time constraints only certain tests were added, in this case the tests are included in the service that communicates with the BE

## Assumptions

-  This project asumes that no authentication/authorization is needed to access the cards.
-  API avoids encryption of passwords, it could be implemented when a database is used.
-  Angular project is limited to the main page containing the list of cards. In a modern webapp the project would be divided into modules to organize code, implement lazy loading.
-  No validation are run in the fields like password constraints or sites with the same name.

## Algorithm & Approach

**Backend:** I chose to do the BE with `flask` since it allows me to make an api easily and quickly in a few lines of code. As this is a fairly simple project like a simple CRUD, `flask` is perfectly suited to the needs of the project.

**FrontEnd:** There is a main component that handles all the logic `app.component.ts` and then subcomponents that are in charge of dividing the application into small manageable and reusable parts like `loading, header, card`

The elements of the application are divided into folders to make it easier to understand such as: `services, interfaces, components`

## Requirements

-  Present “cards” that tile across the screen and allow the user to scroll down through them ✅
-  Provide the ability to create new cards. Notice that URL, Name, Username and Password must be required.✅
-  Provide the ability to edit cards ✅
-  Provide the ability to delete cards ✅
- For the Password field, provide support for it to be obscured or unobscured. And provide the ability to copy the password into the clipboard so the user can paste it into a password field when signing into an application of website. ✅
- Provide a simple search/filtering – use only the Name field ✅
- Provide the following REST API endpoints: ✅
	- /password-cards o GET Get all “cards” o POST Creation of a new “card” 
	-  /password-cards/{id} o PUT Editing of a specific “card” o DELETE Removing of a specific “card”

## Installation

### FrontEnd

**Note:**  Node 14.15.x/^16.10.x or later minor version is required

```bash
# Installation
$ cd password-manager-frontEnd
$ npm install
```

### BackEnd

**Note:**  Python version 3.9.7 is required
```bash
# Installation
$ cd password-manager-backEnd
$ pip install -r requirements.txt
```

## Running the app

### FrontEnd
```bash
# development
$ ng serve -o
```

### BackEnd
```bash
# development
$ python app.py
```

## Test

```bash
# unit tests
$ ng test
```

## Web App Screenshots

![List of Competitions](src/assets/img/competitions.png)

![List of Teams](src/assets/img/teams.png)

![List of Players](src/assets/img/players.png)

![List of Competitions- Mobile view](src/assets/img/competitions-mobile.png)
