const marvelCharatersRoutes = require('./characters');
const path = require("path");



const constructorMethod = (app) => {
  app.use('/', marvelCharatersRoutes);

  app.use('*', (req, res) => {
    res.status(404).sendFile(path.resolve("./static/error.html"));
  });
};

module.exports = constructorMethod; 