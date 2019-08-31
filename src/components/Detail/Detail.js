import React from 'react';
import './Detail.scss';
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";

function Detail({ handleDetail, details, onClose, randomBeers, isLoading }) {
    const item = details.get(0);
    let randoms = !randomBeers ? null : randomBeers.map(beer => (
        <div className="random">
            <div key={beer.get('id')}>
                    {beer.get('name')}
                    {beer.get('tagline')}
                <img
                    src={beer.get('image_url')}
                    alt={beer.get('name')}
                    onClick={() => handleDetail(beer.get('id'))}
                />
            </div>
        </div>

    ));

    return (
            <div className='detailContainer'>
                <div className="details">
                    <span onClick={onClose}>
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
                {isLoading && <Spinner />}
            </div>
    )
}

export default Detail;
