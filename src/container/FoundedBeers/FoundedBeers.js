import React, {Component} from 'react';
import Error from "../../components/Error/Error";
import Detail from "../../components/Detail/Detail";
import {
    beersSelector,
    detailsSelector,
    errorSelector,
    isLoadingSelector,
    randomSelector, searchSelector
} from "../../store/selectors/beerSelector";
import {favouriteListSelector} from "../../store/selectors/favouriteSelector";
import {bindActionCreators} from "redux";
import {clearBeerDetails, getCertainBeerRequest} from "../../store/actions/beerActionCreators";
import {
    addToFavouriteList,
    removeFromFavoriteList
} from "../../store/actions/favoriteActionCreator";
import {connect} from "react-redux";
import Beer from "../../components/Beer/Beer";

class FoundedBeers extends Component {

    handleDetail = (id, history) => {
        this.props.beerDetailActionCreator(parseInt(id), history);
    };

    handleFavourite = id => {
        const {addToFavoriteActionCreator, beers, favouriteList} = this.props;
        addToFavoriteActionCreator(beers, favouriteList, id)
    };

    removeFromFavourite = removeId => {
        this.props.removeFromFavouritesActionCreator(this.props.favouriteList, removeId)
    };

    onClose = () => {
        this.props.clearDetailActionCreator(this.props.history)
    };

    handleBeers = list => {
        if (this.props.searchResult.size < 1) {
            return <p>Not founded beers</p>
        }

        return list.map(beer =>
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
        )
    };

    drawDetails = details => {
        const { error, isLoading, favouriteList } = this.props;
        if (!details.size && error) return <Error />;
        if (details.size) {
            return <Detail
                details={details}
                onClose={this.onClose}
                randomBeers={null}
                handleDetail={this.handleDetail}
                handleFavourite={this.handleFavourite}
                removeFromFavourite={this.removeFromFavourite}
                isLoading={isLoading}
                favouriteList={favouriteList}
            />;
        }
    };

    render() {

        return (
            <div>
                Founded Beers
                <div className='beerContainer'>
                    {this.handleBeers(this.props.searchResult)}
                    {this.drawDetails(this.props.details)}
                </div>
            </div>
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
    searchResult: searchSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
            beerDetailActionCreator: getCertainBeerRequest,
            clearDetailActionCreator: clearBeerDetails,
            addToFavoriteActionCreator: addToFavouriteList,
            removeFromFavouritesActionCreator: removeFromFavoriteList
        }
        , dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FoundedBeers)
