"use strict";

import React from 'react';
import * as d3 from 'd3';

import ForceSimulation from './ForceSimulation';

function id() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

export default class WrapperComponent extends React.Component {

  constructor(props) {
    super(props);
    this.uuid = "bearshark" + id();
    this.state = {
      svg: null,
      graph: null
    }
  }

  componentDidMount() {
    console.log("Fetching bearshark dependency tree")
    d3.json(this.props.url || "http://localhost:3462", (error, graph) => {
      this.setState({graph: graph});
      if (graph) {
        console.log("Bearshark dependency tree has been fetched");
      }
    });

    this.svg = d3.select("#" + this.uuid)
      .attr("width", this.props.width)
      .attr("height", this.props.height);

    //add encompassing group for the zoom
    let everything = this.svg.append("g")
      .attr("class", "everything");

    //add zoom capabilities
    let zoom_handler = d3.zoom()
        .on("zoom", () => {
          everything.attr("transform", d3.event.transform)
        });

    zoom_handler(this.svg);

    // Define the arrow at the end of links.
    everything.append("defs").selectAll("marker")
      .data(["suit"])
      .enter().append("marker")
        .attr("id", function(d) { return d; })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 0)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
      .append("path")
        .attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
        .style("stroke", "black")
        .style("opacity", "0.6");

    this.setState({
      svg: everything,
    });
  }

  componentDidUpdate() {
    this.svg
      .attr("width", this.props.width)
      .attr("height", this.props.height);
  }

  rebuild = () => {
    console.log("Reloading bearshark dependency tree")

    // Generate the reload url
    let url = "http://localhost:3462/rebuild"
    if (this.props.url) {
      url = this.props.url.replace("/id/", "/rebuild/")
    }

    console.log(url);
    d3.json(url, (error, graph) => {
      this.setState({graph: graph});
      console.log(graph);
      if (graph) {
        console.log("Bearshark dependency tree has been reloaded");
      }
    });
  }

  render() {
    const content = this.state.svg && this.state.graph
      ?
        <ForceSimulation
          svg={this.state.svg}
          width={this.props.width}
          height={this.props.height}
          graph={this.state.graph}/>
      :
        "";
    return (
      <div
        style={{
          position: "relative"
        }}>
        <svg
          id={this.uuid}
          style= {{
            border: "1px solid black",
            backgroundColor: "#fff"
          }}
          width={this.props.width}
          height={this.props.height}>
        </svg>
        <div
          style={{
            position: "absolute",
            left: 10,
            cursor: "pointer",
            top: this.props.height - 45,
            padding: "10px 25px",
            border: "1px solid black",
            backgroundColor: "#fff"
          }}
          onClick={this.rebuild}>
          Rebuild
        </div>
        {content}
      </div>

    );
  }
}
