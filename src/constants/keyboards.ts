import { Telegraf, Markup } from 'telegraf'
import keyboardButtons from './keyboardButtons.json'

export const mainKeyboard = Markup
  .keyboard([
    [keyboardButtons.mainMenu.add],
    [keyboardButtons.mainMenu.history, keyboardButtons.mainMenu.statistics],
  ])


export const addKeyboard = Markup
  .keyboard([
    [keyboardButtons.addMenu.expenses, keyboardButtons.addMenu.incomes],
    [keyboardButtons.back],
  ])

export const dateKeyboard = Markup
  .keyboard([
    [keyboardButtons.addMenu.date]
  ])

export const descriptionKeyboard = Markup
  .keyboard([
    [keyboardButtons.addMenu.description]
  ])