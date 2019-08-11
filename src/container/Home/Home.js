import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import {
    getAllBeersRequest,
    getPaginationRequest,
} from "../../store/actions/beerActionCreators";
import {
    beersSelector,
    isLoadingSelector,
    pageSelector,
    perPageSelector
} from "../../store/selectors/beerSelector";
import Beer from "../../components/Beer/Beer";
import Pagination from "../Pagination/Pagination";
import Page from "../Pagination/Page";
import Spinner from "../../components/Spinner/Spinner";

import './Home.scss';

class Home extends Component {

    componentDidMount() {
        if (this.props.perPage === 25) {
            this.props.getAllBeersActionCreator();
            console.log('mount')
        }
    };

    drawBeers = () => {
       const beers = this.props.beers.toJS();
        return beers.map(
            beer => <Beer
                beer={beer}
                key={beer.id}
                loading={this.props.isLoading}
            />
            )};

    handlePagination = (page, perPage) => {
        this.props.paginationActionCreator(page, perPage)
        console.log('handlePagination')
    };

    render() {

        return (
            <div>
                <Pagination pagination={this.handlePagination}/>
                <div className='beerContainer'>
                    {this.drawBeers()}
                </div>
                <Page pagination={this.handlePagination}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: isLoadingSelector(state),
    beers: beersSelector(state),
    page: pageSelector(state),
    perPage: perPageSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getAllBeersActionCreator: getAllBeersRequest,
            paginationActionCreator: getPaginationRequest
        },
    dispatch
    );

Home.propTypes = {
    isLoading: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);