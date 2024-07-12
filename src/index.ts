import { Bot, GrammyError, InputFile } from "grammy";
import { run, RunnerHandle } from "@grammyjs/runner";

import { MainContext } from "./context";
import initialSession from "./session";

const bot = new Bot<MainContext>(
  "7499028459:AAE6i4ie6qKOPGtwQTI3Q31GYTLnCAHAcWY"
);

let number = 0;

bot.command("start", async (ctx) => {
  await ctx.reply("Welcome! Click the button to see the image.", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🤖 Show Image",
            callback_data: "showImage",
          },
        ],
      ],
    },
  });
});

bot.on("callback_query:data", async (ctx) => {
  if (ctx.callbackQuery?.data === "showImage") {
    await ctx.api.sendPhoto(ctx.chat!.id, new InputFile("./000.png"), {
      //   caption: "Test image",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Increase Number", callback_data: "increaseNumber" }],
        ],
      },
    });
    // const imageLink = "https://dev.java/assets/images/duke-rocketboots.png";
    // const htmlMessage = `<a href="${imageLink}" onclick="alert('asasas');">Click here to view the image</a>`;
    // await ctx.reply(htmlMessage, { parse_mode: "HTML" });
    number = 0;
    await ctx.reply(`Number: ${number}`);
  } else if (ctx.callbackQuery?.data === "increaseNumber") {
    number++;
    await ctx.answerCallbackQuery(`Number increased to: ${number}`);
  }
});

bot.on("message:photo", async (ctx) => {
  number++;
  await ctx.reply(`Number: ${number}`);
});

bot.start();
