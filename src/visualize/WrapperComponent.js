"use strict";

import React from 'react';
import * as d3 from 'd3';

import DataProvider from './DataProvider';
import WindowLayout from './WindowLayout';
import NodeGraphOnlyLayout from './NodeGraphOnlyLayout';

export default class WrapperComponent extends React.Component {


  render() {

    let layout = this.props.nodeOnlyLayout
      ?
        <NodeGraphOnlyLayout {...this.props} />
      :
        <WindowLayout {...this.props}/>

    return (
      <DataProvider {...this.props}>
        {layout}
      </DataProvider>
    );
  }
}
