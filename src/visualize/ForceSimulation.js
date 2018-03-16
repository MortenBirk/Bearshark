"use strict";

import React from 'react';
import * as d3 from 'd3';

export default class WrapperComponent extends React.Component {

  componentDidMount() {

    this.svg = this.props.svg;

    this.link = this.svg.append("g")
      .attr("class", "links");

    let color = d3.scaleOrdinal(d3.schemeCategory20);

    this.simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id((d) => d.id))
        .force("collide", d3.forceCollide((d) => this.radius(d) + 20).iterations(4) )
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(this.props.width / 2, this.props.height / 2));

    this.link = this.svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(this.props.graph.links)
      .enter().append("line")
        .attr("stroke-width", (d) => Math.sqrt(d.value))
        .style("stroke", "black")
        .style("marker-end", "url(#suit)");

    this.node = this.svg.selectAll(".node")
     .data(this.props.graph.nodes)
     .enter().append("g")
     .attr("class", "node")
     .on("click", (d) => this.toggleHighlight(d))
     .on("contextmenu", this.hideHighlight);

   this.node.append("circle")
       .attr("r", (d) => this.radius(d))
       .attr("fill", (d) => color(d.group));

   this.node.append("text")
     .attr("dx", 0)
     .attr("dy", ".30em")
     .attr("alignment-baseline", "middle")
     .attr("text-anchor", "middle")
     .text((d) => d.text)
     .style("stroke", "black");

   this.simulation
     .nodes(this.props.graph.nodes)
     .on("tick", this.ticked);

   this.simulation.force("link")
     .links(this.props.graph.links);

   //Create an array logging what is connected to what
   this.linkedByIndex = {};
   this.props.graph.links.forEach((d) => {
     this.linkedByIndex[d.source.index + "," + d.target.index] = 1;
   });
  }

  radius = (node) => {
    return node.text.length * 4 + 5
  }

  ticked = () => {
    this.link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) =>
        this.calculateX(d.target.x, d.target.y, d.source.x, d.source.y, this.radius(d.target) + 10)
      )
      .attr("y2", (d) =>
        this.calculateY(d.target.x, d.target.y, d.source.x, d.source.y, this.radius(d.target) + 10)
      );

    d3.selectAll("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y);
    d3.selectAll("text")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y);
  }

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

  //This function looks up whether a pair are neighbours
  neighboring = (a, b) => {
    return this.linkedByIndex[a.index + "," + b.index];
  }

  toggleHighlight = (d) => {
    d3.event.stopPropagation();
    this.node.style("opacity", 1);
    this.link.style("opacity", 1);
    if (d) {
      //Reduce the opacity of all but the neighbouring nodes
      this.node.style("opacity", (o) => {
        return this.neighboring(d, o) | this.neighboring(o, d) | o.index === d.index ? 1 : 0.1;
      });
      this.link.style("opacity", (o) => {
        return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
      });
    }
    else {
      this.hideHighlight();
    }
  }

  hideHighlight = () => {
    d3.event.preventDefault();
    this.node.style("opacity", 1);
    this.link.style("opacity", 1);
  }

  render() {
    return null;
  }
}
