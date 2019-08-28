import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../../index.css';
const GIPHY_KEY = 'fZQ94b4GPxlzFxTBsxMVemQDFtQeQw17';
const MAX_RESULTS_LIMIT = 5;

class Giphy extends Component {
  state = {
    searchedQuery: '',
    gifResults: null,
  }

  handleUpdateSearchQuery = (value) => {
    this.setState(({ searchedQuery }) => ({ searchedQuery: value }));
  }

  handleFetchGifs = () => {
    const { searchedQuery } = this.state;
    axios.get('https://api.giphy.com/v1/gifs/search', {params: {api_key: GIPHY_KEY, q: searchedQuery, limit: MAX_RESULTS_LIMIT}})
    .then((response) => {
        if (response && response.data && response.data.data) this.setState({ gifResults: response.data.data });
    })
    .catch((error) => {
      console.log(error.status);
    })
  }

  render() {
    const { searchedQuery, gifResults } = this.state;
    const gifResultsExists = gifResults && gifResults.length > 0;
    return (
      <div className="container">
        <div className="flex-div">
          <input placeholder="Search your gif" onChange={(event) => this.handleUpdateSearchQuery(event.target.value)} value={searchedQuery} className="search-bar" />
          <button onClick={this.handleFetchGifs} className="search-button">Search</button>
        </div>
        <hr />
        <ul className="gifs-list">
          {gifResultsExists && gifResults.map(gif => {
            const uploadedDate = moment(gif.import_datetime).format('DD MMM YYYY');
            return (
            <li key={gif.id} className="gif-wrapper">
              <img src={gif.images.downsized.url} alt={gif.title} className="gif-image" />
              <div className="gif-title">{gif.title}</div>
              {gif.username && <div className="gif-username">{`Uploaded by ${gif.username} • ${uploadedDate}`}</div>}
              <hr />
            </li>
          )})}
        </ul>
      </div>
    )
  }
}

export default Giphy;
