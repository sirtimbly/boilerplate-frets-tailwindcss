import { PropsWithFields, ActionsWithFields, FRETS } from 'frets'
import { renderRoot } from "./views/root";
export class RealWorldProps extends PropsWithFields {
  public username?: string
  public visibleArticle?: []
  public activeArticleId?: string

  constructor(props?: Partial<RealWorldProps>) {
    super()
    if (props) {
      Object.assign(this, props)
    }
  }
}

export class RealWorldActions extends ActionsWithFields {
  public login: (e: Event) => void
  public loadArticles: (e: Event) => void
  public openArticle: (e: Event) => void
}

export const F = new FRETS<RealWorldProps, RealWorldActions>(
  new RealWorldProps({
   username: 'tester',
  }),
  new RealWorldActions()
)

export type app = FRETS<RealWorldProps, RealWorldActions>

F.registerView(renderRoot)

F.mountTo('app')
