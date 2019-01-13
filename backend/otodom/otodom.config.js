class Action {
  constructor(selector) {
    this.selector = selector;
  
    this.click = this.click.bind(this);
    this.type = this.type.bind(this);
    this.clickNthElement = this.clickNthElement.bind(this);
  }
  
  click(page = false) {
    if (page) {
      return page.click(this.selector);
    }
  
    cy.get(this.selector).click();
  }
  
  type(text, page = false) {
    if (page) {
      return page.type(this.selector, text);
    }
    
    cy.get(this.selector).type(text);
  }
  
  clickNthElement(child, page = false) {
    const childElem = `${this.selector}:nth-child(${child})`;
    
    if (page) {
      return page.click(childElem);
    }
    
    cy.get(childElem).click();
  }
}

module.exports = {
  openCityInput: new Action('#mainTopSearch .location-selector').click,
  enterCityName: new Action('span.select2-search.select2-search--dropdown > input').type,
  selectHighlightedCity: new Action('.select2-results ul.select2-results__options .select2-results__option--highlighted').click,
  enterToggledInputValue: new Action('span.select2-container.select2-container--suggestions.suggestions-small.select2-container--open > span > span.select2-search.select2-search--dropdown > input').type,
  togglePriceFromInput: new Action('[data-name*="filter_float_price:from"]').click,
  togglePriceToInput: new Action('[data-name*="filter_float_price:to"]').click,
  toggleMetersFromInput: new Action('[data-name*="filter_float_m:from"]').click,
  toggleMetersToInput: new Action('[data-name*="filter_float_m:to"]').click,
  toggleRoomsInput: new Action('.filter-item[data-name*="filter_enum_rooms_num"]').click,
  selectNumberOfRooms: new Action('.select2-results ul.select2-results__options li').clickNthElement,
  sendQuery: new Action('.btn-search-big').click,
};
