"use strict";

import React from 'react';
import * as d3 from 'd3';

export default class DataProvider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      graph: null,
    }
  }

  componentDidMount() {
    this.mounted = true;
    console.log("Fetching bearshark dependency tree")
    d3.json(this.props.url || "http://localhost:3462", (error, graph) => {
      if (!this.mounted) {
        return;
      }
      this.setState({graph: graph});
      if (graph) {
        console.log("Bearshark dependency tree has been fetched");
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  rebuild = () => {
    console.log("Reloading bearshark dependency tree")
    this.setState({graph: null});
    // Generate the reload url
    let url = "http://localhost:3462/rebuild"
    if (this.props.url) {
      url = this.props.url.replace("/id/", "/rebuild/")
    }
    d3.json(url, (error, graph) => {
      if (!this.mounted) {
        return;
      }
      this.setState({graph: graph});
      if (graph) {
        console.log("Bearshark dependency tree has been reloaded");
      }
    });
  }

  render() {
    if (!this.state.graph) {
      return (
        <div
          style={{
            position: "relative",
            width: this.props.width,
            height: this.props.height,
            border: "1px solid black",
            backgroundColor: "#fff",
            textAlign: "center"
          }}>
          <div
            style={{
              position: "relative",
              fontSize: "30px",
              top: "50%",
              transform: "translateY(-50%)"
            }}>
            Loading...
          </div>
        </div>
      );
    }

    const props = {
      graph: this.state.graph,
      rebuild: this.rebuild
    };

    const childrenWithProps = React.Children.map(this.props.children, child => React.cloneElement(child, props));

    return (
      <div>
        {childrenWithProps}
      </div>
    );
  }
}
