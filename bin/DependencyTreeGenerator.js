#!/usr/bin/env node

const fs = require('fs');
const dependencyTree = require('dependency-tree');
const path = require('path');
const workDir = path.resolve(process.cwd());
const config = require(workDir + '/bearshark.json');

process.env.NODE_ENV = 'development';
// This is used to capture the aliases i have created by the .env file for my webpack config
process.env.NODE_PATH = config.directory;

let assignGroup = (node) => {
  // If a group is already assigned do nothing
  if (node.group) {
    return node.group;
  }
  // Check file endings
  switch (node.id.split(".").slice(-1)[0]) {
    case "js":
      return 2;
    case "css":
      return 3;
    case "svg":
      return 4
    case "png":
      return 4
    case "jpg":
      return 4
    case "jpeg":
      return 4
    default:
      return 2
  }
}

// A function used to convert the dependency tree into a more usefull format for D3
const convertTree = (name, acc, node) => {
  const childIds = Object.keys(node);
  const children = childIds.map((id) => node[id]);
  const links = name ? childIds.map((id) => {return {"source": name, "target": id, "value": 1}}) : [];
  const nodes = childIds.map((id) => node[id]);
  if (!acc.nodes.find((element) => element.id === name)) {
    if (name) {
      acc.nodes.push({id: name, children: children.length});
    }
    acc.links = acc.links.concat(links);
    childIds.forEach((id) => {
      convertTree(id, acc, node[id]);
    });
  }
}

// Returns a dependency tree object for the given file
let tree = () => dependencyTree({
  filename: workDir + "/" + config.filename,
  directory: workDir + "/" + config.directory,
  webpackConfig: config.webpackConfig ? workDir + "/" + config.webpackConfig : undefined, // If you are using any aliased modules
  filter: path => path.indexOf('node_modules') === -1, // Ignore all external dependencies
});


module.exports = () => {
  // Convert the tree into something more usefull for D3
  let acc = {nodes: [], links: []}
  convertTree(null, acc, tree());
  // The same entry might be pushed into nodes multiple times. Ensure that we only have one of each node
  // This simply filters to only unique entries
  //acc.nodes = acc.nodes.filter((v, i, a) => a.indexOf(v) === i);

  // Let add some usefull properties for display
  acc.nodes = acc.nodes.map((node) => {
    // Assign a label which is more readable then the id.
    node.text = node.id.split("\\").slice(-1)[0];
    // Assign some group used to separately color the nodes
    node.group = assignGroup(node)
    return node;
  });
  // Apply a special group to the initial root node
  acc.nodes[0].group = 1;
  console.log("Generating new dependency tree");
  console.log("nodes " + acc.nodes.length)
  console.log("links " + acc.links.length);


  return acc
};
