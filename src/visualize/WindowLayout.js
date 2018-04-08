"use strict";

import React from 'react';
import * as d3 from 'd3';

import VisualizationContainer from './VisualizationContainer';
import ForceSimulation from './nodeGraph/ForceSimulation';
import TreeView from './TreeView/TreeView';

export default class WindowLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visualization: "nodeGraph"
    }
  }

  componentDidMount() {
  }

  toggleVisualization = (vis) => {
    this.setState({visualization: vis});
  }

  render() {
    let visualization = "";
    if (this.state.visualization === "nodeGraph") {
      visualization = (
        <ForceSimulation
          width={this.props.width}
          height={this.props.height}
          graph={this.props.graph}/>
      );
    }
    if (this.state.visualization === "treeView") {
      visualization = (
        <TreeView
          width={this.props.width}
          height={this.props.height}
          graph={this.props.graph}/>
      );
    }

    return (
      <div
        style={{
          position: "relative"
        }}>

        <VisualizationContainer
          width={this.props.width}
          height={this.props.height}
          graph={this.props.graph}>
          {visualization}
        </VisualizationContainer>

        <div
          style={{
            position: "absolute",
            left: 10,
            cursor: "pointer",
            top: 10,
            padding: "10px 25px",
            border: "1px solid black",
            backgroundColor: "#fff"
          }}
          onClick={() => this.toggleVisualization("treeView")}>
          Tree
        </div>
        <div
          style={{
            position: "absolute",
            left: 10,
            cursor: "pointer",
            top: 40,
            padding: "10px 25px",
            border: "1px solid black",
            backgroundColor: "#fff"
          }}
          onClick={() => this.toggleVisualization("nodeGraph")}>
          Graph
        </div>

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
          onClick={this.props.rebuild}>
          Rebuild
        </div>
      </div>
    );
  }
}
