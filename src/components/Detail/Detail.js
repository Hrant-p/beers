import React from 'react';
import './Detail.scss';

function Detail({ handleDetail, details, onClose, randomBeers }) {
    const item = details.get(0);
    console.log(randomBeers)
    const beerItems = randomBeers.map(beer => (
            <div key={beer.get('id')}>
                {beer.get('name')}
                {beer.get('tagline')}
                <img
                    src={beer.get('image_url')}
                    alt={beer.get('name')}
                    onClick={() => handleDetail(beer.get('id'))}
                />
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
                    <div className="random">
                        {beerItems}
                    </div>
                </div>
            </div>
    )
}

export default Detail;
