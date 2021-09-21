import { MenuMiddleware } from 'telegraf-inline-menu'
import { menuTemplate } from './newCategoryTemplate'

export const categoryMenu = new MenuMiddleware('/', menuTemplate)


