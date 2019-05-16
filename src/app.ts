import {PropsWithFields, ActionsWithFields, FRETS} from 'frets';
import {renderRoot} from './views/root';

export class RealWorldProps extends PropsWithFields {
	public username?: string;

	public visibleArticle?: [];

	public activeArticleId?: string;

	constructor(props?: Partial<RealWorldProps>) {
		super();
		if (props) {
			Object.assign(this, props);
		}
	}
}

export class RealWorldActions extends ActionsWithFields {
	public login: (e: Event) => void;

	public loadArticles: (e: Event) => void;

	public openArticle: (e: Event) => void;
}

export const F = new FRETS<RealWorldProps, RealWorldActions>(
	new RealWorldProps(),
	new RealWorldActions()
);

export type TApp = FRETS<RealWorldProps, RealWorldActions>;

F.actions.login = F.registerAction((e: Event, data: Readonly<RealWorldProps>): RealWorldProps => {
	e.preventDefault();
	return {
		...data,
		username: F.getField<string>('fieldName').value
	};
});

F.registerView(renderRoot);

F.mountTo('app');
