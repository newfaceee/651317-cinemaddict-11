import AbstractComponent from './abstract-component.js';

const createFooterStatisticsTemplate = (filmsCount) => {
  return `<p>${filmsCount} movies inside</p>`;
};
export default class FooterStatistics extends AbstractComponent {
  constructor(filmsCount) {
    super();

    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._filmsCount);
  }
}
