import { MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu'
import { SessionContext } from '../context/context'

async function menuBody(context: SessionContext): Promise<string> {
  const text = 'Filters'

  return text
}

const hisotryFiletsTemplate = new MenuTemplate<SessionContext>(async context => {
  return { text: await menuBody(context), parse_mode: 'Markdown' }
})

export { hisotryFiletsTemplate }