import {PropsWithFields, ActionsWithFields, FRETS} from 'frets';
import {renderRoot} from './views/root';

export class RealWorldProps extends PropsWithFields {
	public username?: string;

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
export type App = FRETS<RealWorldProps, RealWorldActions>;
export type ActionFn = (e: Event, data: Readonly<RealWorldProps>) => RealWorldProps;

const F: App = new FRETS<RealWorldProps, RealWorldActions>(
	new RealWorldProps(),
	new RealWorldActions()
);

const loginAction: ActionFn = (e, data) => {
	e.preventDefault();
	return {
		...data,
		username: F.getField<string>('fieldName').value
	};
};

F.actions.login = F.registerAction(loginAction);

F.registerView(renderRoot);

F.mountTo('app');
