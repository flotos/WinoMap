import makeStore from './src/store';
import {Map, List} from 'immutable';

export const store = makeStore();
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


let unsuscribe = store.suscribe(() =>
	console.log(store.getState())
);

store.dispatch({
	type: 'SET_WINOS',
	winos: winos
});
store.dispatch({type: 'SET_MOVABLE', id:1})

unsuscribe();