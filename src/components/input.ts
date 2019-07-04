import {VNode} from 'frets/src/index';
import {IRegisteredField} from 'frets/src/Frets';
import {$, $$} from '../styles/app-styles';

export function textInput(field: IRegisteredField<string>): VNode {
	return $.div.h([
		$.label.flex.itemsCenter.flexRow.flexNoWrap.m_1.h([
			$.div.flexGrow.w_1_3.h([field.key]),
			$.input.flexGrow.w_2_3.bgGray_100.ml_2.p_1.textBlack.rounded.h({
				classes: $$().when(field.validationErrors.length > 0).border.borderRed_600.toObj(),
				value: field.value,
				oninput: (e: Event) => {
					field.handler(e, (!field.isDirty() && (e.currentTarget as HTMLInputElement).value.length <= 0));
				},
				'aria-invalid': (field.validationErrors.length > 0) ? 'true' : 'false'
			})
		]),
		$.span.textXs.textRed_700.h({
			role: 'alert'
		}, [
			field.validationErrors.length > 0 ?
				field.validationErrors.join(', ') + '.' : ''
		])
	]);
}
