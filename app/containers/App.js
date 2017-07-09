import React from 'react';
import { connect } from 'react-redux';
import { Nav, Analyzer } from '../components';
import * as Containers from './';

class App extends React.Component {
  render() {
    const { showPlayer, showAnalyzer: show, showQueue, redirectedFromLoginPage } = this.props;
    const className = `container animated ${redirectedFromLoginPage && 'slideInRight'}`;

    return (
      <div>
        <Nav />
        <div className={className}>
          {this.props.children}
          <Analyzer show={show}/>
        </div>
        <Containers.Queue show={showQueue}/>
        { showPlayer ? <Containers.Player /> : null }
      </div>
    );
  }
}

function mapStateToProps({ songData, UIState }) {
  const { showQueue, showAnalyzer, redirectedFromLoginPage } = UIState;

  return {
    showPlayer: Object.keys(songData.data).length,
    showAnalyzer,
    showQueue,
    redirectedFromLoginPage,
  };
}

export default connect(mapStateToProps)(App);
