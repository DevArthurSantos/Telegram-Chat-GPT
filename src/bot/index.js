import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const { BOT_TOKEN } = process.env;

export default async function () {
  const bot = new Telegraf(BOT_TOKEN);

  bot.on("text", async (ctx) => {
    let {text} = ctx.update.message

    const {data} = await axios.post("http://localhost:3000/api", { text })
    .then((data) => data)
    .catch(err => console.error(err))
    ctx.reply(data.text);
  });
  bot.launch();
}

console.log("bot iniciado");