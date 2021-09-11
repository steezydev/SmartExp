import { Context, Scenes } from 'telegraf';

export interface SessionContext extends Context {
  readonly match: RegExpExecArray | undefined
  session: any;
  newState: boolean | void,

  scene: Scenes.SceneContextScene<SessionContext, Scenes.WizardSessionData>
  wizard: Scenes.WizardContextWizard<SessionContext>
}