import {IFunFrets, setup} from 'frets/src/Frets';

import {PropsWithFields} from 'frets';
import {renderRoot} from './views/root';

export class RealWorldProps extends PropsWithFields {
	username: string = '';

	logout: boolean;
}

export type ActionFn = (e: Event, data?: Readonly<RealWorldProps>) => Partial<RealWorldProps> | undefined;

export type App = IFunFrets<RealWorldProps>;

setup<RealWorldProps>(new RealWorldProps(), (F: App) => {
	F.registerModel((proposal: Partial<RealWorldProps>, state) => {
		if (proposal.username !== undefined && proposal.username.length > 3) {
			F.modelProps.username = proposal.username;
		}

		if (proposal.logout === true) {
			F.modelProps.username = '';
		}

		if (proposal.registeredFieldValidationErrors) {
			F.modelProps.registeredFieldValidationErrors = proposal.registeredFieldValidationErrors;
		}

		state(F.modelProps);
	});

	F.registerView(renderRoot);
}).mountTo('app');
