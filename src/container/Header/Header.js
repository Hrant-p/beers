import React, { Component } from 'react';
import './Header.scss';
import {connect} from "react-redux";
import {beersSelector, errorSelector, isLoadingSelector, searchSelector} from "../../store/selectors/beerSelector";
import {bindActionCreators} from "redux";
import {searchByName} from "../../store/actions/searchActionCreators";
import {favouriteListSelector} from "../../store/selectors/favouriteSelector";
import {withRouter} from "react-router";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            if (action === 'PUSH' || 'REPLACE') {
                this.setState({text: ''})
            }
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    onChange = ({currentTarget: { name, value }}) => {
        this.setState({[name]: value});
        this.handleSearch(value)
    };

    handleSearch = text => {
        const {searchByNameActionCreator, beers, error, isLoading, favouriteList} = this.props;
        if (error || isLoading) return;
        let  beerCollection;
        if (window.location.pathname.includes('beers')) {
            beerCollection = beers;
        }
        if (window.location.pathname.includes('favourite')) {
            beerCollection = favouriteList
        }
        if (text) {
            searchByNameActionCreator(text, beerCollection);
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
                        placeholder="search for beer name"
                        onChange={this.onChange}
                        value={this.state.text}
                    />
                    <button
                        className="search-btn"
                        onClick={() => this.props.history.push("/advanced_search")}>
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
    searchResult: searchSelector(state),
    favouriteList: favouriteListSelector(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    searchByNameActionCreator: searchByName
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
