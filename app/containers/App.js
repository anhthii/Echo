import React from 'react';
import { connect } from 'react-redux';
import { Nav, Analyzer } from '../components';
import * as Containers from './';

class App extends React.Component {
  render() {
    const { showPlayer, showAnalyzer: show, showQueue } = this.props;

    return (
      <div>
        <Nav />
        <div className="container">
          {this.props.children}
          <Analyzer show={show}/>
        </div>
        { showQueue && <Containers.Queue /> }
        { showPlayer ? <Containers.Player /> : null }
      </div>
    );
  }
}

function mapStateToProps({ songData, UIState }) {
  return {
    showPlayer: Object.keys(songData.data).length,
    showAnalyzer: UIState.showAnalyzer,
    showQueue: UIState.showQueue,
  };
}

export default connect(mapStateToProps)(App);
