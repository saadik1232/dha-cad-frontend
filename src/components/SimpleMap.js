import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import { URL } from "../config/config";

const AnyReactComponent = ({ text }) => (
  <div>
    <div className="alert">
      <b>{text}</b>
    </div>
    <img
      style={{ width: "40px" }}
      src="https://lh3.googleusercontent.com/proxy/RRWGQzE8eE2lNoahFdTYXVBnUFiijy4O73NqkqH-tOQxRymWAHEqViytcx6jm_Pn2zqkgEywSkx1iEwYDY0qE3hlTlpfm7yg9P9WR0lzaPwGajeUFefJIpVGtXoQed4fw8hjCkdHMVM"
    />
  </div>
);

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 31.4676,
      lng: 74.3072
    },
    zoom: 13
  };

  state = {
    pins: []
  };

  componentWillMount() {
    this.getAllServiceProviders();
  }

  getAllServiceProviders = () => {
    var url = URL + "/service-provider";
    axios
      .get(url)
      .then(response => {
        // console.log("R:", response.data);
        this.setState({
          pins: response.data.result.data
        });
      })
      .catch(e => {
        console.log("Error !");
      });
  };

  displayServiceProviders = () => {
    return this.state.pins.map(p => {
      // console.log(p);
      return (
        <React.Fragment>
          <AnyReactComponent
            lat={p.lat}
            long={p.long}
            text={p.name.toUpperCase()}
          />
        </React.Fragment>
      );
    });
  };

  render() {
    const key = "";
    // const key = "AIzaSyA06QCcuuSJaXs7n46VGwcpe2x3LaYi3WY";
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: key }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.displayServiceProviders()}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
