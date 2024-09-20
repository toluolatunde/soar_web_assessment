// Require dotenv to load environment variables
const dotenv = require("dotenv");

dotenv.config();
module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/testcases/**/*.{js,ts}",
    supportFile: "cypress/support/index.js",
    viewportHeight: 900,
    viewportWidth: 1400,
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports/mocha",
      overwrite: false,
      html: true,
      json: true,
    },
    env: {
      siteUrl: process.env.BASE_URL,
      registerPath: process.env.REGISTER_PATH,
      loginPath: process.env.LOGIN_PATH,
      loginUsernameXpath: process.env.LOGIN_USERNAME_TEXTFIELD_XPATH,
      loginPasswordXpath: process.env.LOGIN_PASSWORD_TEXTFIELD_XPATH,
      loginButtonXpath: process.env.LOGIN_BUTTON_XPATH,
      loginPageHeaderTitleXpath: process.env.LOGIN_PAGE_HEADER_TITLE_XPATH,
      logoutButtonXpath: process.env.LOGOUT_BUTTON_XPATH,
      
      registerButtonOnHomepageXpath:
        process.env.REGISTER_BUTTON_ON_HOMEPAGE_XPATH,
      registerPageHeaderTitleXpath:
        process.env.REGISTER_PAGE_HEADER_TITLE_XPATH,
      registerPageHeaderDescriptionXpath:
        process.env.REGISTER_PAGE_HEADER_DESCRIPTION_XPATH,
      registerFirstNameXpath: process.env.REGISTER_FIRST_NAME_TEXTFIELD_XPATH,
      registerLastNameXpath: process.env.REGISTER_LAST_NAME_TEXTFIELD_XPATH,
      registerAddressXpath: process.env.REGISTER_ADDRESS_TEXTFIELD_XPATH,
      registerCityXpath: process.env.REGISTER_CITY_TEXTFIELD_XPATH,
      registerStateXpath: process.env.REGISTER_STATE_TEXTFIELD_XPATH,
      registerZipCodeXpath: process.env.REGISTER_ZIP_CODE_TEXTFIELD_XPATH,
      registerPhoneXpath: process.env.REGISTER_PHONE_TEXTFIELD_XPATH,
      registerSsnXpath: process.env.REGISTER_SSN_TEXTFIELD_XPATH,
      registerUsernameXpath: process.env.REGISTER_USERNAME_TEXTFIELD_XPATH,
      registerPasswordXpath: process.env.REGISTER_PASSWORD_TEXTFIELD_XPATH,
      registerConfirmPasswordXpath:
        process.env.REGISTER_CONFIRM_PASSWORD_TEXTFIELD_XPATH,
      registerButtonXpath: process.env.REGISTER_BUTTON_XPATH,

      environment: process.env.ENVIRONMENT,
    },
  },
};
