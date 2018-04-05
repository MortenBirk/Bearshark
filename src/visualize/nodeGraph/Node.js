"use strict";

import React from 'react';
import * as d3 from 'd3';

const colors = [
  "#ff7f0e",
  "#aec7e8",
  "#1f77b4",
  "#ffbb78",
  "#2ca02c",
  "#98df8a",
  "#d62728",
  "#ff9896",
  "#9467bd",
  "#c5b0d5",
  "#8c564b",
  "#c49c94",
  "#e377c2",
  "#f7b6d2",
  "#7f7f7f",
  "#c7c7c7",
  "#bcbd22",
  "#dbdb8d",
  "#17becf",
  "#9edae5"
];

export default class Node extends React.Component {

  //color = d3.scaleOrdinal(d3.schemeCategory20);

  color = (group) => {
    return colors[group % colors.length]
  }

  render() {
    return (
      <g
        className="node"
        onClick={(e) => this.props.toggleHighlight(e, this.props.node)}
        onContextMenu={this.props.hideHighlight}
        opacity={this.props.node.disabled ? 0.1 : 1}>

        <circle
          r={this.props.radius(this.props.node)}
          fill={this.color(this.props.node.group)}
          cx={this.props.node.x}
          cy={this.props.node.y}>
        </circle>

        <text
          x={this.props.node.x}
          y={this.props.node.y}
          stroke="black"
          dx={0}
          dy={".30em"}
          alignmentBaseline={"middle"}
          textAnchor={"middle"}>
          {this.props.node.text}
        </text>

      </g>
    );
  }
}
