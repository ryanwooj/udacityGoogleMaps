import React, { Component } from 'react';

class SearchContainer extends Component {

  render() {
    const { items, query, filterList, handleToggleOpen } = this.props

    return (
      <div className="sidebar">
        <div className="menu" tabIndex="0">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <div className="list-view">
          <h1>Ryan's Favorite Restaurants</h1>
          <input
            type="text"
            value={query}
            placeholder="Search in List..."
            onChange={filterList}
            role="search"
            aria-label="Search Ryans'"
          />
          <ul id="list">
            {items.map((item, index) => (
              <li key={index}>
                <button
                  className="button"
                  onClick={() => handleToggleOpen(item)}
                >
                  {item.name}
                </button>
              </li>
            ))}
            {/* {locations ? (
              locations.map((place, index) => {
                return (
              <li key={index}>
              <button
              className="button"
              // onClick={this.openWindow}
              >{place.name}
              </button>
              </li>
                )
              })
              ): (
              <li className="loading">Loading</li>
            )} */}
          </ul>
        </div>
      </div>


    );
  }

}

export default SearchContainer;
