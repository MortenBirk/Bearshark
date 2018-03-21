import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableOfContentsRenderer from 'react-styleguidist/lib/rsg-components/TableOfContents/TableOfContentsRenderer';
import Bearshark from 'bearshark';

export default class BearsharkTableOfContentsWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showBearshark: false,
      btnColor: "#fff"
    }
  }

  mouseOver = () => {
    this.setState({btnColor: "#eee"});
  }

  mouseOut = () => {
    this.setState({btnColor: "#fff"});
  }

  toggleBearshark = () => {
    this.setState({showBearshark: !this.state.showBearshark});
  }

  ignoreClick = (e) => {
    e.stopPropagation();
  }

  render() {
    let bearshark = this.state.showBearshark
      ?
        ReactDOM.createPortal(
          <div
            style={{
              position: "fixed",
              zIndex: 1000000,
              left: 0,
              top: 0,
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.8)"
            }}
            onClick={this.toggleBearshark}>
            <div onClick={this.ignoreClick}>
              <Bearshark
                width={1000}
                height={800}/>
            </div>
          </div>
        , document.getElementsByTagName("BODY")[0])
      :
        "";

    return (
      <div>
        <TableOfContentsRenderer
          {...this.props}>
        </TableOfContentsRenderer>
        <div
          style={{
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
            cursor: "pointer",
            margin: "50px 0 0 0",
            backgroundColor: this.state.btnColor,
            fontSize: "20px",
            color: "steelblue",
            fontWeight: 700,
            padding: "10px 0",
            textAlign: "center"
          }}
          onMouseOver={this.mouseOver}
          onMouseOut={this.mouseOut}
          onClick={this.toggleBearshark}>
          BEARSHARK
        </div>
        {bearshark}
      </div>
    );
  }
}
