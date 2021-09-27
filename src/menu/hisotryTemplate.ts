import { MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu'

import { historyCategoriesTemplate, getAllCategories } from './historyCategoriesTemplate'
import { historyDatesTemplate } from './historyDatesTemplate'
import { historyFiltersTemplate, getFilters } from './historyFiltersTemplate'
import { historyResultTemplate } from './historyResultTemplate'
 
import {history as historyButtons} from '../constants/inlineButtons.json'
import { SessionContext } from '../context/context'

import { template } from "../utils/templater";


const historyTemplate = new MenuTemplate<SessionContext>(async ctx => {
  await getFilters(ctx)
  await getAllCategories(ctx)
  console.log(ctx.session.categoriesSelected)

  let text = template("history", "mainMessage")
  if (ctx.session.categoriesSelected == undefined) {
    text+='\n\n❗️ Похоже, что у вас нет ни одной категории. Как только вы создадите хотя бы одну запись и категорию вам станет доступна история ❗️'
  }
  return { text, parse_mode: 'HTML' }
})

// Active Raffles button
historyTemplate.submenu(historyButtons.categories.title, historyButtons.categories.callback, historyCategoriesTemplate, {
  hide: (ctx) => ctx.session.categoriesSelected == undefined,
})

// My Raffles button
historyTemplate.submenu(historyButtons.dates.title, historyButtons.dates.callback, historyDatesTemplate, {
  joinLastRow: true
})

historyTemplate.submenu(historyButtons.filters.title, historyButtons.filters.callback, historyFiltersTemplate, {
  joinLastRow: true
})

historyTemplate.submenu(historyButtons.search.title, historyButtons.search.callback, historyResultTemplate, {
  hide: (ctx) => ctx.session.categoriesSelected == undefined,
})

//historyTemplate.manualRow(createBackMainMenuButtons('↩️', '↩️'))

export { historyTemplate }