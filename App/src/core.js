import {List, Map} from 'immutable';

/**
* Return the position in the "winos" list of a wino
* @param: state Map store the state of the application
* @param: idToFind integer id attribute of the wino
*/
function getRealWinoId(state, idToFind){
	var length = state.size;
	for(var i=0;i<state.size;i++){
		if(state.get(i).get("id") == idToFind){
			return i;
		}
	}
}

/**
* Define a list of winos in the state.
* @param: state Map store the state of the application
* @param: winos List the winos
*/
export function setWinos(state, winos) {
  	return winos;
}

/**
* Add a new wino in the state.
* @param: state Map store the state of the application

*/
export function addWino(state, wino) {
	return state.push(wino);
}


/**
* Deletes a wino from the state.
* @param: state Map store the state of the application
* @param: idToDelete integer id of the wino to delete
*/
export function delWino(state, idToDelete){
	return state.delete(getRealWinoId(state, idToDelete));
}

/**
* Change the X and Y values of a wino.
* @param: state Map store the state of the application
* @param: idToMove integer id of the wino to move
* @param: x integer x coordinate
* @param: y integer y coordinate
*/
export function moveWino(state, idToMove, newX, newY){
	return state.withMutations(map => {
		map.setIn([getRealWinoId(state, idToMove), "x"], newX)
			.setIn([getRealWinoId(state, idToMove), "y"], newY);
	});
}

/**
* Define the main wino, the one to represent on the plan.
* @param: state Map store the state of the application
* @param: id integer of the wino to define.
*/
export function setMainWino(state, id){
	var nextState = state;
	for(var i=0;i<state.size;i++){
		nextState = nextState.setIn([i, 'main'], false);
	}
	nextState = nextState.setIn([getRealWinoId(state,id), 'main'], true);
	return nextState;
}


/**
* Define a list of options in the state.
* @param: state Map store the state of the application
* @param: options Map the options
*/
export function setOptions(state, options) {
  	return options;
}

/**
* Change the precision mode, "circle" or "point"
* @param: state Map store the state of the application
*/
export function togglePrecision(state){
	if(state.get('precisionMode') == 'point'){
		return state.set('precisionMode', 'circle');
	}else{
		return state.set('precisionMode', 'point');
	}
}

/**
* Change the scale of the plan
* @param: state Map store the state of the application
* @param: newX integer new ratio for X axis
* @param: newY integer new ratio for Y axis
*/
export function setScale(state, newX, newY){
	return state.set('scale', List.of(newX,newY));
}