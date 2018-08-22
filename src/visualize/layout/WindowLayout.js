"use strict";

import React from 'react';

import VisualizationContainer from '../VisualizationContainer';
import DependencyView from '../DependencyView/DependencyView';
import TreeView from '../TreeView/TreeView';
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
        <DependencyView
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
