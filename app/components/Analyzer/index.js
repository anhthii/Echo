import React from "react";
import PropTypes from "prop-types";
import "./index.sass";

const Analyzer = ({ show }) => (
  <div id="analyzer" style={{ display: show ? "block" : "none" }}>
    <canvas id="analyser_render"></canvas>
  </div>
);

Analyzer.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Analyzer;
