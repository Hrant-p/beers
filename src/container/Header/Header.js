import React, { useState, useEffect } from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory, useLocation, withRouter } from 'react-router';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import {
  beersSelector, errorSelector, isLoadingSelector, searchSelector,
} from '../../store/selectors/beerSelector';
import { searchByName } from '../../store/actions/searchActionCreators';
import { favouriteListSelector } from '../../store/selectors/favouriteSelector';

const Header = ({
  searchByNameActionCreator,
  beers,
  error,
  isLoading,
  favouriteList,
}) => {
  const [text, setText] = useState('');
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    history.listen((location, action) => {
      if (action === 'PUSH' || 'REPLACE') {
        setText('');
      }
    });
  }, [history]);

  const handleSearch = query => {
    if (error || isLoading) return;
    let beerCollection;
    if (pathname.includes('beers')) {
      beerCollection = beers;
    }
    if (pathname.includes('favourite')) {
      beerCollection = favouriteList;
    }
    if (query) {
      searchByNameActionCreator(query, beerCollection);
    } else if (query === '') {
      searchByNameActionCreator(query, []);
    }
  };

  const onChange = ({ currentTarget: { value } }) => {
    setText(value);
    handleSearch(value);
  };

  return (
    <header className="header">
      <div className="info">
        <h2>The Beer Bank</h2>
        <p>Find your favourite beer here</p>
        <input
          type="search"
          name="text"
          className="form-control-lg mb-2"
          placeholder="search for beer name"
          onChange={onChange}
          value={text}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => history.push('/advanced_search')}
        >
                        Advanced Search
        </button>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  beers: beersSelector(state),
  isLoading: isLoadingSelector(state),
  error: errorSelector(state),
  searchResult: searchSelector(state),
  favouriteList: favouriteListSelector(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  searchByNameActionCreator: searchByName,
}, dispatch);

Header.propTypes = {
  searchByNameActionCreator: PropTypes.func.isRequired,
  beers: PropTypes.instanceOf(Immutable.List).isRequired,
  isLoading: PropTypes.bool.isRequired,
  favouriteList: PropTypes.instanceOf(Immutable.List).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
