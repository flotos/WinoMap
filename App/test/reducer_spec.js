import {List, Map} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer.js';

describe('reducer', () => {
    const state = Map({
      winos : List.of(
        Map({
          id: 1,
          x:1,
          y:1,
          main: false
        }),
        Map({
          id: 2,
          x:2,
          y:2,
          main: false
        })
      ),
      options: Map({
        precisionMode: "point",
        plan: "bat_c",
        scale: List.of(2,3)
      }),
      event: Map({
        type: 'scale',
        data: Map({
          firstPoint: List.of(500,600),
          secondPoint: List.of(150,300)
        })
      })
    });

    it('replaces the list of winos', () => {
      const winos = List.of(
        Map({
          id: 3,
          x:3,
          y:3,
          main: false
        }),
        Map({
          id: 4,
          x:4,
          y:4,
          main: false
        })
      );
      const action = {type: 'SET_WINOS', winos: winos}
      const nextState = reducer(state, action);
      expect(nextState).to.equal(Map({
        winos : List.of(
          Map({
            id: 3,
            x:3,
            y:3,
            main: false
          }),
          Map({
            id: 4,
            x:4,
            y:4,
            main: false
          })
        ),
        options: Map({
          precisionMode: "point",
          plan: "bat_c",
          scale: List.of(2,3)
        }),
        event: Map({
          type: 'scale',
          data: Map({
            firstPoint: List.of(500,600),
            secondPoint: List.of(150,300)
          })
        })
      }));
    });

    it('supports reduce', () => {
      const actions = [
        {type: 'SET_WINOS', winos: List.of(
          Map({
            id: 3,
            x:3,
            y:3,
            main: false
          }),
          Map({
            id: 4,
            x:4,
            y:4,
            main: false
          })
        )},
        {type: 'EVENT_START', eventType: 'scale'},
        {type: 'SET_OPTIONS', 
          options: Map({
            precisionMode: "point",
            plan: "bat_c",
            scale: List.of(2,3)
          })
        },
        {type: 'TOGGLE_PRECISION', id: 1},
        {type: 'DEL_WINO', id: 1},
        {type: 'DEL_WINO', id: 4},
        {type: 'ADD_WINO', wino : Map({
            id: 5,
            x:5,
            y:5,
            main: false
          })},
        {type: 'ADD_WINO', wino : Map({
            id: 6,
            x:6,
            y:6,  
            main: false
          })},
        {type: 'SET_MAIN_WINO', id: 5},
        {type: 'SET_MAIN_WINO', id: 6},
        {type: 'MOVE_WINO', id: 6, x: 50, y: 75},

      ];

      const finalState = actions.reduce(reducer, Map());

      expect(finalState).to.equal(Map({
        winos: List.of(
          Map({
            id: 3,
            x:3,
            y:3,
            main: false
          }),
          Map({
            id: 5,
            x:5,
            y:5,
            main: false
          }),
          Map({
            id: 6,
            x:50,
            y:75,
            main: true
          })
        ),
        options: Map({
          precisionMode: "circle",
          plan: "bat_c",
          scale: List.of(2,3)
        }),
        event: Map({
          type: 'scale',
          data: Map({
            firstPoint: '',
            secondPoint: ''
          })
        })
      }));
    });

});