import { MenuMiddleware } from 'telegraf-inline-menu'
import { historyTemplate } from './hisotryTemplate'


export const historyMenu = new MenuMiddleware('hisotry/', historyTemplate)


