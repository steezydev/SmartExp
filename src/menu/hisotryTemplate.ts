import { MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu'

import { historyCategoriesTemplate } from './historyCategoriesTemplate'
import { historyDatesTemplate } from './historyDatesTemplate'
import { historyFiltersTemplate } from './historyFiltersTemplate'
import { historyResultTemplate } from './historyResultTemplate'
 
import {history as historyButtons} from '../constants/inlineButtons.json'
import { SessionContext } from '../context/context'

import { template } from "../utils/templater";


const historyTemplate = new MenuTemplate<SessionContext>(async ctx => {
  const text = template("history", "mainMessage")
  return { text, parse_mode: 'HTML' }
})

// Active Raffles button
historyTemplate.submenu(historyButtons.categories.title, historyButtons.categories.callback, historyCategoriesTemplate)

// My Raffles button
historyTemplate.submenu(historyButtons.dates.title, historyButtons.dates.callback, historyDatesTemplate, {
  joinLastRow: true
})

historyTemplate.submenu(historyButtons.filters.title, historyButtons.filters.callback, historyFiltersTemplate, {
  joinLastRow: true
})

historyTemplate.submenu(historyButtons.search.title, historyButtons.search.callback, historyResultTemplate)

//historyTemplate.manualRow(createBackMainMenuButtons('↩️', '↩️'))

export { historyTemplate }