import { MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu'

import { historyCategoriesTemplate, getAllCategories } from './historyCategoriesTemplate'
import { historyDatesTemplate } from './historyDatesTemplate'
import { historyFiltersTemplate, getFilters } from './historyFiltersTemplate'
import { historyResultTemplate } from './historyResultTemplate'

import { history as historyButtons } from '../constants/inlineButtons.json'
import { SessionContext } from '../context/context'

import { template } from "../utils/templater";


export const historyTemplate = new MenuTemplate<SessionContext>(async ctx => {
  // Initializing filters
  await getFilters(ctx)
  await getAllCategories(ctx)
  console.log(ctx.session.categoriesSelected)

  let text = template("history", "mainMessage")
  if (ctx.session.categoriesSelected == undefined) {
    text += template("history", "no_categories")
  }
  return { text, parse_mode: 'HTML' }
})

// Catregories filters
historyTemplate.submenu(historyButtons.categories.title, historyButtons.categories.callback, historyCategoriesTemplate, {
  hide: (ctx) => ctx.session.categoriesSelected == undefined,
})

// Dates filters
historyTemplate.submenu(historyButtons.dates.title, historyButtons.dates.callback, historyDatesTemplate, {
  joinLastRow: true
})

// Types filters
historyTemplate.submenu(historyButtons.filters.title, historyButtons.filters.callback, historyFiltersTemplate, {
  joinLastRow: true
})

// History results
historyTemplate.submenu(historyButtons.search.title, historyButtons.search.callback, historyResultTemplate, {
  hide: (ctx) => ctx.session.categoriesSelected == undefined,
})