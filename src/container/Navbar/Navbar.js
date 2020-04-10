import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import './Navbar.scss';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { searchSelector } from '../../store/selectors/beerSelector';
import { clearSearchResults } from '../../store/actions/searchActionCreators';

const Navbar = ({ searchResult, clearSearchActionCreator }) => {
  const history = useHistory();
  const clearSearchResultHome = () => {
    if (searchResult) {
      clearSearchActionCreator();
    }
    history.push('/beers');
  };

  const clearSearchResultFavourite = () => {
    if (searchResult) {
      clearSearchActionCreator();
    }
    history.push('/favourite/');
  };

  return (
    <nav>
      <button
        type="button"
        className="link"
        onClick={clearSearchResultHome}
      >
                    Home
      </button>
      <button
        type="button"
        className="link"
        onClick={clearSearchResultFavourite}
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
};

Navbar.propTypes = {
  searchResult: PropTypes.instanceOf(Immutable.List).isRequired,
  clearSearchActionCreator: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  searchResult: searchSelector(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  clearSearchActionCreator: clearSearchResults,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
