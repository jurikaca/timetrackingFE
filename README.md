# Timetracker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Project Overview

##### 1. Time Frame of the whole front-end part
In total I needed 3,5 hours to finish front-end part
- logic for time tracker (0.5 h)
- services function to connect and share data with server (0.5 h)
- table for logged time history (ajax datatable functionalities) (1.5 h)
- modal for saving the logged and tracked time (0.5 h)
- datetimepicker plugin (0.5 h)

##### 2. Improvements and Satisfied parts of the test project
Things I could improve or do better if I would spend more time are:
- Better data validation to secure the app (ex. not to allow user to add future date for tracked time)
- Allow user to add more then one timer(he can run only one of them at a time) so he can run multiple tasks timers if need to switch between tasks.
- Improve the design and UI to make it better for users.
- Add task name or select from a dropdown menu a task for tracked time.
- There can be also many other additional things to add or improve here :)

Things I am satisfied of:
- Table of time logged (datatable functionalities). It is dynamically getting data from server when searching, ordering, navigating through pages or saving new tracked time.
- Logic of timer for measuring tracked time.
- Code implementation and clean.
- Implementation of plugins like datetimepicker and toastr.

## Deployment Steps

##### 1. Download front-end code 
Open your terminal and run `git clone https://github.com/jurikaca/timetrackingFE.git` to download the code. After that run `cd timetrackingFE`. Now you are at the root of app.

Or you can download and unzip the compressed file on the desired location of your local machine and then navigate inside the app folder with a cmd tool.

##### 2. Setup project
Before you start on the steps below be sure that you have installed NodeJS, git and npm on your machine.
- Now that you are at the root of app run `npm install` to install all the dependencies.
- Then navigate on  `src/app/providers/config` to change the `SERVER_URL`. This is the server for API call (back-end).
- The last thing is to run `ng serve` and navigate through localhost:4200 on browser.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
