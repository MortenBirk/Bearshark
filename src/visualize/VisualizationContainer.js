"use strict";

import React from 'react';
import * as d3 from 'd3';

function id() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

export default class VisualizationContainer extends React.Component {

  constructor(props) {
    super(props);
    this.uuid = "bearshark" + id();
    this.state = {
      d3Node: null
    }
  }

  componentDidMount() {
    this.d3Node = d3.select("#" + this.uuid);

    //add encompassing group for the zoom
    let everything = this.d3Node.select(".everything");

    //add zoom capabilities
    let zoom_handler = d3.zoom()
        .on("zoom", () => {
          everything.attr("transform", d3.event.transform)
        });

    zoom_handler(this.d3Node);

    this.setState({
      d3Node: everything,
    });
  }

  componentDidUpdate() {
    this.d3Node
      .attr("width", this.props.width)
      .attr("height", this.props.height);
  }

  render() {
    const content = this.state.d3Node
      ?
        this.props.children
      :
        "";
    return (
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0
        }}>
        <svg
          id={this.uuid}
          style= {{
            backgroundColor: "#fff"
          }}
          width={this.props.width}
          height={this.props.height}>
          <g
            className="everything">
            {content}
          </g>
        </svg>

      </div>

    );
  }
}
