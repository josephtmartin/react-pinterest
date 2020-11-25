import React, { Component } from 'react';
import BoardCard from '../components/BoardCard';
import PinCard from '../components/PinCard';
import { searchBoards } from '../helpers/data/boardData';
import { searchPins } from '../helpers/data/pinData';
import getUid from '../helpers/data/authData';

export default class SearchResults extends Component {
  state = {
    results: [],
    searchTerm: '',
    searchType: '',
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = () => {
    const searchType = this.props.match.params.type;
    const searchTerm = this.props.match.params.term.toLowerCase();
    const uid = getUid();
    if (searchType === 'boards') {
      this.getResults = searchBoards(uid, searchTerm)
        .then((results) => {
          this.setState({
            results,
            searchTerm,
            searchType,
          });
        });
    } else {
      searchPins(uid, searchTerm).then((results) => {
        this.setState({
          results,
          searchTerm,
          searchType,
        });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.props.match.params.term) {
      this.performSearch();
    }
  }

  render() {
    const { results, searchType } = this.state;
    const showResults = () => (
      results.map((result) => (
        searchType === 'boards' ? <BoardCard key={result.firebaseKey} board={result} /> : <PinCard key={result.firebaseKey} pin={result} />
      ))
    );

    return (
      <div>
        <h1 className='d-flex justify-content-center'>Search Results</h1>
        <div className='d-flex flex-wrap justify-content-center container'>
          {showResults()}
        </div>
      </div>
    );
  }
}
