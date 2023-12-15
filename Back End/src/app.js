const express = require("express");
const routes = require("./routes.js");
const cors = require("cors");
require("./database/index.js");
const path = require("path");

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      "/uploads",
      express.static(path.join(__dirname, "../uploads"))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
