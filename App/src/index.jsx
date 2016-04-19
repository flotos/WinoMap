import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import apiMiddleware from './apiMiddleware';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {Map, List} from 'immutable';
import {ChartContainer} from './components/Chart';

const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

//Set initial values (for testing purpose)
var winos = List.of(
  Map({
    id: 1,
    x:250,
    y:100,
    main: true
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

setInterval(() => {
  store.dispatch({type: 'API_REQUEST'})
}, 1000);

ReactDOM.render(
	<Provider store={store}>
		<ChartContainer />
	</Provider>,
	document.getElementById('app')
);
/*
ReactDOM.render(
  <Provider store={store}>
    <LocalizationContainer />
  </Provider>,
  document.getElementById('app')
);*/