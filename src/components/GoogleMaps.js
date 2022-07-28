import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import axios from "axios";

export class MapContainer extends Component {
  state = {
    zoom: 15,
    title: "This is the Ackbar Chowk Here !",
    pins: [],
    pos: {
      lat: this.props.latitude,
      long: this.props.longitude
    },
    pos2: {
      lat: this.props.latitude,
      long: this.props.longitude
    }
  };

  componentWillMount() {
    setInterval(() => {
      this.setPos(
        this.state.pos.lat + Math.random() / 3000,
        this.state.pos.long + Math.random() / 3500
      );
      // this.setPos(
      //   this.state.pos2.lat + Math.random() / 1500,
      //   this.state.pos2.long + Math.random() / 1000
      // );
      console.log(this.state.pos);
    }, 300);
    var url = "http://192.168.100.110:3004/service-provider";
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          console.log(response.data);
          this.setState({
            pins: [...response.data.result.data]
          });
        }
      })
      .catch(e => {
        console.log("Error !");
      });
    // setTimeout(() => {
    //   this.getPins();
    // }, 2000);
  }

  setPos(lat, lng) {
    this.setState({
      pos: {
        lat: lat,
        long: lng
      }
    });
  }

  getPins = () => {
    return this.state.pins.map(p => (
      <Marker
        key={p.id}
        onClick={() => {}}
        name={p.name ? p.name.toUpperCase() : null}
        title={p.name ? p.name.toUpperCase() : null}
        position={{ lat: p.lat, lng: p.long }}
        icon={{
          scaledSize: new this.props.google.maps.Size(700, 700)
        }}
      />
    ));
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={this.state.zoom}
        // initialCenter={{
        //   lat: 31.5204,
        //   lng: 74.3587
        // }}
        center={{
          lat: this.state.pos.lat,
          lng: this.state.pos.long
        }}
      >
        <Marker
          onClick={() => {}}
          name={"Map"}
          title={"Map"}
          position={{ lat: this.state.pos.lat, lng: this.state.pos.long }}
          icon={{
            scaledSize: new this.props.google.maps.Size(700, 700)
          }}
        />
        {/* <Marker
          onClick={() => {}}
          name={"Map"}
          title={"Map"}
          position={{ lat: this.state.pos2.lat, lng: this.state.pos2.long }}
          icon={{
            scaledSize: new this.props.google.maps.Size(700, 700)
          }}
        /> */}
        {/* {this.getPins()} */}
        {/* <InfoWindow visible={true} onClose={() => {}}>
          <div>
            <h1>Hello There </h1>
          </div>
        </InfoWindow> */}
      </Map>
    );
  }
}

const KEY = "";
// const KEY = "AIzaSyA06QCcuuSJaXs7n46VGwcpe2x3LaYi3WY";
export default GoogleApiWrapper({
  apiKey: KEY
})(MapContainer);
