"use strict";

import React from 'react';
import * as d3 from 'd3';

import DependencyEdge from './DependencyEdge';
import DependencyNode from './DependencyNode';

export default class DependencyView extends React.Component {

  constructor(props) {
    super(props);

    // Convert the tree into a d3 hierarchy.

    // First prepare the root node to work with the children concept
    const rootKey = Object.keys(props.graph.originalTree)[0];

    if (!rootKey) {
      this.state = {
        nodes: [],
        hoveredItem: null
      };
      return;
    }

    // Convert the originalTree which is just a tree of pathnames into a map of more usable objects with name and id.
    // Further this has depth 1 as all occurrences of a file is mapped to the same node

    const createDependencyGraph = (map, entry, path, parentPath) => {
        const objProps = Object.keys(entry);

        if (!map[path]) {
            let node = {
                name: path.split("\\").slice(-1)[0],
                id: path,
                children:  {},
                parents: {}
            }
            map[path] = node;
        }

        if(map[parentPath]) {
          map[path].parents[parentPath] = parentPath;
          map[parentPath].children[path] = path;
        }


        objProps.forEach((childPath) => {
            createDependencyGraph(map, entry[childPath], childPath, path);
            });

        if (!parentPath) {
            return map;
        }
    }
    this.dependencyGraph = createDependencyGraph({}, props.graph.originalTree[rootKey], rootKey, "");

    this.state = {
      nodes: this.getUpdatedGraph()
    };
  }

  getUpdatedGraph = () => {
    // Convert the dependencyGraph to a hierachy.
    let hierarchy = d3.hierarchy(this.dependencyGraph, (d) => {
        if (d.children) {
            return null;
        }

        return Object.keys(d).map((key) => {
            let child = d[key];
            return {
              name: child.name,
              id: child.id,
              children: child.children,
              parents: child.parents
            };
          });
    });

    // Create the cluster (This will assign x and y values to the hierarchy)
    const diameter = 960;
    const radius = diameter / 2;
    const innerRadius = radius - 120;
    this.tree = d3.cluster().size([360, innerRadius]);
    this.tree(hierarchy);

    this.offset = {x: this.props.width / 2, y: this.props.height / 2};


    const nodes = hierarchy.leaves();

    // Create the in and out entries on each node, used for the edges.
    let edgeMap = {};
    nodes.forEach((node) => edgeMap[node.data.id] = node);
    nodes.forEach((node) => {
      node.in = {};
      node.out = {};
      Object.keys(node.data.parents).forEach((id) => node.in[id] = edgeMap[id]);
      Object.keys(node.data.children).forEach((id) => node.out[id] = edgeMap[id]);
    })

    return nodes;
  }

  setHoveredItem = (node) => {
    this.setState({hoveredItem: node});
  }

  render() {
    return (
      <g
        transform={"translate(" + this.offset.x + "," + this.offset.y + ")"}>
        {
          this.state.nodes.slice(1).map((node) => (
            <DependencyEdge node={node} offset={this.offset} key={node.data.id} hoveredItem={this.state.hoveredItem}/>
          ))
        }
        {
          this.state.nodes.map((node) => (
            <DependencyNode node={node} offset={this.offset} key={node.data.id} hovered={this.setHoveredItem} hoveredItem={this.state.hoveredItem}/>
          ))
        }
      </g>
    );
  }
}
