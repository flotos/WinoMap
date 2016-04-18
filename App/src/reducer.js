import { combineReducers } from 'redux';
import {Map, List} from 'immutable';
import { INITIAL_STATE, setWinos, addWino, delWino, moveWino, setMainWino, togglePrecision, setScale, setOptions } from './core';

function winos(state = List(), action){
  switch(action.type){
    case 'SET_WINOS':
      return setWinos(state, action.winos);
    case 'ADD_WINO':
      return addWino(state, action.wino);
    case 'DEL_WINO':
      return delWino(state, action.id);
    case 'MOVE_WINO':
      return moveWino(state, action.id, action.x, action.y);
    case 'SET_MAIN_WINO':
      return setMainWino(state, action.id);
  }
  return state;
}

function options(state = Map(), action){
  switch(action.type){
    case 'SET_OPTIONS':
      return setOptions(state, action.options);
    case 'TOGGLE_PRECISION':
      return togglePrecision(state);
    case 'SET_SCALE':
      return setScale(state, action.x, action.y);
  }
  return state;
}

export default function reducer(state = Map(), action) {
  return Map({
    winos: winos(state.get('winos'), action),
    options: options(state.get('options'), action)
  });
}