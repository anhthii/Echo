import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {
  render() {
    const { changeActiveChart } = this.props;
    return (
      <main>
        <input
          id="tab1"
          type="radio"
          name="tabs"
          defaultChecked
          onChange={() => changeActiveChart('pop')}
        />
        <label htmlFor="tab1">Billboard</label>

        <input
          id="tab2"
          type="radio"
          name="tabs"
          onChange={() => changeActiveChart('kpop')}
        />
        <label htmlFor="tab2">K - Pop Chart</label>

        <input
          id="tab3"
          type="radio"
          name="tabs"
          onChange={() => changeActiveChart('vpop')}
        />
        <label htmlFor="tab3">V - Pop Chart</label>
        <section id="content1">
          {this.props.children}
        </section>

        <section id="content2">
          {this.props.children}
        </section>

        <section id="content3">
          {this.props.children}
        </section>
      </main>
    );
  }
}

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  changeActiveChart: PropTypes.func.isRequired,
};

export default Tab;
