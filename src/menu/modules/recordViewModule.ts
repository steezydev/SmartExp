import { MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu'
import { SessionContext } from '../../context/context'
import ExpenseModel from "../../models/expenseModel"
import { confirmDeleteTemplate } from '../confirmDeleteTemplate'
import currency from '../../constants/currency'
import { format } from 'date-fns'

export const recordViewModule = new MenuTemplate<SessionContext>(async ctx => {
  const id = ctx.match![1].substring(2)
  ctx.session.currentExpenseId = id

  const expense = await ExpenseModel.findOne({ _id: id }).exec()

  let text = `${format(expense!.date, 'dd.MM.yyyy')} ${expense?.category}\n`
  text += `<b>${expense?.type == 'EXPENSE' ? '-' : '+'}${expense?.sum}</b> ${currency[expense!.currency].sign}\n`
  text += `<i>${expense?.description}</i>\n`

  return {
    text,
    parse_mode: 'HTML'
  }
})

recordViewModule.interact('✏️ Изменить', 'edit', {
	do: async ctx => {
		await ctx.answerCbQuery('Функция не доступна в данный момент')
		return '.'
	}
})

recordViewModule.submenu('❌ Удалить', 'delete', confirmDeleteTemplate)
recordViewModule.manualRow(createBackMainMenuButtons('Назад', ''))