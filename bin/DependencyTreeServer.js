const DependencyTreeGenerator = require('./DependencyTreeGenerator');

// Utility functions for string parsing
const escapeRegExp = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
const replaceAll = (str, find, replace) => str.replace(new RegExp(escapeRegExp(find), 'g'), replace);

let tree = null;

module.exports = (id, rebuild) => {
  let treePathDivider = "\\"
  let requestIdDivider = "-"
  if (!tree || rebuild) {
    tree = DependencyTreeGenerator()
  }

  if (!id) {
    return tree;
  }

  // Filter links to only links containing the given id node
  const links = tree.links.filter((link) => {
    if (replaceAll(link.source, treePathDivider, requestIdDivider).includes(id)) {
      return true;
    }
    return replaceAll(link.target, treePathDivider, requestIdDivider).includes(id);
  });

  // Filter nodes to only contain the nodes linked by the previously found links
  const nodes = tree.nodes.filter((node) => {
    const strippedNodeId = replaceAll(node.id, treePathDivider, requestIdDivider);
    return links.find((link) => {
      if (replaceAll(link.source, treePathDivider, requestIdDivider) === strippedNodeId) {
        return true;
      }
      return replaceAll(link.target, treePathDivider, requestIdDivider) === strippedNodeId;
    })
  });

  let filteredTree = {
    links: links,
    nodes: nodes
  }

  return filteredTree;

}
