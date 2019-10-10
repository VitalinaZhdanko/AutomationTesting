## 1.Prerequisites
Before running test use should NodeJs >6.1.0 at the environment: https://nodejs.org/en/download/
## 2. Running of auto-tests locally
In order to run testing script at your own machine perform the following instructions:
#### 2.1 Load the project from the GitHub
Project URL: https://github.com/VitalinaZhdanko/AutomationTesting For example, you may load the project using the command line:
```
git clone https://github.com/VitalinaZhdanko/AutomationTesting.git
```
#### 2.2 Install components
As soon as project is loaded, go to the root and perform command:
```
npm install
```
It will install all components based on *package.json* file into node_modules folder.
#### 2.3 As soon as components are loaded you may run testing scripts.
##### 2.3.1 Run all tests
*If you are not interested in seeing GUI while tests execution you may run tests in [Electron](https://www.npmjs.com/package/electron)*
To run all tests in Electron:
```
npx cypress run
```
*If you prefer to see the application GUI while tests execution you may run tests in Chrome*
To run all tests in Chrome:
```
npx cypress run -b chrome
```
In order to get the report in the Cypress Dashboard you should add some more parameters:
```
npx cypress run -b chrome --record --key ed750b38-9b82-448c-9877-25b928c6c766
```

