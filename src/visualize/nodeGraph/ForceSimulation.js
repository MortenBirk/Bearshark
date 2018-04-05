"use strict";

import React from 'react';
import * as d3 from 'd3';

import Node from './Node';
import Edge from './Edge';

export default class ForceSimulation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nodes: this.props.graph.nodes,
      links: this.props.graph.links
    }
  }

  componentDidMount() {

    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id((d) => d.id))
      .force("collide", d3.forceCollide((d) => this.radius(d) + 20).iterations(4) )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(this.props.width / 2, this.props.height / 2));


   this.simulation
     .nodes(this.state.nodes)
     .on("tick", this.ticked);

   this.simulation.force("link")
     .links(this.state.links);

   //Create an array logging what is connected to what
   this.linkedByIndex = {};
   this.state.links.forEach((d) => {
     this.linkedByIndex[d.source.index + "," + d.target.index] = true;
   });

  }

  componentWillUnmount() {
    this.simulation.stop();
  }


  radius = (node) => {
    return node.text.length * 4 + 5
  }

  ticked = () => {
    this.setState({
      nodes: this.state.nodes,
      links: this.state.links
    });

  }

  //This function looks up whether a pair are neighbours
  neighboring = (a, b) => {
    return this.linkedByIndex[a.index + "," + b.index];
  }

  toggleHighlight = (e, d) => {

    e.stopPropagation();
    this.state.nodes.forEach((node) => node.disabled = undefined);
    this.state.links.forEach((link) => link.disabled = undefined);

    this.state.nodes.forEach((node) => {
      node.disabled = !(this.neighboring(d, node) || this.neighboring(node, d) || node.index === d.index);
    });
    this.state.links.forEach((link) => {
      link.disabled = !(d.index == link.source.index || d.index == link.target.index);
    });
    this.setState({
      nodes: this.state.nodes,
      links: this.state.links
    });
    return;

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

  hideHighlight = (e) => {
    e.preventDefault();
    this.state.nodes.forEach((node) => node.disabled = undefined);
    this.state.links.forEach((link) => link.disabled = undefined);
    this.setState({
      nodes: this.state.nodes,
      links: this.state.links
    });
    return;
  }


  render() {
    return (
      <g>
        <g
          className="links">
          {
            this.state.links.map((link, index) => (
              <Edge
                line={link}
                radius={this.radius}
                key={"link" + index}/>
            ))
          }
        </g>

        <g
          className="nodes">
          {
            this.state.nodes.map((node, index) => (
              <Node
                node={node}
                radius={this.radius}
                toggleHighlight={this.toggleHighlight}
                hideHighlight={this.hideHighlight}
                key={"node" + index}/>
            ))
          }
        </g>
        <defs>
          <marker id='head' orient="auto"
            markerWidth='4' markerHeight='8'
            refX='0.1' refY='4'>
            <path d='M0,0 V8 L4,4 Z' fill="rgba(0,0,0,0.5)"/>
          </marker>
        </defs>
      </g>
    );
  }
}
