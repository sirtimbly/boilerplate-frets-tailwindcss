import {VNode} from 'frets/src/index';
import {App} from '../app';
import {$, $$} from '~styles/app-styles';

export function showList(app: App): VNode {
	const loadInit = app.registerAction('showLoading', (evt, propose) => {
		if (!app.modelProps.loading) {
			propose({loading: true});
			setTimeout(() => {
				if (!app.modelProps.list) {
					propose({showPlaceholder: true});
				}
			}, 200);
			// fetch('https://jsonplaceholder.typicode.com/todos')
			fetch('http://slowwly.robertomurray.co.uk/delay/900/url/https://jsonplaceholder.typicode.com/todos')
			// fetch('http://slowwly.robertomurray.co.uk/delay/2000/url/https://jsonplaceholder.typicode.com/todos')
				.then(response => response.json())
				.then(json => {
					console.log('list', json);
					propose({
						loading: false,
						showPlaceholder: false,
						list: json
					});
				});
		}
	});

	if (!app.modelProps.list && !app.modelProps.loading) {
		loadInit(new Event(''));
	}

	return $.div.py_1.m_2.minWFull.h([
		$$('h2').fontBold.h_2.mb_5.h(['List of Items Loaded from API']),
		app.modelProps.showPlaceholder ? $.div.bgGray_200.p_2.h([
			$.div.textGray_700.italic.h(['Placeholder Item While Loading'])
		])			:
			$.div.bgGray_200.p_2.h(
				(app.modelProps.list && app.modelProps.list.length > 0) ? Object.keys(app.modelProps.list).map((key: string | number) => {
					const todo = app.modelProps.list[key];
					console.log('list item', todo);
					return $.div.borderB.borderGray_700.p_1.m_1.h({
						key: todo.id
					}, [todo.title]);
				}) : []
			)
	]);
}
