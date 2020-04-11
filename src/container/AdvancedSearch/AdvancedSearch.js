import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { advancedSearchByParams } from '../../store/actions/searchActionCreators';
import {
  detailsSelector,
  errorSelector,
  isLoadingSelector,
  searchSelector,
} from '../../store/selectors/beerSelector';
import './AdvancedSearch.scss';
import Spinner from '../../components/Spinner/Spinner';
import Error from '../../components/Error/Error';


class AdvancedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beer_name: '',
      min_IBU: '',
      max_IBU: '',
      min_ABV: '',
      max_ABV: '',
      min_EBC: '',
      max_EBC: '',
      brewed_before: '',
      brewed_after: '',
    };
  }

    handleAdvancedSearch = (history, stateObj) => {
      const filteredObj = {};
      for (const [key, value] of Object.entries(stateObj)) {
        if (value) {
          Object.assign(filteredObj, { [key]: value });
        }
      }
      this.props.advancedSearchActionCreator(filteredObj, history);
    };

    handleChange = ({ currentTarget: { name, value } }) => {
      this.setState({ [name]: value });
    };

    render() {
      const {
        beer_name,
        min_IBU,
        max_IBU,
        min_ABV,
        max_ABV,
        min_EBC,
        max_EBC,
        brewed_before,
        brewed_after,
      } = this.state;
      const { history, isLoading, error } = this.props;

      return (
        <Fragment>
          <div className="card-header">
            <h4 className="text-md text-center">Search Beers</h4>
          </div>
          {isLoading ? <Spinner /> : (
            <div className="search-container mb-5">
              <div className="search-field">
                <label htmlFor="name">
                        Name
                </label>
                <input
                  className="form-control-sm"
                  type="search"
                  id="name"
                  name="beer_name"
                  value={beer_name}
                  onChange={this.handleChange}
                />

              </div>
              <div className="search-field">
                <label htmlFor="min_IBU">
                        Minimum IBU
                </label>
                <input
                  className="form-control-sm"
                  type="search"
                  id="min_IBU"
                  name="min_IBU"
                  value={min_IBU}
                  onChange={this.handleChange}
                />

              </div>
              <div className="search-field">
                <label htmlFor="max_IBU">
                        Maximum IBU
                </label>
                <input
                  className="form-control-sm"
                  type="search"
                  id="max_IBU"
                  name="max_IBU"
                  value={max_IBU}
                  onChange={this.handleChange}
                />

              </div>
              <div className="search-field">
                <label htmlFor="min_ABV">
                        Minimum ABV
                </label>
                <input
                  className="form-control-sm"
                  type="search"
                  id="min_ABV"
                  name="min_ABV"
                  value={min_ABV}
                  onChange={this.handleChange}
                />

              </div>
              <div className="search-field">
                <label htmlFor="max_ABV">
                        Maximum ABV
                </label>
                <input
                  className="form-control-sm"
                  type="search"
                  id=""
                  name="max_ABV"
                  value={max_ABV}
                  onChange={this.handleChange}
                />

              </div>
              <div className="search-field">
                <label htmlFor="min_EBC">
                        Minimum EBC
                </label>
                <input
                  className="form-control-sm"
                  type="search"
                  id="min_EBC"
                  name="min_EBC"
                  value={min_EBC}
                  onChange={this.handleChange}
                />

              </div>
              <div className="search-field">
                <label htmlFor="max_EBC">
                        Maximum EBC
                </label>
                <input
                  className="form-control-sm"
                  type="search"
                  id="max_EBC"
                  name="max_EBC"
                  value={max_EBC}
                  onChange={this.handleChange}
                />
              </div>
              <div className="search-field">
                <label htmlFor="brewed_before">
                        Brewed before
                </label>
                <input
                  className="form-control-sm"
                  type="search"
                  id=""
                  name="brewed_before"
                  value={brewed_before}
                  onChange={this.handleChange}
                />

              </div>
              <div className="search-field" />
              <div className="search-field">
                <label htmlFor="">
                        Brewed after
                </label>
                <input
                  className="form-control-sm"
                  type="search"
                  id="brewed_after"
                  name="brewed_after"
                  value={brewed_after}
                  onChange={this.handleChange}
                />

              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  this.handleAdvancedSearch(history, this.state);
                }}
              >
                    Search
              </button>
            </div>
          )}
          {error && <Error message={error.message} /> }
        </Fragment>
      );
    }
}

const mapStateToProps = (state) => ({
  searchResult: searchSelector(state),
  error: errorSelector(state),
  isLoading: isLoadingSelector(state),
  details: detailsSelector(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  advancedSearchActionCreator: advancedSearchByParams,
}, dispatch);

AdvancedSearch.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdvancedSearch));
