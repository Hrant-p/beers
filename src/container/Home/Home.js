import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import {
    clearBeerDetails,
    getAllBeersRequest,
    getCertainBeerRequest,
    getPaginationRequest,
    getRandomBeerRequest,
} from "../../store/actions/beerActionCreators";
import {
    beersSelector,
    detailsSelector,
    isLoadingSelector,
    pageSelector,
    perPageSelector, randomSelector
} from "../../store/selectors/beerSelector";
import Beer from "../../components/Beer/Beer";
import Pagination from "../Pagination/Pagination";
import Page from "../Pagination/Page";
import Spinner from "../../components/Spinner/Spinner";

import './Home.scss';
import Detail from "../../components/Detail/Detail";

class Home extends Component {

    componentDidMount() {
        if (this.props.perPage === 25) {
            this.props.getAllBeersActionCreator();
            console.log('mount')
        }
    };

    handleDetail = id => {
        this.props.beerDetailActionCreator(id);
        this.props.getRandomBeerActionCreator();
    };

    drawBeers = () => {
       const beers = this.props.beers.toJS();
        return beers.map(
            beer => <Beer
                beer={beer}
                key={beer.id}
                loading={this.props.isLoading}
                handleDetail={this.handleDetail}
            />
            )};

    handlePagination = (page, perPage) => {
        this.props.paginationActionCreator(page, perPage)
    };
    onClose = () => {
        this.props.clearDetailActionCreator()
    };

    render() {
        const { details, random, isLoading } = this.props;

        return (
            <>
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
                <Page pagination={this.handlePagination}/>
            </>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: isLoadingSelector(state),
    beers: beersSelector(state),
    page: pageSelector(state),
    perPage: perPageSelector(state),
    details: detailsSelector(state),
    random: randomSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getAllBeersActionCreator: getAllBeersRequest,
            paginationActionCreator: getPaginationRequest,
            beerDetailActionCreator: getCertainBeerRequest,
            clearDetailActionCreator: clearBeerDetails,
            getRandomBeerActionCreator: getRandomBeerRequest
        },
    dispatch
    );

Home.propTypes = {
    isLoading: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
