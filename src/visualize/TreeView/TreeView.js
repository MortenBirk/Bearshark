"use strict";

import React from 'react';
import * as d3 from 'd3';

import TreeEdge from './TreeEdge';
import TreeNode from './TreeNode';

export default class TreeView extends React.Component {

  constructor(props) {
    super(props);

    this.collapsedNodes = new Set();

    // Convert the tree into a d3 hierarchy.

    // First prepare the root node to work with the children concept
    const rootKey = Object.keys(props.graph.originalTree)[0];

    if (!rootKey) {
      this.state = {
        nodes: []
      };
      return;
    }

    let createDataTree = (entry, parent, path, id) => {
      const objProps = Object.keys(entry);
      let node = {
        name: path.split("\\").slice(-1)[0],
        id: id,
        children: objProps.length > 0 ? [] : null
      }
      if (parent) {
        parent.children.push(node);
      }
      objProps.forEach((path, idx) => {
        createDataTree(entry[path], node, path, id + "-" + idx);
      });
      if (!parent) {
        return node;
      }
    }

    this.dataTree = createDataTree(props.graph.originalTree[rootKey], null, rootKey, 0);

    // Create a collapsed hierarchy
    let h = this.getUpdatedTree()
    h.map((element) => {
      if (element.depth >= 2) {
        this.collapsedNodes.add(element.data.id);
      }
    });

    this.state = {
      nodes: this.getUpdatedTree()
    };
  }

  getUpdatedTree = () => {
    let hierarchy = d3.hierarchy(this.dataTree, (d) => {
      if (!d.children || this.collapsedNodes.has(d.id)) {
        return null;
      }
      const children = d.children;
      // During the creation we actually modify the tree to have a name and children instead of the single prop : name => children.
      return children.map((child) => {
        return {
          name: child.name,
          id: child.id,
          children: child.children
        };
      });
    });

    // Create the tree (This will assign x and y values to the hierarchy)
    this.tree = d3.tree().nodeSize([50,300]);
    this.tree(hierarchy);

    this.offset = {x: this.props.height / 2, y: 100};

    return hierarchy.descendants();
  }

  updateTree = (node) => {
    if (this.collapsedNodes.has(node.data.id)) {
      this.collapsedNodes.delete(node.data.id);
    } 
    else {
      this.collapsedNodes.add(node.data.id);
    }
    
    this.setState({nodes: this.getUpdatedTree()});
  }

  render() {
    return (
      <g>
        {
          this.state.nodes.slice(1).map((node) => (
            <TreeEdge node={node} offset={this.offset} key={node.data.id}/>
          ))
        }
        {
          this.state.nodes.map((node) => (
            <TreeNode node={node} offset={this.offset} key={node.data.id} onClick={this.updateTree}/>
          ))
        }
      </g>
    );
  }
}
