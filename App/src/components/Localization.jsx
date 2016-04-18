import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Localization = React.createClass({
	mixins: [PureRenderMixin],
	getWinos: function() {
		return this.props.winos || []
	},
	render: function() {
		return <div className="localization">
		{this.getWinos().map(wino =>
			<h1>id : {wino.get('id')}<br/>
				x: {wino.get('x')}<br/>
				y: {wino.get('y')}<br/>
				main: {wino.get('main')}<br/></h1>
		)}
	</div>;
	}
});

function mapStateToProps(state) {
	return {
		winos: state.get('winos')
	};
}

export const LocalizationContainer = connect(mapStateToProps, actionCreators)(Localization);