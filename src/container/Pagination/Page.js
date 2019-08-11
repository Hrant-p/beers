import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    beersSelector,
    pageSelector,
    perPageSelector
} from "../../store/selectors/beerSelector";

function Page({ page, perPage, pagination, beers }) {
    const arr = beers.toJS();
    const id = arr.length ? arr[arr.length - 1].id : null;

    return (
        <div>
            <button
                disabled={page < 2}
                onClick={() => pagination(page - 1, perPage)}
            >
                PREVIOUS
            </button>
            <button
                disabled={id > 324}
                onClick={() => pagination(page + 1, perPage)}
            >
                NEXT
            </button>
        </div>
    );
}

const mapStateToProps = state => ({
    page: pageSelector(state),
    perPage: perPageSelector(state),
    beers: beersSelector(state)
});

Page.propTypes = {
    isLoading: PropTypes.bool
};

export default connect(mapStateToProps, {})(Page);