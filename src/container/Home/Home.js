import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import {
    clearBeerDetails,
    getAllBeersRequest,
    getCertainBeerRequest,
    getPaginationRequest,
    getRandomBeerRequest, infiniteScrollBeers,
} from "../../store/actions/beerActionCreators";
import {
    beersSelector,
    detailsSelector,
    errorSelector,
    isLoadingSelector,
    pageSelector,
    perPageSelector,
    randomSelector,
    searchSelector
} from "../../store/selectors/beerSelector";
import Beer from "../../components/Beer/Beer";
import Pagination from "../Pagination/Pagination";
import Spinner from "../../components/Spinner/Spinner";

import './Home.scss';
import Detail from "../../components/Detail/Detail";
import debounce from "lodash.debounce";
import {favouriteListSelector} from "../../store/selectors/favouriteSelector";
import {
    addToFavouriteList,
    clearFavouriteList,
    removeFromFavoriteList
} from "../../store/actions/favoriteActionCreator";
import Error from "../../components/Error/Error";
import {withRouter} from "react-router";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {areOver: false};
    }

    componentDidMount() {
        const {
            perPage,
            isLoading,
            getAllBeersActionCreator,
            details,
            match,
            history,
        } = this.props;

        if (perPage === 25 && !isLoading) {
            getAllBeersActionCreator();
        }
        if(match.params.id && details.size === 0 && !isLoading) {
            this.handleDetail(match.params.id, history)
        }
            window.onscroll = debounce(this.infiniteScroll, 300);
    };

    componentWillUnmount() {
        window.onscroll = null;
    }

    handleDetail = (id, history) => {
        this.props.beerDetailActionCreator(parseInt(id), history);
        this.props.getRandomBeerActionCreator();
    };

    drawBeers = beers => beers.map(beer =>
        <Beer
            beer={beer}
            key={beer.get('id')}
            loading={this.props.isLoading}
            handleDetail={this.handleDetail}
            handleFavourite={this.handleFavourite}
            removeFromFavourite={this.removeFromFavourite}
            clearFavourite={this.clearFavourite}
            favouriteList={this.props.favouriteList}
        />
    );

    handlePagination = perPage => {
        this.props.paginationActionCreator(perPage, 1)
    };

    infiniteScroll = () => {
        const { isLoading,
            error,
            page,
            perPage,
            infinitePaginationActionCreator,
            searchResult
        } = this.props;
        const { documentElement } = document;

        if (error ||
            isLoading ||
            searchResult.size > 0 ||
            typeof searchResult.get(0) === 'string') return;
        if (window.innerHeight + documentElement.scrollTop === documentElement.offsetHeight) {
            perPage * page > 324 ? this.setState({
                areOver: true
            }) : infinitePaginationActionCreator(perPage, page + 1);
        }
    };

    onClose = history => {
        this.props.clearDetailActionCreator(history)
    };

    handleFavourite = id => {
        const {addToFavoriteActionCreator, beers, favouriteList} = this.props;
        addToFavoriteActionCreator(beers , favouriteList, id)
    };

    removeFromFavourite = removeId => {
        this.props.removeFromFavouritesActionCreator(this.props.favouriteList, removeId)
    };

    drawDetails = details => {
        const { random, error, isLoading, favouriteList } = this.props;
        if (!details.size && error) return <Error />;
        if (details.size) {
            return <Detail
                details={details}
                onClose={this.onClose}
                randomBeers={random}
                handleDetail={this.handleDetail}
                handleFavourite={this.handleFavourite}
                removeFromFavourite={this.removeFromFavourite}
                isLoading={isLoading}
                favouriteList={favouriteList}
            />;
        }
    };

    render() {
        const { isLoading, searchResult, error, beers, details } = this.props;
        const { areOver } = this.state;
        let result = searchResult,
            showPagination = true,
            beerContent = beers;

        if (typeof searchResult.get(0) === "string") {
            result = [];
        }
        if (result.length === 0 || searchResult.size > 0 ) {
            showPagination = false;
            beerContent = result;
        }

        return (
            <Fragment>
                    <Fragment>
                        {showPagination && <Pagination pagination={this.handlePagination}/>}
                        <div className='beerContainer'>
                            {this.drawBeers(beerContent)}
                            {this.drawDetails(details)}
                        </div>
                        {areOver && <h4
                            style={{textAlign: 'center'}}>
                            Beers ended
                        </h4>}
                        {result.length === 0 && <h2
                            style={{textAlign: 'center'}}>
                            Beers Not Found
                        </h2>}
                    </Fragment>
                {isLoading && <Spinner/>}
                {error && <Error
                    message={error.message}
                    stack={error.stack}/>}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: isLoadingSelector(state),
    beers: beersSelector(state),
    page: pageSelector(state),
    perPage: perPageSelector(state),
    details: detailsSelector(state),
    random: randomSelector(state),
    error: errorSelector(state),
    favouriteList: favouriteListSelector(state),
    searchResult: searchSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getAllBeersActionCreator: getAllBeersRequest,
            paginationActionCreator: getPaginationRequest,
            infinitePaginationActionCreator: infiniteScrollBeers,
            beerDetailActionCreator: getCertainBeerRequest,
            clearDetailActionCreator: clearBeerDetails,
            getRandomBeerActionCreator: getRandomBeerRequest,
            addToFavoriteActionCreator: addToFavouriteList,
            clearFavoriteActionCreator: clearFavouriteList,
            removeFromFavouritesActionCreator: removeFromFavoriteList,
        },
    dispatch
    );

Home.propTypes = {
    isLoading: PropTypes.bool
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
