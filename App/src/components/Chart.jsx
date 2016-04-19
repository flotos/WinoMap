import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {createD3Chart, updateD3Chart} from '../d3Chart';
import * as actionCreators from '../action_creators';

//const d3Chart = require('../d3Chart');

export const Chart = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function() {
    var el = ReactDOM.findDOMNode(this);
    createD3Chart(el, {}, this.getChartState());
  },

  componentDidUpdate: function() {
    var el = ReactDOM.findDOMNode(this);
    updateD3Chart(el, this.getChartState());
  },


  getWinos: function() {
    return this.props.winos || []
  },

  getMainWino: function() {
    for(var i=0; i<this.getWinos().length; i++){
      if(this.getWinos().get(i).get('main') == true){
        return this.props.winos.get(i);
      }
    }
  },

  getChartState: function() {
    return {
      mainWino: this.getMainWino(),
      sensorWino: List(),
      options: Map()
    }
  },

  render: function() {
    return (
      <div className="Chart">
        <button onClick={() => this.props.moveWino(1,500,500)}>Move wino</button>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    winos: state.get('winos'),
    options: state.get('options')
  };
}

export const ChartContainer = connect(mapStateToProps, actionCreators)(Chart);