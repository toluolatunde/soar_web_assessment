describe("ParaBank Mobile Resolution Tests", function() {
  const config = Cypress.env();
  const baseUrl = Cypress.env("siteUrl");

  let testData;

  before(() => {
    cy.fixture("example.json").then((data) => {
      testData = {
        ...data.testUser,
        username: data.testUser.username,
        email: data.testUser.email,
      };
    });
  });

  it("Test mobile devices compatibility", function() {
    const mobileResolutions = [
      [375, 667], // iPhone 6/7/8
      [768, 1024], // iPad
      [414, 896], // iPhone 11 Pro Max - Bigger screen test
      [360, 640], // Android
      [1440, 2560], // Android Tablet
    ];

    mobileResolutions.forEach((resolution) => {
      cy.viewport(resolution[0], resolution[1]);
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

      // Validate elements are visible and values can be entered on each field
      cy.xpath(config.registerFirstNameXpath).should('be.visible').type(testData.firstName);
      cy.xpath(config.registerLastNameXpath).should('be.visible').type(testData.lastName);
      cy.xpath(config.registerAddressXpath).should('be.visible').type(testData.address.street);
      cy.xpath(config.registerCityXpath).should('be.visible').type(testData.address.city);
      cy.xpath(config.registerStateXpath).should('be.visible').type(testData.address.state);
      cy.xpath(config.registerZipCodeXpath).should('be.visible').type(testData.address.zipCode);
      cy.xpath(config.registerPhoneXpath).should('be.visible').type(testData.phoneNumber);
      cy.xpath(config.registerSsnXpath).should('be.visible').type(testData.ssn);
      cy.xpath(config.registerUsernameXpath).should('be.visible').type(testData.username);
      cy.xpath(config.registerPasswordXpath).should('be.visible').type(testData.password);
      cy.xpath(config.registerConfirmPasswordXpath).should('be.visible').type(testData.password);
      cy.xpath(config.registerButtonXpath).should('be.visible')

      // Validate same on for login
      cy.xpath(config.loginPageHeaderTitleXpath)
        .should("be.visible")
        .and("have.text", "Customer Login");
      cy.xpath(config.loginUsernameXpath).should('be.visible').type(testData.username);
      cy.xpath(config.loginPasswordXpath).should('be.visible').type(testData.password);
      cy.xpath(config.loginButtonXpath).should("be.visible");
      
    });
  });
});
