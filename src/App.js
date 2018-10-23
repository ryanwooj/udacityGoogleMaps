import React, {Component} from 'react';
import MapContainer from './MapContainer.js';
import SearchContainer from './SearchContainer.js';

class App extends Component {
  // Defined States. location array just in case.
  state = {
    requestSuccess: false,
    query: '',
    items: [],
    results: [],
    profiles: [{
      name: {
        first: 'Jason',
        last: 'Woo'
      },
      picture: {
        thumbnail: null
      },

    }],
    currentRestaurant: {},
    selectedPlace: {},
    destinations: [],
    toggleView: false,
    locations: [],
    errorLog: ''
  }

  // Function filters lists when user types on input and manages states on change.
  filterList = (event) => {
    this.setState({query: event.target.value})
    var updatedList = this.state.items
    updatedList = updatedList.filter(item => item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1)
    this.setState({results: updatedList})
  }

  toggleViewChange = (loc, status) => {
    console.log(loc)
    this.setState({
      currentRestaurant: {
        name: loc.name,
        position: loc.location,
        openingHours: loc.openingHours,
        rating: loc.rating,
        address: loc.address,
        view: false
      }
    })
  }

  // The Function that when it's clicked, retrieves item and set currentRestaurant to information received
  handleToggleOpen = (loc, status) => {
    console.log(loc)
    this.setState({
      currentRestaurant: {
        name: loc.name,
        position: loc.geometry.location,
        openingHours: loc.opening_hours.open_now,
        rating: loc.rating,
        address: loc.vicinity,
        view: true
      }
    })
  }

  // sets data when places come from google places API
  setData = (arr) => {
    this.setState({items: arr, locations: arr, results: arr})
  }

  //calls API from randomuser and set state.
  componentWillMount() {
    this._getProfile()
  }

  _getProfile = async () => {
    const profiles = await this._callAPI()
    this.setState({
      profiles: profiles,
      requestSuccess: true
    })
  }
  _callAPI = () => {
    return fetch('https://randomuser.me/api/?results=20').then(res => res.json()).then(json => {
      return json.results
    }).catch(err => {
      this.setState({
        errorLog: err
      })
    })
  }

  render() {
    const { requestSuccess, errorLog } = this.state

    return (
      requestSuccess ? (
        <div className="container">
          {console.log(this.state.profiles)}
          <SearchContainer query={this.state.query} filterList={this.filterList} items={this.state.items} handleToggleOpen={this.handleToggleOpen} profiles={this.state.profiles} results={this.state.results}/>
          <MapContainer toggleViewChange={this.toggleViewChange} toggleView={this.state.toggleView} currentRestaurant={this.state.currentRestaurant} locations={this.state.locations} handleToggleOpen={this.handleToggleOpen} onInfoWindowClose={this.onInfoWindowClose} items={this.state.items} setData={this.setData} getPlacesDetails={this.getPlacesDetails} results={this.state.results}/>
        </div>
      ) : (
        <div>
          <p>Loading... Your Map is Loading... {errorLog}</p>
        </div>
      )
    );
  }
}

export default App;
