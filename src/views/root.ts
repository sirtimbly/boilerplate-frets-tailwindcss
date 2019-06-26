import {VNode} from 'frets';
import {App} from '../app';
import {$, $$} from '../styles/app-styles';

export const notification = $.div.maxWMd.mxAuto.flex.justifyBetween.itemsCenter.p_6.bgWhite.rounded.shadowXl.m_3;
export const input = $.input.bgGray_100.m_2.p_1.textBlack.rounded;
export const renderRoot = (app: App): VNode => {
	const usernameField = app.registerField('fieldName', app.modelProps.username, {notEmpty: true});
	const passField = app.registerField('fieldPass', '');

	const loginAction = app.registerAction('login', (evt, present) => {
		evt.preventDefault();
		console.log('logging in', evt);
		present({
			username: usernameField.value
		});
		usernameField.clear();
		passField.clear();
	});

	const logoutAction = app.registerAction('logout', (evt, present) => {
		evt.preventDefault();
		console.log('logging in', evt);
		present({
			logout: true
		});
	});

	console.log('rendering username validations', usernameField.validationErrors);
	return notification.h([
		app.modelProps.username ?
			$.div.flex.flexRow.justifyEnd.itemsCenter.p_2.h([
				`Hello ${app.modelProps.username}`,
				$.button.btn.btnBlue.mx_2.h({onclick: logoutAction}, ['logout'])
			]) :
			$$('form').itemsCenter.flex.flexCol.h([
				$.label.h(['Username', input.h({
					classes: $$().when(usernameField.validationErrors.length > 0).border.borderRed_600.toObj(),
					onblur: usernameField.handler,
					value: usernameField.value
				})]),
				$.span.textRed_700.h(usernameField.validationErrors),
				$.label.h(['Password', input.h({
					type: 'password',
					onblur: passField.handler,
					value: passField.value
				})]),
				$.button.btn.btnBlue.h({onclick: loginAction}, ['Login'])
			])

	]);
};
