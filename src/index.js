import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import bot from "./bot/index.js"

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
    this.bot()
  }
  middleware() {
    this.server.use(cors());
    this.server.use(express.json());
  }
  routes() {
    this.server.use(routes)
  }
  bot() {
    bot()
  }
}

export default new App().server;
