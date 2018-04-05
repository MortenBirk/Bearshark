"use strict";

import React from 'react';

export default class Edge extends React.Component {

  calculateX = (tx, ty, sx, sy, radius) => {
      if(tx == sx) return tx;                 //if the target x == source x, no need to change the target x.
      var xLength = Math.abs(tx - sx);    //calculate the difference of x
      var yLength = Math.abs(ty - sy);    //calculate the difference of y
      //calculate the ratio using the trigonometric function
      var ratio = radius / Math.sqrt(xLength * xLength + yLength * yLength);
      if(tx > sx)  return tx - xLength * ratio;    //if target x > source x return target x - radius
      if(tx < sx) return  tx + xLength * ratio;    //if target x < source x return target x + radius
  }

  calculateY = (tx, ty, sx, sy, radius) => {
      if(ty == sy) return ty;                 //if the target y == source y, no need to change the target y.
      var xLength = Math.abs(tx - sx);    //calculate the difference of x
      var yLength = Math.abs(ty - sy);    //calculate the difference of y
      //calculate the ratio using the trigonometric function
      var ratio = radius / Math.sqrt(xLength * xLength + yLength * yLength);
      if(ty > sy) return ty - yLength * ratio;   //if target y > source y return target x - radius
      if(ty < sy) return ty + yLength * ratio;   //if target y > source y return target x - radius
  }

  render() {
    // Do not render lines untill d3 has populated the source and target
    if (!this.props.line.source.x) {
      return null;
    }

    return (
      <line
        opacity={this.props.line.disabled ? 0 : 1}
        strokeWidth={Math.sqrt(this.props.line.value)}
        stroke={"black"}
        markerEnd={"url(#head)"}
        x1={this.props.line.source.x}
        y1={this.props.line.source.y}
        x2={this.calculateX(
          this.props.line.target.x,
          this.props.line.target.y,
          this.props.line.source.x,
          this.props.line.source.y,
          this.props.radius(this.props.line.target) + 10
        )}
        y2={this.calculateY(
          this.props.line.target.x,
          this.props.line.target.y,
          this.props.line.source.x,
          this.props.line.source.y,
          this.props.radius(this.props.line.target) + 10
        )}/>
    );
  }
}
