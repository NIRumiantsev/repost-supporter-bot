import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

const bot = new Telegraf(process.env.BOT_TOKEN);
const supportingUser = process.env.SUPPORTING_PERSON_USERNAME;
const supportingPublicList = JSON.parse(process.env.SUPPORTING_PUBLIC_TITLE_LIST);
const supportPhrase = process.env.SUPPORT_PHRASE;

let isReplyEnabled = true;

bot.on(message(), async (ctx) => {
  const { message } = ctx;

  if (message.from.username !== supportingUser || !message.forward_from_chat) {
    return;
  }

  const isSupportingPublic = supportingPublicList.some((title) =>
    message.forward_from_chat.title.toLowerCase().includes(title.toLowerCase())
  );

  if (isSupportingPublic && isReplyEnabled) {
    ctx.reply(supportPhrase);

    isReplyEnabled = false;

    setTimeout(() => {
      isReplyEnabled = true;
    }, 1000);
  }
});

bot.launch();
