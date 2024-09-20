# soar_cypress_automation

Steps to run the test

1. Clone the project
2. Open the project folder with VS Code
3. Open terminal to Install cypress: "npm install cypress --save-dev"
4. Create .env file and copy the data in env.example to it
5. Open run test from terminal "npm run scripts"/ "npx run cypress"
6. Result would be generated in Mochawesome folder, mochawesome.html

# There were no issues at the time of this push

#Bug Found:

Bug Title: Homepage: When user clicks on withdraw funds under ATM services user gets XML format document.

Steps to reproduce:
1. Go to the url https://parabank.parasoft.com/parabank/index.htm
2. Hover the mouse to ATM Service
3. Click on Withdraw funds

Expected result: User should be redirected to another page showing details of withdraw funds

Actual result: User is redirected but a page of XML wrong fomat.

Screenshot: Not attached
Browser: Chrome
Version: Version 128.0.6613.120 (Official Build) (arm644)
OS: Mac OS

#Explanation of work done

---While it's possible to handle all these scenarios in a single test file, it's generally better practice to separate tests into multiple files for the following reasons:
1. Maintainability: Smaller, focused test files are easier to maintain. If a test fails, it's easier to locate and fix the issue.

2. Readability: Each test file can focus on a specific feature or functionality, making it easier for team members to understand the purpose of each test.

3. Isolation: Tests can be run in isolation, which helps in identifying issues without interference from other tests.

4. Scalability: As the test suite grows, having separate files allows for better organization and scalability.

5. Parallel Execution: If tests are organized into separate files, they can be run in parallel, reducing overall test execution time.


#keyNotes

1. I intentionally intercepted the api call on both register and login tests as against saving all api calls across each test file run. This is because I want to store the specific api request for this assessment purpose, I could still make it a global by saving all requests using Cypress.env('apiEndpoints', []);

2. When "npx cypress run" is used in other to view report in one glance, I advice the mochawesome/mochawesome.html is viewd on a browser.

3. I did not use dynamic data for registration, as I want to be specific on test data, if we are to integrate test in the CI, I can make refactors to accommodate each reality.

4. I intentionally did not handle any negative test scenarios outside the specified in the assessment questions. In other to save time for the purpose of submission.