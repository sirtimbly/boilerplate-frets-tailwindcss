import {VNode} from 'frets';
import {$} from '../styles/app-styles';

export function error(val?: string): VNode | string {
	return val ? $.div.rounded.textRed_500.borderRed_500.border.minWFull.p_2.mb_2.textWhite.h([val]) : '';
}
