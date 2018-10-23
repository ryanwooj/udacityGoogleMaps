import React, {Component} from 'react';
import {GoogleApiWrapper, Map, Marker, InfoWindow} from 'google-maps-react';

import './App.css';

class MapContainer extends Component {

  onMapReady = (mapProps, map) => this.searchNearby(map, map.center)

  searchNearby = (map, center) => {
    const {google} = this.props
    const service = new google.maps.places.PlacesService(map)

    //Specific Location, radius and places types for API searchNearby
    const request = {
      location: {
        lat: 34.0577889,
        lng: -118.3009088
      },
      radius: '1000',
      type: ['restaurant'],
      keyword: 'korean'
    }
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.props.setData(results)
      }
    })
  }
  render() {
    if (!this.props.loaded)
      return <div>Loading...</div>;

    const {results, items, currentRestaurant, handleToggleOpen, toggleView, toggleViewChange} = this.props

    return (<div className="app">
      <Map className="map" google={this.props.google} style={{
          height: '100%',
          position: 'relative',
          width: '100%'
      }} initialCenter={{
          lat: 34.06000,
          lng: -118.293392
      }} zoom={15} onReady={this.onMapReady}>
        {results.map((loc, index) => (
          <Marker
            name={loc.name}
            onClick={() => handleToggleOpen(loc)}
            position={loc.geometry.location}
            animation={this.props.google.maps.Animation.DROP}
            key={loc.id}
            aria-label="marker"
          >
          </Marker>
        ))}
        {
          currentRestaurant  &&  <InfoWindow position={currentRestaurant.position} onClick={() => handleToggleOpen(currentRestaurant, true)} onClose={() => toggleViewChange(currentRestaurant, false)} aria-label="infowindow" visible>
            <div>
              <h2 className="res-name">{currentRestaurant.name}</h2>
              {
                  currentRestaurant.openingHours
                    ? (<p className="open">Now Open!</p>)
                    : (<p className="closed">Currently Closed</p>)
              }

              <p className="res-rating">Rating: {currentRestaurant.rating}</p>
              <p className="res-address">Address: {currentRestaurant.address}
              </p>
            </div>
          </InfoWindow>
        }
      </Map>
    </div>);
  }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyBqXhHQkXbDQ6_tKD0Hbd86dfsiJ7ypFS0'})(MapContainer)
