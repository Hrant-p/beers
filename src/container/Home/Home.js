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
    randomSelector
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

class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            page: 1,
            areOver: false
        };
        window.onscroll = debounce(this.infiniteScroll, 100);
    }

    componentDidMount() {
        if (this.props.perPage === 25) {
            this.props.getAllBeersActionCreator();
        }
    };

    handleDetail = id => {
        this.props.beerDetailActionCreator(id);
        this.props.getRandomBeerActionCreator();
    };

    drawBeers = () => {
        return this.props.beers.map(
            beer => {
                console.log(beer.id)
                return <Beer
                beer={beer}
                key={beer.get('id')}
                loading={this.props.isLoading}
                handleDetail={this.handleDetail}
                handleFavourite={this.handleFavourite}
                removeFromFavourite={this.removeFromFavourite}
                clearFavourite={this.clearFavourite}
            />}
            )};



    handlePagination = (perPage, page) => {
        if (perPage * page > 324) {
            return this.props.paginationActionCreator(perPage, 1)
        }
        this.props.paginationActionCreator(perPage, page)
    };

    infiniteScroll = () => {
        const { isLoading, error, page, perPage } = this.props;
        const { documentElement } = document;
        if (error || isLoading) return;
        if (window.innerHeight + documentElement.scrollTop === documentElement.offsetHeight) {
            if (perPage * page > 324) {
                this.setState({
                    areOver: true
                });
                return;
            }
            this.props.infinitePaginationActionCreator(perPage, page + 1);
        }
    };

    onClose = () => {
        this.props.clearDetailActionCreator()
    };

    handleFavourite = id => {
        const {addToFavoriteActionCreator, beers, favouriteList} = this.props;
        addToFavoriteActionCreator(beers.toJS() , favouriteList.toJS(), id)
    };

    clearFavourite = () => {
        this.props.clearFavoriteActionCreator()
    };

    removeFromFavourite = (removeId) => {
        this.props.removeFromFavouritesActionCreator(this.props.favouriteList.toJS(), removeId)
    };

    render() {
        const { details, random, isLoading } = this.props;
        const { areOver } = this.state;

        return (
            <Fragment>
                <Pagination pagination={this.handlePagination} />
                <div className='beerContainer'>
                    {this.drawBeers()}
                    {isLoading && <Spinner/>}
                    {details.size && <Detail
                        details={details}
                        onClose={this.onClose}
                        randomBeers={random}
                        handleDetail={this.handleDetail}
                    />}
                </div>
                {areOver && <p>Beers ended</p>}
            </Fragment>
        )
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
            removeFromFavouritesActionCreator: removeFromFavoriteList
        },
    dispatch
    );

Home.propTypes = {
    isLoading: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
