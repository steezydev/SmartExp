import { MenuMiddleware } from 'telegraf-inline-menu'
import { historyTemplate } from './hisotryTemplate'
import { historyDatesTemplate } from './historyDatesTemplate'


export const historyMenu = new MenuMiddleware('hisotry/', historyTemplate)

