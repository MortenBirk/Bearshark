"use strict";

import React from 'react';
import * as d3 from 'd3';


export default class DependencyNode extends React.Component {


  render() {

    const line = d3.radialLine()
      .curve(d3.curveBundle.beta(0.65))
      .radius((d) => d.y)
      .angle((d) => d.x / 180 * Math.PI);

    return Object.keys(this.props.node.in).map((key) => {
        let l = this.props.node.in[key]
        let style = {
          fill: "none",
          stroke: this.props.hoveredItem ? "#888" : "steelblue",
          strokeOpacity: this.props.hoveredItem ? 0.2 : 0.8,
          strokeWidth: 1.5
        }
        if (this.props.hoveredItem && this.props.node.data.id === this.props.hoveredItem.data.id) {
          style.stroke = "#d62728";
          style.strokeOpacity = 0.8;
          style.strokeWidth = 2;
        }
        if (this.props.hoveredItem && this.props.hoveredItem.data.id === key) {
          style.stroke = "#2ca02c";
          style.strokeOpacity = 0.8;
          style.strokeWidth = 2;
        }

        return (
          <path 
            key={l.data.name}
            style= {style}
            d={line([l, {x: 0, y: 0}, this.props.node])}/>
        );
      });
  }
}
