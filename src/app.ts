import {IFunFrets, setup, PropsWithFields} from 'frets';

import {renderRoot} from './views/root';

export class RealWorldProps extends PropsWithFields {
	accountId: string = '';

	loading: boolean;

	logout: boolean;

	error: string;

	list: any;

	showPlaceholder: boolean;
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
			}, 300);
		}

		if (proposal.loading === true || proposal.loading === false) {
			F.modelProps.loading = proposal.loading;
		}

		if (proposal.showPlaceholder === true || proposal.showPlaceholder === false) {
			F.modelProps.showPlaceholder = proposal.showPlaceholder;
		}

		if (proposal.list) {
			F.modelProps.list = proposal.list;
		}

		if (proposal.logout === true) {
			F.modelProps.accountId = '';
		} else {
			proposal.logout = false;
		}

		state(F.modelProps);
	});

	F.registerView(renderRoot);
}).mountTo('app');
