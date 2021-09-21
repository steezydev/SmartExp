import CategoryModel from "../models/categoryModel"
import { Markup } from 'telegraf'

export async function createKeyboard(telegramId: number, type: string) {
  const categories = await CategoryModel.find({ userTelegramId: telegramId, type: type }).exec()

  if (categories.length <= 0) {
    return null
  }

  let keyboard: any[] = []

  const rowNumbers = Math.ceil(categories.length / 3)
  for (let i = 0; i < rowNumbers; i++) {
    keyboard.push([])
  }

  let pointer = categories.length - 1

  for (let i = rowNumbers - 1; i >= 0; i--) {
    for (let j = 0; j < 3; j++) {
      if (categories[pointer] == undefined) break
      keyboard[i].push(categories[pointer].emoji)
      pointer--
    }
    keyboard[i] = keyboard[i].reverse()
  }

  return Markup.keyboard(keyboard)
}