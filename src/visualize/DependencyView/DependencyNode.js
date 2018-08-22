"use strict";

import React from 'react';
import * as d3 from 'd3';


export default class DependencyNode extends React.Component {

  mouseEnter = () => {
    this.props.hovered(this.props.node);
  }

  mouseLeave = () => {
    this.props.hovered(null);
  }

  render() {
    return (
      <text
          dy={"0.31em"}
          textAnchor={this.props.node.x < 180 ? "start" : "end"}
          transform={"rotate(" + (this.props.node.x - 90) + ")translate(" + (this.props.node.y + 8) + ",0)" + (this.props.node.x < 180 ? "" : "rotate(180)")}
          onMouseEnter={this.mouseEnter}
          stroke={this.props.hoveredItem && this.props.node.data.id === this.props.hoveredItem.data.id ? "#000" : "#999"}
          onMouseLeave={this.mouseLeave}>
          {this.props.node.data.name}
      </text>

    );
  }
}
