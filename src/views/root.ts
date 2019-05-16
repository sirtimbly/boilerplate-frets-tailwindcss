import {VNode} from 'frets';
import {TApp} from '../app';
import {$, $$} from '../styles/app-styles';

export const notification = $.div.maxWMd.mxAuto.flex.justifyBetween.itemsCenter.p_6.bgWhite.rounded.shadowXl.m_3;
export const input = $.input.bgGray_100.m_2.p_1.textBlack.rounded;
export const renderRoot = (app: TApp): VNode => {
	const usernameField = app.registerField<string>('fieldName');
	const passField = app.registerField<string>('fieldPass');
	return notification.h([
		app.modelProps.username ?
			`Hello ${app.modelProps.username}` :
			$$('form').flex.flexCol.h([
				$.label.h(['Username', input.h({
					onblur: usernameField.handler,
					value: usernameField.value
				})]),
				$.label.h(['Password', input.h({
					type: 'password',
					onblur: passField.handler,
					value: passField.value
				})]),
				$.button.btn.btnBlue.h({onclick: app.actions.login}, ['Login'])
			])

	]);
};
