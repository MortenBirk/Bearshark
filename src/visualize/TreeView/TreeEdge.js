"use strict";

import React from 'react';
import * as d3 from 'd3';

export default class TreeEdge extends React.Component {

  componentDidMount() {
    let input = {
      y: this.props.node.parent ? (this.props.node.parent.y + this.props.offset.y) : 0,
      x: this.props.node.parent ? (this.props.node.parent.x + this.props.offset.x) : 0
    };

    let output = {
      y: this.props.node.y + this.props.offset.y,
      x: this.props.node.x + this.props.offset.x
    };

    d3.select(this.domPath)
      .attr("d", (d) => this.generateCurve(input, input))
      .attr("opacity", (d) => 0)
      .transition()
      .duration(850)
      .attr("d", (d) => this.generateCurve(input, output))
      .attr("opacity", (d) => 1)
  }

  componentDidUpdate(prevProps) {

    if (prevProps.node.y === this.props.node.y && prevProps.node.x === this.props.node.x) {
      return;
    }

    const xStart = (prevProps.node.y + this.props.offset.y) - (this.props.node.y + this.props.offset.y);
    const yStart = (prevProps.node.x + this.props.offset.x) - (this.props.node.x + this.props.offset.x);

    d3.select(this.domElement)
    .attr("opacity", (d) => 0)
    .transition()
    .delay(300)
    .duration(350)
    .attr("opacity", (d) => 1);
  }

  generateCurve = (input, out) => {
    return "M" + (out.y) + "," + (out.x)
      + "C" + (input.y + 100) + "," + (out.x)
      + " " + (input.y + 100) + "," + (input.x)
      + " " + (input.y) + "," + (input.x);
  }

  render() {

    let input = {
      y: this.props.node.parent ? (this.props.node.parent.y + this.props.offset.y) : 0,
      x: this.props.node.parent ? (this.props.node.parent.x + this.props.offset.x) : 0
    };

    let output = {
      y: this.props.node.y + this.props.offset.y,
      x: this.props.node.x + this.props.offset.x
    };

    return (
      <g
        ref={(c) => this.domElement = c}>
        <path
          ref={(c) => this.domPath = c}
          style= {{
            fill: "none",
            stroke: "#555",
            strokeOpacity: 0.4,
            strokeWidth: 1.5
          }}
          d={this.generateCurve(input, output)}/>
      </g>
    );
  }
}
