describe.skip("Current Tours", () => {
  const baseUrl = "http://localhost:3000"
  const toursUrl = "http://localhost:3000/current-tours"

  const logOut = () => {
    cy.get(".main-menu")
      .contains("Profile")
      .click({force: true})
      .get(".profile")
      .get('button')
      .contains("Log Out")
      .click({force: true})
  }

  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => { return false})
    cy.visit('http://localhost:3000')
      .get("header button")
      .click()
      .get("form input[name=username]")
      .type("BCBTestUser@gmail.com")
      .get("form input[name=password]")
      .type("BCBtest123!")
      .get("button[name=action]")
      .click()
      .get(".main-menu")
      .contains("Current Tours")
      .click()
  })

  it("Should visit the correct URL path on click", () => {
    cy.url().should("include", toursUrl)
    logOut()
  })

  it("Should have correct header", () => {
    cy.get(".current-tours h1").should("have.text", "Current Tours")
    logOut()
  })

  it("Should be able to add a new tour with location and date and see it in current tours", () => {
    cy.get(".main-menu")
      .contains("Add Tour")
      .click()
      .get("form input[name=location]")
      .type("Jones Pass")
      .get(".main-menu")
      .contains("Current Tours")
      .click({force: true})
    cy.get(".current-tours-card")
      .last()
      .find("h3")
      .should("have.text", "Jones Pass")
      logOut()
  })

  it("Should be able to click on a current tour card and edit tour form fields", () => {
    cy.get(".current-tours-card")
      .get('[alt="mountains icon"]')
      .should("be.visible")
    cy.get(".current-tours-card")
      .last()
      .find("h3")
      .should("have.text", "Jones Pass")
      .click()
      .get('form')
      .find('button').contains("ii")
      .click()
      // .get('form')
      // .find('textarea').eq(0)
      // .type('Very Windy')
      // .get('button').contains('SAVE')
      // .click()
    logOut()
  })
})
