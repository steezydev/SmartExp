import { MenuMiddleware } from 'telegraf-inline-menu'
import { historyTemplate } from './hisotryTemplate'


export const hisotryMenu = new MenuMiddleware('hisotry/', historyTemplate)

