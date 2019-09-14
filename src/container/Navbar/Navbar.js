import React, {Component} from 'react';
import { withRouter} from "react-router-dom";
import './Navbar.scss'
import {searchSelector} from "../../store/selectors/beerSelector";
import {bindActionCreators} from "redux";
import {clearSearchResults} from "../../store/actions/searchActionCreators";
import {connect} from "react-redux";

class Navbar extends Component {

    clearSearchResultHome = () => {
        if(this.props.searchResult) {
            this.props.clearSearchActionCreator()
        }
        this.props.history.push('/beers')
    };

    clearSearchResultFavourite = () => {
        if(this.props.searchResult) {
            this.props.clearSearchActionCreator()
        }
        this.props.history.push('/favourite/')
    };

    render() {

        return (
            <nav>
                <button
                    className="link"
                    onClick={this.clearSearchResultHome}>
                    Home
                </button>
                <button
                    className="link"
                    onClick={this.clearSearchResultFavourite}>
                    Favourite
                </button>
                <a className="link"
                   href="/">
                    <i className="fas fa-retweet"/>
                </a>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    searchResult: searchSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
    clearSearchActionCreator: clearSearchResults
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))
