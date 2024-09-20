class paraBank {
  enterUserNameOnLogin() {
    return cy.get(".list-left > .well > .list-group > :nth-child(6)");
  }
}

export default paraBank;
