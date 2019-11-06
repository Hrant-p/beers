import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { perPageSelector } from "../../store/selectors/beerSelector";

class Pagination extends Component {

    handleChange = ({target: { value }}) => {
        this.props.pagination(parseInt(value), 1);
    };

    static propTypes = {
        perPage: PropTypes.number
    };


    render() {
        return (
            <select
                className="selectField"
                onChange={this.handleChange}
                value={this.props.perPage}
            >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={70}>70</option>
            </select>
        );
    }
};

const mapStateToProps = state => ({
    perPage: perPageSelector(state),
});

export default connect(mapStateToProps, {})(Pagination);
