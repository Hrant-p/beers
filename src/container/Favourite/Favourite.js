import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';
import {
    addedToFavouriteListSucceed,
    addToFavouriteList,
    clearFavouriteList,
    removeFromFavoriteList
} from "../../store/actions/favoriteActionCreator";
import {
    errorSelector,
    detailsSelector,
    isLoadingSelector,
    randomSelector,
    beersSelector
} from "../../store/selectors/beerSelector";
import { favouriteListSelector } from "../../store/selectors/favouriteSelector";

class Favourite extends Component {
    render() {
        return (
            <Fragment>
                <div className="beerContainer">
                    {console.log(this.props)}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: isLoadingSelector(state),
    detail: detailsSelector(state),
    errorSelector: errorSelector(state),
    random: randomSelector(state),
    favouriteList: favouriteListSelector(state),
    beers: beersSelector(state),
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        removeFromFavouritesActionCreator: removeFromFavoriteList,
        clearFavouritesActionCreator: clearFavouriteList
        }
    , dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Favourite)
