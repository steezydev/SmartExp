import { MenuMiddleware } from 'telegraf-inline-menu'
import { historyTemplate } from './hisotryTemplate'
import { historyResultTemplate } from './historyResultTemplate'


export const historyMenu = new MenuMiddleware('hisotry/', historyTemplate)

export const resultMenu = new MenuMiddleware('result/', historyResultTemplate)

