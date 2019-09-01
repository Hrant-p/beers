import React from 'react';
import './Detail.scss';
import {withRouter} from "react-router";

function Detail(props) {
    const {
        handleDetail,
        details,
        onClose,
        randomBeers,
        history
    } = props;

    const item = details.get(0);
    const id = item.get('id')
    let randoms = !randomBeers ? null : randomBeers.map(beer => (
        <div className="random" key={id}>
            <div>
                    {beer.get('name')}
                    {beer.get('tagline')}
                <img
                    src={beer.get('image_url')}
                    alt={beer.get('name')}
                    onClick={() => handleDetail(id, history)}
                />
            </div>
        </div>

    ));

    return (
            <div className='detailContainer'>
                <div className="details">
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
