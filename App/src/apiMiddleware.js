import http from 'http';
//var http = require('http');

/**
* Make the request to update mainWino
* @param: state Map store the state of the application
*/
export default store => next => action => {
    if(action.type == 'API_REQUEST'){
    	let x;
    	let y;
        let tuple;

        var options = {
        	host: 'localhost:8042',
        	path: ''
        };
        var callback = function(response) {
        	var str = '';
        	response.on('data', function(chunk) {
        		str += chunk;
        	});
        	response.on('end', function(){
        		tuple = JSON.parse(str);
                x = tuple[0];
                y = tuple[1];
                return next({type: 'MOVE_WINO', id: 1, x: x, y: y})
        	});
        }

        http.request(options, callback).end();
    }
    return next(action)
}