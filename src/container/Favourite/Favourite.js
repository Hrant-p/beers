import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';
import {
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
import Beer from "../../components/Beer/Beer";
import {clearBeerDetails, getCertainBeerRequest, getRandomBeerRequest} from "../../store/actions/beerActionCreators";
import Detail from "../../components/Detail/Detail";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";

class Favourite extends Component {

    handleDetail = id => {
        this.props.beerDetailActionCreator(id);
    };

    handleFavourite = id => {
        const {addToFavoriteActionCreator, beers, favouriteList} = this.props;
        addToFavoriteActionCreator(beers.toJS() , favouriteList.toJS(), id)
    };

    clearFavourite = () => {
        this.props.clearFavoriteActionCreator()
    };

    removeFromFavourite = removeId => {
        this.props.removeFromFavouritesActionCreator(this.props.favouriteList.toJS(), removeId)
    };

    onClose = () => {
        this.props.clearDetailActionCreator()
    };


    handleBeers = () => {
        const { favouriteList } = this.props;
        if (!favouriteList.size) {
            return <p>You are not selected favourite beers</p>
        }

        return favouriteList.map(beer =>
            <Beer
                beer={beer}
                loading={this.props.isLoading}
                handleDetail={this.handleDetail}
                handleFavourite={this.handleFavourite}
                clearFavourite={this.clearFavourite}
                removeFromFavourite={this.removeFromFavourite}
            />
        )
    };

    drawDetails = () => {
        const { details, random, error } = this.props;
        if (!details.size && error) return <Error />;
        if (details.size) {
            return  <Detail
                details={details}
                onClose={this.onClose}
                randomBeers={random}
                handleDetail={this.handleDetail}
            />
        }
    };

    render() {
        const { isLoading } = this.props;

        return (
            <Fragment>
                <button
                    className="selectField"
                    onClick={this.clearFavourite}>
                    Remove All Favourites
                </button>
                <div className="beerContainer">
                    {this.handleBeers()}
                    {isLoading && <Spinner/>}
                    {this.drawDetails()}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: isLoadingSelector(state),
    details: detailsSelector(state),
    errorSelector: errorSelector(state),
    random: randomSelector(state),
    favouriteList: favouriteListSelector(state),
    beers: beersSelector(state),
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
            beerDetailActionCreator: getCertainBeerRequest,
            clearDetailActionCreator: clearBeerDetails,
            getRandomBeerActionCreator: getRandomBeerRequest,
            addToFavoriteActionCreator: addToFavouriteList,
            clearFavoriteActionCreator: clearFavouriteList,
            removeFromFavouritesActionCreator: removeFromFavoriteList
        }
    , dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Favourite)
