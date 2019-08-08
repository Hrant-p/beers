import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { getAllBeersRequest } from "../../store/actions/beerActionCreators";
import {beersSelector, isLoadingSelector} from "../../store/selectors/beerSelector";
import Beer from "../Beers/Beer";
import PerPage from "../Pagination/PerPage";

class Home extends Component {

    componentDidMount() {
        this.props.getAllBeersActionCreator()
    };

    drawBeers = () => {
       const beers = this.props.beers.toJS();
        return beers.map(beer =>
            <Beer
                beer={beer}
                key={beer.id}
            />
        )
    };

    render() {


        return (
            <div className='beerContainer'>
                <PerPage />
                {this.drawBeers()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: isLoadingSelector(state),
    beers: beersSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {getAllBeersActionCreator: getAllBeersRequest},
    dispatch
    );

Home.propTypes = {
    isLoading: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);