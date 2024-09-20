describe("ParaBank Registration Tests", function() {
  const config = Cypress.env();
  const baseUrl = Cypress.env("siteUrl");

  let testData;
  let endpoints = []; // Initialize endpoints array

  before(() => {
    cy.clearAllCookies();
    cy.fixture("example.json").then((data) => {
      testData = {
        ...data.testUser,
        username: data.testUser.username,
        email: data.testUser.email,
      };
    });
  });

  it("Verify user can not register with already used data", function() {
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
    cy.xpath(config.registerButtonOnHomepageXpath).click(); // Navigate to registration page
    cy.url().should("include", "/register");

    cy.xpath(config.registerPageHeaderTitleXpath)
      .should("be.visible")
      .and("have.text", "Signing up is easy!");
    cy.xpath(config.registerPageHeaderDescriptionXpath)
      .should("be.visible")
      .and(
        "have.text",
        "If you have an account with us you can sign-up for free instant online access. You will have to provide some personal information."
      );

    // Fill registration form
    cy.xpath(config.registerFirstNameXpath).type(testData.firstName);
    cy.xpath(config.registerLastNameXpath).type(testData.lastName);
    cy.xpath(config.registerAddressXpath).type(testData.address.street);
    cy.xpath(config.registerCityXpath).type(testData.address.city);
    cy.xpath(config.registerStateXpath).type(testData.address.state);
    cy.xpath(config.registerZipCodeXpath).type(testData.address.zipCode);
    cy.xpath(config.registerPhoneXpath).type(testData.phoneNumber);
    cy.xpath(config.registerSsnXpath).type(testData.ssn);
    cy.xpath(config.registerUsernameXpath).type(testData.username);
    cy.xpath(config.registerPasswordXpath).type(testData.password);
    cy.xpath(config.registerConfirmPasswordXpath).type(testData.password);

    cy.xpath(config.registerButtonXpath).click(); // Submit registration

    // Save endpoints to a fixtures as endpoints
    cy.wait("@allRequests").then(() => {
      cy.writeFile("cypress/fixtures/endpoints.json", endpoints);
    });

    // Assert successful registration
    cy.contains(
      "This username already exists."
    ).should("be.visible");
  });
});
