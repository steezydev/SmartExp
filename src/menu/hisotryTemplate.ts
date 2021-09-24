import { MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu'

import { historyCategoriesTemplate } from './historyCategoriesTemplate'
import { historyDatesTemplate } from './historyDatesTemplate'
import { hisotryFiletsTemplate } from './historyFiltersTemplate'
import { hisotryResultTemplate } from './historyResultTemplate'
 
import {history as hisotryButtons} from '../constants/inlineButtons.json'
import { SessionContext } from '../context/context'


const historyTemplate = new MenuTemplate<SessionContext>(async ctx => {
  const text = 'История'
  return { text, parse_mode: 'Markdown' }
})

// Active Raffles button
historyTemplate.submenu(hisotryButtons.categories.title, hisotryButtons.categories.callback, historyCategoriesTemplate)

// My Raffles button
historyTemplate.submenu(hisotryButtons.dates.title, hisotryButtons.dates.callback, historyDatesTemplate, {
  joinLastRow: true
})

historyTemplate.submenu(hisotryButtons.filters.title, hisotryButtons.filters.callback, hisotryFiletsTemplate, {
  joinLastRow: true
})

historyTemplate.submenu(hisotryButtons.search.title, hisotryButtons.search.callback, hisotryResultTemplate)

//historyTemplate.manualRow(createBackMainMenuButtons('↩️', '↩️'))

export { historyTemplate }