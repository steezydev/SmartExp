import { MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu'
import { SessionContext } from '../context/context'
import ExpenseModel from "../models/expenseModel"

export const confirmDeleteTemplate = new MenuTemplate<SessionContext>(async ctx => {
  let text = `❓Вы уверены, что хотите удалить данную запись❓`

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