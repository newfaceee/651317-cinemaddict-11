export const createFilmsContainerTemplate = (isAdditional, title) => {
  return (`<section class="${isAdditional ? `films-list--extra` : `films-list`}">
  <h2 class="films-list__title ${isAdditional ? `` : `visually-hidden`}">${title}</h2>
      <div class="films-list__container">
      </div>
    </section>`);
};
