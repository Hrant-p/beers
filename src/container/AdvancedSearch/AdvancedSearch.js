import React, {Component} from 'react';
import {
    detailsSelector,
    errorSelector,
    isLoadingSelector,
    searchSelector
} from "../../store/selectors/beerSelector";
import {bindActionCreators} from "redux";
import {advancedSearchByParams} from "../../store/actions/searchActionCreators";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import './AdvancedSearch.scss'


class AdvancedSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            min_IBU: '',
            max_IBU: '',
            min_ABV:  '',
            max_ABV: '',
            min_EBC: '',
            max_EBC: '',
            brewed_before: '',
            brewed_after: ''
        }
    }

    handleAdvancedSearch = (beer_name,
                            min_IBU,
                            max_IBU,
                            min_ABV,
                            max_ABV,
                            min_EBC,
                            max_EBC,
                            brewed_before,
                            brewed_after,
                            history ) => {
        const parametersObj = { beer_name, min_IBU, max_IBU, min_ABV, max_ABV, min_EBC,
            max_EBC, brewed_before, brewed_after };

        this.props.advancedSearchActionCreator(parametersObj, history)
    };

    handleChange = ({currentTarget : { name, value }}) => {
        this.setState({[name]: value})
    };

    render() {

        return (
            <div className='search-container'>
                <div className="search-field">
                    <label htmlFor="name">
                        Name
                    </label>
                    <input
                        type="search"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />

                </div>
                <div className="search-field">
                    <label htmlFor="min_IBU">
                        Minimum IBU
                    </label>
                    <input
                        type="search"
                        id="min_IBU"
                        name="min_IBU"
                        value={this.state.min_IBU}
                        onChange={this.handleChange}
                    />

                </div>
                <div className="search-field">
                    <label htmlFor="max_IBU">
                        Maximum IBU
                    </label>
                    <input
                        type="search"
                        id="max_IBU"
                        name="max_IBU"
                        value={this.state.max_IBU}
                        onChange={this.handleChange}
                    />

                </div>
                <div className="search-field">
                    <label htmlFor="min_ABV">
                        Minimum ABV
                    </label>
                    <input
                        type="search"
                        id="min_ABV"
                        name="min_ABV"
                        value={this.state.min_ABV}
                        onChange={this.handleChange}
                    />

                </div>
                <div className="search-field">
                    <label htmlFor="max_ABV">
                        Maximum ABV
                    </label>
                    <input
                        type="search"
                        id=""
                        name="max_ABV"
                        value={this.state.max_ABV}
                        onChange={this.handleChange}
                    />

                </div>
                <div className="search-field">
                    <label htmlFor="min_EBC">
                        Minimum EBC
                    </label>
                    <input
                        type="search"
                        id="min_EBC"
                        name="min_EBC"
                        value={this.state.min_EBC}
                        onChange={this.handleChange}
                    />

                </div>
                <div className="search-field">
                    <label htmlFor="max_EBC">
                        Maximum EBC
                    </label>
                    <input
                        type="search"
                        id="max_EBC"
                        name="max_EBC"
                        value={this.state.max_EBC}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="search-field">
                    <label htmlFor="brewed_before">
                        Brewed before
                    </label>
                    <input
                        type="search"
                        id=""
                        name="brewed_before"
                        value={this.state.brewed_before}
                        onChange={this.handleChange}
                    />

                </div>
                <div className="search-field">

                </div>
                <div className="search-field">
                    <label htmlFor="">
                        Brewed after
                    </label>
                    <input
                        type="search"
                        id="brewed_after"
                        name="brewed_after"
                        value={this.state.brewed_after}
                        onChange={this.handleChange}
                    />

                </div>
                <button
                    className="search-btn"
                    onClick={() => this.handleAdvancedSearch(
                        this.state.name,
                        this.state.min_IBU,
                        this.state.max_IBU,
                        this.state.min_ABV,
                        this.state.max_ABV,
                        this.state.min_EBC,
                        this.state.max_EBC,
                        this.state.brewed_before,
                        this.state.brewed_after,
                        this.props.history
                    )}>
                    Search
                </button>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    searchResult: searchSelector(state),
    error: errorSelector(state),
    isLoading: isLoadingSelector(state),
    details: detailsSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        advancedSearchActionCreator: advancedSearchByParams
    } , dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdvancedSearch))
