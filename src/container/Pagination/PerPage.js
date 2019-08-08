import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {beersSelector, isLoadingSelector} from "../../store/selectors/beerSelector";
import {bindActionCreators} from "redux";
import {setBeerPerPage} from "../../store/actions/beerActionCreators";


class PerPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            perPage: 20,
            page: 1
        }
    };

    componentDidUpdate() {
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

        this.props.perPageActionCreator(2, this.state.perPage)
    };



    render() {
        console.log(this.props)
        return (
            <select
                onChange={this.handleChange}
                name='perPage'
                value={this.state.perPage}
            >
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
        );
    }
};

const mapStateToProps = state => ({
    beers: beersSelector(state),
    isLoading: isLoadingSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        perPageActionCreator: setBeerPerPage
        }, dispatch
    );

PerPage.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(PerPage);