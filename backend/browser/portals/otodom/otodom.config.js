const BrowserAction = require('../../../models/BrowserAction');

module.exports = {
  openCityInput: new BrowserAction('#mainTopSearch .location-selector').click,
  enterCityName: new BrowserAction('span.select2-search.select2-search--dropdown > input').type,
  selectHighlightedCity: new BrowserAction('.select2-results ul.select2-results__options .select2-results__option--highlighted').click,
  enterToggledInputValue: new BrowserAction('span.select2-container.select2-container--suggestions.suggestions-small.select2-container--open > span > span.select2-search.select2-search--dropdown > input').type,
  togglePriceFromInput: new BrowserAction('[data-name*="filter_float_price:from"]').click,
  togglePriceToInput: new BrowserAction('[data-name*="filter_float_price:to"]').click,
  toggleMetersFromInput: new BrowserAction('[data-name*="filter_float_m:from"]').click,
  toggleMetersToInput: new BrowserAction('[data-name*="filter_float_m:to"]').click,
  toggleRoomsInput: new BrowserAction('.filter-item[data-name*="filter_enum_rooms_num"]').click,
  selectNumberOfRooms: new BrowserAction('.select2-results ul.select2-results__options li').clickNthElement,
  sendQuery: new BrowserAction('.btn-search-big').click,
};
