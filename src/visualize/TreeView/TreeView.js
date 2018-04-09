"use strict";

import React from 'react';
import * as d3 from 'd3';

import TreeEdge from './TreeEdge';
import TreeNode from './TreeNode';

export default class TreeView extends React.Component {

  constructor(props) {
    super(props);

    // Convert the tree into a d3 hierarchy.

    // First prepare the root node to work with the children concept
    const rootKey = Object.keys(props.graph.originalTree)[0]
    if (!rootKey) {
      this.state = {
        nodes: []
      };
      return;
    }

    let rootGraph = {
      name: rootKey.split("\\").slice(-1)[0],
      children: props.graph.originalTree[rootKey]
    }

    // Next create the hierarchy
    let hierarchy = d3.hierarchy(rootGraph, (d) => {
      if (!d.children) {
        return null;
      }
      const objProps = Object.keys(d.children)
      // During the creation we actually modify the tree to have a name and children instead of the single prop : name => children.
      return objProps.map((prop) => {
        return {
          name: prop.split("\\").slice(-1)[0],
          children: d.children[prop]
        };
      });
    });

    // Create the tree (This will assign x and y values to the hierarchy)
    this.tree = d3.tree().nodeSize([50,300]);
    this.tree(hierarchy);

    this.offset = {x: props.height / 2, y: 100};

    this.state = {
      nodes: hierarchy.descendants()
    };
  }


  render() {
    return (
      <g>
        {
          this.state.nodes.slice(1).map((node, idx) => (
            <TreeEdge node={node} offset={this.offset} key={idx}/>
          ))
        }
        {
          this.state.nodes.map((node, idx) => (
            <TreeNode node={node} offset={this.offset} key={idx}/>
          ))
        }
      </g>
    );
  }
}
