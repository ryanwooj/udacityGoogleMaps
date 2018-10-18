import React, { Component } from 'react';
import MapContainer from './MapContainer.js';
import SearchContainer from './SearchContainer.js';

class App extends Component {

  state = {
    query: '',
    items: [],
    profiles: [],
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


  setData = (arr) => {
    this.setState({
      items: arr,
      locations: arr
    })
  }

  _callAPI = () => {
    return fetch('https://randomuser.me/api/?results=20')
    .then(res => res.json())
    .then(json => {
      return json.results
    })
    .catch(err => console.log(err))
  }

  componentDidMount() {
    this._getProfile()
  }

  _getProfile = async () => {
    const profiles = await this._callAPI()
    this.setState({
      profiles: profiles
    })
  }

  render() {
    return (
      <div className="container">
        {console.log(this.state.profiles)}
        <SearchContainer
          query={this.state.query}
          filterList={this.filterList}
          items={this.state.items}
          handleToggleOpen={this.handleToggleOpen}
          profiles={this.state.profiles}
        />
        <MapContainer
          currentRestaurant={this.state.currentRestaurant}
          locations={this.state.locations}
          handleToggleOpen={this.handleToggleOpen}
          onInfoWindowClose={this.onInfoWindowClose}
          onMapClicked={this.onMapClicked}
          items={this.state.items}
          setData={this.setData}
          getPlacesDetails={this.getPlacesDetails}
        />
      </div>

    );
  }
}

export default App;
