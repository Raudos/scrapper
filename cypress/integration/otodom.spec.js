const OtodomConfig = require('../../backend/browser/portals/otodom/otodom.config');

describe('Otodom search page', function () {
  beforeEach(function () {
    cy.visit('https://www.otodom.pl/wynajem/mieszkanie');
    cy.wait(2000);
  });

  // it('should render elements to allow web crawling based on config', function () {
  //   cy.get('#mainTopSearch .location-selector').should('be.visible');
  //   cy.get('[data-name*="filter_float_price:from"]').should('be.visible');
  //   cy.get('[data-name*="filter_float_price:to"]').should('be.visible');
  //   cy.get('[data-name*="filter_float_m:from"]').should('be.visible');
  //   cy.get('[data-name*="filter_float_m:to"]').should('be.visible');
  //   cy.get('[data-name*="filter_enum_rooms_num"]').should('be.visible');
  //   cy.get('.btn-search-big').should('be.visible');
  // });

  it('should allow interaction with elements used to filter results', function () {
    OtodomConfig.openCityInput();
    OtodomConfig.enterCityName('Warszawa');
    cy.wait(1000);
    OtodomConfig.selectHighlightedCity();

    OtodomConfig.togglePriceFromInput();
    OtodomConfig.enterToggledInputValue('600');

    OtodomConfig.togglePriceToInput();
    OtodomConfig.enterToggledInputValue('2800');

    OtodomConfig.toggleMetersFromInput();
    OtodomConfig.enterToggledInputValue('20');

    OtodomConfig.toggleMetersToInput();
    OtodomConfig.enterToggledInputValue('30');

    OtodomConfig.toggleRoomsInput();
    OtodomConfig.selectNumberOfRooms(1);

    OtodomConfig.sendQuery();
  });
});
