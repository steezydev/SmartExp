import { Composer, Scenes, Markup } from "telegraf";
import { SessionContext } from "../context/context";
import { template } from "../utils/templater";
import { mainKeyboard, dateKeyboard, descriptionKeyboard } from '../constants/keyboards'
import { createKeyboard } from '../utils/categoryKeyboard'
import { fancyCount2, isEmojisOnly } from "../utils/checkEmoji";
import currency from '../constants/currency'

import CategoryModel from "../models/categoryModel"
import IncomeModel from "../models/incomeModel"
import UserModel from "../models/userModel"

const parser = require('any-date-parser');

interface incomeData {
  sum: number;
  currency: string;
  category: string;
  date: string;
  description: string;
}

const saveIncome = async (ctx: any) => {
  const data = ctx.session.incomeData
  const user = await UserModel.findOne({telegramId: data.telegramId}).exec()

  if (user == null) {
    throw new Error
  }

  if (currency[user.currency] == undefined) {
    throw new Error
  }

  IncomeModel.create(data, function (err: any) {
    if (err) throw new Error();
  })

  const date = new Date(data.date);

  await ctx.replyWithMarkdown(template("income", "wizardEnd", {
    sum: ctx.session.incomeData.sum,
    currency: currency[user.currency].sign,
    category: ctx.session.incomeData.category,
    date: date.getDate() + '.' + (("0" + (date.getMonth() + 1)).slice(-2)) + '.' + date.getFullYear(),
    description: ctx.session.incomeData.description
  }),
    mainKeyboard
      .resize()
  );
}

function isNumeric(a: string) {
  if (typeof a != "string") return false // we only process strings!  
  return !isNaN(parseFloat(a)) // ...and ensure strings of whitespace fail
}

// Getting sum wizard step
const getSumStep = new Composer<SessionContext>();
getSumStep.on("text", async (ctx) => {

  const sum = ctx.message.text;

  if (!isNumeric(sum)) {
    ctx.reply(template("income", "sum_error", {}));
    await ctx.reply(template("income", "sum", {}));
    return;
  }

  ctx.session.incomeData.sum = parseFloat(sum.replace(',', '.')).toFixed(2);

  //Getting category keyboard
  const categoryKeyboard = await createKeyboard(ctx.from.id, 'INCOME')
  if (categoryKeyboard != null) {
    await ctx.reply(template("income", "category", {}), categoryKeyboard.resize());
  } else {
    await ctx.reply(template("income", "no_category", {}));
    await ctx.reply(template("income", "category", {}));
  }
  return ctx.wizard.next();
});
getSumStep.use((ctx) =>
  ctx.reply(template("income", "sum", {}))
);

// Getting category wizard step
const getCategoryStep = new Composer<SessionContext>();
getCategoryStep.on("text", async (ctx) => {
  const category = ctx.message.text;

  if (!isEmojisOnly(category) || fancyCount2(category) > 3) {
    ctx.reply(template("income", "category_error", {}));
    await ctx.reply(template("income", "category", {}));
    return;
  }

  const emoji = await CategoryModel.find({ emoji: category }).exec()
  if (emoji.length <= 0) {
    ctx.session.newCategory = category
    await ctx.reply('У вас еще нет такой категории...', Markup.removeKeyboard());
    await ctx.reply(
      `Добавить новую категорию ${category}?`,
      Markup.inlineKeyboard([
        Markup.button.callback('Да', 'confirmCategory'),
        Markup.button.callback('Нет', 'rejectCategory'),
      ])
    )
    return ctx.wizard.next();
  }


  ctx.session.incomeData.category = category
  await ctx.reply(template("income", "date", {}), dateKeyboard.resize());
  return ctx.wizard.selectStep(4);
});

const newCategoryStep = new Composer<SessionContext>();
newCategoryStep.action('confirmCategory', async (ctx) => {
  const category = ctx.session.newCategory
  const userId = ctx.session.userId

  CategoryModel.create({
    emoji: category,
    type: 'INCOME',
    userTelegramId: userId
  }, function (err) {
    if (err) throw new Error();
  })
  await ctx.reply(template("income", "category_add", { category: category }));

  ctx.session.incomeData.category = category
  await ctx.reply(template("income", "date", {}), dateKeyboard.resize());
  return ctx.wizard.next()
})

newCategoryStep.action('rejectCategory', async (ctx) => {
  const category = ctx.session.newCategory
  const userId = ctx.session.userId

  await ctx.reply(template("income", "category_notAdd", { category: category }));

  const categoryKeyboard = await createKeyboard(userId, 'INCOME')
  if (categoryKeyboard != null) {
    await ctx.reply(template("income", "category", {}), categoryKeyboard.resize());
  } else {
    await ctx.reply(template("income", "no_category", {}));
    await ctx.reply(template("income", "category", {}));
  }

  return ctx.wizard.back()
})

// Getting date wizard step
const getDateStep = new Composer<SessionContext>();
getDateStep.on("text", async (ctx) => {
  const date = ctx.message.text;

  let parsedDate = parser.fromString(date);
  if (date == 'Сегодня' || date == 'Today') {
    parsedDate = parser.fromString('today');
  }

  // Validating date
  if (parsedDate.invalid != undefined) {
    ctx.reply(template("income", "date_error", {}));
    await ctx.reply(template("income", "date", {}));
    return;
  }

  ctx.session.incomeData.date = parsedDate
  await ctx.reply(template("income", "description", {}), descriptionKeyboard.resize());
  return ctx.wizard.next();
});
getDateStep.use((ctx) =>
  ctx.replyWithMarkdown(template("income", "date", {}))
);

// Getting description wizard step
const getDescriptionStep = new Composer<SessionContext>();
getDescriptionStep.on("text", async (ctx) => {

  let description = ctx.message.text;

  if (description.length > 100) {
    ctx.reply(template("income", "description_error", {}));
    await ctx.reply(template("income", "description", {}), descriptionKeyboard.resize());
    return;
  }

  if (description == 'Без описания') {
    description = '-'
  }

  ctx.session.incomeData.description = description

  // Saving data to the database
  await saveIncome(ctx)

  return await ctx.scene.leave();
});
getDescriptionStep.use((ctx) =>
  ctx.replyWithMarkdown(template("income", "description", {}))
);


export const incomeWizard = new Scenes.WizardScene(
  "income-wizard",
  async (ctx) => {
    ctx.session.incomeData = {};
    ctx.session.incomeData.telegramId = ctx.from!.id

    const text = template("income", "wizardStart", {});
    await ctx.replyWithMarkdown(text, Markup.removeKeyboard());
    await ctx.reply(template("income", "sum", {}));
    return ctx.wizard.next();
  },
  getSumStep,
  getCategoryStep,
  newCategoryStep,
  getDateStep,
  getDescriptionStep
);
