import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import Error from '../../components/Error/Error';
import Detail from '../../components/Detail/Detail';
import {
  beersSelector,
  detailsSelector,
  errorSelector,
  isLoadingSelector,
  randomSelector, searchSelector,
} from '../../store/selectors/beerSelector';
import { favouriteListSelector } from '../../store/selectors/favouriteSelector';
import { clearBeerDetails, getCertainBeerRequest } from '../../store/actions/beerActionCreators';
import {
  addToFavouriteList,
  removeFromFavoriteList,
} from '../../store/actions/favoriteActionCreator';
import Beer from '../../components/Beer/Beer';
import Spinner from '../../components/Spinner/Spinner';

class FoundedBeers extends Component {
    handleDetail = (id, history) => {
      this.props.beerDetailActionCreator(Number(id), history);
    };

    handleFavourite = (id) => {
      const { addToFavoriteActionCreator, beers, favouriteList } = this.props;
      addToFavoriteActionCreator(beers, favouriteList, id);
    };

    removeFromFavourite = (removeId) => {
      this.props.removeFromFavouritesActionCreator(this.props.favouriteList, removeId);
    };

    onClose = () => {
      this.props.clearDetailActionCreator(this.props.history);
    };

    handleBeers = (list) =>
    // if (this.props.searchResult.size < 1) {
    //   return <p className="text-secondary text-center">No search result</p>;
    // }

      list.map((beer) => (
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
      ))
    ;

    drawDetails = (details) => {
      const { error, isLoading, favouriteList } = this.props;
      if (!details.size && error) return <Error />;
      if (details.size) {
        return (
          <Detail
            details={details}
            onClose={this.onClose}
            randomBeers={null}
            handleDetail={this.handleDetail}
            handleFavourite={this.handleFavourite}
            removeFromFavourite={this.removeFromFavourite}
            isLoading={isLoading}
            favouriteList={favouriteList}
          />
        );
      }
    };

    render() {
      const { searchResult, details, error } = this.props;

      return (
        <Fragment>
          <div className="card-header">
            <h4 className="text-md text-center">Founded Beers</h4>
          </div>
          <div className="card-body">
            {!searchResult.size && <p className="text-secondary text-center">No search result</p>}
            <div className="beerContainer">
              {this.handleBeers(searchResult)}
            </div>
          </div>
          {this.drawDetails(details)}
          {error && <Error />}
        </Fragment>
      );
    }
}

const mapStateToProps = (state) => ({
  isLoading: isLoadingSelector(state),
  details: detailsSelector(state),
  errorSelector: errorSelector(state),
  random: randomSelector(state),
  favouriteList: favouriteListSelector(state),
  beers: beersSelector(state),
  searchResult: searchSelector(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  beerDetailActionCreator: getCertainBeerRequest,
  clearDetailActionCreator: clearBeerDetails,
  addToFavoriteActionCreator: addToFavouriteList,
  removeFromFavouritesActionCreator: removeFromFavoriteList,
},
dispatch);

FoundedBeers.propTypes = {
  beerDetailActionCreator: PropTypes.func.isRequired,
  clearDetailActionCreator: PropTypes.func.isRequired,
  addToFavoriteActionCreator: PropTypes.func.isRequired,
  removeFromFavouritesActionCreator: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  favouriteList: PropTypes.instanceOf(Immutable.List).isRequired,
  beers: PropTypes.instanceOf(Immutable.List).isRequired,
  searchResult: PropTypes.instanceOf(Immutable.List).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoundedBeers);
