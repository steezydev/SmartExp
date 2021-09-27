import { MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu'
import { SessionContext } from '../context/context'
import { getCategoriesList } from '../utils/categoryKeyboard'
import { format } from 'date-fns'
import processFilter from '../utils/processFilter'
import currency from '../constants/currency'
import { confirmDeleteTemplate } from './confirmDeleteTemplate'

import ExpenseModel from "../models/expenseModel"

const ENTRIES_PER_PAGE = 4

async function getHisotry(ctx: SessionContext) {
  const categories = await getCategoriesList(ctx.session.categoriesSelected)
  const dates = ctx.session.dateFilter
  const filter = processFilter(ctx.session.filtersSelected)

  const options: any = {
    category: categories
  }

  if (dates != null) {
    options.date = { $gte: dates.start, $lte: dates.end }
  }

  const history = await ExpenseModel.find({ ...options, ...filter }).sort({ date: 'desc' }).exec()

  return history
}

async function getAllEntries(context: SessionContext) {
  const history = await getHisotry(context)
  const entries: Record<string, string> = {}

  let i = 0
  for (const [key, value] of Object.entries(history)) {
    i++
    let expense = value
    entries['id' + expense._id] = i.toString()
  }

  return entries
}

async function getAllEntriesButtons(context: SessionContext) {
  if (!context.session.editStatus) {
    return []
  }

  const history = await getHisotry(context)
  const entries: Record<string, string> = {}

  let i = 0
  for (const [key, value] of Object.entries(history)) {
    i++
    if (i > 4) i = 1

    let expense = value
    entries['id' + expense._id] = i.toString()
  }

  return entries
}

async function menuBody(context: SessionContext): Promise<string> {
  const history = await getHisotry(context)

  if (Object.keys(history).length == 0) {
    return 'История пуста'
  }

  if (context.session.editStatus == undefined) context.session.editStatus = 0

  const allEntries = await getAllEntries(context)

  if (context.session.currHistoryPage === undefined || Math.ceil(Object.keys(allEntries).length / ENTRIES_PER_PAGE) < context.session.currHistoryPage) {
    context.session.currHistoryPage = 1
  }

  const historyObj = history
  const pageIndex = (context.session.currHistoryPage ?? 1) - 1

  historyObj.length = Object.keys(allEntries).length;
  const currentPageEntries = Array.prototype.slice.call(historyObj, pageIndex * ENTRIES_PER_PAGE, (pageIndex + 1) * ENTRIES_PER_PAGE);

  let text = `[${pageIndex + 1}/${Math.ceil(Object.keys(allEntries).length / ENTRIES_PER_PAGE)}]\n` // Page number
  text += 'История ваших операций\n\n'
  for (const [key, value] of Object.entries(currentPageEntries)) {
    text += `${format(value.date, 'dd.MM.yyyy')} ${value.category}\n`
    text += `<b>${value.type == 'EXPENSE' ? '-' : '+'}${value.sum}</b> ${currency[value.currency].sign}\n`
    text += `\n`
  }

  return text
}

const historyResultTemplate = new MenuTemplate<SessionContext>(async ctx => {
  return { text: await menuBody(ctx), parse_mode: 'HTML' }
})

//! detailsMenuTemplate START

const detailsMenuTemplate = new MenuTemplate<SessionContext>(async ctx => {
  // Getting raffle id
  const id = ctx.match![1].substring(2)

  // Setting current opened raffle id into session
  ctx.session.currentExpenseId = id


  // Getting raffle via API
  const expense = await ExpenseModel.findOne({ _id: id }).exec()

  let text = `${format(expense!.date, 'dd.MM.yyyy')} ${expense?.category}\n`
  text += `<b>${expense?.type == 'EXPENSE' ? '-' : '+'}${expense?.sum}</b> ${currency[expense!.currency].sign}\n`


  return {
    text,
    parse_mode: 'HTML'
  }
})



detailsMenuTemplate.interact('✏️ Изменить', 'edit', {
	do: async ctx => {
		await ctx.answerCbQuery('Функция не доступна в данный момент')
		return '.'
	}
})

detailsMenuTemplate.submenu('❌ Удалить', 'delete', confirmDeleteTemplate)

detailsMenuTemplate.manualRow(createBackMainMenuButtons('Назад', ''))

//! detailsMenuTemplate END

historyResultTemplate.chooseIntoSubmenu('details', getAllEntriesButtons, detailsMenuTemplate, {
  maxRows: 1,
  columns: ENTRIES_PER_PAGE,
  getCurrentPage: context => context.session.currHistoryPage
})

// Pagination buttons
async function getCustomPaginationButtons(context: any) {
  const allEntries = await getAllEntries(context)

  if (Object.keys(allEntries).length === 0 || Object.keys(allEntries).length <= ENTRIES_PER_PAGE) {
    return [[{ text: '⚙️', relativePath: `history_edit:${context.session.editStatus}` }]]
  }

  if (context.session.currHistoryPage === 1) {
    return [[{ text: '⚙️', relativePath: `history_edit:${context.session.editStatus}` }, { text: '▶️', relativePath: `custom-pagination:${context.session.currHistoryPage + 1}` }]]
  }

  if (context.session.currHistoryPage === Math.ceil(Object.keys(allEntries).length / ENTRIES_PER_PAGE)) {
    return [[{ text: '◀️', relativePath: `custom-pagination:${context.session.currHistoryPage - 1}` }, { text: '⚙️', relativePath: `history_edit:${context.session.editStatus}` }]]
  }

  return [[{ text: '◀️', relativePath: `custom-pagination:${context.session.currHistoryPage - 1}` }, { text: '⚙️', relativePath: `history_edit:${context.session.editStatus}` }, { text: '▶️', relativePath: `custom-pagination:${context.session.currPartRafflesPage + 1}` }]]
}

// Custom pagination
historyResultTemplate.manualRow(getCustomPaginationButtons)
historyResultTemplate.manualAction(/custom-pagination:(\d+)$/, (context, path) => {
  context.session.currHistoryPage = parseInt(context.match![1])
  return '.'
})

historyResultTemplate.manualAction(/history_edit:(\d+)$/, (context, path) => {
  context.session.editStatus = Math.abs(parseInt(context.match![1]) - 1)
  return '.'
})

historyResultTemplate.manualRow(createBackMainMenuButtons('Назад', ''))

export { historyResultTemplate }