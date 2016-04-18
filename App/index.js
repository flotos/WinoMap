import makeStore from './src/store';
import startServer from './src/server';
import {Map, List} from 'immutable';

export const store = makeStore();
startServer(store);
var winos = List.of(
	Map({
		"id": 8,
		"x":8,
		"y":8,
		"movable": false
	}),
	Map({
		"id": 2,
		"x":2,
		"y":2,
		"movable": true
}));

store.dispatch({
	type: 'SET_WINOS',
	winos: winos
});
store.dispatch({type: 'SET_MOVABLE', id:1})