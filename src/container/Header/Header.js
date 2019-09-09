import React, { Component } from 'react';
import './header.scss';
import {connect} from "react-redux";
import {beersSelector, errorSelector, isLoadingSelector, searchSelector} from "../../store/selectors/beerSelector";
import {bindActionCreators} from "redux";
import {searchByName} from "../../store/actions/searchActionCreators";

class Header extends Component {

    onChange = ({currentTarget: { value }}) => {
        this.handleSearch(value)
    };

    handleSearch = text => {
        const {searchByNameActionCreator, beers, error, isLoading} = this.props;
        if (error || isLoading) return;
        if (text) {
            searchByNameActionCreator(text, beers);
        } else if (text === '') {
            searchByNameActionCreator(text, []);
        }
    };

    render() {

        return (
            <header className="header">
                <div className="info">
                    <h2>The Beer Bank</h2>
                    <p>Find your favourite beer here</p>
                    <input
                        type="search"
                        name="text"
                        placeholder="Search For beer name"
                        onChange={this.onChange}
                    />
                    <button>
                        Advanced Search
                    </button>
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => ({
    beers: beersSelector(state),
    isLoading: isLoadingSelector(state),
    error: errorSelector(state),
    searchResult: searchSelector(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    searchByNameActionCreator: searchByName
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header)
