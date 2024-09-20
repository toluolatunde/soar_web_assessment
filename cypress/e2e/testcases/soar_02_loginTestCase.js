const { should } = require("chai");

describe("ParaBank Login Tests", function() {
  const config = Cypress.env();
  const baseUrl = config.siteUrl;
  const loginPath = config.loginPath;

  let testData;
  let endpoints = [];

  before(() => {
    cy.fixture("example.json").then((data) => {
      testData = {
        ...data.testUser,
        username: data.testUser.username,
        password: data.testUser.password,
      };
    });
  });

  after(() => {
    cy.clearCookies();
  });

  it("Navigate to website, enter generated test data, and login", function() {
    //I am intercepting the api call to save in endpoint.json
    cy.intercept("*", (req) => {
      req.on("response", (res) => {
        endpoints.push({
          url: req.url,
          method: req.method,
          requestBody: req.body,
          responseBody: res.body,
        });
      });
    }).as("allRequests");

    cy.visit(baseUrl);
    cy.xpath(config.loginPageHeaderTitleXpath)
      .should("be.visible")
      .and("have.text", "Customer Login");
    cy.xpath(config.loginUsernameXpath).type(testData.username);
    cy.xpath(config.loginPasswordXpath).type(testData.password);
    cy.xpath(config.loginButtonXpath).click();

    // Save login endpoints to a JSON file
    cy.wait("@allRequests").then(() => {
      cy.writeFile("cypress/fixtures/endpoints.json", endpoints);
    });

    // Assert successful login
    cy.contains("Accounts Overview").should("be.visible");

    //User should be able to logout
    cy.xpath(config.logoutButtonXpath).click();
    cy.wait("@allRequests").then(() => {
      cy.writeFile("cypress/fixtures/endpoints.json", endpoints);
    });
    cy.xpath(config.loginPageHeaderTitleXpath)
      .should("be.visible")
      .and("have.text", "Customer Login");
    cy.contains("Accounts Overview").should("not.exist");
  });
});
