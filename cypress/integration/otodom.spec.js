describe('Otodom search page', function () {
  beforeEach(function () {
    cy.visit('https://www.otodom.pl/wynajem/mieszkanie');
    cy.wait(2000);
  });
  
  it('should render elements to allow web crawling based on config', function () {
    cy.get('#mainTopSearch .location-selector').should('be.visible');
    cy.get('[data-name*="filter_float_price:from"]').should('be.visible');
    cy.get('[data-name*="filter_float_price:to"]').should('be.visible');
    cy.get('[data-name*="filter_float_m:from"]').should('be.visible');
    cy.get('[data-name*="filter_float_m:to"]').should('be.visible');
    cy.get('[data-name*="filter_enum_rooms_num"]').should('be.visible');
    cy.get('.btn-search-big').should('be.visible');
  });
  
  it('should allow interaction with elements used to filter results', function () {
    cy.get('#mainTopSearch .location-selector').click();
    cy.get('span.select2-search.select2-search--dropdown > input').type('Warszawa', { force: true });
    cy.wait(2000);
    cy.get('.select2-results ul.select2-results__options .select2-results__option--highlighted').click();
    
    cy.get('[data-name*="filter_float_price:from"]').click();
    cy.get('body > span.select2-container.select2-container--suggestions.suggestions-small.select2-container--open > span > span.select2-search.select2-search--dropdown > input').type('600');
    
    cy.get('[data-name*="filter_float_price:to"]').click();
    cy.get('body > span.select2-container.select2-container--suggestions.suggestions-small.select2-container--open > span > span.select2-search.select2-search--dropdown > input').type('800');
  
    cy.get('[data-name*="filter_float_m:from"]').click();
    cy.get('body > span.select2-container.select2-container--suggestions.suggestions-small.select2-container--open > span > span.select2-search.select2-search--dropdown > input').type('20');
    
    cy.get('[data-name*="filter_float_m:to"]').click();
    cy.get('body > span.select2-container.select2-container--suggestions.suggestions-small.select2-container--open > span > span.select2-search.select2-search--dropdown > input').type('30');
  
    cy.get('.col-md-rooms > .filter-item > .select2 > .selection > .select2-selection').click();
    cy.get('.select2-results ul.select2-results__options li:nth-child(1)').click();
    
    cy.get('.btn-search-big').click();
  });
});
