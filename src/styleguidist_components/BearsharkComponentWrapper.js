import React, { Component } from 'react';
import ReactComponentRenderer from 'react-styleguidist/lib/rsg-components/ReactComponent/ReactComponentRenderer';

export default class BearsharkComponentWrapper extends Component {
  render() {
    return (
      <div>
        BEARSHARK
        <ReactComponentRenderer
          {...this.props}>
        </ReactComponentRenderer>
      </div>
    );
  }
}
