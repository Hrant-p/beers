import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    beersSelector,
    pageSelector,
    perPageSelector
} from "../../store/selectors/beerSelector";

const Page = ({ page, perPage, pagination, beers }) => {

    const arr = beers.toJS();
    let id = arr.length ? arr[arr.length - 1].id : 777;
    let pageLeft = page - 1 ? page - 1 : <i className="fas fa-arrow-alt-circle-left"/>;
    let pageRight = id > 324 ? <i className="fas fa-arrow-alt-circle-right"/> : page + 1;
    let lastPage = Math.ceil(325 / perPage);
    let lastButton = id > 324 ? null : (
        <button onClick={() => pagination(lastPage, perPage)}>{lastPage}</button>
    );

    const style = {
        width: '50px',
        height: '20px'
    };

    return (
        <div>
            {page - 1 > 1 && <button onClick={
                () => pagination(1, perPage)}
            >1</button>}
            {(page > 3) && <button>...</button>}
            <button
                disabled={page < 2}
                onClick={() => pagination(page - 1, perPage)}
                style={style}
            >
                {pageLeft}
            </button>
            <button style={{border: 'inset'}}>
                {page}
            </button>
            <button
                disabled={id > 324}
                onClick={() => pagination(page + 1, perPage)}
                style={style}
            >
                {pageRight}
            </button>
            {(page + 1 < lastPage - 1) && <button>...</button>}
            {page < lastPage - 1 && lastButton}
        </div>
    );
}

const mapStateToProps = state => ({
    page: pageSelector(state),
    perPage: perPageSelector(state),
    beers: beersSelector(state)
});

Page.propTypes = {
    isLoading: PropTypes.bool,
    page: PropTypes.number,
    perPage: PropTypes.number
};

export default connect(mapStateToProps, {})(Page);