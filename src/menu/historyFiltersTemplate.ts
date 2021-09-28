import { MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu'
import { SessionContext } from '../context/context'
import { template } from "../utils/templater";
import { typeFilters } from '../constants/filters';


export async function getFilters(context: SessionContext) {
  const entries: Record<string, string> = {}
  const selects: Record<string, boolean> = {}

  // Generating entries
  for (const [key, value] of Object.entries(typeFilters)) {
    let filter = value
    entries['filter_' + key] = filter
    selects['filter_' + key] = true
  }

  if (context.session.filtersSelected == undefined) {
    context.session.filtersSelected = selects
  }

  return entries
}

async function menuBody(context: SessionContext): Promise<string> {
  const text = template("history", "type_filter")

  return text
}

const historyFiltersTemplate = new MenuTemplate<SessionContext>(async context => {
  return { text: await menuBody(context), parse_mode: 'HTML' }
})

historyFiltersTemplate.select('unique', getFilters, {
  columns: 3,
	showFalseEmoji: true,
	isSet: (ctx, key) => Boolean(ctx.session.filtersSelected[key]),
	set: (ctx, key, newState) => {
		ctx.session.filtersSelected[key] = newState
		return true
	}
})

historyFiltersTemplate.manualRow(createBackMainMenuButtons('🔙 Назад', ''))

export { historyFiltersTemplate }