const navigationNames = [
  `All movies`, `Watchlist`, `History`, `Favorites`
];

const generateNavigations = () => {
  const COUNT_MAX = 20;
  return navigationNames.map((it) => {
    return (
      it === `All movies` ? {
        name: it} : {
        name: it,
        count: Math.floor(Math.random() * COUNT_MAX),
      });
  });
};

export {generateNavigations};
