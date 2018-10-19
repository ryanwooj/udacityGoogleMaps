import React, {Component} from 'react';
import MapContainer from './MapContainer.js';
import SearchContainer from './SearchContainer.js';

class App extends Component {
  // Defined States. location array just in case.
  state = {
    query: '',
    items: [],
    results: [],
    profiles: [],
    currentRestaurant: {},
    selectedPlace: {},
    destinations: [],
    showingInfoWindow: false,
    locations: [
      {
        name: "Hae Jang Chon",
        location: {
          lat: 34.063839,
          lng: -118.30614
        }
      }, {
        name: "Ham ji Park",
        location: {
          lat: 34.063843,
          lng: -118.295918
        }
      }, {
        name: "Kang Ho Dong Baekjeong",
        location: {
          lat: 34.063733,
          lng: -118.297282
        }
      }, {
        name: "Man Soo Korean BBQ",
        location: {
          lat: 34.057969,
          lng: -118.303994
        }
      }, {
        name: "YUP DDUK LA",
        location: {
          lat: 34.063988,
          lng: -118.300759
        }
      }
    ]
  }

  // Function filters lists when user types on input and manages states on change.
  filterList = (event) => {
    this.setState({query: event.target.value})
    var updatedList = this.state.items
    updatedList = updatedList.filter(item => item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1)
    this.setState({results: updatedList})
  }

  // The Function that when it's clicked, retrieves item and set currentRestaurant to information received
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
  //
  // onMapClicked = () => {
  //   if (this.state.showingInfoWindow)
  //     this.setState({
  //       activeMarker: null,
  //       showingInfoWindow: false
  //     });
  // };

  // sets data when places come from google places API
  setData = (arr) => {
    this.setState({items: arr, locations: arr, results: arr})
  }

  //calls API from randomuser and set state.
  componentDidMount() {
    this._getProfile()
  }

  _getProfile = async () => {
    const profiles = await this._callAPI()
    this.setState({profiles: profiles})
  }
  _callAPI = () => {
    return fetch('https://randomuser.me/api/?results=20').then(res => res.json()).then(json => {
      return json.results
    }).catch(err => console.log(err))
  }

  render() {
    return (<div className="container">
      {console.log(this.state.profiles)}
      <SearchContainer query={this.state.query} filterList={this.filterList} items={this.state.items} handleToggleOpen={this.handleToggleOpen} profiles={this.state.profiles} results={this.state.results}/>
      <MapContainer currentRestaurant={this.state.currentRestaurant} locations={this.state.locations} handleToggleOpen={this.handleToggleOpen} onInfoWindowClose={this.onInfoWindowClose} items={this.state.items} setData={this.setData} getPlacesDetails={this.getPlacesDetails} results={this.state.results}/>
    </div>);
  }
}

export default App;
