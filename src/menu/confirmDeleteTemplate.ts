import { MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu'
import { SessionContext } from '../context/context'
import ExpenseModel from "../models/expenseModel"
import { template } from "../utils/templater";

export const confirmDeleteTemplate = new MenuTemplate<SessionContext>(async ctx => {
  let text = template('history', 'confirm_delete')

  return {
    text,
    parse_mode: 'HTML'
  }
})

confirmDeleteTemplate.interact('Да', 'yes', {
	do: async ctx => {
    if (ctx.session.currentExpenseId == undefined) {
      await ctx.answerCbQuery('Произошла ошибка')
      return '../..'
    }

    ExpenseModel.deleteOne({ _id: ctx.session.currentExpenseId }).exec()

		return '../..'
	}
})

confirmDeleteTemplate.interact('Нет', 'no', {
	do: async ctx => {
		return '..'
	}
})