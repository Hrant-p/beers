import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { perPageSelector } from '../../store/selectors/beerSelector';

const Pagination = ({ handlePagination, perPage }) => {
  const handleChange = ({ target: { value } }) => {
    handlePagination(Number(value), 1);
  };

  return (
    <select
      className="custom-select-sm selectField"
      onChange={handleChange}
      value={perPage}
    >
      <option value={25}>25</option>
      <option value={50}>50</option>
      <option value={70}>70</option>
    </select>
  );
};

const mapStateToProps = (state) => ({
  perPage: perPageSelector(state),
});

Pagination.propTypes = {
  perPage: PropTypes.number.isRequired,
  handlePagination: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Pagination);
