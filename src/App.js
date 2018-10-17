import React, { Component } from 'react';
import MapContainer from './MapContainer.js';
import SearchContainer from './SearchContainer.js';


class App extends Component {

  state = {
    query: '',
    items: [],
    results: [],
    currentRestaurant: {},
    selectedPlace: {},
    destinations: [],
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

  handleToggleOpen = (loc) => {
    console.log(loc)
    this.setState({
      currentRestaurant: {
        name: loc.name,
        position: loc.geometry.location,
        openingHours: loc.opening_hours.open_now,
        rating: loc.rating,
        address: loc.vicinity
      }
    })
  }

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  componentDidMount() {
  }

  setData = (arr) => {
    console.log(arr)

    this.setState({
      items: arr,
      results: arr,
      locations: arr
    })
    console.log(this.state.items)
  }


  render() {
    return (
      <div className="container">
        <SearchContainer
          query={this.state.query}
          filterList={this.filterList}
          items={this.state.items}
          handleToggleOpen={this.handleToggleOpen}
        />
        <MapContainer
          currentRestaurant={this.state.currentRestaurant}
          locations={this.state.locations}
          handleToggleOpen={this.handleToggleOpen}
          onInfoWindowClose={this.onInfoWindowClose}
          onMapClicked={this.onMapClicked}
          items={this.state.items}
          setData={this.setData}
        />
      </div>

    );
  }
}

export default App;
