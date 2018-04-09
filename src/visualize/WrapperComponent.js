"use strict";

import React from 'react';
import * as d3 from 'd3';

import DataProvider from './DataProvider';
import WindowLayout from './layout/WindowLayout';
import NodeGraphOnlyLayout from './layout/NodeGraphOnlyLayout';

export default class WrapperComponent extends React.Component {


  render() {

    let layout = this.props.nodeOnlyLayout
      ?
        <NodeGraphOnlyLayout {...this.props} />
      :
        <WindowLayout {...this.props}/>

    return (
      <div
        style={{
          position: "relative",
          width: this.props.width,
          height: this.props.height,
          border: "1px solid black",
          backgroundColor: "#fff",
          textAlign: "center"
        }}>
        <DataProvider {...this.props}>
          {layout}
        </DataProvider>
      </div>
    );
  }
}
