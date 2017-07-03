import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pages } from '../components';
import { getChart } from '../actions/chart';

class ChartPage extends Component {
  render() {
    return (
      <Pages.ChartPage
        pop={this.props.pop}
        kpop={this.props.kpop}
        vpop={this.props.vpop}
      />
    );
  }
}

function mapStateToProps(state) {
  return state.chartState;
}

export default connect(mapStateToProps, { getChart })(ChartPage);
