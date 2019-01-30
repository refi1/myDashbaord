Angular 6-MEAN Stack 

## My Dashboard
The main page will have all the information necessary ; including an “About Us” page and  “Post“ 
page which gives a summary of all the users and their post activity. It also includes a “Sign Up”
page which gives new users the option to register into the system and a “Log In” page for the existent users. 
A regular user can login and be able to create new posts which will upload into the database. 
The user will be able to see the list of his/her existing  post(s), and have the option to ONLY modify or 
remove their own respective post(s). Each of the created posts have a status of their own (Open, In Progress, Done).
The logged in users are also able to access the dashboard. The dashboard gives the option to display, 
drag or remove an existent chart. It also gives the users the option to select which of the data that 
the chart contains will be displayed.


## Features 

*	Register
*	Login 
*	Posts creation
*	Post editing
*	Charts Presentation
*	Charts creation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.

## Development server
Install Dependencies with npm install in both folders "backend" and "userdashboard"
* Run `ng serve` for a dev server in userDashboard . Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
*	FrontEnd: Angular 6 + Ng2-charts + Angular Material +Ng- bootstrap
*	BackEnd: MongoDB + Express(Server) + NodeJS
*	Connect the back-end server to the MongoDB database by using Mongoose(library).
*	 Babel-cli (Compiler)/Babel-preset-env / Babel-watch (ECMAScript  ): is used for writing server applications and services using Node.js.
*	Babel Complier uses “dev” script. You can run the program by using the  `npm run dev` command in backend folder.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Linux
If you are a Linux user ,you have to run `Program Files/MongoDB/Server/4.0/bin/mongo.exe` before run backend command line.
If a bcrypt error occures please try to reinstall it, in backend folder.
You can find more information for this error in [stackoverflow](https://stackoverflow.com/questions/50333003/could-not-find-module-angular-devkit-build-angular?fbclid=IwAR3dDE75zeCFXRQojMGE4Xo6uTTsoyLHAhBWGnajoXPYfOQM9AApeqAQ0CA) or [Bcrypt](https://www.npmjs.com/package/bcrypt)
