"use strict";

import React from 'react';


export default class TreeEdge extends React.Component {

  render() {
    return (
      <g>
        <path
          style= {{
            fill: "none",
            stroke: "#555",
            strokeOpacity: 0.4,
            strokeWidth: 1.5
          }}
          d={"M" + (this.props.node.y + this.props.offset.y) + "," + (this.props.node.x + this.props.offset.x)
            + "C" + (this.props.node.parent.y + 100 + this.props.offset.y) + "," + (this.props.node.x + this.props.offset.x)
            + " " + (this.props.node.parent.y + 100 + this.props.offset.y) + "," + (this.props.node.parent.x + this.props.offset.x)
            + " " + (this.props.node.parent.y + this.props.offset.y) + "," + (this.props.node.parent.x + this.props.offset.x)}/>
      </g>
    );
  }
}
