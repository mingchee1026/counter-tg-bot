import { Bot, GrammyError, HttpError, Keyboard } from "grammy";
import { run, RunnerHandle } from "@grammyjs/runner";

import { MainContext } from "./context";

export const Route = {
  idle: "IDLE",
};

export const start = async (): Promise<{
  runnerHandle: RunnerHandle;
}> => {
  // Create new instance bot
  const bot = new Bot<MainContext>(
    "7499028459:AAE6i4ie6qKOPGtwQTI3Q31GYTLnCAHAcWY"
  );

  bot.catch(errorHandler);

  // async function startHandler(ctx: MainContext) {
  //   const log = rootLog.extend('startHandler');
  //   log('start: %O', ctx.message);

  //   await setBotCommands(ctx);

  //   const welcomeMessage = await generateWelcomeMessage(ctx);

  //   return ctx.reply(welcomeMessage, {
  //     parse_mode: 'HTML',
  //     reply_markup: mainMenu,
  //   });
  // }

  //   function helpHandler(ctx: MainContext) {
  //     const log = rootLog.extend('helpHandler');
  //     log('help: %O', ctx.message);

  //     return ctx.reply(ctx.i18n.t('help'), {
  //       parse_mode: 'Markdown',
  //       reply_markup: createMainKeyboard(ctx),
  //     });
  //   }

  // function setBotCommands(ctx: MainContext) {
  //   const log = rootLog.extend('setBotCommands');
  //   log('Setting bot commands...');
  //   const myCommands: { command: string; description: string }[] = [];

  //   for (const val of Object.values(command)) {
  //     myCommands.push({
  //       command: val as string,
  //       description: ctx.t(`command-${val}`),
  //     });
  //   }
  //   log('myCommands: %O', myCommands);

  //   return ctx.api.setMyCommands(myCommands);
  // }

  function errorHandler(err: any) {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
      console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
      console.error("Could not contact Telegram:", e);
    } else {
      console.error("Unknown error:", e);
    }
  }

  const runnerHandle = run(bot);
  console.log(`Bot started and running ... 🤖`);

  return { runnerHandle };
};
