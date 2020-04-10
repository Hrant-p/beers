import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Navbar.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchSelector } from '../../store/selectors/beerSelector';
import { clearSearchResults } from '../../store/actions/searchActionCreators';

class Navbar extends Component {
    clearSearchResultHome = () => {
      const { searchResult, clearSearchActionCreator, history } = this.props;
      if (searchResult) {
        clearSearchActionCreator();
      }
      history.push('/beers');
    };

    clearSearchResultFavourite = () => {
      if (this.props.searchResult) {
        this.props.clearSearchActionCreator();
      }
      this.props.history.push('/favourite/');
    };

    render() {
      return (
        <nav>
          <button
            className="link"
            onClick={this.clearSearchResultHome}
          >
                    Home
          </button>
          <button
            className="link"
            onClick={this.clearSearchResultFavourite}
          >
                    Favourite
          </button>
          <a
            className="link"
            href="/"
          >
            <i className="fas fa-retweet" />
          </a>
        </nav>
      );
    }
}

const mapStateToProps = (state) => ({
  searchResult: searchSelector(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  clearSearchActionCreator: clearSearchResults,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
