import { MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu'
import { SessionContext } from '../context/context'

async function menuBody(context: SessionContext): Promise<string> {
  const text = 'Results'

  return text
}

const hisotryResultTemplate = new MenuTemplate<SessionContext>(async context => {
  return { text: await menuBody(context), parse_mode: 'Markdown' }
})

export { hisotryResultTemplate }