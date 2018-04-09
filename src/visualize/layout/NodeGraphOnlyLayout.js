"use strict";

import React from 'react';
import * as d3 from 'd3';

import VisualizationContainer from '../VisualizationContainer';
import ForceSimulation from '../nodeGraph/ForceSimulation';

export default class NodeGraphOnlyLayout extends React.Component {

  render() {
    return (
      <div
        style={{
          position: "relative"
        }}>

        <VisualizationContainer
          width={this.props.width}
          height={this.props.height}
          graph={this.props.graph}>
          <ForceSimulation
            width={this.props.width}
            height={this.props.height}
            graph={this.props.graph}/>
        </VisualizationContainer>

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
