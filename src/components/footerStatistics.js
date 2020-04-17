const createFooterStatisticsTemplate = (filmsCount) => {
  return `<p>${filmsCount} movies inside</p>`;
};
export default class FooterStatistics {
  constructor(filmsCount) {
    this._filmsCount = filmsCount;

    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._filmsCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createFooterStatisticsTemplate(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}