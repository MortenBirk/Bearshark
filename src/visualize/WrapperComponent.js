"use strict";

import React from 'react';
import * as d3 from 'd3';

import VisualizationContainer from './VisualizationContainer';

export default class WrapperComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
  }

  rebuild = () => {
    console.log("Reloading bearshark dependency tree")
    // Generate the reload url
    let url = "http://localhost:3462/rebuild"
    if (this.props.url) {
      url = this.props.url.replace("/id/", "/rebuild/")
    }
    d3.json(url, (error, graph) => {
      this.setState({graph: graph});
      if (graph) {
        console.log("Bearshark dependency tree has been reloaded");
      }
    });
  }

  render() {
    const content = this.state.graph
      ?
        <VisualizationContainer
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

        {content}

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
      </div>

    );
  }
}
