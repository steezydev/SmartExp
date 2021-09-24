import { MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu'
import { SessionContext } from '../context/context'
import CategoryModel from "../models/categoryModel"

/*
const wonChoices: Record<string, string> = {
  won: '🏆 Выиграл',
  lost: '👎 Не выиграл',
}*/

async function getAllEntries(context: SessionContext) {
  // Getting active raffles list
  const categories = await CategoryModel.find({telegramId: context.from?.id!}).exec()

  const entries: Record<string, string> = {}
  const selects: Record<string, boolean> = {}

  // Generating entries
  for (const [key, value] of Object.entries(categories)) {
    let category = value
    entries['id' + category.id] = category.emoji
    selects['id' + category.id] = true
  }

  if (context.session.categoriesSelected == undefined) {
    context.session.categoriesSelected = selects
  }

  return entries
}

async function setAllCategories(ctx: SessionContext) {
  const categories = ctx.session.categoriesSelected

  for (const [key, value] of Object.entries(categories)) {
    ctx.session.categoriesSelected[key] = true
  }
}

async function setNoneCategories(ctx: SessionContext) {
  const categories = ctx.session.categoriesSelected

  for (const [key, value] of Object.entries(categories)) {
    ctx.session.categoriesSelected[key] = false
  }
}

async function menuBody(context: SessionContext): Promise<string> {
  const text = 'Вы можете выбрать категории, которые будут отображаться в вашей истории'

  return text
}

const historyCategoriesTemplate = new MenuTemplate<SessionContext>(async context => {
  return { text: await menuBody(context), parse_mode: 'Markdown' }
})

historyCategoriesTemplate.interact('Все', 'hist_categories_all', {
	do: async ctx => {
		await setAllCategories(ctx)
		return '.'
	}
})

historyCategoriesTemplate.interact('Ни одной', 'hist_categories_none', {
  joinLastRow: true,
	do: async ctx => {
		await setNoneCategories(ctx)
		return '.'
	}
})

historyCategoriesTemplate.select('unique', getAllEntries, {
  columns: 5,
	showFalseEmoji: true,
	isSet: (ctx, key) => Boolean(ctx.session.categoriesSelected[key]),
	set: (ctx, key, newState) => {
    console.log(newState)
		ctx.session.categoriesSelected[key] = newState
		return true
	}
})

historyCategoriesTemplate.manualRow(createBackMainMenuButtons('🔙 Назад', ''))

export { historyCategoriesTemplate }