import React from 'react';
import {withRouter} from "react-router";
import Spinner from "../Spinner/Spinner";
import Star from "../Star/Star";
import './Beer.scss';

function Beer(props) {
    const {
        loading,
        handleDetail,
        handleFavourite,
        removeFromFavourite,
        beer,
        history,
        favouriteList,
    } = props;

    const id = beer.get('id');

    return (
        <div className='beer'>
            {loading && <Spinner/>}
            <Star
                id={id}
                handleFavourite={handleFavourite}
                removeFromFavourite={removeFromFavourite}
                favouriteList={favouriteList}
            />
            <h5>{beer.get('name')}</h5>
            <p>{beer.get('tagline')}</p>
            <img
                src={beer.get('image_url')}
                alt={beer.get('name')}
                style={{width: '100px'}}
                onClick={() => handleDetail(id, history)}
            />
        </div>
    );
}

export default withRouter(Beer)
