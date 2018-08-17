"use strict";

import React from 'react';
import * as d3 from 'd3';


export default class TreeNode extends React.Component {

  componentDidMount() {
    const xStart = this.props.node.parent ? (this.props.node.parent.y + this.props.offset.y) - (this.props.node.y + this.props.offset.y) : 0;
    const yStart = this.props.node.parent ? (this.props.node.parent.x + this.props.offset.x) - (this.props.node.x + this.props.offset.x) : 0;

    d3.select(this.domElement)
      .attr("transform", (d) => "translate(" + xStart + ", " + yStart + ")")
      .attr("opacity", (d) => 0)
      .transition()
      .duration(850)
      .attr("transform", (d) => "translate(0, 0)")
      .attr("opacity", (d) => 1);
  }

  onClick = () => {
    this.props.onClick(this.props.node);
  }

  componentDidUpdate(prevProps) {

    if (prevProps.node.y === this.props.node.y && prevProps.node.x === this.props.node.x) {
      return;
    }

    const xStart = (prevProps.node.y + this.props.offset.y) - (this.props.node.y + this.props.offset.y);
    const yStart = (prevProps.node.x + this.props.offset.x) - (this.props.node.x + this.props.offset.x);

    d3.select(this.domElement)
    .attr("transform", (d) => "translate(" + xStart + ", " + yStart + ")")
    .transition()
    .duration(400)
    .attr("transform", (d) => "translate(0, 0)");
  }

  render() {
    return (
      <g 
        ref={(c) => this.domElement = c}>

        <circle
          r={5}
          fill={!this.props.node.data.children ? "steelblue" : "#ff7f0e"}
          onClick={this.onClick}
          cx={this.props.node.y + this.props.offset.y}
          cy={this.props.node.x + this.props.offset.x}>
        </circle>

        <text
          dy={2}
          fontSize={14}
          x={this.props.node.y + this.props.offset.y - 8}
          y={this.props.node.x + this.props.offset.x}
          stroke="black"
          textAnchor={"end"}
          >
          {this.props.node.data.name}
        </text>

      </g>
    );
  }
}
