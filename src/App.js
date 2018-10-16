import React, { Component } from 'react';
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';

import './App.css';
// import WithMarkers from './MapContainer'

class App extends Component {
  state = {
    currentName: null,
    postition: null,
    selectedPlace: {},
    showingInfoWindow: false,
    locations: [
      {name: "Hae Jang Chon", location: {lat: 34.063839, lng: -118.30614}},
      {name: "Ham ji Park", location: {lat: 34.063843, lng: -118.295918}},
      {name: "Kang Ho Dong Baekjeong", location: {lat: 34.063733, lng: -118.297282}},
      {name: "Man Soo Korean BBQ", location: {lat: 34.057969, lng: -118.303994}},
      {name: "YUP DDUK LA", location: {lat: 34.063988, lng: -118.300759}},
    ]
  };

  handleToggleOpen(name, item) {
    this.setState({
      currentName: name,
      position: {
        lat: item.lat,
        lng: item.lng
      }
    })
  }
  //
  // onMarkerClick = (props, marker, e) => {
  //   console.log(props)
  // }
    // this.setState({
    //   activeMarker: marker,
    //   selectedPlace: props,
    //   showingInfoWindow: true
    // });

  // onMarkerClick = () =>
  //   this.setState({
  //     showingInfoWindow: true
  //   })


  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  render() {
    if (!this.props.loaded) return <div>Loading...</div>;

    return (
      <div>
        <Map
          className="map"
          google={this.props.google}
          onClick={this.onMapClicked}
          style={{ height: '100%', position: 'relative', width: '100%' }}
          initialCenter={{ lat: 34.06122, lng: -118.301668}}
          zoom={16}
        >
          {this.state.locations.map((loc, index) =>
            (<Marker
              name={loc.name}
              onClick={() => this.handleToggleOpen(loc.name, loc.location)}
              position={loc.location}
              animation={this.props.google.maps.Animation.DROP}
              key={index}>

            </Marker>
            )
          )}
          {this.state.position &&
            <InfoWindow
              position={this.state.position} visible>
              <div>
                <h2>{this.state.currentName}</h2>
                <p>This is one of my Favorite Restaurants</p>
              </div>
            </InfoWindow>
          }
        </Map>
      </div>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBqXhHQkXbDQ6_tKD0Hbd86dfsiJ7ypFS0'
})(App)
