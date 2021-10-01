import { Composer, Scenes, Markup } from "telegraf";
import { SessionContext } from "../context/context";
import { template } from "../utils/templater";

const parser = require('any-date-parser');

import { replyMenuToContext } from 'telegraf-inline-menu'
import { historyDatesTemplate } from '../menu/historyDatesTemplate'
import { startOfToday, format } from 'date-fns'

const getDateStep = new Composer<SessionContext>();
getDateStep.on("text", async (ctx) => {
  const date = ctx.message.text.replace(/\s/g, '')

  let dates = []
  let startDate:any
  let endDate:any
  if (date.includes('+')) {
    dates = date.split('+');

    startDate = dates[0].length > 0 ? parser.fromString(dates[0]) : parser.fromString('01.01.2018')
    endDate = dates[1].length > 0 ? parser.fromString(dates[1]) : new Date(startOfToday().toISOString())
  } else {
    dates = date.split('-');

    startDate = parser.fromString(dates[0])
    endDate = parser.fromString(dates[1])
  }
  // Validating date
  if (endDate.invalid != undefined || startDate.invalid != undefined) {
    await ctx.reply(template("timeInterval", "date_error"));
    return;
  }

  ctx.session.dateChoice = null
  ctx.session.dateFilter = { start: startDate, end: endDate }
  replyMenuToContext(historyDatesTemplate, ctx, 'hisotry/hist_dates/')
  return await ctx.scene.leave();
});

export const timeIntervalWizard = new Scenes.WizardScene(
  "timeinterval-wizard",
  async (ctx) => {
    await ctx.replyWithHTML(template("timeInterval", "wizardStart"));
    await ctx.replyWithHTML(template("timeInterval", "date"));
    return ctx.wizard.next();
  },
  getDateStep
);