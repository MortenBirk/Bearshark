import React, { Component } from 'react';
import ReactComponentRenderer from 'react-styleguidist/lib/rsg-components/ReactComponent/ReactComponentRenderer';
import Bearshark from 'bearshark';

const escapeRegExp = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
const replaceAll = (str, find, replace) => str.replace(new RegExp(escapeRegExp(find), 'g'), replace);

export default class BearsharkComponentWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showBearshark: false,
      btnColor: "#fff",
      width: 600
    }
  }

  componentDidMount() {
    this.setState({width: this.widthRef.getBoundingClientRect().width});
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
        <Bearshark
          width={this.state.width}
          height={500}
          url={"http://localhost:3462/id/" + replaceAll(this.props.pathLine, "\\", "-")}
          nodeOnlyLayout={true}/>
      :
        "";

    return (
      <div>
        <ReactComponentRenderer
          {...this.props}>
        </ReactComponentRenderer>

        <div
          style={{
            border: "1px solid black",
            cursor: "pointer",
            margin: "10px 0 20px 0",
            backgroundColor: this.state.btnColor,
            fontSize: "20px",
            color: "steelblue",
            fontWeight: 700,
            padding: "10px 0",
            textAlign: "center",
            width: 200
          }}
          onMouseOver={this.mouseOver}
          onMouseOut={this.mouseOut}
          onClick={this.toggleBearshark}>
          BEARSHARK
        </div>
        <div
          ref={(c) => this.widthRef = c}
          style= {{
            width: "100%",
            height: 0
          }}>
        </div>
        {bearshark}
      </div>
    );
  }
}
