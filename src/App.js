import React, { Component } from 'react';
import MapContainer from './MapContainer.js';
import SearchContainer from './SearchContainer.js'


class App extends Component {

  state = {
    query: '',
    items: [],
    results: [],
    currentRestaurant: null,
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
  }

  filterList = (event) => {
    this.setState({
      query: event.target.value
    })
    var updatedList = this.state.results
    updatedList = updatedList.filter(item => item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1 )
    this.setState({items: updatedList})
  }

  //
  // componentWillReceiveProps (props) {
  //   this.setState({
  //     items: this.state.results
  //   })
  // }

  handleToggleOpen = (loc) => {
    this.setState({
      currentRestaurant: {
        name: loc.name,
        position: {
          lat: loc.geometry.location.lat,
          lng: loc.geometry.location.lng
        },
        openingHours: loc.opening_hours.open_now,
        rating: loc.rating,
        address: loc.vicinity
      }
    })
  }

  onInfoWindowClose = () =>
    this.setState({
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  changeMarker = () => {

  }

  createCORSRequest(method, url) {
     var xhr = new XMLHttpRequest();

     if ("withCredentials" in xhr) {

        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open(method, url, true);
     }else {

        // Otherwise, CORS is not supported by the browser.
        xhr = null;
     }
     return xhr;
  }

  componentDidMount() {
    const xhr = this.createCORSRequest('GET', 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.0577889,-118.3009088&radius=1500&type=restaurant&keyword=korean&key=AIzaSyBqXhHQkXbDQ6_tKD0Hbd86dfsiJ7ypFS0');
    xhr.onload = () => {
      var response = JSON.parse(xhr.responseText)
      this.setState({
        results: response.results,
        locations: response.results,
        items: response.results
      })
    }
    xhr.onerror = () => {
      console.log('error')
    }
    xhr.send()
  }


  render() {
    return (
      <div className="container">
        <SearchContainer
          currentRestaurant={this.state.currentRestaurant}
          position={this.state.position}
          showingInfoWindow={this.state.showingInfoWindow}
          locations={this.state.locations}
          handleToggleOpen={this.handleToggleOpen}
          onInfoWindowClose={this.onInfoWindowClose}
          onMapClicked={this.onMapClicked}
          query={this.state.query}
          handleInputChange={this.handleInputChange}
          results={this.state.results}
          handleSubmit={this.handleSubmit}
          filterList={this.filterList}
          items={this.state.items}
        />
        <MapContainer
          currentRestaurant={this.state.currentRestaurant}
          position={this.state.position}
          showingInfoWindow={this.state.showingInfoWindow}
          locations={this.state.locations}
          handleToggleOpen={this.handleToggleOpen}
          onInfoWindowClose={this.onInfoWindowClose}
          onMapClicked={this.onMapClicked}
          results={this.state.results}
          items={this.state.items}
        />
      </div>

    );
  }
}

export default App;
