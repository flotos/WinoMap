//Winos actions
export function setWinos(winos) {
	return {
		type: 'SET_WINOS',
		winos
	};
}

export function addWino(wino) {
	return {
		type: 'ADD_WINO',
		wino
	};
}

export function delWino(id) {
	return {
		type: 'DEL_WINO',
		id
	};
}

export function moveWino(id, x, y) {
	return {
		type: 'MOVE_WINO',
		id,
		x,
		y
	};
}

export function setMainWino(id){
	return {
		type: 'SET_MAIN_WINO',
		id
	}
}

//Options actions
export function setOptions(options) {
	return {
		type: 'SET_OPTIONS',
		options
	};
}

export function togglePrecision() {
	return {
		type: 'TOGGLE_PRECISION'
	};
}
export function setScale(x, y) {
	return {
		type: 'SET_SCALE',
		x,
		y
	};
}