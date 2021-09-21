import { MenuTemplate } from 'telegraf-inline-menu'
import { SessionContext } from "../context/context";

export const menuTemplate = new MenuTemplate<SessionContext>(ctx => {
	const text = '_Hey_ *there*!'
	return {text, parse_mode: 'Markdown'}
})

menuTemplate.interact('Да', 'confirm_category', {
  do: async ctx => {
    ctx.session.confirmAddingCategory = true
    await ctx.answerCbQuery('yaay')
    return false
  }
})

menuTemplate.interact('Нет', 'reject_category', {
  joinLastRow: true,
  do: async ctx => {
    ctx.session.confirmAddingCategory = false
    await ctx.answerCbQuery('yaay')
    return false
  }
})