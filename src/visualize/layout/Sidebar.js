"use strict";

import React from 'react';
import * as d3 from 'd3';

import VisualizationContainer from '../VisualizationContainer';
import ForceSimulation from '../nodeGraph/ForceSimulation';
import TreeView from '../treeView/TreeView';

export default class WindowLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hovered: "none"
    }
  }

  setHover = (val) => {
    this.setState({hovered: val});
  }

  render() {

    const btnStyle = {
      color: "rgba(230,230,230,0.9)",
      listStyle: "none",
      padding: "15px 10px",
      borderBottom: "1px solid rgba(100,100,100,0.3)",
      cursor: "pointer",
    };

    const hoveredStyle = {
      ...btnStyle,
      backgroundColor: "rgba(150,150,150,0.1)"
    };

    const activeStyle = {
      ...btnStyle,
      backgroundColor: "rgba(31, 119, 180,0.3)"
    }

    let closeBtn = "";
    if (this.props.closeWindow) {
      closeBtn = (
        <li
          style={this.state.hovered === 4 ? hoveredStyle : btnStyle}
          onClick={this.props.closeWindow}
          onMouseEnter={() => this.setHover(4)}
          onMouseLeave={() => this.setHover("none")}>
          Close
        </li>
      );
    }

    return (
      <div
        style={{
          fontFamily: "sans-serif",
          fontSize: "20px",
          position: "absolute",
          top: 0,
          left: 0,
          width: this.props.width,
          height: this.props.height,
          backgroundColor: "#151719"
        }}>
        <ul
          style={{
            textAlign: "left",
            padding: 0,
            margin: 0
          }}>

          <li
            style={this.props.active === 1 ? activeStyle : this.state.hovered === 1 ? hoveredStyle : btnStyle}
            onClick={() => this.props.toggleVisualization("nodeGraph")}
            onMouseEnter={() => this.setHover(1)}
            onMouseLeave={() => this.setHover("none")}>
            Graph
          </li>

          <li
            style={this.props.active === 2 ? activeStyle : this.state.hovered === 2 ? hoveredStyle : btnStyle}
            onClick={() => this.props.toggleVisualization("treeView")}
            onMouseEnter={() => this.setHover(2)}
            onMouseLeave={() => this.setHover("none")}>
            Tree
          </li>

          <li
            style={this.state.hovered === 3 ? hoveredStyle : btnStyle}
            onClick={this.props.rebuild}
            onMouseEnter={() => this.setHover(3)}
            onMouseLeave={() => this.setHover("none")}>
            Rebuild
          </li>

          {closeBtn}
        </ul>
      </div>
    );
  }
}
