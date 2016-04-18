import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {Map, List} from 'immutable';
import {LocalizationContainer} from './components/Localization';

const store = createStore(reducer);

//Set initial values (for testing purpose)
var winos = List.of(
  Map({
    id: 1,
    x:50,
    y:25,
    main: false
  }),
  Map({
    id: 2,
    x:2,
    y:2,
    main: false
  })
);

store.dispatch({
	type: 'SET_WINOS',
	winos: winos
});
store.dispatch({type: 'SET_MOVABLE', id:1})


ReactDOM.render(
	<Provider store={store}>
		<LocalizationContainer />
	</Provider>,
	document.getElementById('app')
);