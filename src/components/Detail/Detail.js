import React from 'react';
import './Detail.scss';
import { withRouter } from "react-router";
import Star from '../Star/Star';

function Detail(props) {
    const {
        handleDetail,
        details,
        onClose,
        randomBeers,
        history,
        favouriteList,
        handleFavourite,
        removeFromFavourite,
    } = props;

    const item = details.get(0);
    let randoms = !randomBeers ? null : randomBeers.map(beer => (
        <div
            className="random"
            key={beer.get('id')}>
            <div>
                {beer.get('name')}
                {beer.get('tagline')}
                <img
                    src={beer.get('image_url')}
                    alt={beer.get('name')}
                    onClick={() => handleDetail(beer.get('id'), history)}
                />
            </div>
        </div>
    ));


    return (
            <div className='detailContainer'>
                <div className="details">
                    <Star
                        favouriteList={favouriteList}
                        removeFromFavourite={removeFromFavourite}
                        handleFavourite={handleFavourite}
                        id={item.get('id')}
                        random={randomBeers}
                    />
                    <span onClick={() => onClose(history)}>
                        <i className='far fa-times-circle' />
                    </span>
                    {item.get('name')}
                    {item.get('tagline')}
                    <img
                        src={item.get('image_url')}
                        alt={item.get('name')}
                    />
                    <h5>{item.get('description')}</h5>
                        {randoms}
                </div>
            </div>
    )
}

export default withRouter(Detail);
