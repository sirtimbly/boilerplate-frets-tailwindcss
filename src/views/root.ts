import {VNode} from 'frets/src/index';
import {App} from '../app';
import {$, $$} from '../styles/app-styles';
import {textInput} from '../components/input';
import {error} from '~components/error';
import {showList} from '~components/todolist';

export const renderRoot = (app: App): VNode => {
	const usernameField = app.registerField('Username', app.modelProps.accountId, {
		notEmpty: {
			value: true,
			message: 'Username cannot be empty'
		}
	});
	const passField = app.registerField('Password', '', {
		notEmpty: {
			value: true,
			message: 'Password cannot be empty'
		},
		minLength: {
			value: 8,
			message: 'Password must be at least 8 characters'
		}
	});

	const loginAction = app.registerAction('login', (evt, present) => {
		evt.preventDefault();
		usernameField.validate();
		passField.validate();
		if (!usernameField.isValid() || !passField.isValid()) {
			return;
		}

		present({
			accountId: usernameField.value
		});
		passField.clear();
	});

	const logoutAction = app.registerAction('logout', (evt, present) => {
		evt.preventDefault();
		present({
			logout: true
		});
	});

	return $.div.h([
		// <h1 class="font-bold text-2xl text-center mx-auto mt-3">A Simple FRETS Web App</h1>
		$$('h1').fontBold.text_2xl.textCenter.mxAuto.mt_3.h([
			'A Simple Frets Sample App'
		]),
		$.div.maxWMd.mxAuto.flex.flexCol.itemsCenter.p_6.bgWhite.rounded.shadowXl.my_3.h([
			error(app.modelProps.error),
			app.modelProps.accountId ?
				$.div.minWFull.p_2.h([
					$.div.h([`Hello ${app.modelProps.accountId}`]),
					$.button.btn.btnBlue.mx_2.h({onclick: logoutAction}, ['Logout']),
					showList(app)
				]) :
				app.modelProps.loading ? $.div.textGray_700.textCenter.h(['Logging In...']) :
					$$('form').itemsCenter.flex.flexCol.minWFull.itemsStretch.h([
						...(
							[usernameField, passField].map(textInput)
						),
						$.button.mt_2.btn.btnBlue.h({
							onclick: loginAction,
							disabled: !(usernameField.isValid() && passField.isValid())
						}, ['Login'])
					])
		])
	]);
};
