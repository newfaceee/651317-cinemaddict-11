const navigationNames = [
  `All movies`, `Watchlist`, `History`, `Favorites`
];

const generateNavigations = () => {
  return navigationNames.map((it) => {
    return (
      it === `All movies` ? {
        name: it} : {
        name: it,
        count: Math.floor(Math.random() * 20),
      });
  });
};

export {generateNavigations};
