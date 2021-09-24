import { MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu'
import { SessionContext } from '../context/context'
import CategoryModel from "../models/categoryModel"

async function getAllEntries(context: SessionContext) {
  // Getting active raffles list
  const categories = await CategoryModel.find({telegramId: context.from?.id!}).exec()

  const entries: Record<string, string> = {}

  // Generating entries
  for (const [key, value] of Object.entries(categories)) {
    let category = value
    entries['id' + category.id] = category.emoji
  }

  return entries
}

async function menuBody(context: SessionContext): Promise<string> {
  const text = 'Category'

  return text
}

const historyCategoriesTemplate = new MenuTemplate<SessionContext>(async context => {
  return { text: await menuBody(context), parse_mode: 'Markdown' }
})

historyCategoriesTemplate.manualRow(createBackMainMenuButtons('🔙 Назад', ''))

export { historyCategoriesTemplate }