import 'cypress-file-upload';
Cypress.Commands.add("login", (email, password) => {
  cy.visit("http://localhost:3000/login"); // ログインページへ一度繊維
  cy.get('input[name="email"]').type('e@e');
  cy.get('input[name="password"]').type(99999);
  cy.get(".login__container__login-btn").click();
  return cy;
});
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })