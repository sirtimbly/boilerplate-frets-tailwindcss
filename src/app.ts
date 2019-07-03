import {IFunFrets, setup} from 'frets/src/Frets';

import {PropsWithFields} from 'frets/src/PropsFieldRegistry';
import {renderRoot} from './views/root';

export class RealWorldProps extends PropsWithFields {
	accountId: string = '';

	loading: boolean;

	logout: boolean;

	error: string;
}

export type ActionFn = (e: Event, data?: Readonly<RealWorldProps>) => Partial<RealWorldProps> | undefined;

export type App = IFunFrets<RealWorldProps>;

setup(new RealWorldProps(), (F: App) => {
	F.registerModel((proposal: Partial<RealWorldProps>, state) => {
		if (proposal.accountId !== undefined) {
			F.modelProps.error = '';
			F.modelProps.loading = true;
			setTimeout(() => {
				F.modelProps.loading = false;
				if (proposal.accountId === 'tim') {
					F.modelProps.accountId = proposal.accountId;
				} else {
					F.modelProps.error = 'Invalid username or bad password.';
				}

				state(F.modelProps);
			}, 1100);
		}

		if (proposal.logout === true) {
			F.modelProps.accountId = '';
		}

		state(F.modelProps);
	});

	F.registerView(renderRoot);
}).mountTo('app');
