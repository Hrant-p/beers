import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { withRouter } from 'react-router';
import {
  addToFavouriteList,
  clearFavouriteList,
  removeFromFavoriteList,
} from '../../store/actions/favoriteActionCreator';
import {
  errorSelector,
  detailsSelector,
  isLoadingSelector,
  randomSelector,
  beersSelector, searchSelector,
} from '../../store/selectors/beerSelector';
import { favouriteListSelector } from '../../store/selectors/favouriteSelector';
import Beer from '../../components/Beer/Beer';
import {
  clearBeerDetails,
  getCertainBeerRequest,
} from '../../store/actions/beerActionCreators';
import Detail from '../../components/Detail/Detail';
import Spinner from '../../components/Spinner/Spinner';
import Error from '../../components/Error/Error';

class Favourite extends Component {
  componentDidMount() {
    const idList = JSON.parse(localStorage.getItem('favourites'));
    if (idList && idList.length) {
      idList.forEach(id => {
        this.handleFavourite(id);
      });
    }
    const {
      match: { params: { id } }, details, history, beerDetailActionCreator
    } = this.props;
    if (id && !details.size) {
      idList.includes(Number(id)) ? beerDetailActionCreator(Number(id), history) : history.push('/favourite');
    }
  }

  handleFavourite = (id) => {
    const { addToFavoriteActionCreator, beers, favouriteList } = this.props;
    addToFavoriteActionCreator(beers, favouriteList, id);
  };

  clearFavourite = () => {
    this.props.clearFavoriteActionCreator();
  };

  removeFromFavourite = removeId => {
    this.props.removeFromFavouritesActionCreator(this.props.favouriteList, removeId);
  };

  onClose = () => {
    this.props.clearDetailActionCreator(this.props.history);
  };

  handleDetail = (id, history) => {
    this.props.beerDetailActionCreator(Number(id), history);
  };

  drawBeers = favouriteList => favouriteList.map((beer) => (
    <Beer
      key={beer.get('id')}
      beer={beer}
      loading={this.props.isLoading}
      favouriteList={this.props.favouriteList}
      handleDetail={this.handleDetail}
      handleFavourite={this.handleFavourite}
      clearFavourite={this.clearFavourite}
      removeFromFavourite={this.removeFromFavourite}
    />
  ));

  drawDetails = (details) => {
    const { isLoading, favouriteList } = this.props;
    if (details.size) {
      return (
        <Detail
          details={details}
          onClose={this.onClose}
          handleDetail={this.handleDetail}
          isLoading={isLoading}
          favouriteList={favouriteList}
          removeFromFavourite={this.removeFromFavourite}
          handleFavourite={this.handleFavourite}
        />
      );
    }
  };

  render() {
    const {
      isLoading, details, favouriteList, error, searchResult,
    } = this.props;
    let list = favouriteList;
    let result = searchResult;
    if (typeof searchResult.get(0) === 'string') {
      result = [];
    }
    if (result.length === 0 || searchResult.size > 0) {
      list = result;
    }

    return (
      <Fragment>
        <div className="card-header d-flex justify-content-between">
          <h4 className="text-md">Favourites</h4>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.clearFavourite}
          >
              Remove All Favourites
          </button>
        </div>
        {error && (
        <Error
          message={error.message}
          stack={error.stack}
        />
        )}
        <div className="card-body">
          {!favouriteList.size && (
          <h4 className="text-secondary text-center">
                You are not selected favourite beers
          </h4>
          )}
          {result.length === 0 && (
            <p className="text-secondary text-center">
                  No search result
            </p>
          )}
          <div className="beerContainer">
            {this.drawBeers(list)}
          </div>
        </div>
        {isLoading && <Spinner />}
        {this.drawDetails(details)}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: isLoadingSelector(state),
  details: detailsSelector(state),
  error: errorSelector(state),
  random: randomSelector(state),
  favouriteList: favouriteListSelector(state),
  beers: beersSelector(state),
  searchResult: searchSelector(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  beerDetailActionCreator: getCertainBeerRequest,
  clearDetailActionCreator: clearBeerDetails,
  addToFavoriteActionCreator: addToFavouriteList,
  clearFavoriteActionCreator: clearFavouriteList,
  removeFromFavouritesActionCreator: removeFromFavoriteList,
},
dispatch);

Favourite.propTypes = {
  beerDetailActionCreator: PropTypes.func.isRequired,
  clearDetailActionCreator: PropTypes.func.isRequired,
  addToFavoriteActionCreator: PropTypes.func.isRequired,
  clearFavoriteActionCreator: PropTypes.func.isRequired,
  removeFromFavouritesActionCreator: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  favouriteList: PropTypes.instanceOf(Immutable.List).isRequired,
  beers: PropTypes.instanceOf(Immutable.List).isRequired,
  searchResult: PropTypes.instanceOf(Immutable.List).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Favourite));
