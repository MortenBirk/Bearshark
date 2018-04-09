"use strict";

import React from 'react';
import * as d3 from 'd3';

import VisualizationContainer from '../VisualizationContainer';
import ForceSimulation from '../nodeGraph/ForceSimulation';
import TreeView from '../treeView/TreeView';
import Sidebar from './Sidebar';

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
          width={this.props.width - 160}
          height={this.props.height}
          graph={this.props.graph}/>
      );
    }
    if (this.state.visualization === "treeView") {
      visualization = (
        <TreeView
          width={this.props.width - 160}
          height={this.props.height}
          graph={this.props.graph}/>
      );
    }

   let active = null;
   if (this.state.visualization === "nodeGraph") {
     active = 1;
   }
   if(this.state.visualization === "treeView") {
     active = 2;
   }

    return (
      <div
        style={{
          position: "relative"
        }}>

        <VisualizationContainer
          width={this.props.width - 160}
          height={this.props.height}
          graph={this.props.graph}>
          {visualization}
        </VisualizationContainer>

        <Sidebar
          toggleVisualization={this.toggleVisualization}
          active={active}
          rebuild={this.props.rebuild}
          height={this.props.height}
          closeWindow={this.props.closeWindow}
          width={160}/>
      </div>
    );
  }
}
