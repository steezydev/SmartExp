import { MenuTemplate, createBackMainMenuButtons, deleteMenuFromContext } from 'telegraf-inline-menu'
import { SessionContext } from '../context/context'
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfToday, format } from 'date-fns'
import { template } from "../utils/templater";
import { dateFilters } from '../constants/filters';


async function menuBody(context: SessionContext): Promise<string> {
  let text: string

  if (context.session.dateFilter != undefined) {
    const startDate = format(context.session.dateFilter.start, 'dd.MM.yyyy')
    const endDate = format(context.session.dateFilter.end, 'dd.MM.yyyy')

    text = template("history", "date_filter_mod", {
      start: startDate,
      end: endDate,
    })
  } else {
    text = template("history", "date_filter")
  }

  return text
}

const historyDatesTemplate = new MenuTemplate<SessionContext>(async context => {
  return { text: await menuBody(context), parse_mode: 'HTML' }
})

function setTime(ctx: SessionContext, type: string) {
  const dates: Record<string, any> = {}

  switch (type) {
    case 'day':
      dates.start = new Date(startOfToday().toISOString())
      dates.end = new Date(startOfToday().toISOString())
      break
    case 'week':
      dates.start = new Date(startOfWeek(new Date()).toISOString())
      dates.end = new Date(endOfWeek(new Date()).toISOString())
      break
    case 'month':
      dates.start = new Date(startOfMonth(new Date()).toISOString())
      dates.end = new Date(endOfMonth(new Date()).toISOString())
      break
  }

  return dates
}

historyDatesTemplate.interact('🔄 Сброс', 'hist_time_drop', {
  do: async ctx => {
    ctx.session.dateFilter = undefined
    ctx.session.dateChoice = null
    return '.'
  }
})

historyDatesTemplate.select('unique', dateFilters, {
	isSet: (ctx, key) => ctx.session.dateChoice === key,
	set: (ctx, key) => {
    ctx.session.dateFilter = setTime(ctx, key)
		ctx.session.dateChoice = key
		return true
	}
})

historyDatesTemplate.interact('Свой интервал', 'hist_time_custom', {
  do: async ctx => {
    await ctx.scene.enter('timeinterval-wizard')
    await deleteMenuFromContext(ctx)
    return false
  }
})

historyDatesTemplate.manualRow(createBackMainMenuButtons('🔙 Назад', ''))

export { historyDatesTemplate }